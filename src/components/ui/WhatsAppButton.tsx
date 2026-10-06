'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

interface WhatsAppButtonProps {
  phoneNumber?: string; // Ejemplo: '5492215574095' (sin + ni espacios)
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = '5492215574095', 
  message = '¡Hola! Quisiera realizar una consulta.',
}: WhatsAppButtonProps) {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  // Ocultar el botón en el panel de administrador
  if (pathname?.startsWith('/admin')) return null;

  // Formatear la URL oficial de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      
      {/* Tooltip de Bienvenida / Prompt */}
      {showTooltip && (
        <div className="relative flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/95 p-3.5 pr-8 text-xs text-neutral-200 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          {/* Indicador de estado "En línea" */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-500" />
          </span>

          <p className="leading-snug">
            ¿Tenés alguna duda? <strong className="text-white block font-semibold">Escribinos por WhatsApp</strong>
          </p>

          {/* Botón para cerrar solo el tooltip */}
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute right-2 top-2 rounded-full p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            aria-label="Cerrar notificación"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Botón Flotante Principal */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-neutral-950 shadow-lg shadow-lime-400/20 transition-all duration-300 hover:scale-110 hover:bg-lime-300 hover:shadow-lime-400/40 active:scale-95"
      >
        {/* Efecto de Onda/Pulso detrás del botón */}
        <span className="absolute -inset-1 -z-10 rounded-full bg-lime-400/30 animate-pulse group-hover:bg-lime-400/50" />

        {/* Icono de Chat */}
        <SiWhatsapp className="h-7 w-7 transition-transform group-hover:rotate-12" />
      </a>

    </div>
  );
}