#!/usr/bin/env bash
set -euo pipefail

# Create a release PR from develop to main
# Usage: npm run git:release

echo ""
echo "  Create a release"
echo "  ─────────────────"
echo ""

# Get current version from package.json
current_version=$(node -p "require('./package.json').version")
echo "  Current version: v$current_version"
echo ""

read -rp "  New version (e.g. 1.1.0): " version

if [[ -z "$version" ]]; then
  echo "  Version cannot be empty."
  exit 1
fi

branch="release-v${version}"

echo ""
echo "  Creating release branch: $branch"

# Fetch latest develop
git fetch origin develop
git checkout -b "$branch" origin/develop

# Update version in package.json
node -e "
const pkg = require('./package.json');
pkg.version = '${version}';
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Build changelog from commits since last release
echo ""
echo "  Generating changelog..."
changelog=$(git log origin/main..origin/develop --pretty=format:"- %s" --no-merges 2>/dev/null || echo "- Release v${version}")

git add package.json
git commit -m "release: v${version}"
git push -u origin "$branch"

# Create PR to main
gh pr create \
  --base main \
  --title "release: v${version}" \
  --body "## Release v${version}

### Changelog
${changelog}

### Checklist
- [ ] Tested on staging
- [ ] All PRs merged to develop
- [ ] Version bumped to ${version}"

echo ""
echo "  Release PR created!"
echo "  After merging, production will deploy automatically."
echo ""
