#!/usr/bin/env bash
set -euo pipefail

# Push current branch and create a PR to develop
# Usage: npm run git:push

branch=$(git branch --show-current)

if [[ "$branch" == "main" || "$branch" == "develop" || "$branch" == "staging" ]]; then
  echo ""
  echo "  You are on '$branch'. You should not push directly to this branch."
  echo "  Create a feature branch first: npm run git:start"
  echo ""
  exit 1
fi

echo ""
echo "  Push & create PR"
echo "  ─────────────────"
echo ""
echo "  Branch: $branch"
echo ""

# Stage all changes
git add -A

# Check if there are changes to commit
if git diff --cached --quiet 2>/dev/null; then
  echo "  No new changes to commit."
else
  echo "  Staged changes:"
  git diff --cached --stat
  echo ""
  read -rp "  Commit message (e.g. 'feat: add hero section'): " msg

  if [[ -z "$msg" ]]; then
    echo "  Commit message cannot be empty."
    exit 1
  fi

  git commit -m "$msg"
fi

# Push to remote
echo ""
echo "  Pushing to origin/$branch..."
git push -u origin "$branch"

# Check if PR already exists
existing_pr=$(gh pr list --head "$branch" --base develop --json number --jq '.[0].number' 2>/dev/null || echo "")

if [[ -n "$existing_pr" ]]; then
  echo ""
  echo "  PR #$existing_pr already exists and has been updated with your push."
  echo "  View it at: $(gh pr view "$existing_pr" --json url --jq '.url')"
else
  echo ""
  read -rp "  Create a Pull Request to develop? (y/n): " create_pr

  if [[ "$create_pr" == "y" || "$create_pr" == "Y" ]]; then
    echo ""
    read -rp "  PR title (e.g. 'feat: add hero section'): " pr_title

    if [[ -z "$pr_title" ]]; then
      pr_title="$branch"
    fi

    gh pr create --base develop --title "$pr_title" --body "## Changes

- Created from branch \`$branch\`

## Preview
Test on staging before release."

    echo ""
    echo "  PR created! Ask a teammate to review it."
  fi
fi

echo ""
