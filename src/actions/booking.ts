'use server';

import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { enviarConfirmacionTurno } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { MAX_TURNOS_ACTIVOS, validarFechaHora } from '@/lib/agenda';
import type { ActionResult, BookingPayload, ServicioDB, Turno } from '@/types';

type BookingResult = ActionResult<Pick<Turno, 'id' | 'fecha_hora' | 'estado'>>;

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Límites de longitud para evitar payloads abusivos
const MAX_NOMBRE = 100;
const MAX_EMAIL = 254;
const MAX_TELEFONO = 30;
const MAX_NOTAS = 500;

// Rate limit: 5 intentos de reserva cada 10 minutos por IP
const RESERVAS_POR_VENTANA = 5;
const VENTANA_RESERVAS_MS = 10 * 60 * 1000;

/** IP del cliente (detrás de Vercel/proxy llega en x-forwarded-for). */
async function obtenerIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || h.get('x-real-ip') || 'desconocida';
}

export async function registrarReserva(data: BookingPayload): Promise<BookingResult> {
  try {
    // ---------- 0. Rate limit ----------
    const ip = await obtenerIp();
    if (!rateLimit(`reserva:${ip}`, RESERVAS_POR_VENTANA, VENTANA_RESERVAS_MS)) {
      return {
        success: false,
        error: 'Hiciste demasiados intentos. Esperá unos minutos y probá de nuevo.',
      };
    }

    // ---------- Validaciones ----------
    const nombre = data.nombreCompleto?.trim();
    const email = data.email?.trim().toLowerCase();
    const telefono = data.telefono?.trim();
    const notas = data.notas?.trim() || null;

    if (!nombre || nombre.length < 3 || nombre.length > MAX_NOMBRE) {
      return { success: false, error: 'Ingresá tu nombre completo.' };
    }
    if (!email || email.length > MAX_EMAIL || !EMAIL_REGEX.test(email)) {
      return { success: false, error: 'El email no es válido.' };
    }
    if (!telefono || telefono.length > MAX_TELEFONO) {
      return { success: false, error: 'Ingresá un teléfono de contacto válido.' };
    }
    if (notas && notas.length > MAX_NOTAS) {
      return { success: false, error: `Las notas no pueden superar los ${MAX_NOTAS} caracteres.` };
    }
    if (!data.servicioId || !UUID_REGEX.test(data.servicioId)) {
      return { success: false, error: 'El servicio seleccionado no es válido.' };
    }

    // Valida pasado, anticipación máxima, días de atención, feriados y slots válidos
    const fecha = new Date(data.fechaHora);
    const errorAgenda = validarFechaHora(fecha);
    if (errorAgenda) {
      return { success: false, error: errorAgenda };
    }

    // ---------- 1. Verificar servicio y traer nombre + duración ----------
    const { data: servicio, error: errorServicio } = await supabase
      .from('servicios')
      .select('id, nombre, duracion_min')
      .eq('id', data.servicioId)
      .eq('activo', true)
      .maybeSingle();

    if (errorServicio) {
      console.error('Error al buscar servicio:', errorServicio);
      return { success: false, error: 'No pudimos verificar el servicio.' };
    }
    if (!servicio) {
      return { success: false, error: 'El servicio seleccionado no existe.' };
    }

    // ---------- 2. Upsert del paciente ----------
    const { data: paciente, error: errorPaciente } = await supabase
      .from('pacientes')
      .upsert(
        { nombre_completo: nombre, email, telefono },
        { onConflict: 'email' }
      )
      .select('id')
      .single();

    if (errorPaciente || !paciente) {
      console.error('Error al procesar paciente:', errorPaciente);
      return { success: false, error: 'No pudimos registrar tus datos. Probá de nuevo.' };
    }

    // ---------- 3. Límite de turnos futuros por paciente ----------
    const { count: turnosActivos, error: errorConteo } = await supabase
      .from('turnos')
      .select('id', { count: 'exact', head: true })
      .eq('paciente_id', paciente.id)
      .gte('fecha_hora', new Date().toISOString())
      .neq('estado', 'cancelado');

    if (errorConteo) {
      console.error('Error al contar turnos activos:', errorConteo);
      return { success: false, error: 'No pudimos verificar tus turnos. Probá de nuevo.' };
    }
    if ((turnosActivos ?? 0) >= MAX_TURNOS_ACTIVOS) {
      return {
        success: false,
        error: `Ya tenés ${MAX_TURNOS_ACTIVOS} turnos reservados. Para sacar otro, cancelá alguno o escribinos por WhatsApp.`,
      };
    }

    // ---------- 4. Crear el turno ----------
    const { data: turno, error: errorTurno } = await supabase
      .from('turnos')
      .insert({
        paciente_id: paciente.id,
        servicio_id: data.servicioId,
        fecha_hora: fecha.toISOString(),
        estado: 'confirmado',
        notas,
      })
      .select('id, fecha_hora, estado')
      .single();

    if (errorTurno) {
      console.error('Error al crear turno:', errorTurno);

      // 23505 = unique_violation (horario ya tomado)
      if (errorTurno.code === '23505') {
        return {
          success: false,
          error: 'Ese horario ya fue reservado. Elegí otro, por favor.',
        };
      }
      return { success: false, error: 'No pudimos crear el turno. Probá de nuevo.' };
    }

    // ---------- 5. Envío de Email con Resend ----------
    try {
      await enviarConfirmacionTurno({
        nombreCompleto: nombre,
        email,
        telefono,
        servicio: servicio.nombre,
        duracionMin: servicio.duracion_min ?? 45,
        fechaHora: fecha,
        notas: notas ?? undefined,
      });
    } catch (emailErr) {
      // Se registra el error pero no bloqueamos el éxito de la reserva
      console.error('Fallo al disparar enviarConfirmacionTurno:', emailErr);
    }

    return { success: true, data: turno };
  } catch (err) {
    console.error('Error inesperado:', err);
    return { success: false, error: 'Ocurrió un error inesperado en el servidor.' };
  }
}

/**
 * Devuelve los horarios ya ocupados de un día, para deshabilitarlos en el calendario.
 * @param fecha formato "YYYY-MM-DD"
 */
export async function obtenerHorariosOcupados(fecha: string): Promise<ActionResult<string[]>> {
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return { success: false, error: 'Fecha inválida.' };
    }

    // Argentina = UTC-3 todo el año (sin horario de verano)
    const desde = new Date(`${fecha}T00:00:00-03:00`).toISOString();
    const hasta = new Date(`${fecha}T23:59:59-03:00`).toISOString();

    const { data, error } = await supabase
      .from('turnos')
      .select('fecha_hora')
      .gte('fecha_hora', desde)
      .lte('fecha_hora', hasta)
      .neq('estado', 'cancelado');

    if (error) {
      console.error('Error al obtener horarios:', error);
      return { success: false, error: 'No pudimos cargar los horarios.' };
    }

    return { success: true, data: data.map((t) => t.fecha_hora) };
  } catch (err) {
    console.error('Error inesperado:', err);
    return { success: false, error: 'Error inesperado en el servidor.' };
  }
}

/**
 * Devuelve los servicios activos para el selector del modal.
 */
export async function obtenerServicios(): Promise<ActionResult<ServicioDB[]>> {
  try {
    const { data, error } = await supabase
      .from('servicios')
      .select('id, nombre, descripcion, duracion_min, precio')
      .eq('activo', true)
      .order('nombre');

    if (error) {
      console.error('Error al obtener servicios:', error);
      return { success: false, error: 'No pudimos cargar los servicios.' };
    }

    return { success: true, data: data ?? [] };
  } catch (err) {
    console.error('Error inesperado:', err);
    return { success: false, error: 'Error inesperado en el servidor.' };
  }
}