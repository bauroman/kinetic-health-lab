import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Methodology from '@/components/sections/Methodology';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Location from '@/components/sections/Location';
import { BookingProvider } from '@/components/booking/BookingProvider';

// Server Component: el estado del modal vive en <BookingProvider> (client),
// y los botones que lo abren usan el hook useBooking().
export default function Home() {
  return (
    <BookingProvider>
      <main className="min-h-screen bg-graphite-950 text-white">
        <Navbar />
        <Hero />
        <Services />
        <Methodology />

        {/* Sección del Equipo Profesional */}
        <Team />

        {/* Sección de Testimonios */}
        <Testimonials />
        <FAQ />
        <Location />
        <Footer />
      </main>
    </BookingProvider>
  );
}