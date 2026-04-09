# LaTroupe Marketing Website

## Project

Next.js 15 static site (React 19, TypeScript) for latroupestudio.com.
Bilingual (ES/EN), deployed to AWS S3 + CloudFront.

## Git Flow

- **main** — production. Only receives merges from `release-*` PRs. Deploys automatically.
- **develop** — integration branch. Only receives PRs from feature/fix branches.
- **staging** — preview environment. Deploys automatically to staging.latroupestudio.com.
- Feature/fix branches are always created from `develop`.

### Branch Naming

- `feat-` — new features or enhancements
- `fix-` — bug fixes
- `release-` — release branches (from develop to main)
- `hotfix-` — urgent production fixes (from main, merged back to both main and develop)

### Commit Messages

- Single line, English, under 72 characters
- Conventional Commits: `type: description`
- Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`
- **NEVER add Co-Authored-By or any other footers**
- **NEVER add AI branding to PR descriptions**

### Workflow

1. Pull latest `develop`, create branch: `feat-short-name` or `fix-short-name`
2. Make atomic commits with clear messages
3. Push and create PR targeting `develop`
4. After review/merge to `develop`, test on staging
5. Release: create `release-vX.Y.Z` branch from `develop`, PR to `main`

### Rules

- Never commit directly to `main` or `develop`
- Always create PRs for any change
- Run `npm run lint` before pushing

## Commands

```bash
npm run dev          # local dev server
npm run build        # production build
npm run lint         # run linter
```

## Claude Skills (slash commands)

| Command | Description |
|---|---|
| `/git-start feat my-feature` | Create a new branch from develop |
| `/git-push` | Commit, push and create PR to develop |
| `/git-release 1.1.0` | Create release PR from develop to main |
| `/git-sync` | Sync current branch with latest develop |

## Deploy

- **Production**: push/merge to `main` triggers `.github/workflows/deploy-production.yml`
- **Staging**: push/merge to `staging` triggers `.github/workflows/deploy-staging.yml`
