# Environment Configuration

## Overview

The Pickard application requires specific environment variables to function correctly. This document outlines all required and optional environment variables for different deployment environments.

## Environment Files

### Local Development
- `.env.local` - Local development environment variables (not tracked in Git)
- `.env.example` - Template file showing required variables (tracked in Git)

### Production
- Environment variables should be configured in your deployment platform (Vercel, Netlify, etc.)
- Never commit production environment variables to version control

## Required Environment Variables

### Database Configuration

#### `DATABASE_URL`
- **Description**: Primary PostgreSQL database connection string
- **Format**: `postgresql://username:password@host:port/database`
- **Example**: `postgresql://user:pass@localhost:5432/pickard_db`
- **Required**: Yes
- **Environment**: All

#### `DIRECT_DATABASE_URL`
- **Description**: Direct database connection for migrations and admin operations
- **Format**: Same as DATABASE_URL
- **Example**: `postgresql://user:pass@localhost:5432/pickard_db`
- **Required**: Yes (for Neon and serverless databases)
- **Environment**: All

### Authentication (Clerk)

#### `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **Description**: Clerk publishable key for client-side authentication
- **Format**: `pk_test_xxxxx` (test) or `pk_live_xxxxx` (production)
- **Required**: Yes
- **Environment**: All
- **Security**: Safe to expose to client

#### `CLERK_SECRET_KEY`
- **Description**: Clerk secret key for server-side operations
- **Format**: `sk_test_xxxxx` (test) or `sk_live_xxxxx` (production)
- **Required**: Yes
- **Environment**: All
- **Security**: ⚠️ KEEP SECRET - Server-side only

#### `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- **Description**: Sign-in page URL
- **Default**: `/sign-in`
- **Required**: No (has default)
- **Environment**: All

#### `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- **Description**: Sign-up page URL
- **Default**: `/sign-up`
- **Required**: No (has default)
- **Environment**: All

#### `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- **Description**: Redirect URL after successful sign-in
- **Default**: `/`
- **Recommended**: `/dashboard` or `/search`
- **Required**: No (has default)
- **Environment**: All

#### `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
- **Description**: Redirect URL after successful sign-up
- **Default**: `/`
- **Recommended**: `/dashboard` or `/onboarding`
- **Required**: No (has default)
- **Environment**: All

### Application Configuration

#### `NEXT_PUBLIC_APP_URL`
- **Description**: Base URL of the application
- **Format**: Full URL including protocol
- **Example**: `https://pickard.example.com` or `http://localhost:3000`
- **Required**: Yes
- **Environment**: All
- **Note**: Used for generating absolute URLs and API calls

#### `NODE_ENV`
- **Description**: Node.js environment mode
- **Values**: `development`, `production`, `test`
- **Required**: No (automatically set by Next.js)
- **Environment**: All

## Optional Environment Variables

#### `NEXT_PUBLIC_DATABASE_MAX_CONNECTIONS`
- **Description**: Maximum number of database connections
- **Default**: `10`
- **Format**: Number
- **Required**: No
- **Environment**: Production

#### `NEXT_PUBLIC_ENABLE_ANALYTICS`
- **Description**: Enable analytics tracking
- **Values**: `true`, `false`
- **Default**: `false`
- **Required**: No
- **Environment**: Production

## Environment Setup Instructions

### 1. Local Development

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual values:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/pickard_dev"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
   CLERK_SECRET_KEY="sk_test_your_secret_here"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. Verify your setup:
   ```bash
   npm run typecheck
   npm run dev
   ```

### 2. Production Deployment

#### Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add each variable with appropriate values
5. Redeploy your application

#### Other Platforms
- Netlify: Site settings → Build & deploy → Environment
- Railway: Project → Variables
- Heroku: Settings → Config Vars

### 3. Database Setup

#### Neon (Recommended)
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string from dashboard
4. Use as both `DATABASE_URL` and `DIRECT_DATABASE_URL`

#### Local PostgreSQL
1. Install PostgreSQL locally
2. Create database: `createdb pickard_dev`
3. Create user with permissions
4. Use connection string format shown above

## Security Best Practices

### ✅ DO
- Use different databases for development/staging/production
- Rotate API keys regularly
- Use environment-specific Clerk projects
- Keep `.env.local` in `.gitignore`
- Use strong, unique passwords for database users
- Enable SSL for production database connections

### ❌ DON'T
- Commit `.env.local` or `.env.production` to Git
- Share secret keys in chat/email
- Use production credentials in development
- Hard-code secrets in source code
- Use weak database passwords
- Disable SSL in production

## Troubleshooting

### Common Issues

#### Database Connection Errors
```
Error: P1001: Can't reach database server
```
**Solution**: Check DATABASE_URL format and network connectivity

#### Clerk Authentication Errors
```
Error: Clerk publishable key not found
```
**Solution**: Verify `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set correctly

#### Build Failures
```
Error: Environment variable required
```
**Solution**: Ensure all required variables are set in deployment platform

### Validation

You can test your environment configuration with:

```bash
# Check if all required variables are set
npm run check-env

# Test database connection
npm run db:studio

# Test authentication
npm run dev
# Then try signing in at http://localhost:3000/sign-in
```

## Environment Variable Checklist

Before deploying, ensure you have:

- [ ] `DATABASE_URL` - Database connection string
- [ ] `DIRECT_DATABASE_URL` - Direct database connection
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- [ ] `CLERK_SECRET_KEY` - Clerk secret key
- [ ] `NEXT_PUBLIC_APP_URL` - Application base URL
- [ ] All URLs end with appropriate paths (no trailing slashes)
- [ ] Production uses `pk_live_` and `sk_live_` keys
- [ ] Development uses `pk_test_` and `sk_test_` keys
- [ ] Database credentials have appropriate permissions
- [ ] SSL is enabled for production database

## Support

If you encounter issues with environment configuration:

1. Review this documentation
2. Check the `.env.example` file for reference
3. Verify your deployment platform's environment variable settings
4. Ensure all required variables are properly set
5. Check application logs for specific error messages