import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | LaTroupe Studio",
  description:
    "Servicios de LaTroupe: Web, Gráfica, Craft Journal y herramientas BIM.",
};

const services = [
  {
    title: "Web",
    description:
      "Diseño y desarrollo de sitios web corporativos y de proyecto.",
  },
  {
    title: "Gráfica",
    description:
      "Identidad visual, branding y material gráfico para proyectos.",
  },
  {
    title: "Craft Journal",
    description:
      "Publicaciones y documentación de proyectos y procesos.",
  },
  {
    title: "Herramientas BIM",
    description:
      "lt-tools: automatización y estandarización de procesos BIM.",
  },
];

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Servicios
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Nuestras áreas de trabajo. Contenido placeholder — preparado para CMS.
      </p>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2">
        {services.map(({ title, description }) => (
          <li
            key={title}
            className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
