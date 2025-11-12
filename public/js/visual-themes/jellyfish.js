// Jellyfish Theme Implementation
// Extends BaseTheme with Jellyfish-specific behavior
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.VisualThemes) {
        global.OceanOfMaya.VisualThemes = {};
    }

    // Jellyfish Theme Implementation
    const Jellyfish = function() {
        if (!global.OceanOfMaya.VisualThemes.BaseTheme) {
            console.error('BaseTheme must be loaded before Jellyfish');
            return;
        }
        global.OceanOfMaya.VisualThemes.BaseTheme.call(this);

        // Override createShapeSet to create jellyfish instead of default shapes
        // Uses primaryElement and secondaryElements naming for base theme compatibility
        const originalCreateShapeSet = this.createShapeSet;
        
        this.createShapeSet = function(birthCount) {
            const container = document.body;
            const Constants = global.OceanOfMaya.Constants || {};
            const bellSizeMin = Constants.JELLYFISH_BELL_SIZE_MIN || 25;
            const bellSizeMax = Constants.JELLYFISH_BELL_SIZE_MAX || 70;
            const bellSize = bellSizeMin + Math.random() * (bellSizeMax - bellSizeMin);
            const numTentacles = Math.max(2, 4 + Math.floor(Math.random() * 5)); // Minimum 2, typically 4-8 tentacles

            // Create jellyfish bell (umbrella body) - stored as primaryElement
            const bell = document.createElement('div');
            bell.className = 'jellyfish-bell';
            const bellWidth = bellSize * 1.2; // Slightly wider than tall
            const bellHeight = bellSize * 0.7; // More dome-like (less flat)
            bell.style.width = bellWidth + 'px';
            bell.style.height = bellHeight + 'px';
            bell.style.position = 'absolute';
            // New shapes always start in grayscale
            bell.style.filter = 'blur(0.5px) grayscale(100%)';
            bell.style.opacity = '0';
            bell.style.transform = 'scale(0) translateY(20px)';
            bell.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            // Add random animation delay to prevent synchronization
            const bellAnimationDelayMax = Constants.JELLYFISH_BELL_ANIMATION_DELAY_MAX || 8;
            const animationDelay = Math.random() * bellAnimationDelayMax;
            bell.style.animationDelay = `${animationDelay}s`;
            
            container.appendChild(bell);

            // Create tentacles (stored as secondaryElements)
            const tentacles = [];
            const tentacleLengthsLocal = [];
            for (let i = 0; i < numTentacles; i++) {
                const tentacle = document.createElement('div');
                tentacle.className = 'jellyfish-tentacle';
                tentacle.style.position = 'absolute';
                const tentacleLength = 60 + Math.random() * 80; // 60-140px
                tentacleLengthsLocal.push(tentacleLength);
                
                // Create unique wave pattern for each tentacle
                const waveAmplitude = 2 + Math.random() * 3; // 2-5px variation
                const waveFrequency = 0.3 + Math.random() * 0.4; // Frequency variation
                tentacle.setAttribute('data-wave-amp', waveAmplitude);
                tentacle.setAttribute('data-wave-freq', waveFrequency);
                tentacle.setAttribute('data-wave-offset', Math.random() * 100); // Random phase offset
                
                // Add random animation delay to prevent synchronization across all tentacles
                const tentacleAnimationDelayMax = Constants.JELLYFISH_TENTACLE_ANIMATION_DELAY_MAX || 5;
                const tentacleAnimationDelay = Math.random() * tentacleAnimationDelayMax;
                tentacle.style.animationDelay = `${tentacleAnimationDelay}s`;
                
                // Add random animation duration variation for natural movement (will be updated if pulse is active)
                const baseDuration = 5.0;
                const durationVariation = baseDuration - 0.5 + Math.random() * 1.0; // 4.5-5.5 seconds
                tentacle.style.animationDuration = `${durationVariation}s`;
                
                tentacle.style.width = '3px'; // Slightly thinner for realism
                tentacle.style.height = tentacleLength + 'px';
                // New tentacles always start in grayscale
                tentacle.style.filter = 'blur(0.4px) grayscale(100%)';
                tentacle.style.opacity = '0';
                tentacle.style.transition = 'opacity 0.3s';
                
                container.appendChild(tentacle);
                tentacles.push(tentacle);
            }

            // Initialize physics with graceful, floating movement
            // Store tentacle offset positions relative to bell
            const tentacleOffsets = [];
            const tentacleSpacing = bellWidth / (numTentacles + 1);
            for (let i = 0; i < numTentacles; i++) {
                const offsetX = (i + 1) * tentacleSpacing - (bellWidth / 2);
                tentacleOffsets.push(offsetX);
            }

            // Calculate max tentacle length for positioning
            const tentacleMaxLength = tentacleLengthsLocal.length ? Math.max.apply(null, tentacleLengthsLocal) : 140;
            
            // Position bell accounting for shadow extent, pulse scale, and tentacle length
            // Use reasonable bounds that allow free movement while preventing overflow
            const shadowExtent = 200;
            const safetyBuffer = 1;
            const scaleMax = 1.3; // Matches max pulse scale (~1.28)
            const minX = shadowExtent;
            const maxX = Math.max(minX, window.innerWidth - (bellWidth * scaleMax) - shadowExtent);
            const minY = shadowExtent;
            const maxY = Math.max(minY, window.innerHeight - ((bellHeight + tentacleMaxLength) * scaleMax) - shadowExtent);
            bell.style.left = Math.random() * (maxX - minX) + minX + 'px';
            bell.style.top = Math.random() * (maxY - minY) + minY + 'px';

            // Random rotation direction and speed for variety - graceful and calming
            const rotationDirection = Math.random() < 0.5 ? -1 : 1; // Random clockwise or counter-clockwise
            const rotationSpeedMin = Constants.JELLYFISH_ROTATION_SPEED_MIN || 0.1;
            const rotationSpeedMax = Constants.JELLYFISH_ROTATION_SPEED_MAX || 0.3;
            const rotationSpeed = (rotationSpeedMin + Math.random() * (rotationSpeedMax - rotationSpeedMin)) * rotationDirection;
            const initialRotation = (Math.random() - 0.5) * 30; // -15 to 15 degrees initial rotation
            
            const shapeSet = {
                primaryElement: bell,
                secondaryElements: tentacles,
                velocityX: (Math.random() - 0.5) * (Constants.JELLYFISH_VELOCITY_X_MULTIPLIER || 0.8),
                velocityY: (Math.random() - 0.5) * (Constants.JELLYFISH_VELOCITY_Y_MULTIPLIER || 0.6) - 0.15,
                angle: initialRotation, // Current rotation angle
                secondaryRadius: 0, // Not used for tentacles
                size: bellSize,
                birthCount: birthCount || 0,
                // Store jellyfish-specific data
                bellSize: bellSize,
                tentacleOffsets: tentacleOffsets,
                tentacleLengths: tentacleLengthsLocal,
                tentacleMaxLength: tentacleMaxLength,
                isJellyfish: true, // Flag to identify jellyfish in physics loop
                rotationSpeed: rotationSpeed // Rotation speed in degrees per frame
            };

            // Set up continuous tentacle positioning update using requestAnimationFrame
            let tentaclePositioningActive = false;
            const updateTentaclePositions = function() {
                if (!bell.parentNode) {
                    tentaclePositioningActive = false;
                    return;
                }
                
                const bellRect = bell.getBoundingClientRect();
                // Only position tentacles if bell has valid dimensions (not at scale 0)
                if (bellRect.width === 0 || bellRect.height === 0) {
                    if (tentaclePositioningActive) {
                        requestAnimationFrame(updateTentaclePositions);
                    }
                    return;
                }
                
                const bellLeft = bellRect.left;
                const bellTop = bellRect.top;
                const bellHeight = bellRect.height;
                const bellWidth = bellRect.width;
                
                tentacles.forEach((tentacle, index) => {
                    if (tentacle.parentNode && tentacleOffsets[index] !== undefined) {
                        const offsetX = tentacleOffsets[index];
                        tentacle.style.left = (bellLeft + (bellWidth / 2) + offsetX - 1) + 'px';
                        tentacle.style.top = (bellTop + bellHeight) + 'px';
                    }
                });
                
                if (tentaclePositioningActive) {
                    requestAnimationFrame(updateTentaclePositions);
                }
            };

            // Animate in - ensure proper initial state
            // Temporarily hide overflow during birth animation to prevent scrollbar
            // Use a counter to handle multiple simultaneous births
            if (!window._jellyfishBirthCount) {
                window._jellyfishBirthCount = 0;
            }
            if (!window._jellyfishOriginalOverflow) {
                window._jellyfishOriginalOverflow = {
                    body: document.body.style.overflow,
                    html: document.documentElement.style.overflow
                };
            }
            
            window._jellyfishBirthCount++;
            if (window._jellyfishBirthCount === 1) {
                // First birth - hide overflow
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
            
            requestAnimationFrame(() => {
                // Reset transform for proper animation
                bell.style.transform = 'scale(0) translateY(20px)';
                bell.style.opacity = '0';
                
                // Trigger reflow to ensure initial state is applied
                void bell.offsetWidth;
                
                // Animate bell in first
                bell.style.opacity = '1';
                bell.style.transform = 'scale(1) translateY(0)';
                
                // Restore overflow after birth animation completes (0.5s transition + buffer)
                setTimeout(() => {
                    window._jellyfishBirthCount--;
                    if (window._jellyfishBirthCount === 0) {
                        // Last birth completed - restore overflow
                        document.body.style.overflow = window._jellyfishOriginalOverflow.body;
                        document.documentElement.style.overflow = window._jellyfishOriginalOverflow.html;
                        window._jellyfishOriginalOverflow = null;
                    }
                }, 600);
                
                // Start tentacle positioning after bell animation begins (wait for scale to be applied)
                setTimeout(() => {
                    tentaclePositioningActive = true;
                    updateTentaclePositions();
                    
                    // Show tentacles
                    tentacles.forEach((tentacle, index) => {
                        setTimeout(() => {
                            if (tentacle.parentNode) {
                                tentacle.style.opacity = '1';
                            }
                        }, index * 40);
                    });
                }, 300); // Wait for bell scale animation to complete
            });

            return shapeSet;
        };

        // Override pulse method to add animation duration variation to tentacles
        const originalPulse = this.pulse;
        const self = this;
        this.pulse = function(count, currentCount, thresholdX) {
            // Call original pulse method first
            originalPulse.call(this, count, currentCount, thresholdX);
            
            // Add animation duration variation to tentacles that have pulse class
            const Constants = global.OceanOfMaya.Constants || {};
            const X = thresholdX || 5;
            const countParam = currentCount || 0;
            let pulsed = 0;
            
            for (let i = 0; i < self.shapeSets.length && pulsed < count; i++) {
                const set = self.shapeSets[i];
                const shapeAge = countParam - set.birthCount;
                // Only apply variation to shapes that have aged enough and have pulse
                if (shapeAge >= X && set.primaryElement.classList.contains('aurora-pulse')) {
                    // Add varied animation duration to each tentacle for natural movement
                    set.secondaryElements.forEach((tentacle) => {
                        if (tentacle.classList.contains('aurora-pulse')) {
                            // Vary duration between 4.5s and 5.5s for natural variation
                            const durationVariation = 4.5 + Math.random() * 1.0; // 4.5-5.5 seconds
                            tentacle.style.animationDuration = `${durationVariation}s`;
                        }
                    });
                    pulsed++;
                }
            }
        };
    };
    
    Jellyfish.prototype = Object.create(global.OceanOfMaya.VisualThemes.BaseTheme.prototype);
    Jellyfish.prototype.constructor = Jellyfish;


    // Export
    global.OceanOfMaya.VisualThemes.Jellyfish = Jellyfish;

})(typeof window !== 'undefined' ? window : this);

