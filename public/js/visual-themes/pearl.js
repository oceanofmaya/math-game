// Pearl Theme Implementation
// Extends BaseTheme with Pearl-specific behavior
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.VisualThemes) {
        global.OceanOfMaya.VisualThemes = {};
    }

    // Pearl Theme Implementation
    const Pearl = function() {
        if (!global.OceanOfMaya.VisualThemes.BaseTheme) {
            console.error('BaseTheme must be loaded before Pearl');
            return;
        }
        global.OceanOfMaya.VisualThemes.BaseTheme.call(this);

        // Override createShapeSet to create pearls instead of default shapes
        this.createShapeSet = function(birthCount) {
            const container = document.body;
            const Constants = global.OceanOfMaya.Constants || {};
            const pearlSizeMin = Constants.PEARL_SIZE_MIN || 25;
            const pearlSizeMax = Constants.PEARL_SIZE_MAX || 60;
            const pearlSize = pearlSizeMin + Math.random() * (pearlSizeMax - pearlSizeMin);
            const pearlTypes = ['solid', 'swirl', 'catseye'];
            const pearlType = pearlTypes[Math.floor(Math.random() * pearlTypes.length)];

            // Create pearl
            const pearl = document.createElement('div');
            pearl.className = 'pearl pearl-' + pearlType;
            pearl.style.width = pearlSize + 'px';
            pearl.style.height = pearlSize + 'px';
            pearl.style.position = 'absolute';
            const baseBoundaryPadding = Constants.VISUAL_ELEMENT_BOUNDARY_PADDING || 20;
            const themePaddingMap = Constants.VISUAL_ELEMENT_BOUNDARY_PADDING_BY_THEME || {};
            const themeExtraPadding = themePaddingMap['pearl'] || 0;
            const boundaryPadding = baseBoundaryPadding + themeExtraPadding;
            const adjustedWidth = Math.max(0, window.innerWidth - boundaryPadding * 2);
            const adjustedHeight = Math.max(0, window.innerHeight - boundaryPadding * 2);
            pearl.style.left = (boundaryPadding + Math.random() * Math.max(0, adjustedWidth - pearlSize)) + 'px';
            pearl.style.top = (boundaryPadding + Math.random() * Math.max(0, adjustedHeight - pearlSize)) + 'px';
            // New shapes always start in grayscale
            pearl.style.filter = 'blur(0.2px) grayscale(100%)';
            pearl.style.opacity = '0';
            pearl.style.transform = 'scale(0) rotate(0deg)';
            pearl.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            // Random initial rotation for rolling effect
            const initialRotation = Math.random() * 360;
            pearl.style.transform = `scale(0) rotate(${initialRotation}deg)`;
            
            // Add random animation delay to prevent synchronization (if any CSS animations are used)
            // Note: We removed pearl-roll animation, but keeping this for any future animations
            const pearlAnimationDelayMax = Constants.PEARL_ANIMATION_DELAY_MAX || 8;
            const animationDelay = Math.random() * pearlAnimationDelayMax;
            pearl.style.animationDelay = `${animationDelay}s`;
            
            container.appendChild(pearl);

            // Pearls don't have secondary elements, but base theme expects an array
            const sparkles = [];

            // Random rotation direction and speed for variety - graceful and calming
            const rotationDirection = Math.random() < 0.5 ? -1 : 1; // Random clockwise or counter-clockwise
            const rotationSpeedMin = Constants.PEARL_ROTATION_SPEED_MIN || 0.4;
            const rotationSpeedMax = Constants.PEARL_ROTATION_SPEED_MAX || 1.2;
            const rotationSpeed = (rotationSpeedMin + Math.random() * (rotationSpeedMax - rotationSpeedMin)) * rotationDirection;

            // Initialize physics with rolling/bouncing motion
            const pearlVelocityMultiplier = Constants.PEARL_VELOCITY_MULTIPLIER || 1.6;
            const shapeSet = {
                primaryElement: pearl,
                secondaryElements: sparkles, // Empty array for pearls
                velocityX: (Math.random() - 0.5) * pearlVelocityMultiplier,
                velocityY: (Math.random() - 0.5) * pearlVelocityMultiplier,
                angle: initialRotation, // Current rotation angle
                secondaryRadius: 0, // Not used
                size: pearlSize,
                birthCount: birthCount || 0,
                isPearl: true, // Flag to identify pearl
                pearlType: pearlType,
                rotationSpeed: rotationSpeed // Rolling rotation speed in degrees per frame
            };

            // Animate in
            requestAnimationFrame(() => {
                void pearl.offsetWidth; // Trigger reflow
                pearl.style.opacity = '1';
                pearl.style.transform = `scale(1) rotate(${initialRotation}deg)`;
            });

            return shapeSet;
        };
    };
    
    Pearl.prototype = Object.create(global.OceanOfMaya.VisualThemes.BaseTheme.prototype);
    Pearl.prototype.constructor = Pearl;

    // Export
    global.OceanOfMaya.VisualThemes.Pearl = Pearl;

})(typeof window !== 'undefined' ? window : this);

