import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones | Kinetic Health Lab',
  description: 'Términos y condiciones del servicio y reserva de turnos en Kinetic Health Lab.',
};

export default function TerminosCondiciones() {
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
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-lime-400">Marco Legal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Términos y Condiciones</h1>
          <p className="mt-2 text-sm text-neutral-400">Última actualización: Septiembre 2026</p>
        </div>

        {/* Contenido */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-neutral-300">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">1. Aceptación de los Términos</h2>
            <p>
              Al utilizar el sistema de reserva online o solicitar atención kinesiológica en <strong>Kinetic Health Lab</strong>, aceptás cumplir con los presentes términos y condiciones generales.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">2. Reserva de Turnos y Puntualidad</h2>
            <p>
              Las sesiones son de atención personalizada 1 a 1. Se solicita a los pacientes asistir con 5 a 10 minutos de anticipación a la hora pactada para no perjudicar la duración de su sesión ni la de los pacientes posteriores.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">3. Políticas de Cancelación y Reprogramación</h2>
            <p>
              Si necesitas cancelar o reprogramar una sesión, te solicitamos dar aviso con al menos <strong>24 horas de anticipación</strong>. Las cancelaciones fuera de este plazo o la inasistencia sin aviso previo podrán estar sujetas al cobro parcial o total del valor de la consulta.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">4. Evaluación Médica y Tratamientos</h2>
            <p>
              Todos los tratamientos kinesiológicos y biomecánicos impartidos en el centro son realizados por profesionales matriculados. El paciente se compromete a brindar información verídica acerca de sus antecedentes médicos y lesiones preexistentes para garantizar un abordaje seguro.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-white">5. Modificaciones</h2>
            <p>
              Kinetic Health Lab se reserva el derecho de modificar o actualizar estos términos en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en este sitio web.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}