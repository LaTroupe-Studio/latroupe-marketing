#!/usr/bin/env bash
set -euo pipefail

# Sync current branch with latest develop
# Usage: npm run git:sync

branch=$(git branch --show-current)

if [[ "$branch" == "main" || "$branch" == "develop" ]]; then
  echo ""
  echo "  You are on '$branch'. Pulling latest changes..."
  git pull origin "$branch"
  echo ""
  echo "  Done!"
  exit 0
fi

echo ""
echo "  Syncing '$branch' with latest develop"
echo "  ──────────────────────────────────────"
echo ""

# Stash any uncommitted changes
stashed=false
if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
  echo "  Stashing your uncommitted changes..."
  git stash push -m "auto-stash before sync"
  stashed=true
fi

# Fetch and merge develop
git fetch origin develop
git merge origin/develop --no-edit

if [[ "$stashed" == true ]]; then
  echo "  Restoring your stashed changes..."
  git stash pop
fi

echo ""
echo "  Done! Your branch is up to date with develop."
echo ""
