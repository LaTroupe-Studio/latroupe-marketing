# SDR application form

Static job-application form for the **SDR — BIM Management** role.

- **Web bundle:** [`public/apply-sdr/`](../public/apply-sdr/) → served at **`www.latroupestudio.com/apply-sdr`**.
- **Backend:** `Code.gs` (Google Apps Script) — handles submissions. Not part of the web deploy.

Submissions stay inside our Google Workspace — no third-party form service. Responses append
to a Google Sheet; uploaded CVs are saved to a Drive folder (both inside the **09. Sales**
folder), and the Sheet stores a link to each CV.

---

## Files
| File | What it is |
|------|------------|
| `../public/apply-sdr/index.html` | The form (self-contained: inline SVG logo, fonts in `fonts/`). |
| `../public/apply-sdr/fonts/` | Roobert / Roobert Mono brand fonts. |
| `../public/apply-sdr/logo-latroupe-wordmark.svg` | Brand wordmark (also inlined in the HTML; kept for reference). |
| `Code.gs` | Google Apps Script backend — paste into Apps Script, NOT deployed with the site. |

---

## Hosting — @jaume

Lives under `public/apply-sdr/`, so the Next.js app serves it at `www.latroupestudio.com/apply-sdr`.
On Vercel `public/apply-sdr/index.html` resolves at `/apply-sdr/`; if you want the clean
no-trailing-slash `/apply-sdr` to resolve too, add a rewrite.

**Keep it unlisted (reachable only via the direct link):**
- The page already sends `<meta name="robots" content="noindex, nofollow, noarchive">`.
- **Do NOT** link it from the site nav, footer, or **sitemap**, and **do NOT** add a
  `Disallow: /apply-sdr` to the site `robots.txt` — blocking crawl would stop crawlers from
  reading the `noindex` tag. The meta tag + being unlinked is what keeps it out of search.

The Sheet ID and Drive folder ID are already wired into `Code.gs`, and the Apps Script Web App
URL is already wired into `index.html`. Backend is live and tested end-to-end.

---

## Backend setup (already done — reference only)

The Apps Script is deployed and the IDs are filled in. For reference, the one-time setup was:
1. Sheet created inside the **09. Sales** Drive folder → its ID in `SHEET_ID`.
2. **09. Sales** folder ID in `CV_FOLDER_ID`.
3. `Code.gs` pasted into the Sheet's Apps Script, `setupHeaders()` run once.
4. Deployed as a Web app (Execute as: Me · Access: Anyone) → URL wired into `index.html`.

GDPR data controller: **Awesomely, S.L.** (privacy notice + consent checkbox in the form).
