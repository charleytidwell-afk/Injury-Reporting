# GitHub Pages Deployment Guide

## Step 1: Create the Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `Injury-Reporting-App`
3. Make it **Public** (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, run:

```bash
git remote add origin https://github.com/charleytidwell-afk/Injury-Reporting-App.git
git branch -M main
git push -u origin main
```

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

