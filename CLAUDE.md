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

# Git helpers (for non-tech team members)
npm run git:start    # start a new feature/fix branch
npm run git:push     # push branch and create PR to develop
npm run git:release  # create a release PR from develop to main
npm run git:sync     # sync your branch with latest develop
```

## Deploy

- **Production**: push/merge to `main` triggers `.github/workflows/deploy-production.yml`
- **Staging**: push/merge to `staging` triggers `.github/workflows/deploy-staging.yml`
