#!/usr/bin/env bash
# Deja un workspace de Superset listo para trabajar.
#
# Superset crea cada workspace como un git worktree nuevo: viene sin node_modules
# y sin los ficheros .env*.local (gitignorados, no viajan con el repo).
# Este script cubre las dos cosas para que `npm run dev` funcione a la primera.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

echo "==> Instalando dependencias (npm ci)"
npm ci

# Copia los .env*.local desde el checkout principal, si existen.
# El primer worktree que lista git es siempre el checkout principal.
main_checkout="$(git worktree list --porcelain | sed -n '1s/^worktree //p')"
if [ -n "$main_checkout" ] && [ "$main_checkout" != "$PWD" ]; then
  for f in .env.local .env.development.local; do
    if [ -f "$main_checkout/$f" ] && [ ! -f "$f" ]; then
      cp "$main_checkout/$f" "$f"
      echo "==> Copiado $f desde el checkout principal"
    fi
  done
fi

echo "==> Workspace listo. Arranca el servidor con: npm run dev"
