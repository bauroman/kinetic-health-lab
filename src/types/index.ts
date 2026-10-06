// types/index.ts
// Tipos compartidos. Los nombres y campos reflejan las tablas reales de Supabase
// (servicios, pacientes, turnos) para que el código y la base hablen el mismo idioma.

import type { LucideIcon } from 'lucide-react';

// ---------- Base de datos ----------

/** Estados posibles de un turno. Agregá acá los que uses en la tabla `turnos`. */
export type EstadoTurno = 'confirmado' | 'cancelado';

/** Fila de la tabla `servicios`. */
export interface Servicio {
  id: string; // uuid
  nombre: string;
  descripcion: string | null;
  duracion_min: number;
  precio: number | null;
  activo: boolean;
}

/** Servicio tal como lo recibe el modal de reservas (solo activos, sin el flag). */
export type ServicioDB = Omit<Servicio, 'activo'>;

/** Fila de la tabla `pacientes`. */
export interface Paciente {
  id: string; // uuid
  nombre_completo: string;
  email: string;
  telefono: string;
}

/** Fila de la tabla `turnos`. */
export interface Turno {
  id: string; // uuid
  paciente_id: string;
  servicio_id: string;
  fecha_hora: string; // ISO 8601 (timestamptz)
  estado: EstadoTurno;
  notas: string | null;
}

// ---------- Server actions ----------

/** Resultado estándar de una server action. */
export type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

/** Datos que envía el formulario de reserva. */
export interface BookingPayload {
  nombreCompleto: string;
  email: string;
  telefono: string;
  servicioId: string; // uuid real de la tabla servicios
  fechaHora: string; // ISO 8601, ej: "2026-10-15T14:30:00-03:00"
  notas?: string;
}

// ---------- Contenido de la landing ----------

/** Tarjeta de servicio que se muestra en la sección "Servicios". */
export interface ServiceCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
  duration: string;
  featured: boolean;
}