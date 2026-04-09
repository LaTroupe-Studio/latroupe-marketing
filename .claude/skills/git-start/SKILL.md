---
name: git-start
description: Start a new feature or fix branch from develop following git conventions.
user-invocable: true
argument-hint: "<type> <name> (e.g. feat new-hero-section)"
---

# Start a new branch

The user wants to create a new branch from `develop`.

## Arguments

`$ARGUMENTS` should contain the type and name, e.g. `feat new-hero-section` or `fix contact-form`.

If no arguments provided, ask the user:
1. **Type**: `feat` (new feature) or `fix` (bug fix)
2. **Name**: short kebab-case description (e.g. `new-hero-section`)

## Steps

1. Validate the branch name follows kebab-case (lowercase, hyphens only)
2. Run `git fetch origin develop`
3. Run `git checkout -b <type>-<name> origin/develop`
4. Confirm the branch was created and show `git status`

## Branch naming

- `feat-<name>` for new features
- `fix-<name>` for bug fixes

## Example

```
/git-start feat new-hero-section
→ creates branch: feat-new-hero-section from origin/develop
```
