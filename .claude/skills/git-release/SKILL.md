---
name: git-release
description: Create a release branch from develop and open a PR to main.
user-invocable: true
argument-hint: "<version> (e.g. 1.1.0)"
---

# Create a release

The user wants to create a release from `develop` to `main`.

## Steps

1. If `$ARGUMENTS` is provided, use it as the version. Otherwise ask the user for the new version number (e.g. `1.1.0`)
2. Run `git fetch origin develop main`
3. Read `package.json` to check the current version
4. Run `git log origin/main..origin/develop --pretty=format:"- %s" --no-merges` to see pending commits
5. Create branch `release-v<version>` from `origin/develop`
6. Update the `version` field in `package.json` to the new version
7. Commit with message `release: v<version>`
8. Push the branch to origin
9. Generate a changelog from the commits obtained in step 4
10. Create a PR to `main` with title `release: v<version>` and the changelog in the body
11. Show the PR URL
12. Remind the user that after merging the PR they need to sync develop with main:
    ```
    git checkout develop
    git pull origin develop
    git merge origin/main
    git push origin develop
    ```

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
