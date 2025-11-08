# Mushroom Visual Theme

The "mushroom" theme creates a natural, earthy atmosphere with organic mushrooms that gently sway and grow on the screen, inspired by forest mushrooms found in nature.

## Visual Design

### Elements

Each visual element consists of a **mushroom set**:

- **Mushroom Cap**: Flattened dome shape (30-80px) with earthy, natural colors
- **Stem**: Cylindrical stem below the cap, light beige/cream colored
- **Spots**: 2-5 dark spots on the cap surface (8-20% of cap size)
- All elements move together as a unit
- **Color Palette**: Earthy, natural colors:
  - Browns (`#966F33`, `#8B4513`, `#A0522D`)
  - Reds (`#CD5C5C`, `#DC143C`, `#B22222`)
  - Oranges (`#FF8C00`, `#FF7F50`)
  - Beiges (`#F5DEB3`, `#DEB887`)

### Behaviors

#### Birth (Every Correct Answer)

- Creates new mushrooms on **every correct answer**
- Mushroom cap fades in with a gentle scale animation
- Stem appears below the cap
- Spots appear on the cap surface with staggered timing
- Each mushroom has a random cap size (30-80px)
- Mushrooms move with gentle, organic swaying patterns
- **Maximum capacity**: 3X mushrooms (oldest are removed when capacity is reached)
- **Grayscale aging**: New mushrooms always start in grayscale and remain grayscale until X correct answers after their birth

#### End (Wrong Answers and Skip)

- Wrong answers or skipped questions remove mushrooms from the display
- Each wrong answer or skip removes one mushroom (cap + stem + spots)
- Mushroom fades out smoothly
- When wrongCount or skipCount reaches X, all remaining mushrooms are removed and counts reset
- Correct answers reset both wrongCount and skipCount to zero and create new mushrooms

#### Color (count >= 2X)

- Color effects only apply to mushrooms that have **aged enough** (birthCount + X ≤ currentCount)
- Mushroom caps change to earthy, natural colors when they reach their aging threshold
- Cap receives earthy brown/red/orange gradient
- Stem remains light beige/cream colored
- Spots remain dark for contrast
- Removes grayscale filter to reveal natural colors
- Enhanced glow effects create a natural, organic appearance
- New mushrooms created after the color phase begins will still start in grayscale and age individually

#### Pulse (count >= 3X)

- Mushrooms continue to be created on every correct answer
- Pulse effect only applies to mushrooms that have **aged enough** (age ≥ X)
- Mushrooms pulse in size and brightness (scale 1 to 1.15x)
- Creates a gentle, rhythmic effect
- Newly created mushrooms (not yet aged) remain static until they age

#### Color Wave (count >= 4X, every X correct answers)

- Color wave applies to **all mushrooms that have aged enough** (age ≥ X)
- Newly created mushrooms (not yet aged) remain in grayscale
- Creates a cascading natural effect across all aged elements

## Visual Characteristics

### Movement

- **Gentle Swaying**: Slow, organic movement (0.6 velocity) with gentle direction changes
- **Natural Wandering**: Natural, unpredictable movement patterns
- **Grounded Motion**: Slower, more grounded movement than other themes
- **Earthy Colors**: Browns, reds, and oranges create a natural, forest-like feeling

### Styling

- **Mushroom Cap Size**: Medium (30-80px) - substantial and visible
- **Mushroom Cap Shape**: Flattened dome with rounded edges
- **Stem**: Cylindrical, light beige/cream colored
- **Spots**: Dark brown/black spots on cap surface
- **Grayscale Start**: All new mushrooms begin in grayscale
- **Natural Effect**: Earthy, organic appearance simulates forest mushrooms
- **Gentle Movement**: Slow, swaying motion creates a calming, natural feel

## User Experience

- **Continuous growth**: New mushrooms appear on every correct answer, creating an ever-evolving natural display
- **Grayscale aging**: Visual elements start muted (grayscale) and automatically become earthy and vibrant X correct answers after their creation
- **Capacity management**: Maximum of 3X mushrooms - oldest are automatically removed when capacity is reached, maintaining performance
- **Individual aging**: Each mushroom ages independently based on when it was created, creating a dynamic mix of grayscale and earthy colorful elements
- Wrong answers and skipped questions reduce the visual display
- Multiple effects can stack and combine
- Smooth animations and organic physics-based movement create an engaging, natural experience
- The hint system informs players about upcoming effects and continuous mushroom creation

## Technical Details

- Uses CSS animations and transforms for performance
- Physics simulation for organic, swaying movement
- RequestAnimationFrame for smooth 60fps animations
- Elements are removed from DOM when ended to prevent memory leaks
- Window resize handling to keep elements within bounds
- **Mushroom aging system**: Each mushroom tracks its `birthCount` to determine when it should transition from grayscale to earthy colors
- **Capacity management**: FIFO (First In, First Out) queue removes oldest mushrooms when maximum capacity (3X) is reached
- **Aging checks**: `updateShapeAging()` is called on every correct answer to check and update mushrooms that have reached their aging threshold
- **Individual positioning**: Stem is positioned directly below cap, spots are positioned on cap surface
- **Animation synchronization prevention**: Random animation delays (0-8s) ensure each element moves independently without synchronized patterns
- **Varied velocities**: Slower velocity ranges create more natural, grounded movement patterns
- **Collision detection**: Mushrooms automatically bounce off each other when they come into contact, creating natural physics interactions

