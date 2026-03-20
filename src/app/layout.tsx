import localFont from "next/font/local";
import "./globals.css";

const roobert = localFont({
  src: [
    { path: "../../public/fonts/Roobert-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Roobert-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Roobert-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-roobert",
  display: "swap",
});

/**
 * Root layout — minimal shell.
 * Wraps both the root redirect page and the [locale] pages.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={roobert.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
