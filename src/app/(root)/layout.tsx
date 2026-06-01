import { roobert } from "../fonts";
import "../globals.css";
import { i18nConfig } from "@/lib/i18n";

export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={i18nConfig.defaultLocale} className={roobert.variable}>
      <body>{children}</body>
    </html>
  );
}
