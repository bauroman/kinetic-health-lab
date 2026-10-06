# Kinetic Health Lab

Landing page + sistema de reserva de turnos online para una clínica de kinesiología
deportiva en La Plata.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** + **Framer Motion** (animaciones) + **lucide-react / react-icons**
- **Supabase** (Postgres) para servicios, pacientes y turnos
- **Resend** para los emails de confirmación

## Funcionalidades

- Landing con secciones: Hero, Servicios, Metodología, Equipo, Testimonios, FAQ, Ubicación.
- Modal de reservas: elige servicio, día y horario (slots de 45 min, lun–vie 9 a 19 hs),
  deshabilita los horarios ocupados y los que ya pasaron.
- Validación en el servidor: días de atención, feriados, anticipación máxima, máximo de
  turnos activos por paciente y rate limit por IP.
- Email de confirmación al paciente (con link a Google Calendar y WhatsApp) y aviso a la clínica.
- Botón flotante de WhatsApp y páginas legales (privacidad y términos).

## Estructura

```
src/
├── actions/          # Server actions ('use server'): reservas, horarios, servicios
├── app/              # Rutas (App Router): home, páginas legales, layout, estilos, icono
├── components/
│   ├── booking/      # BookingProvider (contexto) + BookingModal
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Secciones de la landing
│   └── ui/           # Componentes genéricos (FadeIn, WhatsAppButton)
├── data/             # Contenido estático de la landing (tarjetas de servicios)
├── lib/              # Lógica compartida: agenda, email, rate limit, cliente de Supabase
└── types/            # Tipos compartidos (reflejan las tablas de Supabase)
```

La configuración de la agenda (horarios, días de atención, feriados, límites) está en
[`src/lib/agenda.ts`](src/lib/agenda.ts) y la usan tanto el modal como el servidor.

## Variables de entorno

Crear un archivo `.env.local` en la raíz:

| Variable                        | Descripción                                          |
| ------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL del proyecto de Supabase                         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase                                 |
| `RESEND_API_KEY`                | API key de Resend                                    |
| `EMAIL_FROM`                    | Remitente, ej: `Kinetic <turnos@tudominio.com>`      |
| `CLINICA_NOMBRE`                | Nombre que aparece en los emails                     |
| `CLINICA_DIRECCION`             | Dirección (emails y Google Calendar)                 |
| `CLINICA_WHATSAPP`              | Número de WhatsApp de la clínica                     |
| `CLINICA_EMAIL`                 | Email que recibe el aviso de cada turno nuevo        |

## Base de datos (Supabase)

- `servicios`: `id`, `nombre`, `descripcion`, `duracion_min`, `precio`, `activo`
- `pacientes`: `id`, `nombre_completo`, `email` (único), `telefono`
- `turnos`: `id`, `paciente_id`, `servicio_id`, `fecha_hora`, `estado`, `notas`
  (el código espera una restricción única sobre el horario para evitar dobles reservas — error `23505`)

> Para que "Agendar consulta" en una tarjeta preseleccione el servicio, el `nombre` en la
> tabla `servicios` tiene que coincidir (o contener) el título de la tarjeta en
> [`src/data/services.ts`](src/data/services.ts).

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
