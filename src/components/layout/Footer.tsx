'use client';

import { Activity, Phone, MapPin, ArrowUp, MessageCircle } from 'lucide-react';
import { SiInstagram, SiWhatsapp } from 'react-icons/si';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-neutral-950 text-white border-t border-neutral-900 overflow-hidden">

      {/* Sutil luz de fondo al pie */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-3/4 rounded-full bg-lime-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12">

        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">

          {/* Columna 1 & 2: Branding & CTA */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-neutral-950 font-black">
                <Activity className="h-6 w-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                KINETIC<span className="text-lime-400">.</span>
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Centro especializado en kinesiología deportiva, reeducación postural y recuperación funcional. Un enfoque integral adaptado a tus objetivos de movimiento.
            </p>
          </div>

          {/* Columna 3: Navegación */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Secciones</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a href="#servicios" className="hover:text-lime-400 transition-colors">Servicios</a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-lime-400 transition-colors">Nuestro Equipo</a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-lime-400 transition-colors">Testimonios</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-lime-400 transition-colors">Preguntas Frecuentes</a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-lime-400 transition-colors">Ubicación</a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Contacto</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-lime-400 shrink-0 mt-0.5" />
                <span>Avenida 44 1420, La Plata</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-lime-400 shrink-0" />
                <span>+54 (221) 557-4095</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-lime-400 shrink-0" />
                <span>Lun a Vie: 08:00 - 20:00 hs</span>
              </li>
            </ul>
          </div>

          {/* Columna 5: Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Redes Sociales</h3>
            <p className="text-xs text-neutral-400">
              Sumate a nuestra comunidad para ver consejos de salud y ejercicios preventivos.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-2.5 text-neutral-300 transition-all hover:border-lime-400/50 hover:bg-neutral-800 hover:text-lime-400"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-2.5 text-neutral-300 transition-all hover:border-lime-400/50 hover:bg-neutral-800 hover:text-lime-400"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Botón de Volver Arriba */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Kinetic. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            <a href="/politica-de-privacidad" className="hover:text-neutral-400 transition-colors">Políticas de Privacidad</a>
            <a href="/terminos-y-condiciones" className="hover:text-neutral-400 transition-colors">Términos y Condiciones</a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center cursor-pointer gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-neutral-300 transition hover:border-neutral-700 hover:text-white"
              aria-label="Volver arriba"
            >
              <ArrowUp className="h-3.5 w-3.5 text-lime-400" />
              <span className="text-[11px] font-semibold">Subir</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}