# SDR application form

Static, self-contained job-application form for the **SDR — BIM Management** role.
Intended to live at **apply.sdr.latroupestudio.com** and be reachable only via its
direct link (it is `noindex` + `robots.txt` Disallow, so it must NOT be linked from
the main site or sitemap).

Submissions are handled entirely inside our Google Workspace — no third-party form
service. Responses append to a Google Sheet; uploaded CVs are saved to a Drive folder
(both inside the **09. Sales** folder), and the Sheet stores a link to each CV.

---

## Files
| File | What it is |
|------|------------|
| `index.html` | The form. Self-contained (inline SVG logo, fonts in `fonts/`). |
| `fonts/` | Roobert / Roobert Mono (brand fonts). Keep alongside `index.html`. |
| `logo-latroupe-wordmark.svg` | Brand wordmark (also inlined in the HTML; kept for reference). |
| `robots.txt` | Blocks all indexing for the deployed host. |
| `Code.gs` | Google Apps Script backend (paste into Apps Script — NOT part of the web deploy). |

---

## Hosting — two options, your call, @jaume

**Option A — dedicated static deploy (recommended for the subdomain)**
Serve this `sdr-form/` folder as a standalone static site (Cloudflare Pages / S3 /
wherever we host static), and point `apply.sdr.latroupestudio.com` at it. Cleanest fit
for an independent subdomain; no coupling to the Next.js marketing app.

**Option B — serve from this Next.js app**
Move the folder contents into `public/sdr-form/` here; it would be reachable at
`latroupestudio.com/sdr-form/`. The subdomain would then need a redirect/route. Use
this if you'd rather not stand up a separate deploy.

Either way the form itself doesn't change — it's plain HTML/CSS/JS.

---

## Backend setup (one time, ~15 min)

1. In the **09. Sales** Drive folder, create a Google Sheet → copy its ID into
   `SHEET_ID` in `Code.gs`.
2. Copy the **09. Sales** folder ID (or a sub-folder for CVs) into `CV_FOLDER_ID`.
3. Open the Sheet ▸ **Extensions ▸ Apps Script**, paste `Code.gs`, save.
4. Run `setupHeaders()` once (authorize when prompted) — writes the header row,
   including the **CV link** column.
5. **Deploy ▸ New deployment ▸ Web app** → Execute as **Me**, Access **Anyone** →
   copy the Web app URL.
6. In `index.html`, replace `YOUR_APPS_SCRIPT_WEB_APP_URL` with that URL.

Data controller for GDPR: **Awesomely, S.L.** (notice + consent checkbox already in the form).

To add/rename a question later: edit `index.html`, then add/rename the matching field
in the `COLUMNS` array in `Code.gs` and re-run `setupHeaders()`.
