---
name: git-sync
description: Sync current branch with latest develop.
user-invocable: true
---

# Sync with develop

The user wants to update their current branch with the latest changes from `develop`.

## Steps

1. Run `git branch --show-current` to determine the current branch
2. Run `git status --short` to check for uncommitted changes
3. If on `main` or `develop`: just run `git pull origin <branch>` and done.
4. If there are uncommitted changes: stash them first with `git stash push -m "auto-stash before sync"`
5. Run `git fetch origin develop`
6. Run `git merge origin/develop --no-edit`
7. If there are merge conflicts: show them and help the user resolve them
8. If changes were stashed: run `git stash pop` to restore them
9. Confirm the sync is complete and show status

## Rules

- Never force-push or rebase without asking
- If conflicts arise, show them clearly and ask the user how to proceed
