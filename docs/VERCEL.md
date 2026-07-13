# Despliegue en Vercel

El proyecto corre en **Next.js modo servidor** en Vercel: middleware de idioma,
SSR y optimización de imágenes (`next/image`). El export estático a S3/CloudFront
queda solo como **fallback manual** (ver workflows en `.github/workflows/`).

## Mapeo de ramas → entornos

| Rama      | Entorno Vercel | Dominio                       |
|-----------|----------------|-------------------------------|
| `main`    | Production     | `latroupestudio.com`          |
| `develop` | Preview        | `staging.latroupestudio.com`  |

Cada push a `main` despliega a producción; cada push a `develop` actualiza el
alias estable de staging. El resto de ramas generan URLs de Preview efímeras.

## Alta del proyecto (primera vez)

1. Entra en [vercel.com](https://vercel.com) e inicia sesión con la cuenta de la organización.
2. **Add New Project** → importa **`LaTroupe-Studio/latroupe-marketing`**.
3. **Framework Preset: Next.js**, Build Command y Output por defecto
   (los lee de `vercel.json`: framework `nextjs`, región `fra1`).
4. **Settings → Git**: confirma que la **Production Branch** es `main`.
5. **Deploy**.

## Dominios

**Settings → Domains**:

- `latroupestudio.com` → asignado a la rama de producción (`main`).
- `staging.latroupestudio.com` → asignado a la rama `develop`
  (Domains → añadir dominio → *Git Branch* = `develop`).

DNS (en el proveedor del dominio, fuera del repo):

- Apex `latroupestudio.com` → registro **A** a la IP que indique Vercel
  (o `ALIAS`/`ANAME` a `cname.vercel-dns.com` si el proveedor lo soporta).
- `staging` → registro **CNAME** a `cname.vercel-dns.com`.

> Mientras el DNS no apunte a Vercel, el sitio sigue sirviéndose desde
> S3/CloudFront. El cambio es reversible apuntando el DNS de vuelta.

## Variables de entorno

**Settings → Environment Variables**. Necesaria para el formulario de contacto:

| Variable                  | Entornos              | Valor                                  |
|---------------------------|-----------------------|----------------------------------------|
| `NEXT_PUBLIC_CONTACT_URL` | Production, Preview    | URL de la Lambda Function URL (la misma que el secret de GitHub) |

## CORS del Lambda de contacto

El backend del formulario sigue en **AWS Lambda + SES** (`lambda/contact/`),
independiente del hosting. Añade los dominios de Vercel a la variable
`ALLOWED_ORIGIN` del Lambda (consola AWS) para que el `fetch` no falle CORS:

```
https://latroupestudio.com,https://staging.latroupestudio.com
```

(Si quieres probar desde URLs de Preview efímeras `*.vercel.app`, añádelas
también o deja `ALLOWED_ORIGIN` vacío para permitir cualquier origen.)

## Fallback a AWS

Los workflows `deploy-production.yml` y `deploy-staging.yml` ya no se disparan
en push: quedan como `workflow_dispatch`. Para revertir a S3/CloudFront,
ejecútalos a mano desde la pestaña **Actions** y reapunta el DNS.
