---
name: git-push
description: Stage, commit, push current branch and create a PR to develop.
user-invocable: true
argument-hint: "<commit message> (optional)"
---

# Push and create PR

The user wants to push their current branch and create a PR to `develop`.

## Current state

Branch: !`git branch --show-current`

Uncommitted changes:
```!
git status --short
```

## Guards

- If on `main`, `develop`, or `staging`: STOP and tell the user to create a feature branch first with `/git-start`.
- If there are no changes and no unpushed commits: tell the user there's nothing to push.

## Steps

1. Show the user what files have changed (`git status --short`)
2. Stage all changes with `git add -A`
3. If `$ARGUMENTS` is provided, use it as the commit message. Otherwise ask the user for a commit message following conventional commits format (`feat: ...`, `fix: ...`, etc.)
4. Commit the changes
5. Push to origin with `-u` flag
6. Check if a PR already exists for this branch targeting `develop` using `gh pr list --head <branch> --base develop`
7. If no PR exists, create one with `gh pr create --base develop` using the commit message as title
8. Show the PR URL to the user

## Rules

- Commit messages must follow conventional commits: `type: description`
- Never add Co-Authored-By or AI attribution footers
- PR target is always `develop`
