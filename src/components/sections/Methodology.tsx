'use client';

import { Stethoscope, Target, Dumbbell, Award } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const STEPS = [
  {
    number: '01',
    icon: Stethoscope,
    title: 'Evaluación Biomecánica & Diagnóstico',
    description:
      'Analizamos tu caso de manera integral. Evaluamos movilidad, fuerza, patrones de movimiento y antecedentes de lesión para identificar la causa raíz de tu problema.',
  },
  {
    number: '02',
    icon: Target,
    title: 'Plan de Tratamiento Personalizado',
    description: 'Diseñamos un protocolo específico con objetivos claros a corto, mediano y largo plazo, combinando terapia manual, tecnología y ejercicio terapéutico.',
  },
  {
    number: '03',
    icon: Dumbbell,
    title: 'Rehabilitación Activa & Reentrenamiento',
    description:
      'Pasamos de la camilla al gimnasio de kinesio. Fortalecemos las zonas débiles y reentrenamos el gesto deportivo o cotidiano para prevenir recaídas.',
  },
  {
    number: '04',
    icon: Award,
    title: 'Alta Médica & Potenciación',
    description: 'Te devolvemos a tu actividad o deporte al 100% de tus capacidades, con pautas claras de autocuidado y prevención para mantener los resultados.',
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="relative bg-sand-100 py-20 text-graphite-950 border-t border-sand-200">
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Encabezado */}
        <FadeIn direction='up'>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-700/20 bg-lime-400/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-lime-900">
            Nuestro Método
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-graphite-950">
            Del dolor a tu máximo rendimiento en <span className="text-lime-700">4 pasos</span>.
          </h2>
          <p className="mt-4 text-base text-graphite-600 leading-relaxed">
            Un proceso estructurado, basado en evidencia científica y enfocado en una recuperación duradera sin improvisaciones.
          </p>
        </div>
        </FadeIn>

        {/* Grid de Pasos */}
        <FadeIn direction='up' delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between rounded-3xl border border-sand-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-500/50 hover:shadow-xl hover:shadow-graphite-950/5"
              >
                <div>
                  {/* Número y Header del Paso */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-lime-600/80 group-hover:text-lime-600 transition-colors">
                      {step.number}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sand-100 text-graphite-800 transition-colors group-hover:bg-lime-400 group-hover:text-graphite-950">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Título y Contenido */}
                  <h3 className="text-lg font-bold text-graphite-900 group-hover:text-graphite-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-graphite-600">
                    {step.description}
                  </p>
                </div>

                {/* Línea decorativa inferior */}
                <div className="mt-6 pt-4 border-t border-sand-100 flex items-center justify-between text-xs text-graphite-500">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Paso {index + 1} de 4</span>
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