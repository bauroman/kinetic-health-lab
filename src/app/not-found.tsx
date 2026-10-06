import Link from 'next/link';
import { Activity, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookingProvider } from '@/components/booking/BookingProvider';

export default function NotFound() {
  return (
    <BookingProvider>
      <main className="min-h-screen bg-graphite-950 text-white flex flex-col">
        <Navbar />

        <div className="flex-grow flex items-center justify-center relative overflow-hidden pt-20">
          {/* Luces de fondo estilo neumorfismo oscuro / resplandor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-lime-500/10 blur-[150px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-lime-400/5 blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
            {/* Ícono animado sutilmente */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl backdrop-blur-md">
              <Activity className="h-12 w-12 text-lime-400 animate-pulse" />
            </div>

            <h1 className="mb-4 text-7xl md:text-9xl font-black tracking-tight text-white drop-shadow-lg">
              404
            </h1>

            <h2 className="mb-6 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-200">
              Página no <span className="text-lime-400">encontrada</span>.
            </h2>

            <p className="mb-10 text-base md:text-lg text-neutral-400 leading-relaxed max-w-lg mx-auto">
              Parece que el enlace que seguiste está roto o la página fue movida.
            </p>

            <Link
              href="/"
              className="inline-flex mb-6 items-center justify-center gap-2 rounded-full bg-lime-400 px-7 py-4 text-base font-bold text-graphite-950 shadow-xl shadow-lime-400/20 transition-all hover:bg-lime-500 hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver al inicio
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </BookingProvider>
  );
}
