// lib/email.ts
// Emails transaccionales con Resend. Solo usar desde el servidor.
import { Resend } from 'resend';
import { TZ } from '@/lib/agenda';

interface DatosTurno {
  nombreCompleto: string;
  email: string;
  telefono: string;
  servicio: string;
  duracionMin: number;
  fechaHora: Date;
  notas?: string;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Link para agregar el turno a Google Calendar
function linkGoogleCalendar(d: DatosTurno, clinica: string, direccion: string): string {
  const fmt = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const fin = new Date(d.fechaHora.getTime() + d.duracionMin * 60 * 1000);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${d.servicio} - ${clinica}`,
    dates: `${fmt(d.fechaHora)}/${fmt(fin)}`,
    details: `Turno de ${d.servicio} en ${clinica}.`,
    location: direccion,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function plantillaPaciente(d: DatosTurno): { subject: string; html: string } {
  const clinica = process.env.CLINICA_NOMBRE ?? 'Nuestra clínica';
  const direccion = process.env.CLINICA_DIRECCION ?? '';
  const whatsapp = (process.env.CLINICA_WHATSAPP ?? '').replace(/\D/g, '');

  const fechaLarga = capitalizar(
    d.fechaHora.toLocaleDateString('es-AR', {
      timeZone: TZ,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  );
  const hora = d.fechaHora.toLocaleTimeString('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
  });
  const nombre = escapeHtml(d.nombreCompleto.split(' ')[0]);
  const calendarUrl = linkGoogleCalendar(d, clinica, direccion);

  const botonWhatsapp = whatsapp
    ? `<a href="https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Hola! Consulto por mi turno de ${d.servicio} del ${fechaLarga} a las ${hora} hs.`
      )}" style="display:inline-block;margin:4px;padding:10px 18px;border-radius:8px;background:#25d366;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;">Escribirnos por WhatsApp</a>`
    : '';

  const html = `
<div style="background:#f4f4f5;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
    <div style="background:#0a0a0a;padding:24px;text-align:center;">
      <h1 style="margin:0;color:#a3e635;font-size:20px;">${escapeHtml(clinica)}</h1>
    </div>
    <div style="padding:28px 24px;color:#18181b;">
      <h2 style="margin:0 0 8px;font-size:22px;">¡Turno confirmado, ${nombre}!</h2>
      <p style="margin:0 0 20px;color:#52525b;font-size:15px;">Te esperamos. Estos son los datos de tu reserva:</p>

      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:10px 0;color:#71717a;border-bottom:1px solid #e4e4e7;">Servicio</td>
            <td style="padding:10px 0;text-align:right;border-bottom:1px solid #e4e4e7;"><strong>${escapeHtml(d.servicio)}</strong></td></tr>
        <tr><td style="padding:10px 0;color:#71717a;border-bottom:1px solid #e4e4e7;">Fecha</td>
            <td style="padding:10px 0;text-align:right;border-bottom:1px solid #e4e4e7;"><strong>${fechaLarga}</strong></td></tr>
        <tr><td style="padding:10px 0;color:#71717a;border-bottom:1px solid #e4e4e7;">Hora</td>
            <td style="padding:10px 0;text-align:right;border-bottom:1px solid #e4e4e7;"><strong>${hora} hs</strong></td></tr>
        <tr><td style="padding:10px 0;color:#71717a;border-bottom:1px solid #e4e4e7;">Duración</td>
            <td style="padding:10px 0;text-align:right;border-bottom:1px solid #e4e4e7;">${d.duracionMin} min</td></tr>
        ${
          direccion
            ? `<tr><td style="padding:10px 0;color:#71717a;">Dirección</td>
               <td style="padding:10px 0;text-align:right;">${escapeHtml(direccion)}</td></tr>`
            : ''
        }
      </table>

      <div style="text-align:center;margin:28px 0 8px;">
        <a href="${calendarUrl}" style="display:inline-block;margin:4px;padding:10px 18px;border-radius:8px;background:#a3e635;color:#0a0a0a;text-decoration:none;font-weight:bold;font-size:14px;">Agregar a mi calendario</a>
        ${botonWhatsapp}
      </div>

      <p style="margin:24px 0 0;color:#71717a;font-size:13px;">
        Si necesitás cancelar o reprogramar, avisanos con anticipación respondiendo este correo o por WhatsApp.
      </p>
    </div>
  </div>
</div>`;

  const fechaCorta = d.fechaHora.toLocaleDateString('es-AR', {
    timeZone: TZ,
    day: 'numeric',
    month: 'numeric',
  });

  return { subject: `Turno confirmado: ${d.servicio} - ${fechaCorta} ${hora} hs`, html };
}

/**
 * Envía la confirmación al paciente (y una copia a la clínica si CLINICA_EMAIL está definido).
 * Nunca lanza error: devuelve true si el email al paciente salió bien.
 */
export async function enviarConfirmacionTurno(d: DatosTurno): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    console.warn('Email no enviado: faltan RESEND_API_KEY o EMAIL_FROM');
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const { subject, html } = plantillaPaciente(d);

    const { error } = await resend.emails.send({
      from,
      to: d.email,
      subject,
      html,
      replyTo: process.env.CLINICA_EMAIL || undefined,
    });

    if (error) {
      console.error('Error enviando al paciente:', error);
      // No cortamos la ejecución acá, para intentar enviar el mail a la clínica igualmente.
    }

    // Aviso interno a la clínica (opcional)
    const emailClinica = process.env.CLINICA_EMAIL;
    if (emailClinica) {
      const hora = d.fechaHora.toLocaleString('es-AR', { timeZone: TZ });
      const { error: errorClinica } = await resend.emails.send({
        from,
        to: emailClinica,
        subject: `Nuevo turno: ${d.nombreCompleto} - ${d.servicio}`,
        html: `
          <p><strong>Nuevo turno reservado</strong></p>
          <ul>
            <li>Paciente: ${escapeHtml(d.nombreCompleto)}</li>
            <li>Email: ${escapeHtml(d.email)}</li>
            <li>Teléfono: ${escapeHtml(d.telefono)}</li>
            <li>Servicio: ${escapeHtml(d.servicio)}</li>
            <li>Fecha: ${escapeHtml(hora)}</li>
            ${d.notas ? `<li>Notas: ${escapeHtml(d.notas)}</li>` : ''}
          </ul>`,
      });
      if (errorClinica) console.error('Error al avisar a la clínica:', errorClinica);
    }

    return !error; // Devuelve true solo si el mail al paciente fue exitoso
  } catch (err) {
    console.error('Error inesperado al enviar email:', err);
    return false;
  }
}