# Deployment

This directory contains guides for deploying the Math Game application.

## Quick Start

The recommended deployment method is **AWS Amplify** for its simplicity and automatic GitHub integration.

### AWS Amplify

- [Complete Amplify Guide](AMPLIFY.md) - Step-by-step instructions for deploying to AWS Amplify

## Overview

The Math Game is a static website that can be hosted on any static hosting service. It requires no server-side processing or build steps.

## Local Testing

Before deploying, test locally using one of these options:

### Option 1: npx (Node.js)

```console
npx serve public
```

### Option 2: Python

```console
python3 -m http.server --directory public 3000
```

### Option 3: Direct File Opening

You can also open `public/index.html` directly in your browser:

```console
open public/index.html
```

Or simply double-click `public/index.html` in your file manager.

> **Note:** While direct file opening works, using a local server (Options 1 or 2) is recommended for a better development experience.

- If using a local server (Options 1 or 2), visit `http://localhost:3000` (or the port shown by your server) to verify everything works.
- If opening the file directly (Option 3), the game will load automatically in your browser.
