import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emmelin Boixareu — Interiorista, formadora i ponent",
  description:
    "Interiorista i directora de negoci. Ponències i docència sobre gestió de projectes, BIM i IA aplicats a l'interiorisme i l'hostaleria de luxe.",
  openGraph: {
    title: "Emmelin Boixareu",
    description:
      "Del projecte real a l'aula: gestió, BIM i IA aplicats a l'interiorisme.",
    images: ["/images/portrait-hero.jpg"],
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body>{children}</body>
    </html>
  );
}
