# Deployment Guide

This guide will help you deploy the Security Configuration Platform to Vercel (frontend) and Railway (backend).

## Prerequisites

1. A GitHub account
2. A Vercel account (free)
3. A Railway.app account (free)
4. Docker installed locally (for testing)

## Step 1: Prepare Your Repository

1. **Push Your Code to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Verify Your Repository Structure**
   ```
   security-config-platform/
   ├── src/
   │   ├── frontend/
   │   └── backend/
   ├── docker/
   ├── docs/
   └── .github/
   ```

## Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - It's completely free!

2. **Import Your Repository**

   - Click "New Project"
   - Select your GitHub repository
   - Select the `src/frontend` directory
   - Click "Deploy"
   - Vercel will automatically detect it's a Next.js app

3. **Configure Environment Variables**

   - Go to Project Settings > Environment Variables
   - Add these variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-railway-app-url.railway.app
     ```

4. **Verify Deployment**
   - Visit your Vercel URL
   - Check the deployment logs
   - Test the application

## Step 3: Deploy Backend to Railway

1. **Create Railway Account**

   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account
   - It's free to start!

2. **Create New Project**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Select the `src/backend` directory

3. **Add PostgreSQL Database**

   - Click "New"
   - Select "Database"
   - Choose "PostgreSQL"
   - Railway will create it automatically

4. **Add Redis Cache**

   - Click "New"
   - Select "Database"
   - Choose "Redis"
   - Railway will create it automatically

5. **Configure Environment Variables**

   - Go to Project Settings > Variables
   - Add these variables:
     ```
     NODE_ENV=production
     DATABASE_URL=your-postgresql-url
     REDIS_URL=your-redis-url
     JWT_SECRET=your-secret-key
     CORS_ORIGIN=https://your-vercel-app-url.vercel.app
     ```

6. **Verify Deployment**
   - Check the deployment logs
   - Test the API endpoints
   - Monitor the application

## Step 4: Test the Deployment

1. **Test Frontend-Backend Connection**

   - Visit your Vercel frontend URL
   - Try to log in
   - Create a new configuration
   - Verify everything works

2. **Check Database Connection**

   - Monitor Railway logs
   - Verify database migrations
   - Check Redis connection

3. **Test API Endpoints**
   - Visit your Railway API URL
   - Test the health endpoint
   - Check API documentation

## Step 5: Set Up Monitoring

1. **Vercel Analytics**

   - Enable Analytics in Vercel
   - Monitor performance
   - Check error rates

2. **Railway Monitoring**
   - Check resource usage
   - Monitor logs
   - Set up alerts

## Common Issues and Solutions

### Frontend Issues

1. **API Connection Errors**

   - Verify `NEXT_PUBLIC_API_URL`
   - Check CORS settings
   - Verify SSL certificates

2. **Build Failures**
   - Check build logs
   - Verify dependencies
   - Fix TypeScript errors

### Backend Issues

1. **Database Connection**

   - Verify `DATABASE_URL`
   - Check database status
   - Monitor connection pool

2. **Redis Connection**
   - Verify `REDIS_URL`
   - Check Redis status
   - Monitor memory usage

## Maintenance

1. **Regular Updates**

   - Update dependencies
   - Apply security patches
   - Monitor resource usage

2. **Backups**

   - Enable database backups
   - Monitor backup status
   - Test restore process

3. **Monitoring**
   - Check error rates
   - Monitor performance
   - Set up alerts

## Security Considerations

1. **Environment Variables**

   - Use secure secrets
   - Rotate keys regularly
   - Monitor access

2. **Access Control**
   - Enable 2FA
   - Use strong passwords
   - Regular security audits

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [GitHub Issues](https://github.com/robbedell/security-config-platform/issues)
- [Project Documentation](https://robbedell.github.io/security-config-platform)

Remember: Always test in a staging environment before deploying to production!
