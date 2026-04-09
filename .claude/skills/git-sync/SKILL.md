---
name: git-sync
description: Sync current branch with latest develop.
user-invocable: true
---

# Sync with develop

The user wants to update their current branch with the latest changes from `develop`.

## Current state

Branch: !`git branch --show-current`

Uncommitted changes:
```!
git status --short
```

## Steps

1. If on `main` or `develop`: just run `git pull origin <branch>` and done.
2. If there are uncommitted changes: stash them first with `git stash push -m "auto-stash before sync"`
3. Run `git fetch origin develop`
4. Run `git merge origin/develop --no-edit`
5. If there are merge conflicts: show them and help the user resolve them
6. If changes were stashed: run `git stash pop` to restore them
7. Confirm the sync is complete and show status

## Rules

- Never force-push or rebase without asking
- If conflicts arise, show them clearly and ask the user how to proceed
