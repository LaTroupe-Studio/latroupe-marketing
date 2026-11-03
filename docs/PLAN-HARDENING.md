# Plan de hardening · latroupe-marketing

Este repositorio forma parte del programa de seguridad y privacidad de latroupe() (SOC 2 · ISO/IEC 27001 ·
ISO/IEC 27701). El documento lista lo que hay que cambiar **aquí**, en orden y con criterio de aceptación. Los
identificadores `H-nn`, `R-xx` y `P-xx` remiten al informe y al marco de controles del programa, que se mantienen
fuera de este repositorio. El repositorio es público: este plan también lo es. Fecha: 2026-11-03.

## 1. Estado actual (inventario 2026-11-02 · revisión del clon del 2026-09-14)

| Aspecto | Estado |
|---|---|
| Visibilidad | **Público** · 5 colaboradores, 4 administradores · rama `main` protegida ✅ · `guard-main-source.yml` ✅ |
| CI | `ci.yml` (lint, typecheck), `deploy-production.yml`, `deploy-staging.yml`, `guard-main-source.yml` |
| Acciones fijadas por SHA | 0 de 10 |
| Dependencias | `package-lock.json` en `/`, `lambda/chat`, `lambda/contact`; sin Dependabot |
| Tests | Vitest mínimo |
| Secretos | Ninguno en árbol ni histórico (228 commits revisados) ✅. `.claude/settings.local.json` versionado (sin secretos) |
| Datos personales | Leads del formulario y del chat (nombre, email, mensaje, transcripción) → SES y Anthropic; candidatos SDR (nombre, email, teléfono, LinkedIn, CV, tarifa) → Google Sheets y Drive vía Apps Script; analítica GA4, Google Ads y Clarity con consentimiento ✅ |
| Hallazgos del programa | Medios: formulario de candidaturas sin captcha ni límites; sin retención. Bajos: logs de Lambda con payload |

## 2. Cambios

### a) Correcciones de seguridad

| # | Cambio | Ficheros | Criterio de aceptación | Control |
|---|---|---|---|---|
| 1 | Formulario de candidaturas: verificar Turnstile o reCAPTCHA en el servidor, límite de tamaño (5 MB) y tipo (PDF) del CV, token de origen, y cuota por IP y hora con `CacheService` | `sdr-form/Code.gs:63-88`, `public/apply-sdr/index.html` | Un POST sin captcha válido o con CV mayor que el límite devuelve error; prueba manual documentada | R-54, R-26 |
| 2 | IDs de la hoja y la carpeta de Drive a `PropertiesService.getScriptProperties()`; documentar el modo de despliegue del Web App y cómo rotar su URL | `sdr-form/Code.gs:20-21`, `public/apply-sdr/index.html:358` | Sin IDs en el código | R-43 |
| 3 | Límite de tasa por IP en las Lambdas de chat y contacto (throttling de la Function URL o contador en DynamoDB) | `lambda/chat/index.mjs`, `lambda/contact/index.mjs`, infraestructura | Más de N peticiones por minuto devuelven 429 | R-54 |
| 4 | Logs sin payload: registrar solo tipo y código de error; retención de CloudWatch a 30 días | `lambda/contact/index.mjs:129`, `lambda/chat/index.mjs:249` | Ningún `console.error(err)` con el objeto completo | R-71 |
| 5 | Retirar `.claude/settings.local.json` del repositorio y añadirlo a `.gitignore` | `.gitignore` | Fichero ausente en `main` | R-40 |

### b) Privacidad y retención

| # | Cambio | Ficheros | Criterio | Control |
|---|---|---|---|---|
| 6 | Retención de candidaturas y leads: 24 meses; trigger de Apps Script que borra filas y ficheros de Drive caducados; buzón de leads con regla equivalente | `sdr-form/Code.gs`, `docs/PRIVACIDAD.md` | Job programado y probado | P-04 |
| 7 | Aviso de privacidad: Anthropic como encargado del chat, Google (Sheets, Drive), AWS SES; finalidades y plazos | páginas legales del sitio | Texto publicado | P-06, P-13 |
| 8 | Ficha de tratamiento: leads, chat, candidaturas, analítica | nuevo `docs/PRIVACIDAD.md` | Ficha completa | P-01 |

### c) CI y cadena de suministro

| # | Cambio | Ficheros | Criterio | Control |
|---|---|---|---|---|
| 9 | Fijar por SHA las 10 acciones de los 4 workflows | `.github/workflows/*.yml` | Ningún `uses:` con tag | R-33 |
| 10 | Workflow `security.yml`: gitleaks, `npm audit --audit-level=high` en raíz y las dos Lambdas, CodeQL `javascript-typescript` (gratis en repos públicos), SBOM | nuevo `.github/workflows/security.yml` | Verde en PR; añadido como check obligatorio en la protección de `main` | R-41, R-31, R-51, R-34 |
| 11 | Dependabot: `npm` en `/`, `/lambda/chat`, `/lambda/contact`; `github-actions` | nuevo `.github/dependabot.yml` | Primera PR de Dependabot | R-32 |

### d) Gobierno del repositorio

| # | Cambio | Ficheros | Criterio | Control |
|---|---|---|---|---|
| 12 | `SECURITY.md` con canal de reporte (importante al ser público) y `.github/CODEOWNERS` con al menos dos personas | nuevos | Presentes | R-03, R-04 |

### e) Copias y continuidad

No aplica: el sitio se reconstruye desde el repositorio y se sirve en Vercel; los datos viven en Google y AWS.

## 3. Fuera del repositorio

- Google Apps Script: claves de Turnstile o reCAPTCHA en Script Properties; revisar el modo de despliegue del Web App.
- AWS: throttling de las Function URL; retención de CloudWatch.
- GitHub: activar secret scanning y push protection en el repo (gratis en público); exigir los checks `ci` y
  `security` en la protección de `main`; Dependabot en la organización.
- Contratos: DPA con Anthropic, Google y AWS.

## 4. Decisiones pendientes

- Se mantiene público (decidido). Revisar periódicamente que ningún commit incluya datos de leads o candidatos.

## 5. Orden propuesto

1. **PR 1 · higiene y CI:** 5, 9, 10, 11, 12.
2. **PR 2 · formulario y Lambdas:** 1, 2, 3, 4.
3. **PR 3 · privacidad:** 6, 7, 8.

## 6. Verificación

```bash
npm audit --audit-level=high && (cd lambda/chat && npm audit --audit-level=high) && (cd lambda/contact && npm audit --audit-level=high)
gitleaks git --no-banner .
grep -rn 'uses:' .github/workflows | grep -v '@[0-9a-f]\{40\}'   # vacío
git ls-files .claude/settings.local.json                          # vacío
```

Prueba manual del formulario SDR sin captcha y con un fichero de 10 MB (ambos rechazados).
