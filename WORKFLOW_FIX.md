# Fixed GitHub Actions Workflow

The workflow had an issue with multiple artifacts. Here's the corrected version:

## Problem:
- Multiple artifacts named "github-pages" were being created
- This caused deployment failures

## Solution:
1. Added explicit artifact name
2. Changed `cancel-in-progress: false` to `cancel-in-progress: true` to prevent overlapping runs

## How to Update:

1. Go to: https://github.com/charleytidwell-afk/Injury-Reporting/blob/main/.github/workflows/deploy.yml
2. Click the **pencil icon** (Edit this file)
3. Replace the entire content with the code below
4. Click **Commit changes**

---

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
          name: github-pages

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

---

## Key Changes:
1. **Line 16**: Changed `cancel-in-progress: false` to `cancel-in-progress: true`
   - This cancels any in-progress workflow runs when a new one starts
   - Prevents multiple artifacts from being created simultaneously

2. **Line 45**: Added `name: github-pages` to the upload artifact step
   - Explicitly names the artifact to avoid conflicts

After updating, the workflow should run successfully without the "Multiple artifacts" error.

