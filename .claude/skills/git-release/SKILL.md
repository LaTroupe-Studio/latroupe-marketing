---
name: git-release
description: Create a release branch from develop and open a PR to main.
user-invocable: true
argument-hint: "<version> (e.g. 1.1.0)"
---

# Create a release

The user wants to create a release from `develop` to `main`.

## Current state

Current version in package.json: !`node -p "require('./package.json').version"`

Recent commits on develop not yet in main:
```!
git fetch origin develop main 2>/dev/null; git log origin/main..origin/develop --pretty=format:"- %s" --no-merges 2>/dev/null || echo "Unable to fetch"
```

## Steps

1. If `$ARGUMENTS` is provided, use it as the version. Otherwise ask the user for the new version number (e.g. `1.1.0`)
2. Run `git fetch origin develop`
3. Create branch `release-v<version>` from `origin/develop`
4. Update the `version` field in `package.json` to the new version
5. Commit with message `release: v<version>`
6. Push the branch to origin
7. Generate a changelog from commits between `origin/main` and `origin/develop`
8. Create a PR to `main` with title `release: v<version>` and the changelog in the body
9. Show the PR URL

## PR body format

```
## Release v<version>

### Changelog
- feat: ...
- fix: ...

### Checklist
- [ ] Tested on staging
- [ ] All PRs merged to develop
```

## Rules

- Release branches always come from `develop` and target `main`
- Never add Co-Authored-By or AI attribution footers
