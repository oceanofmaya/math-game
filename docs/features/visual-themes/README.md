# Visual Themes System

The Visual Themes system provides a framework for adding visual effects to the multiplication game based on player performance. Visual effects are triggered by correct and incorrect answers, with different effects at various count thresholds.

## Architecture

### Components

1. **Base Theme** (`OceanOfMaya.VisualThemes.BaseTheme`): A base class providing common functionality for managing visual elements
2. **Visual Theme Implementations**: Specific visual themes (e.g., `Jellyfish`, `Firefly`) that extend the base functionality
3. **Visual Manager** (`OceanOfMaya.VisualThemes.Manager`): Orchestrates visual effects based on game state

### File Structure

Visual theme files are organized as follows:

- **JavaScript**: `public/js/visual-themes/[theme-name].js` - Theme implementations extending BaseTheme
- **CSS**: `public/css/visual-themes/[theme-name].css` - Theme-specific styles and animations
- **Music**: `public/sounds/music/[theme-name]-theme.mp3` - Optional theme music files
- **Documentation**: `docs/features/visual-themes/[THEME_NAME].md` - Theme documentation

Core files:

- `base-theme.js` - BaseTheme class (shared foundation)
- `manager.js` - Manager class (orchestrates themes)
- `style.css` - Shared styles (UI, hints, etc.)

## Rules and Behavior

### Default Threshold

- **X = 5** (default value, can be configured)

### On Multiplication Factor Change

- `resetCounts()` - Resets correct, wrong, and skip counts
- `endVisual(X)` - Removes all visual elements (X elements)

### On Correct Answer (Count Increment)

**Continuous Creation:**

- `visual.birth(1)` - Creates 1 new visual element on every correct answer
- Maximum capacity: **3X elements** (oldest elements are automatically removed when capacity is reached)
- New elements start in **grayscale** and remain grayscale until X correct answers after their birth

**Shape Aging:**

- Each element tracks its `birthCount` (when it was created)
- Elements remain grayscale until `currentCount - birthCount >= X`
- All effects (color, pulse) only apply to elements that have aged enough (age ≥ X)

**Effect Triggers:**

| Condition | Action |
|-----------|--------|
| Every answer | `visual.birth(1)` - Create 1 new element (with capacity management) |
| Every answer | `visual.updateShapeAging()` - Check and color aged elements |
| `count >= 2X && count < 3X` | `visual.color(1)` - Apply color to 1 aged element |
| `count >= 3X && count < 4X` | `visual.pulse(1)` - Apply pulse animation to 1 aged element |
| `count >= 4X && count % X == 0` | `visual.color(-1)` - Apply color wave to all aged elements |

### On Wrong Answer or Skip

- Removes one visual element (or element set) per wrong answer/skip
- Elements fade out smoothly when removed
- When wrongCount or skipCount reaches X, all visuals are reset and counts reset to zero
- Correct answers reset both wrongCount and skipCount to zero (for visualization rendering only)

### Collision Detection

- Visual elements automatically detect collisions with each other
- When shapes come into contact, they bounce off each other similar to edge bouncing
- Collision detection uses circle-circle collision for smooth, natural bouncing
- Shapes separate automatically to prevent sticking when overlapping
- Collisions preserve momentum and create realistic physics interactions

### Movement and Animation Variety

- **Individual Rotation**: Each rotating element (jellyfish, pearls) rotates at its own unique speed and direction (clockwise or counter-clockwise) for natural variety
- **Graceful Rotation**: Rotation speeds are optimized for calming, graceful movement:
  - Jellyfish: 0.1-0.3 degrees per frame (very slow, graceful)
  - Pearls: 0.4-1.2 degrees per frame (slower rolling motion)
- **Animation Delays**: Random animation delays (0-10s) prevent CSS animations from synchronizing, ensuring each element moves independently
- **Varied Velocities**: Increased velocity ranges create more natural, organic movement patterns for each theme
- **Smooth Motion**: 60fps frame-by-frame updates via `requestAnimationFrame` provide buttery smooth motion without CSS transitions interfering
- **Animation Conflict Resolution**: CSS animations handle translate/scale transforms, while JavaScript handles rotation to prevent conflicts and stuttering. For jellyfish, CSS handles all transforms (including rotation) to avoid conflicts with multiple simultaneous animations.

## Creating a New Theme

To create a new visual theme:

1. Create `public/js/visual-themes/[theme-name].js` extending `BaseTheme`:

    ```javascript
    (function(global) {
        'use strict';
        if (!global.OceanOfMaya) global.OceanOfMaya = {};
        if (!global.OceanOfMaya.VisualThemes) global.OceanOfMaya.VisualThemes = {};

        const MyTheme = function() {
            if (!global.OceanOfMaya.VisualThemes.BaseTheme) {
                console.error('BaseTheme must be loaded before MyTheme');
                return;
            }
            global.OceanOfMaya.VisualThemes.BaseTheme.call(this);
        };
        MyTheme.prototype = Object.create(global.OceanOfMaya.VisualThemes.BaseTheme.prototype);
        MyTheme.prototype.constructor = MyTheme;

        global.OceanOfMaya.VisualThemes.MyTheme = MyTheme;
    })(typeof window !== 'undefined' ? window : this);
    ```

2. Override methods as needed:
   - `createShapeSet(birthCount)` - Define how visual elements are created (must track `birthCount`)
   - `birth(count, currentCount, maxCapacity)` - Create elements (handles capacity automatically)
   - `updateShapeAging(currentCount, thresholdX)` - Check and update aging for elements
   - `end()` - Remove elements
   - `color(count, currentCount, thresholdX)` - Apply color to aged elements only
   - `pulse(count, currentCount, thresholdX)` - Apply pulse to aged elements only
   - `getHint()` - Provide theme-specific hints

3. Create `public/css/visual-themes/[theme-name].css` for theme-specific styles and animations

4. Register theme in `ThemeRegistry` in `public/js/visual-themes/manager.js`:

    ```javascript
    const ThemeRegistry = {
        'mytheme': {
            constructor: function() {
                return new global.OceanOfMaya.VisualThemes.MyTheme();
            },
            className: '.mytheme-element'
        },
        // ... other themes
    };
    ```

5. Add theme CSS link and script reference in `index.html`:

    ```html
    <link rel="stylesheet" type="text/css" href="css/visual-themes/mytheme.css" />
    <script src="js/visual-themes/mytheme.js"></script>
    ```

6. Add theme option to the UI dropdown in `index.html` (both game and sample mode dropdowns)

7. (Optional) Add theme music to `ThemeMusicRegistry` in `public/js/sound-manager.js`:

    ```javascript
    const ThemeMusicRegistry = {
        'mytheme': {
            track: 'sounds/music/mytheme-theme.mp3',
            title: 'MyTheme Theme',
            artist: 'Open Source',
            volume: 0.4,
            license: 'CC0 or Public Domain',
            attributionUrl: ''
        },
        // ... other themes
    };
    ```

    **Note**: If you add theme music, place the music file in `public/sounds/music/` and ensure it's properly licensed (CC0, CC-BY, or public domain). See `docs/features/sounds/README.md` for music sources and licensing information.

8. Create documentation in `docs/features/visual-themes/MYTHEME.md`

## Integration

The visual themes system integrates with the game logic in `scripts.js`:

- `changeVisualTheme()` - Changes the active theme (works in both game and sample mode, triggers theme music)
- `resetCounts()` - Resets counts and visuals
- Visual effects are automatically triggered on correct/wrong/skip answers (disabled in sample mode)
- **Sound System**: Theme music automatically plays when themes are switched (via `OceanOfMaya.Sound.Manager`)
- **Sample Mode**: Accessible via `OceanOfMaya.VisualThemes.Manager.setMode()` and sample control methods

## Configuration

Set the threshold value X:

```javascript
OceanOfMaya.VisualThemes.Manager.setX(25);
```

## Sample Mode

Sample Mode provides an interactive way to test and preview visual themes without playing the game. This is especially useful for:

- **Theme Development**: Testing new themes and their visual effects
- **Theme Preview**: Seeing how each theme looks and behaves
- **Effect Testing**: Testing individual lifecycle stages independently

### Using Sample Mode

1. **Enable Sample Mode**: Click the "Sample" button at the top of the interface
2. **Select Theme**: Choose a theme from the dropdown (works in both game and sample mode)
3. **Set Element Count**: Use the "Elements" dropdown to select how many elements to create (1-20)
4. **Test Effects**: Use the sample control buttons to test each lifecycle stage:
   - **Birth**: Creates elements (grayscale) - click this after changing the element count to apply changes
   - **Age (Remove Grayscale)**: Removes grayscale filter, revealing colors
   - **Color**: Applies color effect to aged elements
   - **Pulse**: Applies pulse animation to aged elements
   - **Color Wave**: Applies color wave to all aged elements
   - **End**: Removes elements with fade-out effect
   - **Reset**: Resets everything and removes all elements

### Sample Mode Behavior

- **Multiple Elements**: Can display 1-20 elements simultaneously (controlled by "Elements" dropdown)
- **Independent Testing**: Each button can be clicked independently to test specific effects
- **Theme Switching**: Changing themes in sample mode automatically resets all elements and plays the new theme's music
- **Element Count**: Changing the element count requires clicking "Birth" to apply the change
- **Game Isolation**: Game handlers (correct/wrong/skip) are disabled in sample mode
- **UI Switching**: Game UI elements (counts, operation, math question) are hidden in sample mode
- **Mode Toggle**: Use "Game" and "Sample" buttons to switch between modes

## Testing Your Theme

1. Add your theme to the dropdown in `index.html`
2. Enable **Sample Mode** to test individual effects
3. Use sample mode buttons to test each lifecycle stage:
   - Birth, Age, Color, Pulse, Color Wave, End
4. Switch back to game mode to test full integration:
   - Answer questions to trigger visual effects at different thresholds
   - Test wrong answers and skips to verify end behavior
   - Test factor changes to verify reset behavior

## Future Enhancements

- Customizable threshold per theme
