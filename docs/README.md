# Documentation

Welcome to the Math Game documentation. This directory contains documentation for features, deployment, and development guidelines.

## Directory Structure

```console
math-game/
├── public/                     # Main application directory
│   ├── css/                    # Stylesheets
│   │   └── visual-themes/      # Theme-specific styles
│   ├── js/                     # JavaScript files
│   │   └── visual-themes/      # Visual theme implementations
│   ├── sounds/                 # Audio files
│   │   └── music/              # Theme music tracks
│   ├── robots.txt              # Search engine crawler guidance
│   └── sitemap.xml             # SEO sitemap for search engines
├── scripts/                    # Utility scripts
│   └── generate-sitemap.sh     # Script to generate sitemap with current date
└── docs/                       # Documentation
    ├── features/               # Feature documentation
    │   ├── visual-themes/      # Visual themes system
    │   └── sounds/             # Sound system
    └── deployment/             # Deployment guides
```

## Features

### Game Features

Core game functionality and question generation:

- [Game Features](features/GAME.md) - Question generation, duplicate prevention, answer validation, and score tracking

### Visual Themes

The visual themes system provides extensible visual feedback based on player performance:

- [Visual Themes Framework](features/visual-themes/README.md) - Complete guide to the visual themes system
- [Jellyfish Theme](features/visual-themes/JELLYFISH.md) - Documentation for the Jellyfish theme implementation
- [Firefly Theme](features/visual-themes/FIREFLY.md) - Documentation for the Firefly theme implementation
- [Pearl Theme](features/visual-themes/PEARL.md) - Documentation for the Pearl theme implementation
- [Mushroom Theme](features/visual-themes/MUSHROOM.md) - Documentation for the Mushroom theme implementation

### Sound System

The sound system provides ambient theme music for each visual theme:

- [Sound System Guide](features/sounds/README.md) - Complete guide to the sound system, including music sources, licensing, and implementation details

## Deployment

- [Deployment Overview](deployment/README.md) - Quick start guide for deploying the application
- [AWS Amplify](deployment/AMPLIFY.md) - Detailed guide for deploying to AWS Amplify
