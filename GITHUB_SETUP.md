# GitHub Setup for Automated Publishing

This guide walks you through setting up GitHub Actions to automatically publish your design system to npm.

## Step 1: Create an NPM Automation Token

### On npm.js.org:

1. Go to: https://www.npmjs.com/settings/~/tokens

2. Click **"Generate New Token"** → **"Automation"**
   - This type of token bypasses 2FA requirements for automation
   - Name: `github-actions-kuroshio-lab`

3. Select **"Read and Write"** permissions
   - ✅ Can publish packages
   - ✅ Can update packages

4. **Copy the token** (you'll only see it once!)
   ```
   npm_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

## Step 2: Add the Token to GitHub Secrets

### On GitHub:

1. Go to: **https://github.com/kuroshio-lab/design-system/settings/secrets/actions**

2. Click **"New repository secret"**

3. Fill in:
   - **Name**: `NPM_TOKEN`
   - **Secret**: Paste your npm token from Step 1

4. Click **"Add secret"**

✅ The secret is now encrypted and only used in CI/CD workflows

## Step 3: Verify the Workflow Files

Check that these files exist in `.github/workflows/`:

- ✅ `.github/workflows/ci.yml` - Continuous integration
- ✅ `.github/workflows/publish.yml` - Publishing to npm
- ✅ `.github/workflows/semantic-release.yml` - Optional auto-versioning

## Step 4: Test the CI Workflow

### Create a test PR:

```bash
git checkout -b test/ci-setup
echo "# Test" >> README.md
git add README.md
git commit -m "test: verify CI workflow"
git push origin test/ci-setup
```

1. Go to GitHub and create a pull request
2. Watch the CI workflow run in the **Actions** tab
3. It should:
   - Build all packages
   - Run type checks
   - Run linting
   - Check formatting

✅ If all pass, your CI is working!

### Merge the PR:

```bash
git checkout main
git pull origin main
```

## Step 5: Test the Publishing Workflow

### Create a version tag:

```bash
# From the kuroshio-design-system directory:
cd /Users/victorbostaetter/kuroshio-lab/kuroshio-design-system

# Option A: Use the release script (easier)
bash scripts/release.sh

# Option B: Manual steps
npm version patch      # bumps 0.1.0 → 0.1.1
git push origin main --tags
```

### Watch it publish:

1. Go to: https://github.com/kuroshio-lab/design-system/actions
2. Click on the **"Publish to npm"** workflow
3. Watch as it:
   - Builds each package
   - Publishes to npm
   - Creates a GitHub release

✅ Check npm to verify: https://www.npmjs.com/org/kuroshio-lab

## Troubleshooting

### NPM_TOKEN not found

**Error**: `Error: The "NPM_TOKEN" environment variable is not defined`

**Solution**:
1. Verify the secret is added: https://github.com/kuroshio-lab/design-system/settings/secrets/actions
2. Secret must be named exactly `NPM_TOKEN` (case-sensitive)
3. Regenerate if needed and update the secret

### Publishing fails with 404

**Error**: `404 Not Found - PUT https://registry.npmjs.org/...`

**Causes**:
1. Package scope doesn't match npm organization
   - ✅ Should be: `@kuroshio-lab/ui`
   - ❌ Not: `@kuroshio/ui`
2. Organization doesn't exist or user not member
   - Verify: https://www.npmjs.com/org/kuroshio-lab

**Solution**: Check `package.json` names match your npm organization

### Authentication errors

**Error**: `401 Unauthorized`

**Causes**:
1. Token expired or revoked
2. Token has wrong permissions
3. Token is from wrong account

**Solution**:
1. Generate new npm automation token
2. Verify "Read and Write" permissions
3. Update the NPM_TOKEN secret in GitHub

### Workflow doesn't trigger on tag push

**Problem**: You created a tag but workflow didn't run

**Causes**:
1. Tag doesn't match pattern `v*`
   - ✅ Correct: `v0.2.0`, `v1.0.0`
   - ❌ Wrong: `release-0.2.0`, `0.2.0`
2. Tag already exists (push with `--force` only if needed)

**Solution**:
```bash
# Create proper tag
git tag v0.2.0
git push origin v0.2.0

# Or use npm version (creates proper tag)
npm version minor
git push origin main --tags
```

### Build fails in CI

**Problem**: CI workflow fails on type-check, lint, or build

**Solution**: Fix locally first

```bash
npm install
npm run type-check      # Fix TypeScript errors
npm run lint            # Fix linting errors
npm run build           # Fix build errors
git add .
git commit -m "fix: resolve CI errors"
git push origin main
```

## How to Release

### Method 1: Using the Release Script (Recommended)

```bash
bash scripts/release.sh
```

Then follow the prompts. This will:
1. Update package.json versions
2. Create git commit
3. Create git tag
4. Push to GitHub
5. Trigger CI/CD to publish

### Method 2: Manual Steps

```bash
# Update version (pick one)
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0

# Push changes and tags
git push origin main --tags

# That's it! GitHub Actions will publish automatically
```

### Method 3: Semantic Release (Advanced)

When ready for automatic versioning:

1. Uncomment `on:` section in `.github/workflows/semantic-release.yml`
2. Install: `npm install -D semantic-release @semantic-release/npm`
3. Uses conventional commits for auto-versioning

## Monitoring Releases

### View Workflow Status

- All workflows: https://github.com/kuroshio-lab/design-system/actions
- Latest runs: Check each workflow tab
- Click a run to see detailed logs

### View Releases

- GitHub releases: https://github.com/kuroshio-lab/design-system/releases
- npm packages: https://www.npmjs.com/org/kuroshio-lab

### Get Notifications

GitHub Actions sends notifications when:
- ✅ Workflow succeeds
- ❌ Workflow fails
- Configure in: https://github.com/settings/notifications

## Best Practices

### Before Every Release

```bash
# 1. Ensure everything is committed
git status

# 2. Run tests locally
npm run type-check
npm run lint
npm run build
npm run test

# 3. Update version
npm version minor

# 4. Push
git push origin main --tags
```

### Commit Messages

Use conventional commits for clarity:

```
feat: add new component
fix: resolve styling issue
docs: update documentation
```

When semantic-release is enabled, it will auto-detect version bumps from commit messages.

### Security

- ✅ NPM token stored as GitHub secret (encrypted)
- ✅ Only exposed to GitHub Actions workflows
- ✅ Regenerate token if compromised
- ✅ Never commit token to git

### Rollback

If you need to undo a release:

```bash
# Delete npm package (requires npm admin)
npm unpublish @kuroshio-lab/ui@0.2.0

# Delete git tag
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0

# Create new release
npm version patch
git push origin main --tags
```

## Next Steps

1. ✅ Create NPM automation token
2. ✅ Add NPM_TOKEN secret to GitHub
3. ✅ Test CI workflow with a PR
4. ✅ Make your first release using `bash scripts/release.sh`
5. ✅ Verify packages published to npm

## Support

For issues with:
- **GitHub Actions**: Check workflow logs at https://github.com/kuroshio-lab/design-system/actions
- **npm tokens**: See https://docs.npmjs.com/creating-and-viewing-authentication-tokens
- **Conventional commits**: See https://www.conventionalcommits.org/

