# 🚀 Deployment Guide - Crafted Legacy Website

## Pre-Deployment Checklist

Before deploying, make sure you've completed:

- [ ] Added all product images to `/public/Products/Leather/[category]/` folders
- [ ] Added hero image to `/public/Home/Hero-Image.jpg`
- [ ] Connected Formspree form (optional - can be done after deployment)
- [ ] Updated social media links in Footer (optional - can be done after deployment)
- [ ] Tested the site locally with `npm run dev`

---

## Build Command

```bash
npm run build
```

This creates a production-ready build in the `dist/` folder (or `build/` depending on your build tool configuration).

---

## Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Crafted Legacy website"
   git remote add origin https://github.com/YOUR_USERNAME/crafted-legacy.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects settings:
     - **Framework**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Custom Domain** (Optional)
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Add your custom domain (e.g., craftedlegacy.com)
   - Follow DNS configuration instructions

---

### Option 2: Netlify (Also Free & Easy)

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"
   - Live in minutes!

3. **Alternative: Drag & Drop**
   - Run `npm run build` locally
   - Go to Netlify
   - Drag the `dist` folder to Netlify's drop zone
   - Instant deployment!

---

### Option 3: AWS S3 + CloudFront (Scalable)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Go to AWS S3 Console
   - Create a new bucket (e.g., `craftedlegacy-website`)
   - Enable "Static website hosting"
   - Set `index.html` as index document

3. **Upload files**
   - Upload all files from `dist/` folder to S3 bucket
   - Set permissions to public read

4. **Setup CloudFront** (Optional - for CDN)
   - Create CloudFront distribution
   - Point origin to S3 bucket
   - Configure SSL certificate

---

### Option 4: Your Own Server (VPS/Dedicated)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload to server**
   ```bash
   scp -r dist/* user@yourserver.com:/var/www/craftedlegacy/
   ```

3. **Configure web server** (Nginx example)
   ```nginx
   server {
       listen 80;
       server_name craftedlegacy.com;
       root /var/www/craftedlegacy;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

---

## Post-Deployment

### 1. Test Your Deployment

- [ ] Visit your deployed URL
- [ ] Test all navigation links (Home, About, Products, etc.)
- [ ] Verify all images load correctly
- [ ] Test contact form submission (if Formspree is connected)
- [ ] Check responsive design on mobile
- [ ] Test on different browsers (Chrome, Safari, Firefox)

### 2. Connect Formspree

1. Go to [formspree.io](https://formspree.io)
2. Create account and new form
3. Get your form ID: `YOUR_FORM_ID`
4. Update `/components/contact/ContactFormSection.tsx`:
   ```tsx
   <form 
     action="https://formspree.io/f/YOUR_FORM_ID" 
     method="POST"
   >
   ```
5. Redeploy (push to GitHub - Vercel/Netlify auto-deploys)

### 3. Update Social Links

Edit `/components/Footer.tsx` and replace `#` with actual URLs:
```tsx
<a href="https://instagram.com/craftedlegacy" target="_blank" rel="noopener noreferrer">
  <Instagram />
</a>
```

### 4. Setup Analytics (Optional)

Add Google Analytics or Plausible to track visitors:

**For Google Analytics:**
- Add tracking code to `/index.html` (in your project root)
- Or use environment variables for the tracking ID

---

## Continuous Deployment (Auto-Deploy on Push)

### With Vercel/Netlify:

Once connected to GitHub, every push to `main` branch automatically:
1. Triggers a new build
2. Deploys to production
3. Updates your live site

**Workflow:**
```bash
# Make changes locally
git add .
git commit -m "Updated product images"
git push

# ✅ Site auto-deploys in ~2 minutes!
```

---

## Environment Variables (If Needed)

For API keys, create `.env` file:

```env
VITE_FORMSPREE_ID=your_formspree_id
VITE_ANALYTICS_ID=your_analytics_id
```

Add in Vercel/Netlify:
- Go to "Settings" → "Environment Variables"
- Add each variable

---

## Troubleshooting

### Images Not Loading
- Ensure images are in `/public` folder before build
- Check file names match exactly (case-sensitive)
- Verify folder structure is correct

### 404 Errors on Refresh
- Configure your hosting for SPA routing
- Vercel/Netlify handle this automatically
- For custom servers, ensure all routes serve `index.html`

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## Performance Optimization

### Image Optimization
- Compress images before adding to `/public`
- Use WebP format for better compression
- Recommended tools: TinyPNG, Squoosh

### Lazy Loading
- Images already use lazy loading with `ImageWithFallback` component

### Caching
- Vercel/Netlify automatically configure caching headers
- For custom servers, set cache headers for static assets

---

## SSL Certificate (HTTPS)

### Vercel/Netlify
- ✅ Free SSL automatically configured
- No action needed!

### Custom Domain
- Let's Encrypt (free)
- Cloudflare (free)
- Your hosting provider's SSL

---

## Backup & Version Control

### Always use Git:
```bash
git add .
git commit -m "Descriptive message"
git push
```

### Recommended branches:
- `main` - Production (auto-deploys)
- `dev` - Development (for testing)

---

## Support & Maintenance

### Regular Updates
- Update dependencies quarterly: `npm update`
- Test after updates: `npm run build`
- Monitor security alerts on GitHub

### Content Updates
- Update product images in `/public/Products/Leather/`
- Push changes to GitHub (auto-deploys)

---

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Run development server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |

---

## Need Help?

Common issues:
1. **Build fails**: Check error logs, verify all dependencies installed
2. **Images missing**: Ensure in `/public` folder, check paths
3. **Form not working**: Add Formspree ID, check console for errors

---

**🎉 Your Crafted Legacy website is ready to go live!**

Choose your deployment platform and follow the steps above. You'll be live in minutes!
