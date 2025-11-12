# Changelog

## Version 1

### 1.1.9 - 2025-11-12

#### Bug Fixes

- Fixed jellyfish theme positioning and movement issues caused by excessive shadow extent padding

### 1.1.8 - 2025-11-12

#### Bug Fixes

- Fixed scrollbars appearing and causing UI shifts for jellyfish, mushroom, firefly, and pearl themes

### 1.1.7 - 2025-11-12

#### Updates

- Changed default operation from multiplication to mixed operations

### 1.1.6 - 2025-11-11

#### Bug Fixes

- Fixed scrollbars appearing and causing UI shifts when using maple theme

### 1.1.5 - 2025-11-11

#### Bug Fixes

- Fixed background color inconsistency when scrolling on mobile devices

### 1.1.4 - 2025-11-12

#### Bug Fixes

- Further improve mobile scroll behavior: reliably return to top after keyboard dismissal and preserve access to title/score while inputs are focused

### 1.1.3 - 2025-11-11

#### Bug Fixes

- Fixed mobile scroll behavior - title and score remain accessible when keyboard appears, and form reliably scrolls to top when keyboard is dismissed

### 1.1.2 - 2025-11-11

#### Bug Fixes

- Improved mobile scroll behavior - users can now manually scroll to top while keyboard is visible, and form automatically scrolls to top when keyboard is dismissed

### 1.1.1 - 2025-11-11

#### Bug Fixes

- Fixed mobile scroll issue - users can now scroll back to top after keyboard appears when focusing max number input

### 1.1.0 - 2025-11-11

#### Features

- Added Mixed Operations mode (±) - randomly selects from all four operations for each question, with dynamic operation symbol display
- Added Timed Mode (⏱) - answer as many questions as possible within a 5-minute time limit with timer display and session results

### 1.0.7 - 2025-11-11

#### Bug Fixes

- Fixed mode switching issue - MathGame counts now properly reset when switching from sample mode back to game mode

#### Audio Improvements

- Increased firefly theme music volume to 50% (from 30%) to compensate for the softer track

### 1.0.6 - 2025-11-11

#### UI/UX Improvements

- Fixed operation button alignment on mobile devices - active and inactive buttons now maintain consistent dimensions
- Improved button consistency across all button types (operation, submit, skip, reset, change max number) with consistent borders and box-sizing
- Cleaned up redundant CSS properties in button styling

#### Visual Effects Improvements

- Enhanced color wave ripple effect with more natural animation timing and smoother opacity fade
- Visual elements now change colors when ripple effect completes, creating a more cohesive visual experience
- Improved ripple animation with gradual opacity transitions and natural easing curves

### 1.0.5 - 2025-11-11

#### UI/UX Improvements

- Fixed mobile button alignment issue for mode toggle buttons (Game/Sample/Music/Help) - selected buttons now maintain consistent dimensions
- Ensured all mode buttons have consistent borders and box-sizing across all states and breakpoints

### 1.0.4 - 2025-11-11

#### UI/UX Improvements

- Fixed mobile button alignment issue for operation buttons - selected buttons now maintain consistent dimensions
- Enhanced fieldset borders with softer appearance and subtle shadow for better visual depth

### 1.0.3 - 2025-11-10

#### Improvements

- Increased music volume from 25% to 30% for better audio presence

### 1.0.2 - 2025-11-10

#### Accessibility Improvements

- Added keyboard navigation support for all interactive elements
- Improved color contrast to meet WCAG AA standards
- Added ARIA labels and roles for screen reader support
- Added visible focus indicators for keyboard navigation
- Added support for reduced motion preferences

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
