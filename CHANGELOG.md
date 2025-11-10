# Changelog

## Version 1

### 1.0.1 - 2025-11-10

#### Bug Fixes

- Fixed hint system not resetting when visuals reset after 5 wrong/skip answers
- Fixed visual reset logic to trigger when total wrong + skip reaches X (5), not when either individually reaches X
- Fixed double-increment bug where wrong/skip/correct counts were incremented twice (once in MathGame, once in Visual Manager)

#### UI/UX Improvements

- Enhanced color wave with cascading animation (50ms delays) and pulse effects, plus background ripple circles

### 1.0.0 - 2025-11-08

Initial release of Math Game - an interactive math practice tool with engaging visual feedback.

#### Features

- Core math game with configurable number range (supports addition, subtraction, multiplication, and division)
- **Duplicate Question Prevention**: Intelligent question generation system that avoids recently asked questions
  - Dynamic history size based on operation type and maximum number range
  - Ensures variety by tracking last N questions (75% of possible questions, with bounds)
  - Normalizes commutative operations (addition, multiplication) to treat `3+5` and `5+3` as the same
  - Automatically resets history when operation or max factor changes
- Answer validation with correct/wrong/skip tracking
- Visual theme system framework for extensible visual effects
- Five visual themes:
  - **Jellyfish**: Organic jellyfish with flowing tentacles and graceful floating motion, enhanced bell pulsing
  - **Firefly**: Warm, bioluminescent orbs with organic wandering movement and individual pulsing rhythms
  - **Pearl**: Iridescent pearls with rolling and bouncing physics, inspired by natural pearls
  - **Mushroom**: Natural, earthy mushrooms with gentle swaying motion, organic growth effects, and enhanced pulse animations
  - **Maple**: Autumnal maple leaves with SVG-based 5-lobed design (40-95px), sophisticated multi-layered breeze physics for graceful full-screen movement, magical fast rotation (0.4-1.6 deg/frame), enhanced visual details (radial gradients, texture overlays, detailed vein structure), and natural autumn color palette with dynamic RGB mixing
- All themes follow the same base theme architecture and support the full lifecycle (birth, color, pulse, wave)
- All themes support the grayscale-to-color aging system and capacity management (3X maximum)
- Elements fade out smoothly when removed due to capacity management or wrong answers
- **Collision Detection**: Visual elements automatically detect collisions and bounce off each other, similar to edge bouncing, creating natural physics interactions
- **Sample Mode**: Interactive testing mode for visual themes
  - Toggle between game mode and sample mode using buttons
  - Supports 1-20 visual elements simultaneously (controlled by dropdown)
  - Buttons to test each lifecycle stage (Birth, Age, Color, Pulse, Color Wave, Kill, Reset)
  - Allows independent testing of visual effects without playing the game
  - Theme switching works seamlessly in sample mode
- Dynamic hint system informing users about upcoming visual effects
- **Sound System**: Theme music for each visual theme
  - Unique ambient music tracks for Jellyfish, Firefly, Pearl, Mushroom, and Maple themes
  - Calming, nature-inspired music that loops seamlessly
  - Music plays automatically when themes are selected (after user interaction)
  - Volume controlled at 25% for non-intrusive background ambiance
- Reset functionality
- Responsive design optimized for mobile and desktop

#### Technical Details

- Pure static site architecture (no build step required)
- Extensible visual theme framework allowing for custom themes
- Sound system with theme-specific music tracks
- Colorblind-friendly color scheme (blue for success indicators)
- MIT License

#### Documentation

- Game features documentation:
  - `docs/features/GAME.md` - Question generation, duplicate prevention, answer validation, and score tracking
- Comprehensive visual themes framework documentation
- Theme implementation guides for all five themes:
  - `docs/features/visual-themes/JELLYFISH.md`
  - `docs/features/visual-themes/FIREFLY.md`
  - `docs/features/visual-themes/PEARL.md`
  - `docs/features/visual-themes/MUSHROOM.md`
  - `docs/features/visual-themes/MAPLE.md`
- Sound system documentation:
  - `docs/features/sounds/README.md` - Complete guide to the sound system, music sources, and licensing
- AWS Amplify deployment documentation
- AI agent coding guidelines (`.github/AGENTS.md`)
- Organized documentation structure for future features

#### Deployment

- Static site ready for deployment
- AWS Amplify deployment guide included
- Multiple local development server options documented
