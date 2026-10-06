'use client';

import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { useBooking } from '@/components/booking/BookingProvider';
import { SERVICES_DATA } from '@/data/services';

export default function Services() {
  const { openBooking } = useBooking();

  return (
    <section id="servicios" className="relative bg-graphite-950 py-20 text-white border-t border-graphite-900">
      
      {/* Resplandor de fondo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn direction="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-lime-400">
            Nuestras Especialidades
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Tratamientos diseñados para tu <span className="text-lime-400">recuperación real</span>.
          </h2>
          <p className="mt-4 text-base text-sand-300 leading-relaxed">
            Combinamos terapia manual, tecnología biomecánica y reentrenamiento progresivo para devolverte a tu máximo nivel sin dolor.
          </p>
          </FadeIn>
        </div>
      

        {/* Bento Grid de Servicios */}
        <FadeIn direction='up' delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-3xl border border-graphite-800 bg-graphite-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-lime-400/50 hover:bg-graphite-900 hover:shadow-2xl hover:shadow-lime-400/5 ${
                  service.featured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-graphite-900 via-graphite-900/80 to-graphite-950' : ''
                }`}
              >
                <div>
                  {/* Icono + Badge Duración */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400 border border-lime-500/20 group-hover:bg-lime-400 group-hover:text-graphite-950 transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-graphite-700 bg-graphite-800/80 px-3 py-1 text-xs font-medium text-sand-300">
                      {service.duration} / sesión
                    </span>
                  </div>

                  {/* Título & Descripción */}
                  <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-sand-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights / Viñetas */}
                  <ul className="mt-6 space-y-2.5 border-t border-graphite-800/80 pt-5">
                    {service.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-sand-200">
                        <CheckCircle2 className="h-4 w-4 text-lime-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de Acción en la Tarjeta: abre el modal con este servicio preseleccionado */}
                <div className="mt-8 pt-4 border-t cursor-pointer border-graphite-800/40 flex items-center justify-between">
                  <button
                    onClick={() => openBooking(service.title)}
                    className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-lime-400 group-hover:text-lime-300 transition-colors"
                  >
                    Agendar consulta
                    <ArrowUpRight className="h-4 w-4 cursor-pointer transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
        </FadeIn>

       

      </div>
    </section>
  );
}