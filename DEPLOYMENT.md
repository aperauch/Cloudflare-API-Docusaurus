# Cloudflare API Docs - Deployment Guide

This guide covers deploying the Cloudflare API documentation site to Cloudflare Pages.

## Project Overview

This Docusaurus application renders comprehensive Cloudflare API documentation including:
- Interactive API reference with the complete OpenAPI specification
- Getting started guides and examples
- Authentication and usage documentation
- Direct access to the 8MB Cloudflare OpenAPI JSON file

## Deployment to Cloudflare Pages

### Prerequisites
- Cloudflare account
- GitHub/GitLab repository with this code
- Node.js v18+ for local development

### Step 1: Repository Setup

1. **Push to GitHub/GitLab**:
   ```bash
   # If not already done:
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. **Repository Structure**:
   ```
   cloudflare-api-docs/
   ├── docs/                    # Documentation pages
   ├── src/                     # React components
   ├── static/                  # Static assets
   ├── openapi.json            # Cloudflare OpenAPI spec (8MB)
   ├── docusaurus.config.js    # Site configuration
   ├── package.json            # Dependencies
   └── README.md
   ```

### Step 2: Cloudflare Pages Configuration

1. **Connect Repository**:
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages**
   - Click **Create Application** → **Pages** → **Connect to Git**
   - Select your repository

2. **Build Settings**:
   - **Framework preset**: `Docusaurus` (or leave as "None")
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
   - **Root directory**: `/` (or `/cloudflare-api-docs` if in subdirectory)

3. **Environment Variables** (if needed):
   - No special environment variables required for this setup
   - Node.js version is automatically detected from `package.json`

### Step 3: Build Configuration

The build process will:
1. Install dependencies (`npm install`)
2. Build the static site (`npm run build`)
3. Deploy the `build/` directory to Cloudflare Pages

**Important Notes**:
- The OpenAPI spec file (`openapi.json`) is included in the build
- Build time: ~2-3 minutes (including the large OpenAPI file processing)
- No special build optimizations needed

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Pages dashboard, go to **Custom domains**
   - Click **Set up a custom domain**
   - Enter your domain (e.g., `api-docs.yourdomain.com`)
   - Follow DNS configuration instructions

2. **SSL Certificate**:
   - Automatic SSL certificate provisioning
   - Force HTTPS redirect enabled by default

## Local Development

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve built files locally
npm run serve
```

### File Structure
- `docs/intro.md` - Introduction page
- `docs/getting-started.md` - API getting started guide  
- `docs/api-reference.md` - Complete API reference
- `openapi.json` - Full Cloudflare OpenAPI specification
- `docusaurus.config.js` - Site configuration

## Performance Considerations

### Large OpenAPI File
- The `openapi.json` file is ~8MB
- Served as static asset, cached by Cloudflare CDN
- Consider implementing lazy loading if needed

### Build Optimizations
- Static site generation for fast loading
- Automatic code splitting by Docusaurus
- Optimized CSS and JavaScript bundles
- Image optimization for static assets

## Advanced Configuration

### OpenAPI Plugin Integration

If you want to integrate a working OpenAPI documentation plugin in the future:

1. **Try redocusaurus** (if compatibility improves):
   ```bash
   npm install redocusaurus
   ```

2. **Alternative: External OpenAPI viewer**:
   - Host Swagger UI separately
   - Link to external Redoc instance
   - Use iframe integration

### Custom Styling

Customize the appearance in `src/css/custom.css`:
```css
:root {
  --ifm-color-primary: #f38020;  /* Cloudflare orange */
  --ifm-color-primary-dark: #e6740e;
  --ifm-color-primary-darker: #d96c0a;
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (requires v18+)
   - Verify all dependencies are installed
   - Check for syntax errors in markdown files

2. **Large File Warnings**:
   - The 8MB OpenAPI file may trigger warnings
   - This is expected and won't prevent deployment

3. **Memory Issues**:
   - If build fails due to memory, try increasing Node.js memory:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

### Performance Monitoring

- Use Cloudflare Analytics to monitor site performance
- Check Core Web Vitals in Pages dashboard
- Monitor build times and adjust as needed

## Maintenance

### Updating OpenAPI Spec

To update the Cloudflare OpenAPI specification:

```bash
# Download latest spec
curl -o openapi.json https://raw.githubusercontent.com/cloudflare/api-schemas/refs/heads/main/openapi.json

# Commit and deploy
git add openapi.json
git commit -m "Update OpenAPI specification"
git push
```

### Documentation Updates

1. Edit files in the `docs/` directory
2. Test locally with `npm start`
3. Commit and push changes
4. Cloudflare Pages will auto-deploy

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Cloudflare Community](https://community.cloudflare.com/)
- [GitHub Issues](https://github.com/cloudflare/api-schemas/issues) for API spec issues
