import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinetic Health Lab | Kinesiología Deportiva en La Plata",
  description:
    "Clínica de kinesiología deportiva, postural, respiratoria y traumatológica en La Plata. Evaluación biomecánica, sesiones 1 a 1 y turnos online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-graphite-950 text-white">
        {children}
        {/* Botón de WhatsApp Flotante */}
        <WhatsAppButton 
          phoneNumber="5492215574095" 
          message="Hola! Me gustaría hacer una consulta sobre los turnos."
        />
        </body>
    </html>
  );
}
