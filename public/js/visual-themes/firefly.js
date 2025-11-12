// Firefly Theme Implementation
// Extends BaseTheme with Firefly-specific behavior
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.VisualThemes) {
        global.OceanOfMaya.VisualThemes = {};
    }

    // Firefly Theme Implementation
    const Firefly = function() {
        if (!global.OceanOfMaya.VisualThemes.BaseTheme) {
            console.error('BaseTheme must be loaded before Firefly');
            return;
        }
        global.OceanOfMaya.VisualThemes.BaseTheme.call(this);

        // Override createShapeSet to create fireflies instead of default shapes
        const originalCreateShapeSet = this.createShapeSet;
        
        this.createShapeSet = function(birthCount) {
            const container = document.body;
            const Constants = global.OceanOfMaya.Constants || {};
            const fireflySizeMin = Constants.FIREFLY_SIZE_MIN || 8;
            const fireflySizeMax = Constants.FIREFLY_SIZE_MAX || 20;
            const fireflySize = fireflySizeMin + Math.random() * (fireflySizeMax - fireflySizeMin);
            const numTrails = 1 + Math.floor(Math.random() * 2); // 1-2 trailing particles

            // Create firefly (main glowing orb)
            const firefly = document.createElement('div');
            firefly.className = 'firefly-glow';
            firefly.style.width = fireflySize + 'px';
            firefly.style.height = fireflySize + 'px';
            firefly.style.position = 'absolute';
            // Account for firefly box-shadow extent (110px) to prevent scrollbars
            const shadowExtent = 110;
            const minX = shadowExtent;
            const maxX = Math.max(minX, window.innerWidth - fireflySize - shadowExtent);
            const minY = shadowExtent;
            const maxY = Math.max(minY, window.innerHeight - fireflySize - shadowExtent);
            firefly.style.left = Math.random() * (maxX - minX) + minX + 'px';
            firefly.style.top = Math.random() * (maxY - minY) + minY + 'px';
            // New shapes always start in grayscale
            firefly.style.filter = 'blur(0.3px) grayscale(100%)';
            firefly.style.opacity = '0';
            firefly.style.transition = 'opacity 0.5s, transform 0.5s';
            
            // Add random animation delay to prevent synchronization
            const fireflyAnimationDelayMax = Constants.FIREFLY_ANIMATION_DELAY_MAX || 6;
            const animationDelay = Math.random() * fireflyAnimationDelayMax;
            firefly.style.animationDelay = `${animationDelay}s`;
            
            container.appendChild(firefly);

            // Create trailing particles (soft trails that fade)
            const trails = [];
            for (let i = 0; i < numTrails; i++) {
                const trail = document.createElement('div');
                trail.className = 'firefly-trail';
                trail.style.position = 'absolute';
                const trailSize = fireflySize * (0.4 + (i * 0.2)); // Smaller trailing particles
                trail.style.width = trailSize + 'px';
                trail.style.height = trailSize + 'px';
                // New trails always start in grayscale
                trail.style.filter = 'blur(0.5px) grayscale(100%)';
                trail.style.opacity = '0';
                trail.style.transition = 'opacity 0.4s';
                container.appendChild(trail);
                trails.push(trail);
            }

            // Initialize physics with quick, darting movement (distinct from slow bubbles)
            // Individual pulsing rhythm for each firefly
            const pulseSpeed = 1.5 + Math.random() * 2; // 1.5-3.5s pulse cycle
            const pulseOffset = Math.random() * Math.PI * 2; // Random phase offset
            
            // Calculate movement direction angle for trailing - faster, more erratic movement
            const baseVelocityX = (Math.random() - 0.5) * (Constants.FIREFLY_VELOCITY_X_MULTIPLIER || 1.5);
            const baseVelocityY = (Math.random() - 0.5) * (Constants.FIREFLY_VELOCITY_Y_MULTIPLIER || 1.3) - 0.15;
            const movementAngle = Math.atan2(baseVelocityY, baseVelocityX);
            
            const shapeSet = {
                primaryElement: firefly,
                secondaryElements: trails,
                velocityX: baseVelocityX, // Gentle horizontal drift
                velocityY: baseVelocityY, // Slight upward tendency
                angle: movementAngle + Math.PI, // Point trails behind (opposite direction)
                secondaryRadius: fireflySize * (1.5 + trails.length * 0.5), // Distance for trailing particles
                size: fireflySize,
                birthCount: birthCount || 0,
                // Firefly-specific data
                pulseSpeed: pulseSpeed,
                pulseOffset: pulseOffset,
                isFirefly: true, // Flag to identify firefly in physics loop
                trailDelay: trails.map((_, i) => i * 0.3) // Stagger trail positions
            };

            // Animate in
            requestAnimationFrame(() => {
                firefly.style.opacity = '1';
                firefly.style.transform = 'scale(1)';
                setTimeout(() => {
                    trails.forEach((trail, index) => {
                        setTimeout(() => {
                            trail.style.opacity = '0.6';
                        }, index * 100);
                    });
                }, 150);
            });

            return shapeSet;
        };
    };
    
    Firefly.prototype = Object.create(global.OceanOfMaya.VisualThemes.BaseTheme.prototype);
    Firefly.prototype.constructor = Firefly;

    // Export
    global.OceanOfMaya.VisualThemes.Firefly = Firefly;

})(typeof window !== 'undefined' ? window : this);

