import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeAI — Crea tu CV perfecto con IA",
  description:
    "Constructor de CV profesional con IA. 8 plantillas diseñadas por expertos, mejora tu contenido con Meta Llama 3.1 y descarga tu PDF en un clic. Gratis.",
  keywords: "crear cv, generador de curriculum, cv con ia, plantillas cv, curriculum vitae profesional",
  openGraph: {
    title: "ResumeAI — Crea tu CV perfecto con IA",
    description: "8 plantillas profesionales, IA de Meta Llama 3.1 gratis, exportación PDF perfecta.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
