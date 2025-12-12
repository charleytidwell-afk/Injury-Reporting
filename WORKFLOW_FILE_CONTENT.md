# GitHub Actions Workflow File

Copy this content and create a new file at `.github/workflows/deploy.yml` in your GitHub repository.

## Steps:
1. Go to: https://github.com/charleytidwell-afk/Injury-Reporting
2. Click "Add file" → "Create new file"
3. In the file path box, type: `.github/workflows/deploy.yml`
4. Paste the content below
5. Click "Commit new file"

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
  cancel-in-progress: false

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

---

After adding this file:
1. Go to **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. The workflow will run automatically and deploy your site!

