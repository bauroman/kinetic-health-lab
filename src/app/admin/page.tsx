'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LogOut, RefreshCw, Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks, isSameMonth, isSameWeek } from 'date-fns';
import { es } from 'date-fns/locale';

interface TurnoDetalle {
  id: string;
  fecha_hora: string;
  estado: string;
  notas: string | null;
  pacientes: {
    nombre_completo: string;
    email: string;
    telefono: string;
  };
  servicios: {
    nombre: string;
    duracion_min: number;
  };
}

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [turnos, setTurnos] = useState<TurnoDetalle[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Estados del filtro calendario
  const [viewMode, setViewMode] = useState<'mes' | 'semana'>('mes');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Revisar la sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cargar turnos cuando la sesión, el modo de vista o la fecha cambian
  useEffect(() => {
    if (session) {
      cargarTurnos();
    }
  }, [session, viewMode, currentDate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError('Credenciales incorrectas o usuario no registrado.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setTurnos([]);
  };

  const cargarTurnos = async () => {
    setLoading(true);

    // Calcular rango de fechas
    let from, to;
    if (viewMode === 'mes') {
      from = startOfMonth(currentDate).toISOString();
      to = endOfMonth(currentDate).toISOString();
    } else {
      // Semana de lunes a domingo
      from = startOfWeek(currentDate, { weekStartsOn: 1 }).toISOString();
      to = endOfWeek(currentDate, { weekStartsOn: 1 }).toISOString();
    }

    // Hacemos el JOIN con pacientes y servicios
    const { data, error } = await supabase
      .from('turnos')
      .select(`
        id,
        fecha_hora,
        estado,
        notas,
        pacientes ( nombre_completo, email, telefono ),
        servicios ( nombre, duracion_min )
      `)
      .gte('fecha_hora', from)
      .lte('fecha_hora', to)
      .order('fecha_hora', { ascending: true });

    if (!error && data) {
      // Formateamos la respuesta (a veces supabase devuelve un array dependiendo de la foreign key)
      setTurnos(data as any);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading && !session) {
    return (
      <div className="min-h-screen bg-graphite-950 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-lime-400 animate-spin" />
      </div>
    );
  }

  // PANTALLA DE LOGIN
  if (!session) {
    return (
      <div className="min-h-screen bg-graphite-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />

        <div className="bg-neutral-900/80 border border-neutral-800 p-8 rounded-3xl w-full max-w-md relative z-10 backdrop-blur-md shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white tracking-tight">KINETIC <span className="text-lime-400">Admin</span></h1>
            <p className="text-neutral-400 text-sm mt-1">Ingresá para gestionar los turnos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
                placeholder="admin@kinetic.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {authError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3 text-center">
                {authError}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lime-400 text-graphite-950 font-bold py-3.5 rounded-xl hover:bg-lime-500 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-2 shadow-lg shadow-lime-400/10"
            >
              {loading ? 'Validando...' : 'Ingresar al Panel'}
            </button>
          </form>
          <div className="mt-8 text-center border-t border-neutral-800 pt-6">
            <Link href="/" className="text-sm font-medium text-neutral-500 hover:text-lime-400 transition-colors">
              &larr; Volver a la web principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // PANEL DE ADMINISTRACIÓN
  
  const handlePrev = () => setCurrentDate(d => viewMode === 'mes' ? subMonths(d, 1) : subWeeks(d, 1));
  const handleNext = () => setCurrentDate(d => viewMode === 'mes' ? addMonths(d, 1) : addWeeks(d, 1));
  const handleToday = () => setCurrentDate(new Date());

  const getLabelFecha = () => {
    if (viewMode === 'mes') {
      return format(currentDate, "MMMM yyyy", { locale: es }).replace(/^\w/, c => c.toUpperCase());
    } else {
      const inicio = startOfWeek(currentDate, { weekStartsOn: 1 });
      const fin = endOfWeek(currentDate, { weekStartsOn: 1 });
      if (inicio.getMonth() === fin.getMonth()) {
        return `${format(inicio, "d")} al ${format(fin, "d 'de' MMMM, yyyy", { locale: es })}`;
      }
      return `${format(inicio, "d 'de' MMM", { locale: es })} al ${format(fin, "d 'de' MMM, yyyy", { locale: es })}`;
    }
  };

  return (
    <div className="min-h-screen bg-graphite-950 text-white p-4 sm:p-6 md:p-10 lg:p-12 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Portal Privado</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Panel de Turnos</h1>
            <p className="text-neutral-400 mt-2 text-sm">Visualizá y gestioná las reservas registradas en tiempo real.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleLogout} 
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors text-sm font-semibold"
            >
              <LogOut className="h-4 w-4" /> 
              Salir
            </button>
          </div>
        </div>

        {/* Controles de Filtro tipo Calendario */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-neutral-950 rounded-xl p-1 border border-neutral-800">
            <button 
              onClick={() => setViewMode('semana')} 
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${viewMode === 'semana' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Semana
            </button>
            <button 
              onClick={() => setViewMode('mes')} 
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${viewMode === 'mes' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Mes
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors" aria-label="Anterior">
              <ChevronLeft className="h-5 w-5 text-neutral-300" />
            </button>
            <div className="w-48 text-center font-bold text-lg text-white">
              {getLabelFecha()}
            </div>
            <button onClick={handleNext} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors" aria-label="Siguiente">
              <ChevronRight className="h-5 w-5 text-neutral-300" />
            </button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleToday} 
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors text-sm font-semibold text-neutral-300"
            >
              Hoy
            </button>
            <button 
              onClick={cargarTurnos} 
              className="flex items-center gap-2 px-4 py-2 bg-lime-400/10 text-lime-400 border border-lime-400/20 rounded-lg hover:bg-lime-400/20 transition-colors text-sm font-semibold"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Tabla de Turnos */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-neutral-950/80 border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-widest">
                  <th className="p-5 font-bold">Fecha y Hora</th>
                  <th className="p-5 font-bold">Paciente</th>
                  <th className="p-5 font-bold">Contacto</th>
                  <th className="p-5 font-bold">Servicio</th>
                  <th className="p-5 font-bold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-sm">
                {turnos.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Calendar className="h-10 w-10 text-neutral-700" />
                        <p className="text-neutral-500 font-medium">No hay turnos registrados en la base de datos.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  turnos.map((t) => {
                    // Normalización en caso de que Supabase lo envíe como array o como objeto simple
                    const paciente = Array.isArray(t.pacientes) ? t.pacientes[0] : t.pacientes;
                    const servicio = Array.isArray(t.servicios) ? t.servicios[0] : t.servicios;
                    const fecha = new Date(t.fecha_hora);

                    return (
                      <tr key={t.id} className="hover:bg-neutral-800/40 transition-colors group">
                        <td className="p-5 whitespace-nowrap">
                          <div className="flex items-center gap-2.5 font-bold text-white">
                            <Calendar className="h-4 w-4 text-lime-400" />
                            {format(fecha, "dd 'de' MMMM, yyyy", { locale: es })}
                          </div>
                          <div className="flex items-center gap-2.5 text-neutral-400 mt-1.5 text-xs font-medium">
                            <Clock className="h-3.5 w-3.5" />
                            {format(fecha, "HH:mm")} hs
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-2.5 font-semibold text-neutral-100">
                            <User className="h-4 w-4 text-neutral-500" />
                            {paciente?.nombre_completo || 'N/A'}
                          </div>
                          {t.notas && (
                            <div className="mt-2 text-xs text-neutral-500 bg-neutral-950/50 p-2 rounded-lg border border-neutral-800 max-w-[250px] truncate" title={t.notas}>
                              <span className="font-bold text-neutral-400">Nota:</span> {t.notas}
                            </div>
                          )}
                        </td>
                        <td className="p-5 whitespace-nowrap">
                          <div className="font-medium text-neutral-300">{paciente?.telefono}</div>
                          <div className="text-neutral-500 text-xs mt-1">{paciente?.email}</div>
                        </td>
                        <td className="p-5">
                          <span className="inline-flex items-center px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-bold text-neutral-300 shadow-sm">
                            {servicio?.nombre || 'N/A'}
                          </span>
                        </td>
                        <td className="p-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${t.estado === 'confirmado'
                            ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20'
                            : 'bg-red-400/10 text-red-400 border border-red-400/20'
                            }`}>
                            {t.estado}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
