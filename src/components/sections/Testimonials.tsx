'use client';

import { useState } from 'react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Martín Benítez',
    role: 'Maratonista Amateur',
    category: 'Deportiva',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    comment: 'Llegué con una fascitis plantar que me dejó fuera de entrenamiento durante 3 meses. Con el protocolo de evaluación biomecánica y el seguimiento 1 a 1 en 6 semanas volví a correr sin dolor.',
    highlight: 'Recuperación de fascitis plantar',
  },
  {
    id: '2',
    name: 'Carolina Rossi',
    role: 'Arquitecta & Diseñadora',
    category: 'Postural',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    comment: 'Pasaba más de 9 horas sentada frente a la computadora y sufría de cervicalgia crónica. La reeducación postural me cambió la calidad de vida cotidiana. Super profesionales.',
    highlight: 'Alivio de dolor cervical crónico',
  },
  {
    id: '3',
    name: 'Lucas Peralta',
    role: 'Jugador de Rugby',
    category: 'Recuperación',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    comment: 'Utilizo las sesiones de presoterapia y descarga muscular post-partido. La diferencia en la velocidad de recuperación de las piernas para la semana siguiente es tremenda.',
    highlight: 'Protocolo de descarga muscular',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="relative bg-neutral-950 py-24 text-white overflow-hidden border-t border-neutral-900">
      
      {/* Luces de fondo */}
      <div className="absolute top-1/3 right-10 h-96 w-96 rounded-full bg-lime-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-lime-400/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header de Sección */}
        <FadeIn direction='up'>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-lime-400">
              <Sparkles className="h-3.5 w-3.5" />
              Historias de Éxito
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Lo que dicen nuestros <span className="text-lime-400">pacientes</span>.
            </h2>
            <p className="mt-4 text-base text-neutral-300 leading-relaxed">
              Resultados reales de personas que confiaron en nuestro método para volver a moverse sin limitaciones.
            </p>
          </div>
        </div>
        </FadeIn>

        {/* Grid de Testimonios */}
        <FadeIn direction='up'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/80 hover:-translate-y-1"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-neutral-800/40 pointer-events-none" />

              <div>
                {/* Header Card: Tag + Rating */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400 bg-lime-500/10 border border-lime-500/20 px-2.5 py-1 rounded-lg">
                    {item.highlight}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-lime-400 text-lime-400" />
                    ))}
                  </div>
                </div>

                {/* Comentario */}
                <p className="text-sm text-neutral-300 leading-relaxed italic mb-6">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Footer Card: Paciente Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/80">
                <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden border border-lime-400/60 p-0.5 bg-neutral-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white truncate">
                      {item.name}
                    </h3>
                    <CheckCircle2 className="h-3.5 w-3.5 text-lime-400 shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-400 truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </FadeIn>

        {/* Métricas breves al pie */}
        <FadeIn direction='up'>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
            <span className="text-2xl font-extrabold text-lime-400">98%</span>
            <p className="text-xs text-neutral-400 mt-1">Retorno a la actividad</p>
          </div>
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
            <span className="text-2xl font-extrabold text-white">4.9 / 5</span>
            <p className="text-xs text-neutral-400 mt-1">Valoración Promedio</p>
          </div>
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
            <span className="text-2xl font-extrabold text-lime-400">+500</span>
            <p className="text-xs text-neutral-400 mt-1">Pacientes Atendidos</p>
          </div>
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4">
            <span className="text-2xl font-extrabold text-white">100%</span>
            <p className="text-xs text-neutral-400 mt-1">Sesiones 1 a 1</p>
          </div>
        </div>
        </FadeIn>

      </div>
    </section>
  );
}