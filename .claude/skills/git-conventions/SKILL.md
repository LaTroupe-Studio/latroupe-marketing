---
name: Git Conventions
description: Use when creating commits, branches, pull requests, or releases. Defines naming conventions, commit message format, branch strategy, and PR workflow for this project.
---

# Git Conventions — LaTroupe Marketing

Standard git workflow and naming conventions for this project.

## Commit Messages

- Single line, English, under 72 characters
- Conventional Commits format: `type: description`
- Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`
- **NEVER add Co-Authored-By or any other footers**
- **NEVER add AI branding to PR descriptions**

### Examples

```
feat: add user authentication
fix: resolve database connection timeout
chore: update dependencies
refactor: simplify contact form logic
docs: update README with setup instructions
```

## Branch Naming

Use prefixes with `-` separator and kebab-case:

- `feat-` — new features or enhancements
- `fix-` — bug fixes
- `release-` — release branches
- `hotfix-` — urgent production fixes

### Examples

```
feat-add-login
feat-new-hero-section
fix-contact-form-submit
release-v1.0.0
hotfix-critical-security-patch
```

## Pull Requests

- Use `gh pr create` to open PRs
- Title follows commit message style
- Body includes summary of changes
- **Default target branch: `develop`**
- Release PRs target `main`

### Commands

```bash
# Feature/fix PR (to develop)
gh pr create --base develop --title "feat: short description" --body "Summary..."

# Release PR (to main)
gh pr create --base main --title "release: vX.Y.Z" --body "Changelog..."
```

## Releases

- Create a PR from `develop` to `main`
- Branch name: `release-vX.Y.Z`
- Title: `release: vX.Y.Z`
- Body includes changelog of what's new since last release

## Workflow

1. **Start**: pull latest `develop`, create a new branch with the appropriate prefix
2. **During**: make atomic commits with clear messages
3. **Review**: create PR targeting `develop`
4. **Staging**: merge to `develop`, then merge develop into `staging` to test
5. **Release**: create `release-vX.Y.Z` branch from `develop`, PR to `main`

## Rules

- Never commit directly to `main` or `develop`
- Never add Co-Authored-By or AI attribution footers
- Always run `npm run lint` before pushing
