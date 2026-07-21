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

**Settings → Environment Variables**. Necesarias para el formulario de contacto y el chat:

| Variable                  | Entornos              | Valor                                  |
|---------------------------|-----------------------|----------------------------------------|
| `NEXT_PUBLIC_CONTACT_URL` | Production, Preview    | URL de la Lambda Function URL de `lambda/contact` (también recibe los leads del chat) |
| `NEXT_PUBLIC_CHAT_URL`    | Production, Preview    | URL de la Lambda Function URL de `lambda/chat` |

## CORS de los Lambdas (contacto y chat)

Los backends del formulario y del chat viven en **AWS Lambda**
(`lambda/contact/`, `lambda/chat/`), independientes del hosting. Añade los
dominios de Vercel a la variable `ALLOWED_ORIGIN` de **cada Lambda** (consola
AWS) para que el `fetch` no falle CORS:

```
https://latroupestudio.com,https://staging.latroupestudio.com
```

(Si quieres probar desde URLs de Preview efímeras `*.vercel.app`, añádelas
también o deja `ALLOWED_ORIGIN` vacío para permitir cualquier origen.)

## Lambda del chat (`lambda/chat/`)

Llama al SDK de Anthropic (Claude) con el prompt de Latty (`lambda/chat/prompt.mjs`).
Variables de entorno propias de este Lambda (no de Vercel):

| Variable             | Obligatoria | Valor                                                      |
|----------------------|-------------|-------------------------------------------------------------|
| `ANTHROPIC_API_KEY`  | Sí          | API key de Anthropic (console.anthropic.com)                |
| `ANTHROPIC_MODEL`    | No          | Modelo a usar (por defecto `claude-sonnet-4-6`)              |
| `ALLOWED_ORIGIN`     | No          | Igual que en `lambda/contact`                                |

Sin `ANTHROPIC_API_KEY` configurada, el Lambda responde con un mensaje de
fallback y abre igualmente el miniform de contacto, en vez de fallar.

### Despliegue manual (igual que `lambda/contact`)

```bash
cd lambda/chat
npm install
npm run zip          # genera function.zip
```

Sube `function.zip` a la función Lambda desde la consola AWS (o `aws lambda
update-function-code`), configura las variables de entorno de la tabla
anterior, y crea/edita la **Function URL** con CORS igual que la de
`lambda/contact`. Apunta `NEXT_PUBLIC_CHAT_URL` (en Vercel) a esa Function URL.

## Fallback a AWS

Los workflows `deploy-production.yml` y `deploy-staging.yml` ya no se disparan
en push: quedan como `workflow_dispatch`. Para revertir a S3/CloudFront,
ejecútalos a mano desde la pestaña **Actions** y reapunta el DNS.
