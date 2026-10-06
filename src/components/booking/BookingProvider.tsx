'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import BookingModal from './BookingModal';

interface BookingContextValue {
  /**
   * Abre el modal de reservas.
   * @param servicioNombre nombre del servicio a preseleccionar (opcional)
   */
  openBooking: (servicioNombre?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Maneja el estado del modal de reservas para toda la página.
 * Permite que `page.tsx` sea un Server Component: solo los botones que abren
 * el modal necesitan ser client components (usan `useBooking()`).
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicioNombre, setServicioNombre] = useState<string | null>(null);
  // Momento de apertura: el modal lo usa como "ahora" (fecha mínima, slots pasados)
  const [abiertoEn, setAbiertoEn] = useState(0);

  const openBooking = useCallback((nombre?: string) => {
    setServicioNombre(nombre ?? null);
    setAbiertoEn(Date.now());
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        servicioNombre={servicioNombre}
        abiertoEn={abiertoEn}
      />
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking() debe usarse dentro de <BookingProvider>.');
  }
  return ctx;
}
