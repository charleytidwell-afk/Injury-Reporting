# GitHub Pages Deployment Guide

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `Injury-Reporting-App`
3. Make it **Public** (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Authenticate with GitHub

You need to authenticate before pushing. Choose one method:

### Option A: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token
5. When pushing, use the token as your password (username is your GitHub username)

### Option B: SSH Key
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to GitHub: Settings → SSH and GPG keys → New SSH key
3. Update remote: `git remote set-url origin git@github.com:charleytidwell-afk/Injury-Reporting.git`

## Step 3: Push Your Code

After authenticating, run:

```bash
git remote add origin https://github.com/charleytidwell-afk/Injury-Reporting.git
git branch -M main
git push -u origin main
```

**Note**: If you get a 403 error, you'll be prompted for credentials. Use your GitHub username and Personal Access Token as the password.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: `GitHub Actions`
4. The workflow will automatically deploy when you push to `main`

## Step 4: Access Your Deployed App

Once deployed, your app will be available at:
**https://charleytidwell-afk.github.io/Injury-Reporting-App/**

## Important Notes

### Environment Variables
GitHub Pages is a static hosting service, so environment variables won't work the same way. For production:

1. **Option A**: Set environment variables in GitHub Actions secrets
   - Go to Settings → Secrets and variables → Actions
   - Add your Azure AD and SharePoint configuration as secrets
   - Update the workflow to use these secrets

2. **Option B**: Use a different hosting service (Vercel, Netlify, Azure Static Web Apps) that supports environment variables

### SharePoint Configuration
Since GitHub Pages is static hosting, you'll need to:
- Configure Azure AD redirect URI to include your GitHub Pages URL
- Update environment variables in the deployment workflow
- Consider using Azure Static Web Apps for better integration with Azure services

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run build
git checkout --orphan gh-pages
git rm -rf .
git add build/*
git mv build/* .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

Then in GitHub Settings → Pages, select `gh-pages` branch.

