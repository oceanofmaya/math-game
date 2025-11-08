# Pearl Visual Theme

The "pearl" theme creates a serene, elegant atmosphere with iridescent pearls that roll and bounce around the screen, inspired by natural pearls found in oysters.

## Visual Design

### Elements

Each visual element consists of a **single pearl**:

- **Pearl**: Iridescent sphere (25-60px) with various patterns, inspired by natural pearls
- **No additional particles**: Each set is a single pearl
- Pearls roll and bounce with realistic physics
- **Pearl Types**:
  - **Solid**: Uniform color with iridescent, pearl-like luster
  - **Swirl**: Colorful swirl pattern with conic gradient
  - **Cat's Eye**: Elliptical pattern resembling a cat's eye pearl
- **Color Palette**: Varied glass colors:
  - Blues (`#6495ED`, `#4682B4`, `#87CEEB`)
  - Purples (`#9370DB`, `#BA55D3`)
  - Greens (`#98FB98`, `#90EE90`)
  - Oranges (`#FFA500`, `#FF8C00`)

### Behaviors

#### Birth (Every Correct Answer)

- Creates new pearls on **every correct answer**
- Marble fades in with a scale and rotation animation
- Each pearl has a random size (25-60px) and type (solid, swirl, or cat's eye)
- Random initial rotation
- Marbles move with rolling/bouncing physics
- **Maximum capacity**: 3X pearls (oldest are removed when capacity is reached)
- **Grayscale aging**: New pearls always start in grayscale and remain grayscale until X correct answers after their birth

#### End (Wrong Answers and Skip)

- Wrong answers or skipped questions remove pearls from the display
- Each wrong answer or skip removes one pearl
- Marbles fade out smoothly with rotation animation
- When wrongCount or skipCount reaches X, all remaining pearls are removed and counts reset
- Correct answers reset both wrongCount and skipCount to zero and create new pearls

#### Color (count >= 2X)

- Color effects only apply to pearls that have **aged enough** (birthCount + X ≤ currentCount)
- Marbles change to vibrant, glass-like colors when they reach their aging threshold
- Marble receives colorful gradient based on type
- Removes grayscale filter to reveal glass colors
- Enhanced highlight and shadow effects
- New pearls created after the color phase begins will still start in grayscale and age individually

#### Pulse (count >= 3X)

- Marbles continue to be created on every correct answer
- Pulse effect only applies to pearls that have **aged enough** (age ≥ X)
- Marbles pulse in size (scale 1 to 1.25x)
- Creates a playful, energetic effect
- Newly created pearls (not yet aged) remain static until they age

#### Color Wave (count >= 4X, every X correct answers)

- Color wave applies to **all pearls that have aged enough** (age ≥ X)
- Newly created pearls (not yet aged) remain in grayscale
- Creates a cascading colorful effect across all aged elements

## Visual Characteristics

### Movement

- **Rolling**: Graceful, slow continuous rotation with individual speeds and directions (0.4-1.2 degrees per frame) - each pearl rotates at its own pace and direction for a calming rolling effect
- **Bouncing**: Physics-based bouncing off walls
- **Natural Physics**: Realistic velocity and bouncing behavior
- **Playful Motion**: Energetic, playful movement patterns

### Styling

- **Marble Shape**: Perfect circle
- **Glass Effect**: Transparent/translucent appearance with highlights
- **3D Depth**: Inset shadows and highlights create spherical appearance
- **Patterns**: Three distinct pearl types (solid, swirl, cat's eye)
- **Grayscale Start**: All new pearls begin in grayscale
- **Glass Highlights**: Bright highlight on top creates glass-like reflection

## User Experience

- **Continuous growth**: New pearls appear on every correct answer, creating an ever-evolving playful display
- **Grayscale aging**: Visual elements start muted (grayscale) and automatically become vibrant and glass-like X correct answers after their creation
- **Capacity management**: Maximum of 3X pearls - oldest are automatically removed when capacity is reached, maintaining performance
- **Individual aging**: Each pearl ages independently based on when it was created, creating a dynamic mix of grayscale and colorful elements
- **Pattern variety**: Three pearl types add visual interest
- Wrong answers and skipped questions reduce the visual display
- Multiple effects can stack and combine
- Smooth animations and physics-based movement create an engaging, playful experience
- The hint system informs players about upcoming effects and continuous pearl creation

## Technical Details

- Uses CSS animations and transforms for performance
- Physics simulation for natural rolling and bouncing movement
- RequestAnimationFrame for smooth 60fps animations
- Elements are removed from DOM when ended to prevent memory leaks
- Window resize handling to keep elements within bounds
- **Marble aging system**: Each pearl tracks its `birthCount` to determine when it should transition from grayscale to glass colors
- **Capacity management**: FIFO (First In, First Out) queue removes oldest pearls when maximum capacity (3X) is reached
- **Aging checks**: `updateShapeAging()` is called on every correct answer to check and update pearls that have reached their aging threshold
- **Graceful rotation**: Each pearl rotates at its own unique speed (0.4-1.2 deg/frame) and direction (clockwise or counter-clockwise) with smooth 60fps frame-by-frame updates for calming rolling motion
- **Animation synchronization prevention**: Random animation delays (0-8s) ensure each element moves independently without synchronized patterns
- **Varied velocities**: Increased velocity ranges create more natural, organic rolling patterns
- **3D effects**: Multiple box-shadows create depth and glass-like appearance
- **Collision detection**: Marbles automatically bounce off each other when they come into contact, creating natural physics interactions
