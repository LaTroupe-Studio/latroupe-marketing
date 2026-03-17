import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservar cita | LaTroupe Studio",
  description:
    "Reserva una cita con el equipo de LaTroupe Studio. Diseño web, gráfica y herramientas BIM.",
};

export default function ReservasPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Reservar cita
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Para reservar una cita con nosotros, escríbenos a través del{" "}
        <Link href="/contacto" className="underline hover:no-underline">
          formulario de contacto
        </Link>
        .
      </p>
    </div>
  );
}
