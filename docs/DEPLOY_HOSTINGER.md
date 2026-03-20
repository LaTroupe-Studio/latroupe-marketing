# Despliegue en Hostinger (o cualquier hosting estático sin Node)

El sitio se genera como **HTML/CSS/JS estático** (`next build` con `output: "export"`). No hace falta Node en el servidor: solo servir archivos.

## URL prevista

- Sitio en subruta: **`https://latroupestudio.com/beta/`**
- La app está configurada con `basePath: "/beta"` en `next.config.js`. Si más adelante publicas en la raíz del dominio, cambia `basePath` a `""` y vuelve a generar el build.

## Pasos en tu máquina

```bash
cd latroupe-marketing
npm ci
npm run build
```

Se crea la carpeta **`out/`** con `_next/`, `es/`, `en/`, `images/`, `fonts/`, `index.html`, etc.

## Subida a Hostinger

1. Entra en **Administrador de archivos** o **FTP** (FileZilla, etc.).
2. Abre el directorio público del dominio (suele ser **`public_html/`** o **`domains/tudominio.com/public_html/`**).
3. Crea la carpeta **`beta`** si no existe.
4. **Sube todo el contenido de `out/`** dentro de `public_html/beta/` (no subas la carpeta `out` como nombre; el *contenido* de `out` debe quedar como `public_html/beta/index.html`, `public_html/beta/es/`, `public_html/beta/_next/`, …).

Comprueba en el navegador:

- `https://latroupestudio.com/beta/es/`
- `https://latroupestudio.com/beta/en/`

## Despliegue con GitHub Actions (solo tú)

En el repo hay un workflow **manual** (no se ejecuta solo al hacer push):

1. En GitHub: **Settings → Secrets and variables → Actions → New repository secret** y crea:
   - **`FTP_SERVER`** — Host FTP de Hostinger (p. ej. `ftp.latroupestudio.com` o el que indique el panel).
   - **`FTP_USERNAME`** — Usuario FTP.
   - **`FTP_PASSWORD`** — Contraseña FTP.

2. Ve a **Actions → Deploy to Hostinger (FTP) → Run workflow** (solo visible si tienes permisos de escritura en el repo).

**Quién puede usarlo**

- Los secretos **solo existen en este repositorio**; nadie que haga fork puede leerlos.
- El job solo corre si **`github.actor == 'jaumetorrespous'`**: únicamente tu usuario de GitHub puede lanzar el despliegue (los colaboradores con write no pasarán esta comprobación; si en el futuro quieres permitir a alguien, edita `.github/workflows/deploy-hostinger.yml` y ajusta la condición `if:`).
- Si cambias de nombre de usuario en GitHub, actualiza esa misma línea en el workflow.

**Ruta remota**

- Por defecto el workflow sube `out/` a la carpeta **`beta/`** respecto a la raíz de tu sesión FTP (en Hostinger suele equivaler a `public_html/beta/`). Si tu FTP entra en otra ruta, cambia `server-dir` en el workflow.

**Si falla la conexión**

- Algunos planes exigen **FTPS**. Revisa la documentación de [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action): puedes añadir `protocol: ftps` (u otro) en el paso *Deploy to Hostinger* del YAML.

## Alternativas si quieres Node u otro hosting

| Opción | Idea |
|--------|------|
| **Vercel / Netlify / Cloudflare Pages** | Conectas el repo GitHub; build con Node en la nube; puedes usar CNAME hacia `latroupestudio.com` o un subdominio. |
| **Hostinger VPS** | Instalas Node y puedes ejecutar `next start` (SSR) si en el futuro lo necesitas. |

## Limitaciones del export estático

- **No hay middleware** de Next (redirección por `Accept-Language` en el primer acceso). La raíz `/beta/` redirige al idioma por defecto (ES); el usuario puede cambiar ES/EN en el header.
- **No hay API routes** ni servidor Node: formularios de contacto habría que enviarlos a un servicio externo (Formspree, Getform, etc.) si quieres envío real.
