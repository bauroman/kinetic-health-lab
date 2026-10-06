import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidad | Kinetic Health Lab',
  description: 'Información sobre cómo tratamos y protegemos tus datos personales en Kinetic Health Lab.',
};

export default function PoliticaPrivacidad() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Botón de regreso */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-lime-400 hover:text-lime-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio principal
        </Link>

        {/* Encabezado */}
        <div className="border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-lime-400">Protección de Datos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Política de Privacidad</h1>
          <p className="mt-2 text-sm text-neutral-400">Última actualización: Septiembre 2026</p>
        </div>

        {/* Contenido */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-neutral-300">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">1. Información que recopilamos</h2>
            <p>
              En <strong>Kinetic Health Lab</strong> recopilamos la información personal necesaria para gestionar tus turnos kinesiológicos y brindar una atención adaptada a tu tratamiento. Los datos incluyen:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-400">
              <li>Nombre completo y datos de contacto (teléfono, email).</li>
              <li>Información proporcionada voluntariamente sobre tu motivo de consulta o condición médica previa.</li>
              <li>Historial de citas y preferencias de profesionales.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">2. Uso de la información</h2>
            <p>Utilizamos la información recolectada exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-neutral-400">
              <li>Confirmar, reprogramar o recordar tus turnos médicos vía correo electrónico o WhatsApp.</li>
              <li>Llevar la historia clínica y el seguimiento del tratamiento con nuestros profesionales matriculados.</li>
              <li>Mejorar nuestros servicios de atención y la experiencia en el sitio web.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">3. Protección y confidencialidad</h2>
            <p>
              Tus datos son almacenados en infraestructura segura provista por servicios en la nube con encriptación (Supabase) y no serán vendidos, cedidos ni comercializados a terceros bajo ninguna circunstancia.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">4. Tus derechos</h2>
            <p>
              Tenés derecho a solicitar el acceso, corrección o eliminación definitiva de tus datos personales de nuestras bases de datos en cualquier momento. Para ejercer este derecho, podés contactarnos a través de nuestros canales de atención oficiales.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}