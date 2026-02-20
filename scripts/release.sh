#!/bin/bash

# Design System Release Script
# Automates versioning and tagging for npm publishing

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Kuroshio Design System - Release Script                ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Check if working directory is clean
if ! git diff-index --quiet HEAD --; then
  echo "❌ Working directory is not clean. Please commit or stash changes."
  exit 1
fi

# Get current version
CURRENT_VERSION=$(cat package.json | grep '"version"' | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
echo ""
echo "📦 Current version: $CURRENT_VERSION"

# Get version bump type
echo ""
echo "🔧 Select version bump:"
echo "  1) patch (e.g., 0.1.0 → 0.1.1) - Bug fixes"
echo "  2) minor (e.g., 0.1.0 → 0.2.0) - New features"
echo "  3) major (e.g., 0.1.0 → 1.0.0) - Breaking changes"
read -p "Enter choice (1-3): " version_choice

case $version_choice in
  1)
    BUMP_TYPE="patch"
    ;;
  2)
    BUMP_TYPE="minor"
    ;;
  3)
    BUMP_TYPE="major"
    ;;
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac

# Update version
echo ""
echo "🔨 Updating version..."
npm version $BUMP_TYPE

# Get new version
NEW_VERSION=$(cat package.json | grep '"version"' | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')

echo "✅ Version bumped: $CURRENT_VERSION → $NEW_VERSION"

# Show what's changing
echo ""
echo "📝 Changes in this release:"
git log --oneline ${CURRENT_VERSION}..HEAD 2>/dev/null || echo "   (first release)"

# Confirm before pushing
echo ""
read -p "Ready to push version v$NEW_VERSION? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo "🚀 Publishing to GitHub and npm..."

  # Push commits and tags
  git push origin main
  git push origin --tags

  echo ""
  echo "╔════════════════════════════════════════════════════════════════╗"
  echo "║                    ✨ Release Complete! ✨                     ║"
  echo "╚════════════════════════════════════════════════════════════════╝"

  echo ""
  echo "📦 Released version: v$NEW_VERSION"
  echo ""
  echo "🔗 View on:"
  echo "   GitHub: https://github.com/kuroshio-lab/design-system/releases/tag/v$NEW_VERSION"
  echo "   npm: https://www.npmjs.com/org/kuroshio-lab"
  echo ""
  echo "⏱️  Publishing to npm in progress (check GitHub Actions)"
  echo "   Actions: https://github.com/kuroshio-lab/design-system/actions"
else
  echo ""
  echo "❌ Release cancelled"
  echo ""
  echo "To undo the version bump:"
  echo "  git reset --hard HEAD~1"
  exit 1
fi
