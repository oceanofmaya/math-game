# Mushroom Visual Theme

The "mushroom" theme creates a natural, earthy atmosphere with organic mushrooms that gently sway and grow on the screen, inspired by forest mushrooms found in nature. The theme features realistic rendering with glossy highlights, detailed gills, fiber textures, and enhanced animations.

## Visual Design

### Elements

Each visual element consists of a **mushroom set**:

- **Mushroom Cap**: Flattened dome shape (30-80px) with earthy, natural colors and realistic lighting
- **Gills**: Detailed pattern underneath the cap with progressive darkening
- **Stem**: Cylindrical stem below the cap with fiber texture, growth rings, and optional ring (annulus)
- **Spots**: 2-5 dark spots on the cap surface with varied sizes and irregular shapes
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
- Gills become visible below the cap
- Stem appears below the cap
- Spots appear on the cap surface with staggered timing
- Each mushroom has a random cap size (30-80px)
- Mushrooms move with gentle, organic swaying patterns
- **Maximum capacity**: 3X mushrooms (oldest are removed when capacity is reached)
- **Grayscale aging**: New mushrooms always start in grayscale and remain grayscale until X correct answers after their birth

#### End (Wrong Answers and Skip)

- Wrong answers or skipped questions remove mushrooms from the display
- Each wrong answer or skip removes one mushroom (cap + gills + stem + spots)
- Mushroom fades out smoothly
- When wrongCount or skipCount reaches X, all remaining mushrooms are removed and counts reset
- Correct answers reset both wrongCount and skipCount to zero and create new mushrooms

#### Color (count >= 2X)

- Color effects only apply to mushrooms that have **aged enough** (birthCount + X ≤ currentCount)
- Mushroom caps change to earthy, natural colors when they reach their aging threshold
- Cap receives earthy brown/red/orange gradient with sophisticated multi-layer lighting
- Gills transition from grayscale to show natural gill coloring
- Stem remains light beige/cream colored with visible texture details
- Spots reveal dark coloring for contrast
- Removes grayscale filter to reveal natural colors
- Enhanced glow effects create a natural, organic appearance
- New mushrooms created after the color phase begins will still start in grayscale and age individually

#### Pulse (count >= 3X)

- Mushrooms continue to be created on every correct answer
- Pulse effect only applies to mushrooms that have **aged enough** (age ≥ X)
- Mushrooms pulse gently in size and brightness (scale 1 to 1.18x)
- Creates a gentle, rhythmic effect with subtle stem flex
- Newly created mushrooms (not yet aged) remain static until they age

#### Color Wave (count >= 4X, every X correct answers)

- Color wave applies to **all mushrooms that have aged enough** (age ≥ X)
- Newly created mushrooms (not yet aged) remain in grayscale
- Creates a cascading natural effect across all aged elements

## Visual Characteristics

### Cap Rendering

- **Glossy Highlights**: Dual light sources create wet, shiny appearance with primary and secondary reflections
- **Vein Patterns**: Subtle radial gradients suggest natural veining and surface texture
- **3D Depth**: Multi-layer lighting model with sophisticated shadow and highlight interplay
- **Surface Texture**: Multi-layered overlays creating micro-bumps and organic variations

### Gills (Underneath Cap)

- **Detailed Pattern**: Realistic gill texture with varied widths and progressive darkening
- **Depth Gradients**: Gills become darker toward the inside, creating realistic shadow effect
- **Top-Down Lighting**: Subtle highlight on gill surface adds realism

### Stem Details

- **Cylindrical Shading**: Pronounced side-to-side lighting creates 3D cylinder effect
- **Growth Rings**: Horizontal banding pattern suggesting natural growth patterns
- **Fiber Texture**: Vertical and directional details mimicking real stem fibers
- **Stem Ring (Annulus)**: Distinctive ring with enhanced shading and shadows, characteristic of some mushroom species

### Spots (Cap Markings)

- **Glossy Highlights**: Each spot has subtle shine creating 3D depth
- **Sophisticated Gradients**: Multi-layer radial gradients for better dimensionality
- **Edge Variations**: Color variations at edges with micro-textures for realism
- **Natural Distribution**: 30% larger clusters, 30% medium, 40% small (realistic sizing distribution)
- **Organic Shapes**: Highly randomized irregular forms instead of perfect circles

### Movement & Animation

- **Gentle Swaying**: Slow, organic movement (0.6 velocity) with gentle direction changes
- **Natural Wandering**: Natural, unpredictable movement patterns
- **Enhanced Sway**: 8-keyframe smooth animation (instead of 4) creating more organic motion
- **Micro-Rotations**: Subtle rotation (up to ±1°) during sway for natural wobble effect
- **Grounded Motion**: Slower, more grounded movement than other themes
- **Earthy Colors**: Browns, reds, and oranges create a natural, forest-like feeling

### Styling

- **Mushroom Cap Size**: Medium (30-80px) - substantial and visible
- **Mushroom Cap Shape**: Flattened dome with slight randomized variations for organic feel (±5%)
- **Stem**: Cylindrical with subtle shape variations, light beige/cream colored
- **Gills**: Realistic pattern visible underneath cap
- **Spots**: Irregularly shaped dark spots on cap surface with varied sizes
- **Grayscale Start**: All new mushrooms begin in grayscale
- **Natural Effect**: Earthy, organic appearance accurately simulates real forest mushrooms
- **Pulse Animation**: Refined, natural pulse (1.18x scale) with subtle brightness transitions (1.0 → 1.08)
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

### Rendering & Performance

- Uses CSS animations and transforms for optimal performance
- Multi-layered background gradients for realistic 3D effects
- Pseudo-elements (`::before`, `::after`) for gills, textures, and surface details
- Physics simulation for organic, swaying movement
- RequestAnimationFrame for smooth 60fps animations
- Elements are removed from DOM when ended to prevent memory leaks
- Window resize handling to keep elements within bounds

### Shape & Positioning

- **Randomized Cap Shape**: Each cap gets slight border-radius variations (±5%) for organic feel
- **Randomized Stem Shape**: Stem shape variations (±4%) for naturalistic appearance
- **Irregular Spot Shapes**: Each spot uses unique randomized border-radius across 8 corners
- **Spot Rotations**: Random rotation (0-360°) applied to each spot for variety
- **Spot Size Distribution**: Realistic distribution with larger, medium, and small spots
- **Individual positioning**: Stem is positioned directly below cap, spots are positioned on cap surface

### Lifecycle Management

- **Mushroom aging system**: Each mushroom tracks its `birthCount` to determine when it should transition from grayscale to earthy colors
- **Capacity management**: FIFO (First In, First Out) queue removes oldest mushrooms when maximum capacity (3X) is reached
- **Aging checks**: `updateShapeAging()` is called on every correct answer to check and update mushrooms that have reached their aging threshold
- **Color application**: Earthy colors are applied progressively as mushrooms age through the lifecycle

### Animation System

- **Animation synchronization prevention**: Random animation delays (0-8s) ensure each element moves independently
- **Varied velocities**: Slower velocity ranges (0.6 multiplier) create more natural, grounded movement
- **Enhanced sway animation**: 8-keyframe smooth transitions for fluid organic movement
- **Micro-rotation in sway**: Gentle rotation (±1°) combined with translation for natural wobble
- **Stem flex animation**: Stem stretches proportionally (scaleY) during cap movements, mimicking real physics
- **Pulse animation**: Natural scale (1.18x max) with subtle brightness transitions for gentle effect

### Advanced Features

- **Collision detection**: Mushrooms automatically bounce off each other when they come into contact
- **Edge bouncing**: Elements bounce off viewport boundaries for contained movement
- **Grayscale-to-color aging**: New mushrooms start in grayscale and progressively reveal earthy colors
- **Multi-layered lighting**: Complex gradient system creates sophisticated 3D appearance
