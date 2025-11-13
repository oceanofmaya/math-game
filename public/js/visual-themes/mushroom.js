// Mushroom Theme Implementation
// Extends BaseTheme with Mushroom-specific behavior
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.VisualThemes) {
        global.OceanOfMaya.VisualThemes = {};
    }

    // Mushroom Theme Implementation
    const Mushroom = function() {
        if (!global.OceanOfMaya.VisualThemes.BaseTheme) {
            console.error('BaseTheme must be loaded before Mushroom');
            return;
        }
        global.OceanOfMaya.VisualThemes.BaseTheme.call(this);

        // Override createShapeSet to create mushrooms instead of default shapes
        const originalCreateShapeSet = this.createShapeSet;
        
        this.createShapeSet = function(birthCount) {
            const container = document.body;
            const Constants = global.OceanOfMaya.Constants || {};
            const capSizeMin = Constants.MUSHROOM_CAP_SIZE_MIN || 30;
            const capSizeMax = Constants.MUSHROOM_CAP_SIZE_MAX || 80;
            const capSize = capSizeMin + Math.random() * (capSizeMax - capSizeMin);
            const numSpots = 2 + Math.floor(Math.random() * 4); // 2-5 spots on cap

            // Create mushroom cap (primary element)
            const cap = document.createElement('div');
            cap.className = 'mushroom-cap';
            cap.style.width = capSize + 'px';
            cap.style.height = capSize * 0.7 + 'px'; // Slightly flattened
            cap.style.position = 'absolute';
            const baseBoundaryPadding = Constants.VISUAL_ELEMENT_BOUNDARY_PADDING || 20;
            const themePaddingMap = Constants.VISUAL_ELEMENT_BOUNDARY_PADDING_BY_THEME || {};
            const themeExtraPadding = themePaddingMap['mushroom'] || 0;
            const boundaryPadding = baseBoundaryPadding + themeExtraPadding;
            const adjustedWidth = Math.max(0, window.innerWidth - boundaryPadding * 2);
            const adjustedHeight = Math.max(0, window.innerHeight - boundaryPadding * 2);
            const capTotalHeight = capSize * 1.5; // Account for stem extending below
            cap.style.left = (boundaryPadding + Math.random() * Math.max(0, adjustedWidth - capSize)) + 'px';
            cap.style.top = (boundaryPadding + Math.random() * Math.max(0, adjustedHeight - capTotalHeight)) + 'px';
            // New shapes always start in grayscale
            cap.style.filter = 'blur(0.3px) grayscale(100%)';
            cap.style.opacity = '0';
            cap.style.transition = 'opacity 0.5s, transform 0.5s';
            
            // Add random animation delay to prevent synchronization
            const capAnimationDelayMax = Constants.MUSHROOM_ANIMATION_DELAY_MAX || 8;
            const animationDelay = Math.random() * capAnimationDelayMax;
            cap.style.animationDelay = `${animationDelay}s`;
            
            container.appendChild(cap);

            // Create stem (secondary element)
            const stem = document.createElement('div');
            stem.className = 'mushroom-stem';
            stem.style.position = 'absolute';
            const stemWidth = capSize * 0.3;
            const stemHeight = capSize * 0.8;
            stem.style.width = stemWidth + 'px';
            stem.style.height = stemHeight + 'px';
            // New stems always start in grayscale
            stem.style.filter = 'blur(0.2px) grayscale(100%)';
            stem.style.opacity = '0';
            stem.style.transition = 'opacity 0.4s';
            container.appendChild(stem);

            // Create spots on cap (additional secondary elements)
            const spots = [];
            for (let i = 0; i < numSpots; i++) {
                const spot = document.createElement('div');
                spot.className = 'mushroom-spot';
                spot.style.position = 'absolute';
                const spotSize = capSize * (0.08 + Math.random() * 0.12); // 8-20% of cap size
                spot.style.width = spotSize + 'px';
                spot.style.height = spotSize + 'px';
                // New spots always start in grayscale
                spot.style.filter = 'blur(0.3px) grayscale(100%)';
                spot.style.opacity = '0';
                spot.style.transition = 'opacity 0.3s';
                container.appendChild(spot);
                spots.push(spot);
            }

            // Initialize physics with gentle, organic movement
            const mushroomVelocityMultiplier = Constants.MUSHROOM_VELOCITY_MULTIPLIER || 0.6;
            const shapeSet = {
                primaryElement: cap,
                secondaryElements: [stem, ...spots], // Stem + spots
                velocityX: (Math.random() - 0.5) * mushroomVelocityMultiplier,
                velocityY: (Math.random() - 0.5) * mushroomVelocityMultiplier,
                angle: 0,
                secondaryRadius: 0, // Not used for mushrooms
                size: capSize,
                birthCount: birthCount || 0,
                // Mushroom-specific data
                stemWidth: stemWidth,
                stemHeight: stemHeight,
                capSize: capSize,
                isMushroom: true, // Flag to identify mushroom in physics loop
                spotPositions: spots.map(() => ({
                    x: (Math.random() - 0.5) * capSize * 0.6, // Random position on cap
                    y: (Math.random() - 0.5) * capSize * 0.4
                }))
            };

            // Animate in
            requestAnimationFrame(() => {
                cap.style.opacity = '1';
                cap.style.transform = 'scale(1)';
                setTimeout(() => {
                    stem.style.opacity = '1';
                    spots.forEach((spot, index) => {
                        setTimeout(() => {
                            spot.style.opacity = '1';
                        }, index * 50);
                    });
                }, 100);
            });

            return shapeSet;
        };
    };
    
    Mushroom.prototype = Object.create(global.OceanOfMaya.VisualThemes.BaseTheme.prototype);
    Mushroom.prototype.constructor = Mushroom;

    // Export
    global.OceanOfMaya.VisualThemes.Mushroom = Mushroom;

})(typeof window !== 'undefined' ? window : this);

