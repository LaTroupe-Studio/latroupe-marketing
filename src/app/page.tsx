import { redirect } from "next/navigation";
import { i18nConfig } from "@/lib/i18n";

/**
 * Raíz del sitio → idioma por defecto (respaldo si el middleware no aplica).
 */
export default function RootPage() {
  redirect(`/${i18nConfig.defaultLocale}`);
}
