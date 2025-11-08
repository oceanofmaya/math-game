# Firefly Visual Theme

The "firefly" theme creates a warm, nostalgic atmosphere with small glowing orbs that drift organically and pulse with gentle bioluminescent light.

## Visual Design

### Elements

Each visual element consists of a **paired set**:

- **Firefly**: Small glowing orb (8-20px) with warm, organic light
- **Trails**: 1-2 soft trailing particles that follow behind the firefly
- Both elements move together as a unit, with trails appearing to trail behind
- **Color Palette**: Warm, bioluminescent colors:
  - Warm Yellow (`#FFC800`, `#FFE100`)
  - Orange (`#FF8C00`, `#FFA500`)
  - Warm Green (`#ADFF2F`, `#9ACD32`)

### Behaviors

#### Birth (Every Correct Answer)

- Creates new fireflies on **every correct answer**
- Firefly fades in with a gentle scale animation
- Trailing particles appear with staggered timing
- Each firefly has a random size (8-20px)
- Individual pulsing rhythm for each firefly (1.5-3.5s cycle)
- Fireflies move with organic, wandering patterns
- **Maximum capacity**: 3X fireflies (oldest are removed when capacity is reached)
- **Grayscale aging**: New fireflies always start in grayscale and remain grayscale until X correct answers after their birth

#### End (Wrong Answers and Skip)

- Wrong answers or skipped questions remove fireflies from the display
- Each wrong answer or skip removes one firefly (with its trails)
- Firefly and trails fade out smoothly
- When wrongCount or skipCount reaches X, all remaining fireflies are removed and counts reset
- Correct answers reset both wrongCount and skipCount to zero and create new fireflies

#### Color (count >= 2X)

- Color effects only apply to fireflies that have **aged enough** (birthCount + X ≤ currentCount)
- Fireflies change to warm, bioluminescent colors when they reach their aging threshold
- Firefly receives warm yellow/orange/green glow
- Trailing particles receive matching warm colors
- Removes grayscale filter to reveal warm colors
- Enhanced glow effects create a bioluminescent appearance
- New fireflies created after the color phase begins will still start in grayscale and age individually

#### Pulse (count >= 3X)

- Fireflies continue to be created on every correct answer
- Pulse effect only applies to fireflies that have **aged enough** (age ≥ X)
- Fireflies pulse in size and brightness (scale 1 to 1.4x)
- Individual pulsing rhythms create organic, natural feeling
- Creates a warm, rhythmic effect
- Newly created fireflies (not yet aged) remain static until they age

#### Color Wave (count >= 4X, every X correct answers)

- Color wave applies to **all fireflies that have aged enough** (age ≥ X)
- Newly created fireflies (not yet aged) remain in grayscale
- Creates a cascading warm glow effect across all aged elements

## Visual Characteristics

### Movement

- **Quick Darting**: Fast, erratic movement (1.2 velocity) with quick direction changes
- **Organic Wandering**: Natural, unpredictable movement patterns
- **Individual Pulsing**: Each firefly has its own pulsing rhythm (1.5-3.5s cycle)
- **Trailing**: Soft light streaks follow behind fireflies, creating a bioluminescent trail effect
- **Warm Colors**: Yellow, orange, and warm green tones create a nostalgic, natural feeling

### Styling

- **Firefly Size**: Small (8-20px) - compact and subtle
- **Firefly Shape**: Perfect circle with radial gradient glow
- **Trails**: Small circular particles (4-8px) with soft fade that trail behind
- **Grayscale Start**: All new fireflies begin in grayscale
- **Bioluminescent Effect**: Warm, organic glow simulates natural firefly light
- **Fast Movement**: Quick, darting motion creates a dynamic, energetic feel

## User Experience

- **Continuous growth**: New fireflies appear on every correct answer, creating an ever-evolving warm display
- **Grayscale aging**: Visual elements start muted (grayscale) and automatically become warm and vibrant X correct answers after their creation
- **Capacity management**: Maximum of 3X fireflies - oldest are automatically removed when capacity is reached, maintaining performance
- **Individual aging**: Each firefly ages independently based on when it was created, creating a dynamic mix of grayscale and warm colorful elements
- Wrong answers and skipped questions reduce the visual display
- Multiple effects can stack and combine
- Smooth animations and organic physics-based movement create an engaging, nostalgic experience
- The hint system informs players about upcoming effects and continuous firefly creation

## Technical Details

- Uses CSS animations and transforms for performance
- Physics simulation for organic, wandering movement
- RequestAnimationFrame for smooth 60fps animations
- Elements are removed from DOM when ended to prevent memory leaks
- Window resize handling to keep elements within bounds
- **Firefly aging system**: Each firefly tracks its `birthCount` to determine when it should transition from grayscale to warm colors
- **Capacity management**: FIFO (First In, First Out) queue removes oldest fireflies when maximum capacity (3X) is reached
- **Aging checks**: `updateShapeAging()` is called on every correct answer to check and update fireflies that have reached their aging threshold
- **Individual pulsing**: Each firefly has its own pulse speed and offset for natural variation
- **Animation synchronization prevention**: Random animation delays (0-6s) ensure each element moves independently without synchronized patterns
- **Varied velocities**: Increased velocity ranges create more natural, organic darting movement patterns
- **Collision detection**: Fireflies automatically bounce off each other when they come into contact, creating natural physics interactions
