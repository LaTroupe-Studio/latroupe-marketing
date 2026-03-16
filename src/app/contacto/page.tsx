import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | LaTroupe Studio",
  description: "Ponte en contacto con LaTroupe Studio.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Contacto
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Formulario de contacto y datos de contacto. Placeholder — preparado para
        integrar backend o CMS.
      </p>
      <div className="mt-12 rounded-lg border border-zinc-200 p-8 dark:border-zinc-800">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="mensaje"
              className="block text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              rows={4}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
