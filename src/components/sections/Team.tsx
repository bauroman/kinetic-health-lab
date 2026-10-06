'use client';
import FadeIn from '@/components/ui/FadeIn';
import { useState } from 'react';
import { Award, GraduationCap, Sparkles, ChevronLeft, ChevronRight, UserCheck } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 'lic-gomez',
    name: 'Lic. Gonzalo Gómez',
    role: 'Director Kinesiología & Biomecánica',
    license: 'M.P. 4821',
    category: 'Deportiva',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    specialties: ['Evaluación Biomecánica', 'Rehabilitación ACL', 'Return to Play'],
    bio: 'Especialista en biomecánica aplicada al deporte de alto rendimiento con más de 8 años de experiencia acompañando a deportistas profesionales y amateurs.',
    experience: '8+ años exp.',
  },
  {
    id: 'lic-martinez',
    name: 'Lic. Sofía Martínez',
    role: 'Kinesióloga Fisiatra & Columna',
    license: 'M.P. 5104',
    category: 'Postural',
    image: 'https://plus.unsplash.com/premium_photo-1661400612726-6ff3a7de426e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialties: ['Reeducación Postural', 'Terapia Manual', 'Columna & Cervicales'],
    bio: 'Enfocada en el tratamiento del dolor crónico, disfunciones posturales y rehabilitación de columna mediante terapia manual basada en evidencia.',
    experience: '6+ años exp.',
  },
  {
    id: 'lic-rossi',
    name: 'Lic. Franco Rossi',
    role: 'Especialista en Recuperación Muscular',
    license: 'M.P. 5390',
    category: 'Recuperación',
    image: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specialties: ['Presoterapia & Descarga', 'Crioterapia', 'Control de Fatiga'],
    bio: 'Dedicado al diseño de protocolos de regeneración muscular y preparación kinesiológica pre y post competencia para atletas.',
    experience: '5+ años exp.',
  },
];

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEAM_MEMBERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TEAM_MEMBERS.length - 1 ? 0 : prev + 1));
  };

  const activeMember = TEAM_MEMBERS[currentIndex] || TEAM_MEMBERS[0];

  return (
    <section id="equipo" className="relative bg-neutral-950 py-24 text-white overflow-hidden border-t border-neutral-900">
      
      {/* Luces y resplandores de fondo */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-lime-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-lime-400/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn direction="up">
        {/* Encabezado Principal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-lime-400">
              <Sparkles className="h-3.5 w-3.5" />
              Staff Profesional
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Conocé al <span className="text-lime-400">equipo</span> detrás del laboratorio.
            </h2>
            <p className="mt-4 text-base text-neutral-300 leading-relaxed">
              Profesionales matriculados en formación continua, enfocados en biomecánica, tratamiento del dolor y rehabilitación efectiva.
            </p>
          </div>
        </div>
        </FadeIn>

        {/* Carrusel Dinámico de Profesionales */}
        <FadeIn>
        {TEAM_MEMBERS.length > 0 && activeMember && (
          <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Imagen con Badge de Matrícula */}
              <div className="lg:col-span-5 relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-neutral-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeMember.image}
                  alt={activeMember.name}
                  className="h-full w-full object-cover object-center transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 backdrop-blur-md bg-neutral-950/70 border border-white/10 rounded-full px-3 py-1 text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-lime-400" />
                  {activeMember.license}
                </div>

                <div className="absolute bottom-4 left-4 backdrop-blur-md bg-neutral-950/80 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-300 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-lime-400" />
                  {activeMember.experience}
                </div>
              </div>

              {/* Información Detallada del Profesional */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-lime-400">
                      {activeMember.role}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs text-neutral-400 font-medium">
                      Especialidad {activeMember.category}
                    </span>
                  </div>

                  <h3 className="mt-2 text-3xl font-extrabold text-white">
                    {activeMember.name}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {activeMember.bio}
                  </p>

                  <div className="mt-6 border-t border-neutral-800 pt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Áreas de Enfoque y Protocolos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeMember.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="rounded-xl bg-neutral-800/80 border border-neutral-700/60 px-3.5 py-1.5 text-xs font-medium text-neutral-200"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Controles de Navegación del Carrusel */}
                <div className="flex items-center justify-between border-t border-neutral-800/80 pt-6">
                  {/* Indicador de posición (Puntos) */}
                  <div className="flex items-center gap-2">
                    {TEAM_MEMBERS.map((_, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Ir a la diapositiva ${idx + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? 'w-8 bg-lime-400' : 'w-2.5 bg-neutral-700 hover:bg-neutral-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Botones Anterior / Siguiente */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="rounded-full border border-neutral-700 bg-neutral-800/80 p-3 text-neutral-300 transition hover:bg-neutral-700 hover:text-white active:scale-95"
                      aria-label="Profesional anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-full border border-neutral-700 bg-neutral-800/80 p-3 text-neutral-300 transition hover:bg-neutral-700 hover:text-white active:scale-95"
                      aria-label="Siguiente profesional"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
        </FadeIn>

        {/* Banner Informativo Inferior */}
        <FadeIn direction='up'>
        <div className="mt-12 rounded-3xl border border-neutral-800 bg-gradient-to-r from-neutral-900/90 via-neutral-900/50 to-neutral-900/90 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-400 border border-lime-500/20">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Atención 1 a 1 dedicada</h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Cada tratamiento es planificado de forma personalizada y ejecutado de principio a fin por tu kinesiólogo asignado.
              </p>
            </div>
          </div>
        </div>
        </FadeIn>

      </div>
    </section>
  );
}