import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20">
      <h1 className="text-6xl font-bold text-zinc-400">404</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Página no encontrada
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
