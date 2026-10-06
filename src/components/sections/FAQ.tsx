'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; 
import FadeIn from '@/components/ui/FadeIn';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    category: 'Turnos',
    question: '¿Cómo puedo reservar un turno?',
    answer: 'Podés agendar directamente haciendo clic en el botón "Reservar Turno" en esta web, seleccionando la especialidad, el profesional y la fecha/hora que te queden más cómodas. También podés comunicarte por WhatsApp si preferís atención directa.',
  },
  {
    id: '2',
    category: 'Coberturas',
    question: '¿Trabajan con obras sociales o prepagas?',
    answer: 'Atendemos de forma particular y por sistema de reintegro. Al finalizar cada sesión te emitimos la factura oficial con los códigos prestacionales requeridos para que la presentes en tu prepaga u obra social.',
  },
  {
    id: '3',
    category: 'Atención',
    question: '¿Qué tengo que llevar a la primera consulta?',
    answer: 'Te recomendamos traer ropa cómoda (deportiva), tu DNI y, en caso de tenerlas, las órdenes médicas o estudios complementarios recientes (radiografías, resonancias o ecografías).',
  },
  {
    id: '4',
    category: 'Atención',
    question: '¿Cuánto dura cada sesión y cómo es el tratamiento?',
    answer: 'Las sesiones tienen una duración aproximada de 50 a 60 minutos. Todas nuestras atenciones son 1 a 1 y personalizadas: no trabajamos con pacientes en simultáneo para garantizar la máxima calidad de atención.',
  },
  {
    id: '5',
    category: 'Turnos',
    question: '¿Qué pasa si necesito cancelar o reprogramar un turno?',
    answer: 'Podés avisarnos con al menos 24 horas de anticipación a través de WhatsApp o el enlace de gestión de tu turno para que podamos reasignar ese espacio a otro paciente sin costo adicional.',
  },
  {
    id: '6',
    category: 'Coberturas',
    question: '¿Aceptan tarjetas de débito/crédito y transferencias?',
    answer: 'Sí, aceptamos transferencias bancarias, efectivo, tarjetas de débito y crédito. Podés abonar al finalizar cada sesión o mediante packs con descuento acumulado.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative bg-neutral-950 py-24 text-white overflow-hidden border-t border-neutral-900">
      
      {/* Luces de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-lime-500/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn direction='up'>
        {/* Header de Sección */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-lime-400">
            <HelpCircle className="h-3.5 w-3.5" />
            Dudas Frecuentes
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            ¿Tenés alguna <span className="text-lime-400">pregunta</span>?
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed">
            Respondemos a las inquietudes más habituales sobre nuestras sesiones, formas de pago y modalidad de atención.
          </p>
        </div>
        </FadeIn>

      

        {/* Acordeón de Preguntas */}
<FadeIn direction='up'>
<div className="space-y-4">
  {FAQ_DATA.map((faq) => {
    const isOpen = openId === faq.id;
    return (
      <div
        key={faq.id}
        className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
          isOpen
            ? 'border-lime-500/40 bg-neutral-900/90 shadow-xl'
            : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/70'
        }`}
      >
        <button
          type="button"
          onClick={() => toggleItem(faq.id)}
          className="w-full text-left flex items-center justify-between p-6 gap-4 focus:outline-none cursor-pointer select-none"
          aria-expanded={isOpen}
        >
          <span className="text-base sm:text-lg font-semibold text-neutral-100 pr-2">
            {faq.question}
          </span>
          <div
            className={`shrink-0 rounded-full border p-2 transition-transform ease-out duration-300 ${
              isOpen
                ? 'border-lime-400/40 bg-lime-500/10 text-lime-400 rotate-180'
                : 'border-neutral-700 bg-neutral-800/80 text-neutral-400'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>

        {/* Respuesta con animación de altura y opacidad */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.25, delay: 0.1 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.15 },
                },
              }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-4">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  })}
</div>
</FadeIn>

        {/* Banner CTA WhatsApp / Consulta directa */}
        <div className="mt-14 rounded-3xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="text-left">
            <h3 className="text-lg font-bold text-white">¿Tenés otra duda específica?</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Escribinos directamente y te asesoramos según tu motivo de consulta.
            </p>
          </div>
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 transition-all hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}