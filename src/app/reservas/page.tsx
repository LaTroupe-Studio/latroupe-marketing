import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar cita | LaTroupe Studio",
  description:
    "Reserva una cita con el equipo de LaTroupe Studio. Diseño web, gráfica y herramientas BIM.",
};

const CALCOM_URL =
  process.env.NEXT_PUBLIC_CALCOM_LATROUPE_URL ||
  "https://cal.com/latroupe/30min";

export default function ReservasPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Reservar cita
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Elige un hueco que te encaje y hablamos. Las reservas se sincronizan
        con nuestro calendario.
      </p>
      <div className="mt-8 min-h-[700px] w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <iframe
          src={CALCOM_URL}
          title="Reservar cita con LaTroupe"
          className="h-[700px] w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
