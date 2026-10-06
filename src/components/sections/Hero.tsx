'use client';

import { Calendar, ClipboardList, Clock, Award, Star } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { useBooking } from '@/components/booking/BookingProvider';

// TODO: reemplazar por una foto propia con movimiento real (ejercicio / sesión activa)
const HERO_IMAGE =
  'https://plus.unsplash.com/premium_photo-1682435301946-df298cdb1bef?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// Datos de ejemplo (proyecto de portfolio): no representan reseñas reales.
const AVATARS = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', alt: 'Paciente 1' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', alt: 'Paciente 2' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', alt: 'Paciente 3' },
];

// El subtítulo ya menciona la evaluación biomecánica, por eso el badge habla del plan.
const BADGES = [
  { icon: ClipboardList, title: 'Método', text: 'Plan personalizado' },
  { icon: Clock, title: 'Atención', text: 'Sesiones 1 a 1' },
  { icon: Award, title: 'Enfoque', text: 'Basado en ciencia' },
];

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-graphite-950 text-white flex items-center pt-28 pb-16 lg:pb-24">
      {/* 1. FOTO DE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Atleta entrenando en un gimnasio"
          // Porcentaje vertical bajo = se ve más la parte de arriba de la foto (evita cortar la cabeza bajo el navbar)
          className="h-full w-full object-cover object-center lg:object-[right_50%]"
        />

        {/* 2. OVERLAY: solo oscurece donde está el texto */}
        <div className="absolute inset-0 bg-linear-to-r from-graphite-950/95 via-graphite-950/55 via-45% to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-graphite-950/70 via-transparent to-graphite-950/20" />
      </div>

      {/* PATRÓN DE FONDO SUTIL */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] bg-size-[24px_24px] opacity-10 pointer-events-none" />

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="max-w-2xl">
          {/* TÍTULO + DESCRIPCIÓN */}
          <FadeIn direction="up">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Recuperá tu movimiento, potenciá tu
              <span className="text-lime-400"> rendimiento.</span>
            </h1>

            {/* Sin repetir "mover/movimiento" del titular */}
            <p className="mt-5 text-lg text-sand-200 leading-relaxed max-w-xl">
              Volvé a entrenar, trabajar y jugar sin dolor con un plan armado a partir de tu
              evaluación biomecánica.
            </p>
          </FadeIn>

          {/* BOTONES DE ACCIÓN */}
          <FadeIn delay={0.1} direction="up">
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => openBooking()}
                className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-full bg-lime-400 px-6 py-3.5 text-base font-semibold text-graphite-950 shadow-xl shadow-lime-400/10 transition hover:bg-lime-500 active:scale-95"
              >
                <Calendar className="h-5 w-5" />
                {/* Mismo verbo que el botón del navbar: usá "Reservar turno" en ambos */}
                Reservar Turno Online
              </button>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-full border border-sand-200/20 bg-graphite-900/60 backdrop-blur-md px-6 py-3.5 text-base font-semibold text-sand-100 transition hover:bg-graphite-800 hover:text-white"
              >
                Ver Tratamientos
              </a>
            </div>
          </FadeIn>

          {/* PRUEBA SOCIAL: un escalón más grande para que se lea sobre la foto */}
          <FadeIn delay={0.2} direction="up">
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <div className="flex -space-x-3 overflow-hidden">
                {AVATARS.map((a) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={a.alt}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-graphite-900 object-cover"
                    src={a.src}
                    alt={a.alt}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-lime-400 text-lime-400" />
                  ))}
                  <span className="ml-1.5 text-sm font-bold text-white">4.9/5</span>
                </div>
                <span className="text-sm text-sand-300 font-medium">
                  +500 pacientes recuperados
                </span>
              </div>
            </div>
          </FadeIn>

          {/* BADGES INFERIORES */}
          <FadeIn delay={0.3} direction="up">
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 max-w-lg">
              {BADGES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-lime-400">
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">{title}</span>
                  </div>
                  <span className="text-xs text-sand-300">{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}