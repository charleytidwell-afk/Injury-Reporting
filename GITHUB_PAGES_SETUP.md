# GitHub Pages Setup Guide

## Current Status
✅ Code is committed locally  
✅ GitHub Actions workflow is configured  
❌ Code needs to be pushed to GitHub  
❌ GitHub Pages needs to be enabled

## Step-by-Step Instructions

### 1. Push Your Code to GitHub

**Option A: Using Personal Access Token**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Injury Reporting Deployment"
4. Select scope: `repo` (full control)
5. Click "Generate token" and **copy it**

6. In your terminal, run:
```bash
git push -u origin main
```
   - When prompted for username: enter your GitHub username
   - When prompted for password: **paste the token** (not your GitHub password)

**Option B: Using SSH**
```bash
git remote set-url origin git@github.com:charleytidwell-afk/Injury-Reporting.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository: https://github.com/charleytidwell-afk/Injury-Reporting
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. **Save** (if there's a save button)

### 3. Trigger the Deployment

The workflow should automatically run when you push. If not:

1. Go to **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow
3. Click on it and click **Run workflow** → **Run workflow**

### 4. Wait for Deployment

1. Go to **Actions** tab
2. Watch the workflow run (it takes 2-3 minutes)
3. When it completes, you'll see a green checkmark
4. Go back to **Settings** → **Pages**
5. You should see: "Your site is live at https://charleytidwell-afk.github.io/Injury-Reporting/"

### 5. Verify Your Site

Visit: **https://charleytidwell-afk.github.io/Injury-Reporting/**

## Troubleshooting

### If you still see 404:
1. Check **Actions** tab - is the workflow running/failing?
2. Check **Settings** → **Pages** - is "GitHub Actions" selected?
3. Wait 2-3 minutes after pushing - deployment takes time
4. Clear browser cache and try again

### If workflow fails:
1. Go to **Actions** tab
2. Click on the failed workflow run
3. Check the error message
4. Common issues:
   - Missing dependencies (should be fixed)
   - Build errors (check the build step logs)
   - Permission issues (check repository settings)

### If site loads but shows blank page:
1. Check browser console for errors
2. Verify the base path in `vite.config.ts` is `/Injury-Reporting/`
3. Check that all assets are loading correctly

## Quick Commands

```bash
# Check if code is pushed
git ls-remote --heads origin

# Push code (after authentication)
git push -u origin main

# Check local commits
git log --oneline -5

# View remote URL
git remote -v
```

