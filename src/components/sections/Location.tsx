'use client';

import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function Location() {
  return (
    <section id="ubicacion" className="relative bg-neutral-100 py-24 text-neutral-900 border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Header de Sección */}
        <FadeIn direction='up'>
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-800 shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-lime-600" />
              Dónde Encontrarnos
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-neutral-950">
              Conocé nuestro <span className="text-lime-600">consultorio</span>.
            </h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              Un espacio equipado con tecnología de vanguardia y diseñado para brindarte comodidad y atención personalizada en cada sesión.
            </p>
          </div>
        </FadeIn>

        {/* Grid Principal: Info + Mapa */}
        <FadeIn direction='up'>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Tarjeta de Información de Contacto y Horarios */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-200/50">
              <div className="space-y-8">

                {/* Dirección */}
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-neutral-100 p-3 text-neutral-900 shrink-0 border border-neutral-200">
                    <MapPin className="h-6 w-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Dirección</h3>
                    <p className="text-lg font-bold text-neutral-900 mt-1">Avenida 44 1420</p>
                    <p className="text-sm text-neutral-500">La Plata, Buenos Aires</p>
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-neutral-100 p-3 text-neutral-900 shrink-0 border border-neutral-200">
                    <Clock className="h-6 w-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Horarios de Atención</h3>
                    <p className="text-sm font-semibold text-neutral-800 mt-1">Lunes a Viernes: 08:00 - 20:00 hs</p>
                    <p className="text-xs text-neutral-400 mt-1">Fines de semana y feriados: Cerrado</p>
                  </div>
                </div>

                {/* Contacto Directo */}
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-neutral-100 p-3 text-neutral-900 shrink-0 border border-neutral-200">
                    <Phone className="h-6 w-6 text-lime-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Consultas & Recepción</h3>
                    <p className="text-base font-bold text-neutral-900 mt-1">+54 (221) 557-4095</p>
                    <p className="text-xs text-neutral-500">Atención telefónica y WhatsApp durante horario comercial</p>
                  </div>
                </div>

              </div>

              {/* Accesos y Comodidades */}
              <div className="mt-8 pt-6 border-t border-neutral-100">


                <a
                  href="https://www.google.com/maps/place/Av.+44+1420,+B1900+ACQ,+Provincia+de+Buenos+Aires/@-34.926158,-57.9744979,17z/data=!3m1!4b1!4m6!3m5!1s0x95a2e7d016e27121:0xae5014a382def321!8m2!3d-34.9261624!4d-57.971923!16s%2Fg%2F11jdczljqs?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-950 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-neutral-800 active:scale-98 shadow-md"
                >
                  <Navigation className="h-4 w-4 text-lime-400" />
                  Cómo llegar con Google Maps
                </a>
              </div>

            </div>

            {/* Bloque del Mapa */}
            <div className="lg:col-span-7 rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-xl shadow-neutral-200/50 min-h-[380px] relative flex flex-col">

              {/* Mapa Embed (Google Maps Iframe) */}
              <iframe
                title="Ubicación del consultorio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4121.463549764852!2d-57.97662845162515!3d-34.926325963912646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e7d016e27121%3A0xae5014a382def321!2sAv.%2044%201420%2C%20B1900%20ACQ%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1791035751080!5m2!1ses-419!2sar"
                className="w-full h-full min-h-[380px] border-0 grayscale contrast-125 opacity-90 transition-opacity hover:opacity-100"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </div>
        </FadeIn>

      </div>
    </section>
  );
}