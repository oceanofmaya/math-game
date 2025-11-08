# AWS Amplify Deployment Guide

This guide walks you through deploying the Math Game to AWS Amplify.

## Prerequisites

- AWS account
- GitHub account with the repository pushed

## Why AWS Amplify?

AWS Amplify Hosting is an ideal choice for static websites because:

- Automatic deployments from GitHub
- Built-in CDN with global distribution
- HTTPS by default
- Free tier available (with usage limits)
- Simple setup process
- Custom domain support

## Step 1: Connect to AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Sign in to your AWS account
3. Click "New app" → "Host web app"
4. Choose "GitHub" as your source
5. Authorize AWS Amplify to access your GitHub account
6. Select your repository and branch (main)

## Step 2: Configure Build Settings

AWS Amplify should auto-detect the settings. Verify:

- **Build command**: Leave empty (no build step needed)
- **Output directory**: `public`

If auto-detection doesn't work, use these settings:

```yaml
version: 1
frontend:
  phases:
    build:
      commands:
        - echo "No build step required"
  artifacts:
    baseDirectory: public
    files:
      - '**/*'
  cache:
    paths: []
```

## Step 3: Review and Deploy

1. Review the settings
2. Click "Save and deploy"
3. Wait for the deployment to complete (usually 1-2 minutes)

## Step 4: Access Your Site

Once deployed, AWS Amplify provides:

- A default URL: `https://<branch>.<app-id>.amplifyapp.com`
- Custom domain option (see Step 5)

## Step 5: Custom Domain (Optional)

1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain name
4. Follow the DNS configuration instructions
5. AWS will provide DNS records to add to your domain registrar

## Ongoing Updates

After the initial setup, every push to the connected branch triggers an automatic deployment. You can:

- View deployment history in the Amplify Console
- See build logs for each deployment
- Roll back to previous deployments if needed

## Cost

AWS Amplify Hosting offers a free tier:

- 5 GB storage
- 15 GB served per month
- 1,000 build minutes per month

Beyond the free tier, charges are minimal for small projects. Check the [AWS Amplify pricing page](https://aws.amazon.com/amplify/pricing/) for current rates.

## Troubleshooting

- **Build fails**: Check that the output directory is set to `public`
- **Site not loading**: Verify all files are in the `public` directory
- **Custom domain issues**: Ensure DNS records are correctly configured and propagated
