# Maple Visual Theme

The "maple" theme creates an autumnal, magical atmosphere with maple leaves that float gracefully in a varied breeze, swirling and dancing throughout the screen like autumn leaves caught in a gentle wind.

## Visual Design

### Elements

Each visual element is a **single maple leaf**:

- **Maple Leaf**: Classic 5-lobed maple leaf shape (40-95px) with natural autumn colors
- **SVG-Based Design**: Inline SVG with refined path data for authentic maple leaf silhouette
- **Natural Proportions**: Leaves are 20% wider than tall (1.2:1 ratio) for realistic appearance
- **Enhanced Detail**: Radial gradients, texture overlays, and detailed vein structure create depth and realism
- **Color Palette**: Autumn, natural colors:
  - Reds (`#DC143C`, `#CD5C5C`, `#B22222`)
  - Oranges (`#FF8C00`, `#FF7F50`, `#FF6347`)
  - Yellows (`#FFD700`, `#FFA500`, `#FFD700`)
  - Browns (`#8B4513`, `#A0522D`, `#CD853F`)

### Behaviors

#### Birth (Every Correct Answer)

- Creates new maple leaves on **every correct answer**
- Each maple leaf has a random size (40-95px) and initial rotation
- Maple leaves start in grayscale (50% opacity) and gradually gain color as they age
- **Maximum capacity**: 3X maple leaves (oldest are removed when capacity is reached)
- **Grayscale aging**: New maple leaves always start in grayscale and remain grayscale until X correct answers after their birth

#### End (Wrong Answers and Skip)

- Wrong answers or skipped questions remove maple leaves from the display
- Each wrong answer or skip removes one maple leaf
- Maple leaf fades out smoothly with rotation
- When wrongCount or skipCount reaches X, all remaining maple leaves are removed and counts reset
- Correct answers reset both wrongCount and skipCount to zero and create new maple leaves

#### Color (count >= 2X)

- Color effects only apply to maple leaves that have **aged enough** (birthCount + X ≤ currentCount)
- Maple leaves change to vibrant autumn colors when they reach their aging threshold
- Leaf receives autumn gradient (reds, oranges, yellows) with natural texture
- Removes grayscale filter to reveal autumn colors
- Enhanced glow effects create a warm, seasonal appearance
- New maple leaves created after the color phase begins will still start in grayscale and age individually

#### Pulse (count >= 3X)

- Maple leaves continue to be created on every correct answer
- Pulse effect only applies to maple leaves that have **aged enough** (age ≥ X)
- SVG scales from 1.0 to 1.1x with enhanced glow effects
- Container brightness pulses (1.0 to 1.12x) while rotation continues uninterrupted
- Creates a warm, rhythmic effect without disrupting the magical swirling motion
- Newly created maple leaves (not yet aged) remain static until they age

#### Color Wave (count >= 4X, every X correct answers)

- Color wave applies to **all maple leaves that have aged enough** (age ≥ X)
- Newly created maple leaves (not yet aged) remain in grayscale
- Creates a cascading autumn effect across all aged elements

## Visual Characteristics

### Movement

- **Varied Breeze System**: Multi-layered breeze physics creates graceful, natural movement throughout the entire screen
  - **Global Breeze**: Slow synchronized wave affects all leaves
  - **Individual Breeze**: Each leaf has unique phase and speed (0.006-0.014) for varied motion
  - **Turbulence**: Creates swirling pockets of air for unpredictability
  - **Spatial Currents**: Different screen positions experience different flow patterns
  - **Height Currents**: Vertical zones have different flow characteristics
  - **Horizontal Vortex**: Circular flow patterns in different screen zones
  - **Random Gusts**: Occasional stronger pushes (15% chance) add spontaneity
- **Magical Rotation**: Fast, dynamic rotation (0.4-1.6 deg/frame) with acceleration variation and flutter effects
- **Full-Screen Circulation**: Leaves wrap around screen boundaries and re-enter at random positions
- **No Bottom Collection**: Upward lift in lower screen areas prevents clustering
- **Collision Detection**: Leaves bounce off each other naturally

### Styling

- **Maple Leaf Size**: Large (40-95px) - highly visible and impactful
- **SVG-Based Shape**: Inline SVG with refined 5-lobed path for authentic maple leaf silhouette
- **Natural Texture**: Radial gradients, texture overlays, and detailed vein structure (primary midrib + 8 branching veins)
- **Enhanced Shadows**: Multiple drop-shadow layers create depth and warm glow
- **Grayscale Start**: All new maple leaves begin in grayscale (50% opacity)
- **Autumn Effect**: Warm, seasonal colors with dynamic RGB mixing for natural color distribution
- **No Container Artifacts**: Pure SVG rendering with no background, borders, or clipping

## User Experience

- **Continuous growth**: New maple leaves appear on every correct answer, creating an ever-evolving autumn display
- **Grayscale aging**: Visual elements start muted (grayscale) and automatically become vibrant and autumn-colored X correct answers after their creation
- **Capacity management**: Maximum of 3X maple leaves - oldest are automatically removed when capacity is reached, maintaining performance
- **Individual aging**: Each maple leaf ages independently based on when it was created, creating a dynamic mix of grayscale and colorful autumn elements
- **Graceful movement**: Varied breeze system ensures leaves float throughout the entire screen, never clustering or settling
- **Magical rotation**: Fast, dynamic swirling motion creates an enchanting, mesmerizing effect
- Wrong answers and skipped questions reduce the visual display
- Multiple effects can stack and combine
- Smooth animations and sophisticated physics-based movement create an engaging, magical autumn experience
- The hint system informs players about upcoming effects and continuous maple leaf creation

## Technical Details

- **SVG Rendering**: Inline SVG with viewBox (0 0 1000 1000) for scalable, crisp rendering
- **Multi-layered Gradients**: Radial gradients for depth, texture overlays for natural appearance
- **Physics Simulation**: Sophisticated multi-layered breeze system with 5 vertical and 5 horizontal force layers
- **RequestAnimationFrame**: Smooth 60fps animations for all movement and rotation
- **Elements are removed from DOM**: When ended to prevent memory leaks
- **Window resize handling**: Keeps elements within bounds with wrap-around boundaries
- **Maple leaf aging system**: Each maple leaf tracks its `birthCount` to determine when it should transition from grayscale to autumn colors
- **Capacity management**: FIFO (First In, First Out) queue removes oldest maple leaves when maximum capacity (3X) is reached
- **Aging checks**: `updateShapeAging()` is called on every correct answer to check and update maple leaves that have reached their aging threshold
- **Magical rotation**: Each maple leaf rotates at 0.4-1.6 deg/frame with acceleration variation (0.008) and flutter intensity (0.4-0.8) for dynamic swirling motion
- **Breeze phase system**: Each leaf has unique `breezePhase` and `breezeSpeed` for individualized movement patterns
- **Wrap-around boundaries**: Leaves re-enter screen at random positions when crossing boundaries
- **Collision detection**: Maple leaves automatically bounce off each other when they come into contact, creating natural physics interactions
- **Pulse separation**: Container handles brightness/opacity, SVG handles scaling to preserve rotation
