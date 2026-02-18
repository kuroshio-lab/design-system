#!/bin/bash

# Design System Publishing Script
# This script helps publish all packages to npm

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Kuroshio Design System - Publishing Script             ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Check if user is logged in
echo ""
echo "🔐 Checking npm authentication..."
if ! npm whoami > /dev/null 2>&1; then
  echo "❌ Not logged in to npm. Please run: npm login"
  exit 1
fi
echo "✅ Logged in as: $(npm whoami)"

# Get version bump type
echo ""
echo "📦 Select version bump:"
echo "  1) patch (e.g., 0.1.0 → 0.1.1) - Bug fixes"
echo "  2) minor (e.g., 0.1.0 → 0.2.0) - New features"
echo "  3) major (e.g., 0.1.0 → 1.0.0) - Breaking changes"
echo "  4) manual version (specify exact version)"
read -p "Enter choice (1-4): " version_choice

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
  4)
    read -p "Enter version (e.g., 0.2.0): " CUSTOM_VERSION
    BUMP_TYPE="$CUSTOM_VERSION"
    ;;
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "🔨 Building all packages..."
npm install
npm run build
npm run type-check
npm run lint

echo ""
echo "🎯 Publishing packages..."

# Publish styles first (no dependencies)
echo ""
echo "Publishing @kuroshio/styles..."
cd packages/styles
npm version $BUMP_TYPE --no-git-tag-version
npm publish
cd ../..

# Publish ui (depends on styles)
echo ""
echo "Publishing @kuroshio/ui..."
cd packages/ui
npm version $BUMP_TYPE --no-git-tag-version
npm publish
cd ../..

# Publish components (depends on ui)
echo ""
echo "Publishing @kuroshio/components..."
cd packages/components
npm version $BUMP_TYPE --no-git-tag-version
npm publish
cd ../..

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  ✨ Publishing Complete! ✨                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"

echo ""
echo "📦 Published packages:"
echo "  • @kuroshio/styles"
echo "  • @kuroshio/ui"
echo "  • @kuroshio/components"

echo ""
echo "🔗 View on npm:"
echo "  • https://www.npmjs.com/package/@kuroshio/styles"
echo "  • https://www.npmjs.com/package/@kuroshio/ui"
echo "  • https://www.npmjs.com/package/@kuroshio/components"

echo ""
echo "📝 Next: Update version in root package.json and create git tag"
echo "  npm version $BUMP_TYPE"
echo "  git push origin main --tags"
