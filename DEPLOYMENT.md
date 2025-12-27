# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "deployment optimizations"
   git push origin master
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**:
   In Vercel Dashboard → Settings → Environment Variables, add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_Q1_ANSWER=typescript
   ADMIN_Q2_ANSWER=2025
   ADMIN_Q3_ANSWER=adarsh
   ```

4. **Deploy**: Click "Deploy" and wait for build to complete (~2-3 minutes)

## MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is fine)
3. Create database user with password
4. Whitelist all IPs (0.0.0.0/0) or Vercel IPs
5. Get connection string from "Connect" → "Connect your application"
6. Replace `<password>` and `<dbname>` in the connection string

## Post-Deployment

- Visit your deployed URL
- Test theme toggle (sun/moon icon)
- Access admin panel at `/admin/challenge`
- Answer the three questions to access dashboard
- Create your first blog post!

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Ensure MongoDB connection string is correct
- Check Vercel build logs for specific errors

### Can't Access Admin
- Verify environment variables are set correctly
- Try clearing browser cookies
- Check that answers match exactly (case-sensitive)

### Images Not Loading
- Ensure `/public/me.png` exists
- Check Next.js image optimization settings
- Verify remote image URLs are accessible

## Alternative Deployment Platforms

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Railway
```bash
railway login
railway init
railway up
```

### Render
- Connect GitHub repository
- Set environment variables
- Deploy automatically on commits

---

Your portfolio is now live! 🎉
