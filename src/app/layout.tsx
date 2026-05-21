import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Becubo · Thinking out of the Cube",
  description:
    "Cooperativa de innovación ética. Bementory, Begitality y Beventy fusionados en una experiencia 3D interactiva.",
  metadataBase: new URL("https://becubo.vercel.app"),
  openGraph: {
    title: "Becubo · Thinking out of the Cube",
    description:
      "Cooperativa de innovación ética con experiencia 3D interactiva.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased grain">{children}</body>
    </html>
  );
}
