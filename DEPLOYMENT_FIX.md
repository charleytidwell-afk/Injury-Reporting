# Fix for "Multiple artifacts" Error

## The Problem
The workflow is creating multiple artifacts with the same name, causing deployment to fail.

## The Solution
Remove the explicit `name` parameter from the artifact upload step. GitHub will auto-generate unique artifact names.

## How to Fix

1. Go to: https://github.com/charleytidwell-afk/Injury-Reporting/blob/main/.github/workflows/deploy.yml
2. Click the **pencil icon** (Edit this file)
3. Find this section (around line 42-46):

```yaml
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './build'
          name: github-pages    ← REMOVE THIS LINE
```

4. Change it to:

```yaml
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './build'
```

5. Click **Commit changes**

## Complete Fixed Workflow

Here's the complete corrected workflow file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './build'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Why This Works

- Removing the explicit `name` lets GitHub auto-generate unique artifact names
- `cancel-in-progress: true` ensures only one workflow runs at a time
- The `deploy-pages` action will find the single artifact automatically

## After Updating

1. The workflow will automatically run on the next push
2. Or manually trigger it: Actions → Deploy to GitHub Pages → Run workflow
3. Wait 2-3 minutes for deployment
4. Your site will be live at: https://charleytidwell-afk.github.io/Injury-Reporting/

