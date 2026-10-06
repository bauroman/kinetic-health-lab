'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  registrarReserva,
  obtenerHorariosOcupados,
  obtenerServicios,
} from '@/actions/booking';
import {
  DIAS_MAX_ANTICIPACION,
  esDiaDeAtencion,
  fechaLocal,
  generarSlots,
  horaLocal,
} from '@/lib/agenda';
import type { ServicioDB } from '@/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Nombre del servicio a preseleccionar (ej: al abrir desde una tarjeta). */
  servicioNombre?: string | null;
  /** Timestamp (ms) del momento en que se abrió el modal. Referencia de "ahora". */
  abiertoEn: number;
}

// Slots del día ("09:00", "09:45", ...). Son fijos, se calculan una sola vez.
const SLOTS = generarSlots();
const DIA_MS = 24 * 60 * 60 * 1000;

const INITIAL_FORM = {
  nombreCompleto: '',
  email: '',
  telefono: '',
  fecha: '',
  hora: '',
  notas: '',
};

// Convierte un ISO de la base a "HH:mm" hora Argentina
const isoAHora = (iso: string) => horaLocal(new Date(iso));

// Normaliza para comparar nombres: sin tildes, minúsculas, "&" = "y"
const normalizar = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' y ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();

// Busca el servicio de la base que corresponde a una tarjeta de la landing
function buscarServicioPorNombre(servicios: ServicioDB[], nombre: string): ServicioDB | undefined {
  const objetivo = normalizar(nombre);
  return (
    servicios.find((s) => normalizar(s.nombre) === objetivo) ??
    servicios.find((s) => {
      const n = normalizar(s.nombre);
      return n.includes(objetivo) || objetivo.includes(n);
    })
  );
}

export default function BookingModal({
  isOpen,
  onClose,
  servicioNombre,
  abiertoEn,
}: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  // null = todavía no se cargaron
  const [servicios, setServicios] = useState<ServicioDB[] | null>(null);
  // Elección manual del usuario en el <select> ('' = no eligió)
  const [servicioId, setServicioId] = useState('');
  // Horarios ocupados, asociados a la fecha para la que se pidieron
  const [ocupadosData, setOcupadosData] = useState<{ fecha: string; horas: string[] } | null>(null);

  const hoy = fechaLocal(new Date(abiertoEn));
  const fechaMaxima = fechaLocal(new Date(abiertoEn + DIAS_MAX_ANTICIPACION * DIA_MS));

  // Fines de semana y días bloqueados (feriados/vacaciones) según lib/agenda.ts
  const diaCerrado = useMemo(
    () => Boolean(formData.fecha) && !esDiaDeAtencion(formData.fecha),
    [formData.fecha]
  );

  // Cargar servicios desde Supabase la primera vez que se abre el modal
  useEffect(() => {
    if (!isOpen || servicios !== null) return;
    let cancelado = false;

    obtenerServicios().then((res) => {
      if (cancelado) return;
      if (res.success) {
        setServicios(res.data);
      } else {
        setServicios([]);
        setError('No pudimos cargar los servicios.');
      }
    });

    return () => {
      cancelado = true;
    };
  }, [isOpen, servicios]);

  const loadingServicios = servicios === null;
  const listaServicios = servicios ?? [];

  // Servicio elegido: la elección manual tiene prioridad; si no hay, se preselecciona
  // el que coincide con la tarjeta desde la que se abrió el modal.
  const servicioElegido = servicioId
    ? listaServicios.find((s) => s.id === servicioId)
    : servicioNombre
      ? buscarServicioPorNombre(listaServicios, servicioNombre)
      : undefined;

  // Cargar horarios ocupados cada vez que cambia la fecha
  useEffect(() => {
    if (!formData.fecha || diaCerrado) return;
    const fecha = formData.fecha;
    let cancelado = false;

    obtenerHorariosOcupados(fecha).then((res) => {
      if (cancelado) return;
      setOcupadosData({ fecha, horas: res.success ? res.data.map(isoAHora) : [] });
      if (!res.success) setError('No pudimos cargar los horarios disponibles.');
    });

    return () => {
      cancelado = true;
    };
  }, [formData.fecha, diaCerrado]);

  const datosDeLaFecha = ocupadosData?.fecha === formData.fecha;
  const ocupados = datosDeLaFecha ? ocupadosData.horas : [];
  const loadingSlots = Boolean(formData.fecha) && !diaCerrado && !datosDeLaFecha;

  const update = (field: keyof typeof INITIAL_FORM, value: string) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFechaChange = (value: string) => {
    setError(null);
    // Al cambiar el día se limpia la hora elegida
    setFormData((prev) => ({ ...prev, fecha: value, hora: '' }));
  };

  const handleClose = useCallback(() => {
    setFormData(INITIAL_FORM);
    setError(null);
    setSuccess(false);
    setOcupadosData(null);
    setServicioId('');
    onClose();
  }, [onClose]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const slotDeshabilitado = (hora: string) => {
    if (ocupados.includes(hora)) return true;
    // Si es hoy, no permitir horarios que ya pasaron (el servidor lo vuelve a validar)
    if (formData.fecha === hoy) {
      return new Date(`${formData.fecha}T${hora}:00-03:00`).getTime() < abiertoEn;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!servicioElegido) {
      setError('Elegí el servicio para el que querés el turno.');
      return;
    }
    if (!formData.hora) {
      setError('Elegí un horario disponible.');
      return;
    }

    setLoading(true);

    // Se arma la fecha con la zona horaria explícita para que no dependa del navegador
    const fechaHoraISO = new Date(`${formData.fecha}T${formData.hora}:00-03:00`).toISOString();

    const result = await registrarReserva({
      nombreCompleto: formData.nombreCompleto,
      email: formData.email,
      telefono: formData.telefono,
      servicioId: servicioElegido.id,
      fechaHora: fechaHoraISO,
      notas: formData.notas,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
      // Si el horario fue ganado por otra persona, refrescar la lista
      if (result.error.includes('horario')) {
        setFormData((prev) => ({ ...prev, hora: '' }));
        const fecha = formData.fecha;
        const res = await obtenerHorariosOcupados(fecha);
        if (res.success) setOcupadosData({ fecha, horas: res.data.map(isoAHora) });
      }
    }
  };

  const inputClass =
    'w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-400';

  // ---------- Vista de éxito ----------
  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="success-title"
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md w-full text-white text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400/10 text-lime-400 text-3xl">
            ✓
          </div>
          <h3 id="success-title" className="text-xl font-bold mb-2">¡Reserva confirmada!</h3>
          <p className="text-sm text-neutral-400 mb-1">
            {servicioElegido && <span className="text-white">{servicioElegido.nombre}</span>}
          </p>
          <p className="text-sm text-neutral-400 mb-6">
            {new Date(`${formData.fecha}T12:00:00-03:00`).toLocaleDateString('es-AR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}{' '}
            a las {formData.hora} hs
          </p>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-lg bg-lime-400 text-neutral-950 font-bold text-sm hover:bg-lime-300"
          >
            Listo
          </button>
        </div>
      </div>
    );
  }

  // ---------- Formulario ----------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto text-white"
      >
        <h3 id="modal-title" className="text-xl font-bold">Confirmar Turno</h3>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="servicio" className="block text-xs text-neutral-400 mb-1">Servicio</label>
            <select
              id="servicio"
              required
              disabled={loadingServicios}
              className={inputClass}
              value={servicioElegido?.id ?? ''}
              onChange={(e) => {
                setError(null);
                setServicioId(e.target.value);
              }}
            >
              <option value="" disabled>
                {loadingServicios ? 'Cargando servicios...' : 'Elegí un servicio'}
              </option>
              {listaServicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} · {s.duracion_min} min
                </option>
              ))}
            </select>
            {servicioElegido?.descripcion && (
              <p className="text-xs text-neutral-500 mt-1">{servicioElegido.descripcion}</p>
            )}
          </div>

          <div>
            <label htmlFor="nombre" className="sr-only">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre completo"
              required
              minLength={3}
              className={inputClass}
              value={formData.nombreCompleto}
              onChange={(e) => update('nombreCompleto', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Correo electrónico"
              required
              className={inputClass}
              value={formData.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="telefono" className="sr-only">Teléfono (WhatsApp)</label>
            <input
              id="telefono"
              type="tel"
              placeholder="Teléfono (WhatsApp)"
              required
              className={inputClass}
              value={formData.telefono}
              onChange={(e) => update('telefono', e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="fecha" className="block text-xs text-neutral-400 mb-1">Fecha</label>
            <input
              id="fecha"
              type="date"
              required
              min={hoy}
              max={fechaMaxima}
              className={inputClass}
              value={formData.fecha}
              onChange={(e) => handleFechaChange(e.target.value)}
            />
          </div>

          {/* Selector de horarios */}
          {formData.fecha && (
            <div>
              <label className="block text-xs text-neutral-400 mb-2">Horario</label>

              {diaCerrado ? (
                <p className="text-sm text-neutral-400">
                  Ese día no atendemos (fines de semana y feriados). Elegí otro día.
                </p>
              ) : loadingSlots ? (
                <p className="text-sm text-neutral-400">Cargando horarios...</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {SLOTS.map((hora) => {
                    const deshabilitado = slotDeshabilitado(hora);
                    const activo = formData.hora === hora;
                    return (
                      <button
                        key={hora}
                        type="button"
                        disabled={deshabilitado}
                        onClick={() => update('hora', hora)}
                        className={`rounded-lg py-2 text-sm border transition ${
                          activo
                            ? 'bg-lime-400 text-neutral-950 border-lime-400 font-bold'
                            : deshabilitado
                            ? 'bg-neutral-900 text-neutral-600 border-neutral-800 line-through cursor-not-allowed'
                            : 'bg-neutral-800 text-white border-neutral-700 hover:border-lime-400'
                        }`}
                      >
                        {hora}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div>
            <label htmlFor="notas" className="sr-only">Notas (opcional)</label>
            <textarea
              id="notas"
              placeholder="Notas (opcional): motivo de consulta, lesión, etc."
              rows={2}
              className={inputClass}
              value={formData.notas}
              onChange={(e) => update('notas', e.target.value)}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 cursor-pointer rounded-lg bg-neutral-800 text-neutral-300 text-sm hover:bg-neutral-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !servicioElegido || !formData.hora || diaCerrado}
              className="px-5 py-2 cursor-pointer rounded-lg bg-lime-400 text-neutral-950 font-bold text-sm hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}