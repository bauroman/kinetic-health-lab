'use client';

import { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { useBooking } from '@/components/booking/BookingProvider';

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#metodologia', label: 'Metodología' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#ubicacion', label: 'Ubicación' },
];

export default function Navbar() {
  const { openBooking } = useBooking();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-neutral-950/30 backdrop-blur-lg shadow-sm transition-all">
      <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* LOGO */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-sm sm:text-base font-bold tracking-tight text-graphite-900 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded-lg p-1"
          onClick={closeMobileMenu}
        >
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-sand-200 text-lime-600 shadow-sm">
            <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <span className="truncate text-sand-200">
            KINETIC <span className="font-light text-lime-300 xs:inline">/ Health Lab</span>
          </span>
        </a>

        {/* NAVEGACIÓN (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-sand-200">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded-md px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ACCIONES (Desktop & Mobile) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openBooking()}
            className="rounded-full bg-sand-200 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-graphite-800 shadow-sm transition hover:bg-sand-300 active:scale-95 shrink-0 cursor-pointer"
          >
            Reservar Turno
          </button>

          {/* BOTÓN HAMBURGUESA (Solo Mobile) */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-controls="mobile-menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-sand-300 bg-white/80 text-graphite-900 transition hover:bg-sand-100 active:scale-95 focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MOBILE */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-b border-sand-200 bg-sand-50/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-graphite-900 hover:bg-sand-200/60 active:bg-sand-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}