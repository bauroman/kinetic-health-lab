// lib/agenda.ts
// Configuración de la agenda. Fuente única de verdad: la usan el modal y el servidor.
// (No lleva 'use server' ni 'use client', es un módulo común.)

export const TZ = 'America/Argentina/Buenos_Aires'; // La Plata: UTC-3 todo el año
export const DIAS_ATENCION = [1, 2, 3, 4, 5]; // 0 = domingo ... 6 = sábado
export const HORA_INICIO = 9;  // primer turno 09:00
export const HORA_FIN = 19;    // el último turno empieza antes de las 19:00
export const INTERVALO_MIN = 45;

export const DIAS_MAX_ANTICIPACION = 60; // no se puede reservar a más de 60 días
export const MAX_TURNOS_ACTIVOS = 3;     // máximo de turnos futuros por paciente

// Feriados / vacaciones / días sin atención. Formato 'YYYY-MM-DD'
export const DIAS_BLOQUEADOS: string[] = [
  // '2026-12-25',
  // '2027-01-01',
];

// Devuelve ["09:00", "09:45", ...]
export function generarSlots(): string[] {
  const slots: string[] = [];
  for (let min = HORA_INICIO * 60; min < HORA_FIN * 60; min += INTERVALO_MIN) {
    const h = String(Math.floor(min / 60)).padStart(2, '0');
    const m = String(min % 60).padStart(2, '0');
    slots.push(`${h}:${m}`);
  }
  return slots;
}

// "YYYY-MM-DD" en hora Argentina
export function fechaLocal(d: Date): string {
  return d.toLocaleDateString('en-CA', { timeZone: TZ });
}

// "HH:mm" en hora Argentina
export function horaLocal(d: Date): string {
  return d.toLocaleTimeString('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit' });
}

export function esDiaDeAtencion(fecha: string): boolean {
  if (DIAS_BLOQUEADOS.includes(fecha)) return false;
  const dia = new Date(`${fecha}T12:00:00-03:00`).getUTCDay();
  return DIAS_ATENCION.includes(dia);
}

/**
 * Valida que la fecha/hora respete la agenda de la clínica.
 * Devuelve un mensaje de error, o null si es válida.
 */
export function validarFechaHora(d: Date): string | null {
  if (isNaN(d.getTime())) return 'La fecha y hora no son válidas.';

  const ahora = Date.now();
  if (d.getTime() < ahora) return 'No se puede reservar un turno en el pasado.';

  const maxMs = DIAS_MAX_ANTICIPACION * 24 * 60 * 60 * 1000;
  if (d.getTime() > ahora + maxMs) {
    return `Solo se puede reservar con hasta ${DIAS_MAX_ANTICIPACION} días de anticipación.`;
  }

  if (!esDiaDeAtencion(fechaLocal(d))) return 'Ese día no atendemos.';

  if (!generarSlots().includes(horaLocal(d))) return 'Ese horario no está disponible.';

  return null;
}