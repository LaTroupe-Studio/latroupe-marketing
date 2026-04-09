#!/usr/bin/env bash
set -euo pipefail

# Start a new feature or fix branch from develop
# Usage: npm run git:start

echo ""
echo "  Create a new branch from develop"
echo "  ─────────────────────────────────"
echo ""
echo "  What type of branch?"
echo "    1) feat  — new feature or enhancement"
echo "    2) fix   — bug fix"
echo ""

read -rp "  Choose (1/2): " choice

case "$choice" in
  1) prefix="feat" ;;
  2) prefix="fix" ;;
  *)
    echo "  Invalid choice. Use 1 or 2."
    exit 1
    ;;
esac

echo ""
read -rp "  Short name (kebab-case, e.g. new-hero-section): " name

if [[ -z "$name" ]]; then
  echo "  Name cannot be empty."
  exit 1
fi

branch="${prefix}-${name}"

echo ""
echo "  Creating branch: $branch"
echo ""

# Fetch latest and create branch from develop
git fetch origin develop
git checkout -b "$branch" origin/develop

echo ""
echo "  Done! You are now on branch: $branch"
echo "  Make your changes, then run: npm run git:push"
echo ""
