import Link from "next/link";

const footerLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            LaTroupe Studio
          </span>
          <nav className="flex gap-6">
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} LaTroupe. Parte del ecosistema Awesomely.
        </p>
      </div>
    </footer>
  );
}
