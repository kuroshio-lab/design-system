# CI/CD Pipeline Setup

This document explains the automated CI/CD pipeline for publishing the design system to npm.

## Overview

We have three GitHub Actions workflows:

1. **CI (ci.yml)** - Runs on every push and PR to main
2. **Publish (publish.yml)** - Publishes to npm when you create a git tag
3. **Semantic Release (semantic-release.yml)** - Optional automatic versioning

## How It Works

### 1. Continuous Integration (CI)

**Triggers**: Every push to `main` or pull request to `main`

**Jobs**:
- Type checking with TypeScript
- Building all packages
- Linting code
- Running tests
- Checking code formatting

**Status**: Required to pass before merging PRs

### 2. Publishing Workflow

**Triggers**: When you push a git tag matching `v*` (e.g., `v0.2.0`)

**Process**:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Builds each package
5. Publishes to npm with the NPM_TOKEN secret
6. Creates a GitHub release

**Steps to publish**:

```bash
# 1. Update version in all package.json files
npm version patch  # or minor/major

# 2. Create a git tag (the CI will publish automatically)
git push origin main --tags

# Or do it in one step:
git tag v0.2.0
git push origin main --tags
```

### 3. Semantic Release (Optional)

**Status**: Currently DISABLED (can be enabled for automatic versioning)

**When enabled**, it will:
- Analyze commit messages (conventional commits)
- Auto-increment version (major/minor/patch)
- Generate changelog
- Publish to npm
- Create GitHub release

**To enable**:
1. Uncomment the `on` section in `.github/workflows/semantic-release.yml`
2. Install semantic-release dependencies in the project

## Setup Requirements

### NPM_TOKEN Secret

To publish to npm from GitHub Actions:

1. **Generate an automation token on npm**:
   - Go to: https://www.npmjs.com/settings/~/tokens
   - Create "Automation" token with "Read and Write" permissions
   - Copy the token

2. **Add to GitHub as a secret**:
   - Go to: https://github.com/kuroshio-lab/design-system/settings/secrets/actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste the token from npm

3. **Verify it's set** (you'll see it listed in Actions secrets)

## Versioning Strategy

### Manual Versioning (Recommended for now)

```bash
# Patch release (0.1.0 → 0.1.1)
npm version patch
git push origin main --tags

# Minor release (0.1.0 → 0.2.0)
npm version minor
git push origin main --tags

# Major release (0.1.0 → 1.0.0)
npm version major
git push origin main --tags
```

### Commit Message Convention (for future auto-versioning)

When you're ready for automatic versioning, use conventional commits:

```
fix: bug fix increments patch version
feat: new feature increments minor version
feat!: breaking change increments major version
```

## Monitoring Workflows

### View workflow status

- **GitHub Actions tab**: https://github.com/kuroshio-lab/design-system/actions
- **Individual workflow runs**: Click on any workflow to see logs
- **Badge in README**: Add status badge (optional)

### Troubleshooting

**Build fails**:
1. Check the workflow logs in Actions tab
2. Common issues:
   - Dependencies not installed: Run `npm install` locally first
   - Type errors: Run `npm run type-check` locally
   - Lint errors: Run `npm run lint` locally

**Publishing fails**:
1. Check NPM_TOKEN is set correctly
2. Verify token has "Read and Write" permissions
3. Check package.json has correct version
4. Ensure all packages build without errors

**Token expired**:
- Generate a new automation token on npm
- Update the NPM_TOKEN secret in GitHub

## Best Practices

### Before Publishing

```bash
# 1. Test locally
npm run build
npm run type-check
npm run lint
npm run test

# 2. Verify changes
git status
git diff

# 3. Update version
npm version minor  # or patch/major

# 4. Review version changes
cat package.json | grep version
```

### Commit Messages

Use conventional commit format:

```
feat: add new accordion component

This adds a new accordion component built on Radix UI.

BREAKING CHANGE: none
```

### Release Notes

GitHub automatically creates release notes when you create a release. You can customize this in:
- `.github/release.yml`

### Rollback

If a bad version is published:

```bash
# Unpublish from npm (requires npm org admin)
npm unpublish @kuroshio-lab/ui@0.2.0

# Delete the git tag
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0

# Create a new tag with fixed version
npm version patch
git push origin main --tags
```

## Workflow Files

### ci.yml
- **Type**: Continuous Integration
- **Triggers**: Push to main, PR to main
- **Status**: Required check
- **Duration**: ~2-3 minutes

### publish.yml
- **Type**: Publishing
- **Triggers**: Git tag matching `v*`
- **Duration**: ~2-3 minutes
- **Output**: Published to npm

### semantic-release.yml
- **Type**: Automatic Versioning
- **Status**: Disabled (optional)
- **Triggers**: Manual dispatch or push to main (when enabled)

## Adding Badges to README

Add workflow badges to your README:

```markdown
![CI Status](https://github.com/kuroshio-lab/design-system/workflows/CI/badge.svg)
![npm version](https://badge.fury.io/js/@kuroshio-lab%2Fui.svg)
```

## Next Steps

1. ✅ Verify NPM_TOKEN secret is set in GitHub
2. ✅ Test the CI workflow by creating a PR
3. ✅ Test the publish workflow by creating a version tag
4. Optional: Set up conventional commits for future auto-versioning
5. Optional: Enable semantic-release for automatic versioning

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [npm Token Documentation](https://docs.npmjs.com/creating-and-viewing-authentication-tokens)
