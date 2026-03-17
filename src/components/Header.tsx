import Link from "next/link";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/reservas", label: "Reservar" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          LaTroupe Studio
        </Link>
        <nav className="flex gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
