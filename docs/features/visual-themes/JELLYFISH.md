# Jellyfish Visual Theme

The "jellyfish" theme is an elegant, ocean-inspired visual effect system that adds floating jellyfish (bell-shaped bodies with flowing tentacles) to the math game.

## Visual Design

### Elements

Each visual element consists of a **jellyfish**:

- **Bell (Umbrella)**: Elliptical, flattened body that represents the jellyfish's main body
- **Tentacles**: 4-8 flowing tendrils that hang down from the bell
- Both elements move together as a unit, with tentacles swaying gracefully
- **Color Palette**: Bioluminescent, ocean-inspired colors:
  - Pink (`#FF6B9D`, `#C44569`)
  - Yellow (`#F8B500`)
  - Cyan (`#4ECDC4`, `#95E1D3`)
  - Purple (`#AA96DA`)
  - Light Pink (`#FCBAD3`, `#FFC6FF`)

### Behaviors

#### Birth (Every Correct Answer)

- Creates new jellyfish on **every correct answer**
- Bell fades in with a scale animation from below
- Tentacles appear with staggered timing (40ms delay between each)
- Each jellyfish has a random size (bell: 25-55px)
- Tentacles hang down from the bell and sway with water-like motion
- Bell and tentacles move together as a paired unit
- **Maximum capacity**: 3X jellyfish (oldest are removed when capacity is reached)
- **Grayscale aging**: New jellyfish always start in grayscale and remain grayscale until X correct answers after their birth
- Each jellyfish tracks its `birthCount` to determine when it has aged enough to become colorful

#### End (wrong answers and skip)

- Wrong answers or skipped questions remove jellyfish from the display
- Each wrong answer or skip removes one jellyfish (bell + tentacles)
- Bell and tentacles fade out smoothly
- When wrongCount or skipCount reaches X, all remaining jellyfish are removed and counts reset
- Correct answers reset both wrongCount and skipCount to zero and create new jellyfish

#### Color (count >= 2X)

- Color effects only apply to jellyfish that have **aged enough** (birthCount + X ≤ currentCount)
- Jellyfish change to vibrant bioluminescent colors when they reach their aging threshold
- Bell receives a new gradient with bioluminescent glow effect
- All tentacles in each jellyfish receive matching colors
- Color selection cycles through the palette
- Removes grayscale filter to reveal colors
- Enhanced glow effects create a bioluminescent appearance
- **Optimized for color visibility**: Bell styling uses reduced opacity (0.7 for base bell, 0.5-0.4 for pseudo-elements) and moderate white intensity to ensure colors remain vibrant and visible, not washed out by white overlays
- New jellyfish created after the color phase begins will still start in grayscale and age individually

#### Pulse (count >= 3X)

- Jellyfish continue to be created on every correct answer
- Pulse effect only applies to jellyfish that have **aged enough** (age ≥ X)
- **Continuous pulse**: All jellyfish bells have a gentle continuous pulse (scale 1.0 to 1.25x, 25% expansion) with a 5-second cycle
- **Triggered pulse**: When pulse effect is activated, bells expand and contract gracefully with a rhythmic breathing motion (scale 1.0 to 1.28x, 28% expansion) with a smooth 3.5-second cycle
- 4-stage smooth animation (0% → 25% → 50% → 75% → 100%) creates natural expand/contract rhythm
- Enhanced glow effects with multiple shadow layers that progressively expand with the bell
- Brightness filter pulses from 1.0 to 1.15 (continuous) and up to 1.12 (triggered) for noticeable but graceful bioluminescent effect
- **Color preservation**: Pulse effects use reduced white glow intensity to preserve color visibility - bioluminescent colors remain vibrant and visible during pulse
- Tentacles maintain their natural waving motion during pulse while also showing enhanced glow effects, with varied animation durations (4.5-5.5s) to prevent synchronization
- Creates a graceful, rhythmic breathing effect like bioluminescent pulsing with smooth, noticeable expand/contract motion
- Newly created jellyfish (not yet aged) have the continuous pulse but remain in grayscale until they age

#### Color Wave (count >= 4X, every X correct answers)

- Color wave applies to **all jellyfish that have aged enough** (age ≥ X)
- Newly created jellyfish (not yet aged) remain in grayscale
- Creates a cascading bioluminescent effect across all aged jellyfish

## Visual Characteristics

### Movement

- **Floating**: Gentle upward floating tendency with slow horizontal drift
- **Bell Animation**: Continuous floating animation (8s cycle) with vertical movement and random animation delays to prevent synchronization
- **Tentacle Waving**: Smooth wave motion (3s cycle) creating a water-like effect
- **Rotation**: Graceful, very slow rotation with individual speeds and directions (0.1-0.3 degrees per frame) - each jellyfish rotates at its own pace and direction

### Styling

- **Bell Shape**: Elliptical with flattened profile, creating a more subtle umbrella appearance without excessive depth
- **Tentacles**: Thin, vertical lines with gradient opacity from top to bottom
- **Grayscale Start**: All new jellyfish begin in grayscale
- **Bioluminescence**: Colorful jellyfish have enhanced glow effects simulating bioluminescence
- **Reduced Opacity**: Bell uses 0.7 opacity (0.5-0.4 for pseudo-elements) for a more transparent, ethereal appearance while maintaining visibility
- **Balanced White Intensity**: Bell styling uses significantly reduced white opacity (max 0.45 in glow effects, reduced inset shadows) to prevent overwhelming whiteness and ensure bioluminescent colors remain vibrant and visible
- **Flattened Design**: Reduced border-radius vertical curvature and minimized depth shadows create a flatter, more ethereal appearance while maintaining the jellyfish silhouette

## User Experience

- **Continuous growth**: New jellyfish appear on every correct answer, creating an ever-evolving underwater scene
- **Grayscale aging**: Visual elements start muted (grayscale) and automatically become vibrant X correct answers after their creation
- **Capacity management**: Maximum of 3X jellyfish - oldest are automatically removed when capacity is reached, maintaining performance
- **Individual aging**: Each jellyfish ages independently based on when it was created, creating a dynamic mix of grayscale and colorful elements
- Wrong answers and skipped questions reduce the visual display
- Multiple effects can stack and combine
- Smooth animations and physics-based movement create an engaging, underwater experience
- The hint system informs players about upcoming effects and continuous jellyfish creation

## Technical Details

- Uses CSS animations and transforms for performance
- Physics simulation for natural floating and movement
- RequestAnimationFrame for smooth 60fps animations
- Elements are removed from DOM when ended to prevent memory leaks
- Window resize handling to keep elements within bounds
- **Shape aging system**: Each jellyfish tracks its `birthCount` to determine when it should transition from grayscale to color
- **Capacity management**: FIFO (First In, First Out) queue removes oldest jellyfish when maximum capacity (3X) is reached
- **Aging checks**: `updateShapeAging()` is called on every correct answer to check and update jellyfish that have reached their aging threshold
- **Enhanced bell pulse**:
  - Continuous pulse: 4-stage animation with scale changes from 1.0 to 1.25 (25% expansion), 5-second cycle, with enhanced glow effects and brightness filters
  - Triggered pulse: Graceful 4-stage expand/contract animation with scale changes from 1.0 to 1.28 (28% expansion), 3.5-second cycle, creating smooth rhythmic breathing motion
  - Both animations create clearly visible expand/contract motion simulating bioluminescent pulsing
  - **Color-preserving glow**: Pulse effects use significantly reduced white glow opacity (max 0.45 instead of 0.9) and moderate brightness (max 1.15 for continuous, 1.12 for triggered) to preserve bioluminescent color visibility during pulse
  - Tentacles maintain natural wave motion with varied durations (4.5-5.5s) to prevent synchronization, while pulse effects enhance glow and opacity
- **Graceful rotation**: Each jellyfish rotates at its own unique speed (0.1-0.3 deg/frame) and direction (clockwise or counter-clockwise) with smooth 60fps frame-by-frame updates for very calming, graceful movement
- **Animation synchronization prevention**: Random animation delays (0-8s) ensure each element moves independently without synchronized patterns
- **Varied velocities**: Increased velocity ranges create more natural, organic floating patterns
- **Movement range preservation**: Boundary collision detection uses base bell dimensions (not scaled size) to ensure jellyfish maintain full movement range even when scaled up during pulse animations, preventing pulse scale from reducing screen coverage
- **Collision detection**: Jellyfish automatically bounce off each other when they come into contact, creating natural physics interactions
