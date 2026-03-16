import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-zinc-50 dark:bg-zinc-950 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            LaTroupe Studio
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Diseño web, gráfica y herramientas BIM para automatizar y
            estandarizar procesos. Parte del ecosistema Awesomely.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/servicios"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Ver servicios
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Qué hacemos
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Web, Gráfica, Craft Journal y herramientas BIM (lt-tools) para equipos
          de arquitectura y construcción. Contenido placeholder — preparado para
          integrar CMS más adelante.
        </p>
      </section>
    </div>
  );
}
