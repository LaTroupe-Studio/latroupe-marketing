import { redirect } from "next/navigation";
import { i18nConfig } from "@/lib/i18n";

/**
 * Raíz del sitio → idioma por defecto.
 * Con export estático no hay middleware; la detección por Accept-Language
 * no aplica en el primer hit (sí el cambio ES/EN en el header).
 */
export default function RootPage() {
  redirect(`/${i18nConfig.defaultLocale}`);
}
