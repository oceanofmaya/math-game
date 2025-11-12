// Base Theme Class
// Provides foundation for visual theme implementations
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.VisualThemes) {
        global.OceanOfMaya.VisualThemes = {};
    }

    // Base Theme Class
    const BaseTheme = function() {
        const Constants = global.OceanOfMaya.Constants || {};
        const self = this;
        this.shapeSets = [];
        let animationFrameId = null;
        const DEFAULT_THRESHOLD_X = Constants.DEFAULT_THRESHOLD_X || 5;
        let colorActivated = false; // Track if color effects have been activated

        // Create shape set (primary element + secondary elements)
        this.createShapeSet = function(birthCount) {
            const container = document.body;
            const primarySizeMin = Constants.DEFAULT_PRIMARY_SIZE_MIN || 30;
            const primarySizeMax = Constants.DEFAULT_PRIMARY_SIZE_MAX || 130;
            const primarySize = primarySizeMin + Math.random() * (primarySizeMax - primarySizeMin);
            const numSecondaries = 2 + Math.floor(Math.random() * 3); // 2-4 secondary elements

            // Create primary element
            const primary = document.createElement('div');
            primary.className = 'aurora-bubble';
            primary.style.width = primarySize + 'px';
            primary.style.height = primarySize + 'px';
            primary.style.position = 'absolute';
            primary.style.left = Math.random() * (window.innerWidth - primarySize) + 'px';
            primary.style.top = Math.random() * (window.innerHeight - primarySize) + 'px';
            // New shapes always start in grayscale (will be colored later based on birthCount + X)
            primary.style.filter = 'blur(0.5px) grayscale(100%)';
            primary.style.opacity = '0';
            primary.style.transition = 'opacity 0.5s, transform 0.5s';
            container.appendChild(primary);

            // Create secondary elements
            const secondaries = [];
            for (let i = 0; i < numSecondaries; i++) {
                const secondary = document.createElement('div');
                secondary.className = 'aurora-sparkle';
                secondary.style.position = 'absolute';
                secondary.style.width = '8px';
                secondary.style.height = '8px';
                // New secondary elements always start in grayscale
                secondary.style.filter = 'blur(0.2px) grayscale(100%)';
                secondary.style.opacity = '0';
                secondary.style.transition = 'opacity 0.3s';
                container.appendChild(secondary);
                secondaries.push(secondary);
            }

            // Initialize physics with slower, more relaxing movement
            const baseVelocityMultiplier = Constants.BASE_VELOCITY_MULTIPLIER || 0.8;
            const shapeSet = {
                primaryElement: primary,
                secondaryElements: secondaries,
                velocityX: (Math.random() - 0.5) * baseVelocityMultiplier,
                velocityY: (Math.random() - 0.5) * baseVelocityMultiplier,
                angle: 0,
                secondaryRadius: primarySize / 2 + 15,
                size: primarySize,
                birthCount: birthCount || 0 // Track when this shape was created
            };

                // Animate in
            requestAnimationFrame(() => {
                primary.style.opacity = '1';
                primary.style.transform = 'scale(1)';
                setTimeout(() => {
                    secondaries.forEach((secondary, index) => {
                        setTimeout(() => {
                            secondary.style.opacity = '1';
                        }, index * 50);
                    });
                }, 100);
            });

            return shapeSet;
        };

        // Update physics for all shape sets
        const updatePhysics = function() {
            // First, update positions and handle edge bouncing
            self.shapeSets.forEach(set => {
                const primary = set.primaryElement;
                const secondaries = set.secondaryElements;
                const rect = primary.getBoundingClientRect();

                // Update primary element position
                // For jellyfish: JavaScript handles all positioning via left/top
                // CSS animations only handle scale/visual effects (no translate to avoid conflicts)
                let newX = Number.parseFloat(primary.style.left) + set.velocityX;
                let newY = Number.parseFloat(primary.style.top) + set.velocityY;

                // For jellyfish, use base size for boundary checks to account for CSS scale animations
                // This prevents scale-up from pulse animation from reducing movement range
                // For all themes, account for shadow/glow extents to prevent scrollbars
                let checkWidth, checkHeight;
                let shadowExtent = 0;
                if (set.isJellyfish && set.bellSize) {
                    // Use base bell dimensions (accounting for bell being wider than tall)
                    const bellWidth = set.bellSize * 1.2; // bellWidth calculation from creation
                    const bellHeight = set.bellSize * 0.7; // bellHeight calculation from creation
                    // Jellyfish has box-shadows with visible glow up to ~120px
                    shadowExtent = 120;
                    checkWidth = bellWidth + shadowExtent * 2;
                    checkHeight = bellHeight + shadowExtent * 2;
                } else if (set.isMaple) {
                    // Account for drop-shadow extent (20px is the largest shadow)
                    shadowExtent = 20;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else if (set.isMushroom) {
                    // Mushroom has box-shadows up to 90px in pulse animation
                    shadowExtent = 90;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else if (set.isFirefly) {
                    // Firefly has box-shadows up to 110px in pulse animation
                    shadowExtent = 110;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else if (set.isPearl) {
                    // Pearl has box-shadows up to 35px in pulse animation
                    shadowExtent = 35;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else {
                    // For other themes, use actual rendered size
                    checkWidth = rect.width;
                    checkHeight = rect.height;
                }

                // Bounce off walls
                // Adjust boundary checks to account for shadow/glow padding
                const boundaryPadding = shadowExtent;
                if (newX <= boundaryPadding || newX + checkWidth >= window.innerWidth - boundaryPadding) {
                    set.velocityX *= -1;
                    newX = Math.max(boundaryPadding, Math.min(newX, window.innerWidth - checkWidth - boundaryPadding));
                }
                if (newY <= boundaryPadding || newY + checkHeight >= window.innerHeight - boundaryPadding) {
                    set.velocityY *= -1;
                    newY = Math.max(boundaryPadding, Math.min(newY, window.innerHeight - checkHeight - boundaryPadding));
                }

                primary.style.left = newX + 'px';
                primary.style.top = newY + 'px';

                // Handle rotation for different themes
                if (set.isJellyfish && set.rotationSpeed !== undefined) {
                    // For jellyfish, CSS animations handle all movement (float, pulse)
                    // JavaScript rotation conflicts with CSS transform animations, causing stuttering
                    // So we disable JavaScript rotation for jellyfish - let CSS handle all transforms
                    // The CSS animations provide smooth, graceful movement without conflicts
                } else if (set.isPearl && set.rotationSpeed !== undefined) {
                    // Handle pearl rotation (rolling motion with variety)
                    set.angle += set.rotationSpeed;
                    // Keep angle in reasonable range to prevent overflow
                    if (Math.abs(set.angle) > 360) {
                        set.angle = set.angle % 360;
                    }
                } else if (set.isMushroom) {
                    // Handle mushroom positioning: stem below cap, spots on cap
                    const centerX = newX + rect.width / 2;
                    const centerY = newY + rect.height / 2;
                    
                    // Position stem directly below cap
                    if (secondaries.length > 0) {
                        const stem = secondaries[0];
                        const stemX = centerX - set.stemWidth / 2;
                        const stemY = newY + rect.height; // Below the cap
                        stem.style.left = stemX + 'px';
                        stem.style.top = stemY + 'px';
                    }
                    
                    // Position spots on cap surface
                    if (set.spotPositions && secondaries.length > 1) {
                        for (let i = 1; i < secondaries.length; i++) {
                            const spot = secondaries[i];
                            const spotPos = set.spotPositions[i - 1];
                            const spotX = centerX + spotPos.x - Number.parseFloat(spot.style.width) / 2;
                            const spotY = centerY + spotPos.y - Number.parseFloat(spot.style.height) / 2;
                            spot.style.left = spotX + 'px';
                            spot.style.top = spotY + 'px';
                        }
                    }
                } else if (set.isMaple && set.rotationSpeed !== undefined) {
                    // Handle maple leaf rotation with magical swirling motion
                    // Add acceleration variation for dynamic tumbling
                    set.rotationSpeed += set.rotationAcceleration || 0;
                    // Higher rotation speed limit for magical feel
                    const maxRotationSpeed = 2.0; // Increased from 0.8 for more dramatic spinning
                    if (Math.abs(set.rotationSpeed) > maxRotationSpeed) {
                        set.rotationSpeed = set.rotationSpeed > 0 ? maxRotationSpeed : -maxRotationSpeed;
                    }
                    
                    // Add flutter effect - stronger variation for magical motion
                    set.flutterTimer = (set.flutterTimer || 0) + 1;
                    const breeze = Math.sin(set.flutterTimer * 0.015) * 0.04; // stronger breeze
                    const flutterVariation = Math.sin(set.flutterTimer * 0.12) * (set.flutterIntensity || 0.5) * 0.15;
                    const currentRotationSpeed = set.rotationSpeed + flutterVariation;
                    
                    set.angle += currentRotationSpeed;
                    // Keep angle in reasonable range to prevent overflow
                    if (Math.abs(set.angle) > 360) {
                        set.angle = set.angle % 360;
                    }
                    
                    // Varied breeze physics - graceful movement throughout the screen
                    set.flutterTimer = (set.flutterTimer || 0) + 1;
                    
                    // Initialize breeze phase for this leaf if not set
                    if (set.breezePhase === undefined) {
                        set.breezePhase = Math.random() * Math.PI * 2;
                    }
                    if (set.breezeSpeed === undefined) {
                        set.breezeSpeed = 0.006 + Math.random() * 0.008; // 0.006-0.014
                    }
                    
                    // Very light gravity - just enough to feel natural
                    const gravity = 0.002;
                    set.velocityY += gravity;
                    
                    // Complex multi-layered breeze system for varied, graceful movement
                    // Layer 1: Global slow breeze (affects all leaves similarly)
                    const globalBreeze = Math.sin(set.flutterTimer * 0.005) * 0.1;
                    
                    // Layer 2: Individual leaf breeze (unique per leaf)
                    const leafBreeze = Math.sin(set.flutterTimer * set.breezeSpeed + set.breezePhase) * 0.15;
                    
                    // Layer 3: Turbulence (creates swirling pockets)
                    const turbulence = Math.sin(set.flutterTimer * 0.018 + set.birthCount * 0.3) * 0.08;
                    
                    // Layer 4: Position-based currents (different areas have different flows)
                    const posX = newX / window.innerWidth;
                    const posY = newY / window.innerHeight;
                    const spatialCurrent = Math.sin(posX * Math.PI * 2 + set.flutterTimer * 0.003) * 0.06;
                    const heightCurrent = Math.cos(posY * Math.PI + set.flutterTimer * 0.004) * 0.05;
                    
                    // Combine all breeze layers
                    const verticalBreeze = globalBreeze + leafBreeze + turbulence + spatialCurrent + heightCurrent;
                    set.velocityY += verticalBreeze;
                    
                    // Boundary wrapping for seamless circulation
                    const margin = 100;
                    
                    // Vertical wrap-around with varied re-entry
                    if (newY < -margin) {
                        // Re-enter from random height at bottom
                        const reentryY = window.innerHeight + (Math.random() * margin);
                        primary.style.top = reentryY + 'px';
                        newY = reentryY;
                        set.velocityY = -0.4 + Math.random() * 0.3;
                    } else if (newY > window.innerHeight + margin) {
                        // Re-enter from random height at top
                        const reentryY = -(Math.random() * margin);
                        primary.style.top = reentryY + 'px';
                        newY = reentryY;
                        set.velocityY = 0.05 + Math.random() * 0.25;
                    }
                    
                    // Dynamic upward lift based on density (prevents clustering)
                    const lowerThird = window.innerHeight * 0.67;
                    if (newY > lowerThird) {
                        const distanceRatio = (newY - lowerThird) / (window.innerHeight - lowerThird);
                        const liftStrength = distanceRatio * 0.2 * Math.sin(set.flutterTimer * 0.01);
                        set.velocityY -= liftStrength;
                    }
                    
                    // Clamp velocity for graceful movement
                    if (set.velocityY > 0.7) set.velocityY = 0.7;
                    if (set.velocityY < -0.7) set.velocityY = -0.7;
                    
                    // Multi-layered horizontal breeze for graceful side-to-side movement
                    // Layer 1: Global horizontal wind (slow, affects all)
                    const globalWind = Math.cos(set.flutterTimer * 0.004) * 0.06;
                    
                    // Layer 2: Individual leaf sway (unique per leaf)
                    const leafSway = Math.sin(set.flutterTimer * (set.breezeSpeed * 1.5) + set.breezePhase + Math.PI / 2) * 0.12;
                    
                    // Layer 3: Position-based horizontal currents (creates flow patterns)
                    const horizontalFlow = Math.cos(posY * Math.PI * 1.5 + set.flutterTimer * 0.005) * 0.07;
                    
                    // Layer 4: Vortex effect (creates circular patterns in different zones)
                    const vortexX = Math.sin(posX * Math.PI * 3 + set.flutterTimer * 0.008) * 0.05;
                    
                    // Layer 5: Random gusts (occasional stronger pushes)
                    const gustChance = Math.sin(set.flutterTimer * 0.015 + set.birthCount) > 0.85 ? 0.1 : 0;
                    const gustDirection = Math.cos(set.flutterTimer * 0.02);
                    const gust = gustChance * gustDirection;
                    
                    // Combine all horizontal forces
                    const horizontalBreeze = globalWind + leafSway + horizontalFlow + vortexX + gust + breeze;
                    set.velocityX += horizontalBreeze;
                    
                    // Horizontal boundaries - wrap around with varied re-entry
                    if (newX < -rect.width - margin) {
                        // Re-enter from random position on right
                        const reentryX = window.innerWidth + (Math.random() * margin * 0.5);
                        primary.style.left = reentryX + 'px';
                        newX = reentryX;
                        set.velocityX = -0.3 + Math.random() * 0.2;
                    } else if (newX > window.innerWidth + margin) {
                        // Re-enter from random position on left
                        const reentryX = -(rect.width + Math.random() * margin * 0.5);
                        primary.style.left = reentryX + 'px';
                        newX = reentryX;
                        set.velocityX = 0.1 + Math.random() * 0.2;
                    }
                    
                    // Limit horizontal velocity for graceful drift
                    const maxDrift = 0.6;
                    if (Math.abs(set.velocityX) > maxDrift) {
                        set.velocityX = set.velocityX > 0 ? maxDrift : -maxDrift;
                    }
                    
                    // Update leaf rotation with magical swirl
                    primary.style.transform = `rotate(${set.angle}deg)`;
                } else {
                    // Update secondary elements to orbit around primary (slower, more relaxing)
                    // Only if there are secondary elements
                    if (secondaries.length > 0) {
                        set.angle += 0.008; // Reduced from 0.02 to 0.008 for slower orbit
                        const centerX = newX + rect.width / 2;
                        const centerY = newY + rect.height / 2;
                        const angleStep = (Math.PI * 2) / secondaries.length;

                        secondaries.forEach((secondary, index) => {
                            const angle = set.angle + (angleStep * index);
                            const secondaryX = centerX + Math.cos(angle) * set.secondaryRadius - 4;
                            const secondaryY = centerY + Math.sin(angle) * set.secondaryRadius - 4;
                            secondary.style.left = secondaryX + 'px';
                            secondary.style.top = secondaryY + 'px';
                        });
                    }
                }
            });

            // Check for collisions between shapes and make them bounce
            for (let i = 0; i < self.shapeSets.length; i++) {
                for (let j = i + 1; j < self.shapeSets.length; j++) {
                    const set1 = self.shapeSets[i];
                    const set2 = self.shapeSets[j];
                    const primary1 = set1.primaryElement;
                    const primary2 = set2.primaryElement;
                    
                    const rect1 = primary1.getBoundingClientRect();
                    const rect2 = primary2.getBoundingClientRect();
                    
                    // Calculate centers and radii
                    const center1X = rect1.left + rect1.width / 2;
                    const center1Y = rect1.top + rect1.height / 2;
                    const center2X = rect2.left + rect2.width / 2;
                    const center2Y = rect2.top + rect2.height / 2;
                    
                    const radius1 = Math.max(rect1.width, rect1.height) / 2;
                    const radius2 = Math.max(rect2.width, rect2.height) / 2;
                    
                    // Calculate distance between centers
                    const dx = center2X - center1X;
                    const dy = center2Y - center1Y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = radius1 + radius2;
                    
                    // Check if shapes are colliding
                    if (distance < minDistance && distance > 0) {
                        // Normalize the collision vector
                        const nx = dx / distance;
                        const ny = dy / distance;
                        
                        // Calculate relative velocity
                        const relativeVelX = set2.velocityX - set1.velocityX;
                        const relativeVelY = set2.velocityY - set1.velocityY;
                        
                        // Calculate relative velocity along collision normal
                        const dotProduct = relativeVelX * nx + relativeVelY * ny;
                        
                        // Only bounce if shapes are moving towards each other
                        if (dotProduct < 0) {
                            // Exchange velocities along collision normal (simple elastic collision)
                            const bounceStrength = 1.0; // Full bounce
                            const impulse = dotProduct * bounceStrength;
                            
                            set1.velocityX += impulse * nx;
                            set1.velocityY += impulse * ny;
                            set2.velocityX -= impulse * nx;
                            set2.velocityY -= impulse * ny;
                            
                            // Separate shapes to prevent sticking
                            const overlap = minDistance - distance;
                            const separationX = nx * overlap * 0.5;
                            const separationY = ny * overlap * 0.5;
                            
                            const currentX1 = Number.parseFloat(primary1.style.left);
                            const currentY1 = Number.parseFloat(primary1.style.top);
                            const currentX2 = Number.parseFloat(primary2.style.left);
                            const currentY2 = Number.parseFloat(primary2.style.top);
                            
                            primary1.style.left = (currentX1 - separationX) + 'px';
                            primary1.style.top = (currentY1 - separationY) + 'px';
                            primary2.style.left = (currentX2 + separationX) + 'px';
                            primary2.style.top = (currentY2 + separationY) + 'px';
                        }
                    }
                }
            }

            if (self.shapeSets.length > 0) {
                animationFrameId = requestAnimationFrame(updatePhysics);
            }
        };

        // Color palette
        const colorPalette = [
            { name: 'pink', colors: ['#FF6B9D', '#C44569'] },
            { name: 'yellow', colors: ['#F8B500'] },
            { name: 'cyan', colors: ['#4ECDC4', '#95E1D3'] },
            { name: 'purple', colors: ['#AA96DA'] },
            { name: 'lightPink', colors: ['#FCBAD3', '#FFC6FF'] }
        ];

        // Natural autumn color palette for maple leaves
        const mapleColorPalette = [
            { name: 'deepRed', colors: ['#DC143C', '#B22222'] },
            { name: 'crimson', colors: ['#CD5C5C', '#DC143C'] },
            { name: 'brightRed', colors: ['#DC143C', '#FF6347'] },
            { name: 'orange', colors: ['#FF8C00', '#FF7F50'] },
            { name: 'burntOrange', colors: ['#FF7F50', '#FF6347'] },
            { name: 'golden', colors: ['#FFD700', '#FFA500'] },
            { name: 'amber', colors: ['#FFA500', '#FF8C00'] },
            { name: 'yellow', colors: ['#FFD700', '#FFA500'] },
            { name: 'brown', colors: ['#8B4513', '#A0522D'] },
            { name: 'sienna', colors: ['#A0522D', '#CD853F'] },
            { name: 'rust', colors: ['#B22222', '#8B4513'] },
            { name: 'copper', colors: ['#CD5C5C', '#A0522D'] }
        ];

        // Get random color from palette (optionally filtered by theme type)
        const getRandomColor = function(set) {
            // Use natural autumn palette for maple leaves
            if (set && set.isMaple) {
                return mapleColorPalette[Math.floor(Math.random() * mapleColorPalette.length)];
            }
            return colorPalette[Math.floor(Math.random() * colorPalette.length)];
        };

        // Convert hex color to RGB string
        const hexToRgb = function(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
        };

        // Apply color to shape set
        const applyColor = function(set, color) {
            const primary = set.primaryElement;
            const secondaries = set.secondaryElements;


            // Remove grayscale filter to make colorful
            primary.style.filter = 'blur(0.5px)';
            secondaries.forEach(secondary => {
                secondary.style.filter = 'blur(0.2px)';
            });

            // Set opacity for colored shapes to be visible but not overwhelming
            const primaryOpacity = Constants.COLORED_PRIMARY_OPACITY || 0.85;
            const secondaryOpacity = Constants.COLORED_SECONDARY_OPACITY || 0.9;
            primary.style.opacity = primaryOpacity.toString();
            secondaries.forEach(secondary => {
                secondary.style.opacity = secondaryOpacity.toString();
            });

            // Apply colors based on theme type
            if (set.isMushroom) {
                // Mushroom-specific coloring: cap gets earthy colors, stem stays light, spots stay dark
                const capColor = color.colors[0];
                const capColor2 = color.colors[1] || capColor;
                // Create earthy gradient for cap
                const capGradient = `radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.3) 0%, ${capColor} 40%, ${capColor2} 70%, ${capColor} 100%)`;
                primary.style.background = capGradient;
                
                // Stem stays light/beige colored
                if (secondaries.length > 0) {
                    const stem = secondaries[0];
                    stem.style.background = `linear-gradient(90deg, 
                        rgba(240,230,220,0.9) 0%,
                        rgba(250,245,240,0.95) 20%,
                        rgba(255,255,255,1) 50%,
                        rgba(250,245,240,0.95) 80%,
                        rgba(240,230,220,0.9) 100%)`;
                }
                
                // Spots stay dark (keep original dark color)
                for (let i = 1; i < secondaries.length; i++) {
                    const spot = secondaries[i];
                    spot.style.background = `radial-gradient(circle, rgba(50,30,20,0.9) 0%, rgba(30,20,15,0.8) 50%, rgba(20,15,10,0.6) 100%)`;
                }
            } else if (set.isMaple) {
                // Maple-specific coloring: leaves get natural autumn colors with vein patterns
                const leafColor = color.colors[0];
                const leafColor2 = color.colors[1] || leafColor;
                
                // Convert hex to RGB for natural color mixing
                const hexToRgb = function(hex) {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
                };
                
                // Lighten function - increases brightness while maintaining color character
                const lightenRgb = function(rgb, amount) {
                    return {
                        r: Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * amount)),
                        g: Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * amount)),
                        b: Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * amount))
                    };
                };
                
                const rgb1 = hexToRgb(leafColor);
                const rgb2 = hexToRgb(leafColor2);
                
                // Lighten base colors by 20% for softer appearance
                const lightRgb1 = lightenRgb(rgb1, 0.2);
                const lightRgb2 = lightenRgb(rgb2, 0.2);
                const lightLeafColor = `rgb(${lightRgb1.r}, ${lightRgb1.g}, ${lightRgb1.b})`;
                const lightLeafColor2 = `rgb(${lightRgb2.r}, ${lightRgb2.g}, ${lightRgb2.b})`;
                
                // Set CSS variables for SVG gradient
                primary.style.setProperty('--maple-color1', lightLeafColor);
                primary.style.setProperty('--maple-color2', lightLeafColor2);
                
                // Create lighter edge/center colors for fallback background styling
                const edgeR = Math.floor((lightRgb1.r + 140) / 2);
                const edgeG = Math.floor((lightRgb1.g + 100) / 2);
                const edgeB = Math.floor((lightRgb1.b + 70) / 2);
                const edgeColor = `rgb(${edgeR}, ${edgeG}, ${edgeB})`;
                const centerR = Math.min(255, Math.floor(lightRgb1.r * 1.4));
                const centerG = Math.min(255, Math.floor(lightRgb1.g * 1.3));
                const centerB = Math.min(255, Math.floor(lightRgb1.b * 1.2));
                const centerColor = `rgb(${centerR}, ${centerG}, ${centerB})`;
                
                // Fallback layered gradients (in case SVG vars not applied)
                const baseGradient = `radial-gradient(ellipse at 50% 45%, ${centerColor} 0%, ${lightLeafColor} 25%, ${lightLeafColor2} 50%, ${lightLeafColor} 75%, ${edgeColor} 100%)`;
                const veinGradient1 = `linear-gradient(180deg, transparent 0%, ${lightLeafColor2} 15%, transparent 30%, ${lightLeafColor} 50%, transparent 70%, ${lightLeafColor2} 85%, transparent 100%)`;
                const veinGradient2 = `linear-gradient(90deg, transparent 0%, ${lightLeafColor} 20%, transparent 40%, ${lightLeafColor2} 60%, transparent 80%, ${lightLeafColor} 100%)`;
                primary.style.background = `${veinGradient2}, ${veinGradient1}, ${baseGradient}`;
                primary.style.backgroundBlendMode = 'multiply, overlay, normal';
            } else {
                // Default: Apply primary element gradient
                const gradient = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), ${color.colors[0]} 60%, ${color.colors[1] || color.colors[0]})`;
                primary.style.background = gradient;

                // Apply colors to secondary elements
                secondaries.forEach(secondary => {
                    secondary.style.background = color.colors[0];
                });
            }
        };

        // Birth: Create new shape set
        this.birth = function(count, currentCount, maxCapacity) {
            const defaultMaxCapacity = Constants.MAX_CAPACITY_MULTIPLIER * DEFAULT_THRESHOLD_X;
            const maxShapes = maxCapacity || defaultMaxCapacity;
            const birthCount = currentCount || 0;
            
            // Remove oldest shapes if we're at or over capacity
            const shapesToRemove = Math.max(0, (self.shapeSets.length + count) - maxShapes);
            if (shapesToRemove > 0) {
                this.end(shapesToRemove);
            }
            
            for (let i = 0; i < count; i++) {
                const shapeSet = self.createShapeSet(birthCount);
                self.shapeSets.push(shapeSet);
            }
            if (self.shapeSets.length > 0 && !animationFrameId) {
                updatePhysics();
            }
        };

        // Check and update shapes based on their age (birthCount + X threshold)
        this.updateShapeAging = function(currentCount, thresholdX) {
            const X = thresholdX || DEFAULT_THRESHOLD_X;
            self.shapeSets.forEach(set => {
                // If shape's age (currentCount - birthCount) reaches X, remove grayscale
                const shapeAge = currentCount - set.birthCount;
                if (shapeAge >= X && set.primaryElement.style.filter && set.primaryElement.style.filter.includes('grayscale')) {
                    // Shape has aged enough - remove grayscale and apply color
                    const color = getRandomColor(set);
                    applyColor(set, color);
                }
            });
        };

        // End: Remove shape sets - simple fade out
        this.end = function(count) {
            const toRemove = Math.min(count, self.shapeSets.length);
            for (let i = 0; i < toRemove; i++) {
                const set = self.shapeSets.shift();
                if (set) {
                    const primary = set.primaryElement;
                    const secondaries = set.secondaryElements;

                    // Simple fade out
                    primary.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    primary.style.opacity = '0';

                    secondaries.forEach(secondary => {
                        secondary.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
                        secondary.style.opacity = '0';
                    });

                    const fadeOutDuration = Constants.FADE_OUT_DURATION || 1500;
                    setTimeout(() => {
                        primary.remove();
                        secondaries.forEach(secondary => secondary.remove());
                    }, fadeOutDuration);
                }
            }
        };

        // Color: Apply color effect
        // If count is -1, apply color to all shape sets that have aged enough with cascading wave effect
        this.color = function(count, currentCount, thresholdX) {
            const X = thresholdX || DEFAULT_THRESHOLD_X;
            const countParam = currentCount || 0;
            
            if (count === -1) {
                // Color wave: apply color to ALL shape sets that have aged enough with cascading effect
                const agedSets = [];
                self.shapeSets.forEach(set => {
                    const shapeAge = countParam - set.birthCount;
                    if (shapeAge >= X) {
                        agedSets.push(set);
                    }
                });
                
                // Shuffle sets for random cascading order
                const shuffledSets = agedSets.sort(() => Math.random() - 0.5);
                
                // Create background ripple circles effect
                const body = document.body;
                if (body) {
                    // Get a random color from the palette for the ripple effect
                    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                    const rippleColor = randomColor.colors[0];
                    const rgb = hexToRgb(rippleColor);
                    
                    // Create container for ripples
                    const rippleContainer = document.createElement('div');
                    rippleContainer.className = 'color-wave-ripples';
                    rippleContainer.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: -1;
                        overflow: hidden;
                    `;
                    body.appendChild(rippleContainer);
                    
                    // Get center of screen
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    
                    // Create 3-4 ripple circles with staggered timing
                    const numRipples = 3 + Math.floor(Math.random() * 2); // 3 or 4 ripples
                    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.8;
                    
                    for (let i = 0; i < numRipples; i++) {
                        const ripple = document.createElement('div');
                        ripple.className = 'color-wave-ripple';
                        const delay = i * 150; // Stagger each ripple by 150ms
                        const size = 20; // Starting size
                        
                        ripple.style.cssText = `
                            position: absolute;
                            left: ${centerX}px;
                            top: ${centerY}px;
                            width: ${size}px;
                            height: ${size}px;
                            margin-left: -${size/2}px;
                            margin-top: -${size/2}px;
                            border-radius: 50%;
                            border: 2px solid rgba(${rgb}, 0.4);
                            background: radial-gradient(circle, rgba(${rgb}, 0.15) 0%, transparent 70%);
                            transform: scale(0);
                            animation: ripple-expand ${1.4 + i * 0.15}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms forwards;
                        `;
                        rippleContainer.appendChild(ripple);
                    }
                    
                    // Remove container after animation completes
                    // Formula: last delay + last animation duration
                    // Last delay = (numRipples - 1) * 150
                    // Last duration = (1.4 + (numRipples - 1) * 0.15) * 1000 = 1400 + (numRipples - 1) * 150
                    const totalDuration = (numRipples - 1) * 150 + (1400 + (numRipples - 1) * 150);
                    
                    // Apply cascading color wave when ripple effect ends
                    setTimeout(() => {
                        shuffledSets.forEach((set, index) => {
                            setTimeout(() => {
                                const color = getRandomColor(set);
                                applyColor(set, color);
                                
                                // Add temporary pulse animation during color wave
                                const primary = set.primaryElement;
                                const secondaries = set.secondaryElements;
                                const allElements = [primary, ...secondaries];
                                
                                allElements.forEach(element => {
                                    if (element) {
                                        // Add pulse class temporarily
                                        element.classList.add('color-wave-pulse');
                                        setTimeout(() => {
                                            element.classList.remove('color-wave-pulse');
                                        }, 800);
                                    }
                                });
                            }, index * 50); // 50ms delay between each element for cascading effect
                        });
                    }, totalDuration);
                    
                    // Remove ripple container after animation completes
                    setTimeout(() => {
                        if (rippleContainer.parentNode) {
                            rippleContainer.parentNode.removeChild(rippleContainer);
                        }
                    }, totalDuration);
                } else {
                    // No ripple effect, apply color wave immediately
                    shuffledSets.forEach((set, index) => {
                        setTimeout(() => {
                            const color = getRandomColor(set);
                            applyColor(set, color);
                            
                            // Add temporary pulse animation during color wave
                            const primary = set.primaryElement;
                            const secondaries = set.secondaryElements;
                            const allElements = [primary, ...secondaries];
                            
                            allElements.forEach(element => {
                                if (element) {
                                    // Add pulse class temporarily
                                    element.classList.add('color-wave-pulse');
                                    setTimeout(() => {
                                        element.classList.remove('color-wave-pulse');
                                    }, 800);
                                }
                            });
                        }, index * 50); // 50ms delay between each element for cascading effect
                    });
                }
            } else {
                // Apply color to specified number of shape sets that have aged enough
                let colored = 0;
                for (let i = 0; i < self.shapeSets.length && colored < count; i++) {
                    const set = self.shapeSets[i];
                    const shapeAge = countParam - set.birthCount;
                    // Only color shapes that have aged enough
                    if (shapeAge >= X) {
                        const color = getRandomColor(set);
                        applyColor(set, color);
                        colored++;
                    }
                }
            }
        };

        // Remove grayscale from all shape sets and apply colors (for first color activation)
        this.removeGrayscaleFromAll = function(currentCount, thresholdX) {
            colorActivated = true; // Mark that color has been activated
            const X = thresholdX || DEFAULT_THRESHOLD_X;
            self.shapeSets.forEach(set => {
                // Only remove grayscale from shapes that have aged enough (birthCount + X)
                const shapeAge = currentCount - set.birthCount;
                if (shapeAge >= X) {
                    // Apply random color to each shape set (this also removes grayscale)
                    const color = getRandomColor(set);
                    applyColor(set, color);
                }
            });
        };

        // Pulse: Apply pulse animation to shapes that have aged enough
        this.pulse = function(count, currentCount, thresholdX) {
            const X = thresholdX || DEFAULT_THRESHOLD_X;
            const countParam = currentCount || 0;
            let pulsed = 0;
            
            for (let i = 0; i < self.shapeSets.length && pulsed < count; i++) {
                const set = self.shapeSets[i];
                const shapeAge = countParam - set.birthCount;
                // Only apply pulse to shapes that have aged enough
                if (shapeAge >= X) {
                    set.primaryElement.classList.add('aurora-pulse');
                    set.secondaryElements.forEach(secondary => {
                        secondary.classList.add('aurora-pulse');
                    });
                    pulsed++;
                }
            }
        };


        // Reset all visuals - gracefully fade out all shapes
        this.reset = function() {
            const totalShapes = self.shapeSets.length;
            
            // Fade out all shapes gracefully
            const allSets = self.shapeSets.slice(); // Create a copy to avoid modification during iteration
            allSets.forEach(set => {
                if (set) {
                    const primary = set.primaryElement;
                    const secondaries = set.secondaryElements;

                    // Apply fade out transition
                    primary.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    primary.style.opacity = '0';
                    primary.style.transform = 'scale(0)';

                    secondaries.forEach(secondary => {
                        secondary.style.transition = 'opacity 0.5s ease-out';
                        secondary.style.opacity = '0';
                    });

                    // Remove from DOM after fade completes
                    setTimeout(() => {
                        if (primary && primary.parentNode) {
                            primary.remove();
                        }
                        secondaries.forEach(secondary => {
                            if (secondary && secondary.parentNode) {
                                secondary.remove();
                            }
                        });
                    }, 500);
                }
            });
            
            // Clear the array after initiating all fade-outs
            self.shapeSets.length = 0;
            colorActivated = false; // Reset color activation flag
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        // Get visual status information
        this.getHint = function(countCorrect, countWrong, countSkip, thresholdX) {
            const X = thresholdX || DEFAULT_THRESHOLD_X;
            const totalCount = countCorrect;
            const wrongOrSkipAtThreshold = countWrong >= X || countSkip >= X;

            // Calculate when next shape will color (age >= X)
            const calculateNextColorTime = function(currentCount) {
                if (self.shapeSets.length === 0) {
                    // No shapes yet - first shape will color X answers after its birth
                    // First shape is born at currentCount + 1 (next answer)
                    // It will color at (currentCount + 1) + X = currentCount + X + 1
                    return currentCount + X + 1;
                }
                // Find the shape that will color next based on age calculation
                // A shape colors when currentCount - birthCount >= X
                // So it colors when currentCount >= birthCount + X
                let nextColorTime = Infinity;
                self.shapeSets.forEach(set => {
                    const colorTime = set.birthCount + X;
                    // Only consider shapes that haven't colored yet (age < X)
                    const shapeAge = currentCount - set.birthCount;
                    if (shapeAge < X && colorTime < nextColorTime) {
                        nextColorTime = colorTime;
                    }
                });
                // If we found a shape that will color, return that time
                if (nextColorTime !== Infinity) {
                    return nextColorTime;
                }
                // All existing shapes have colored or will color before this point
                // Next new shape will color X answers after birth
                return currentCount + X + 1;
            };

            // Calculate next threshold and progress
            const calculateNextThreshold = function(currentCount) {
                if (currentCount < 2 * X) {
                    // Colors unlock at 2X, not X
                    return { threshold: 2 * X, effect: 'Colors' };
                } else if (currentCount < 3 * X) {
                    return { threshold: 3 * X, effect: 'Pulse' };
                } else if (currentCount < 4 * X) {
                    return { threshold: 4 * X, effect: 'Wave' };
                } else {
                    // After 4X, next threshold is next multiple of X
                    const nextMultiple = Math.ceil((currentCount + 1) / X) * X;
                    return { threshold: nextMultiple, effect: 'Wave' };
                }
            };

            if (wrongOrSkipAtThreshold) {
                const remaining = X - Math.max(countWrong, countSkip);
                const wrongOrSkip = Math.max(countWrong, countSkip);
                
                if (remaining === 0) {
                    return {
                        message: 'Reset Warning',
                        description: 'Next wrong/skip resets all effects',
                        type: 'warning',
                        progress: 1.0
                    };
                } else {
                    const progress = wrongOrSkip / X;
                    return {
                        message: 'Reset Warning',
                        description: `${remaining} more until reset (${wrongOrSkip}/${X})`,
                        type: 'warning',
                        progress: progress
                    };
                }
            }

            // Calculate current state and next threshold
            const next = calculateNextThreshold(totalCount);
            const remaining = next.threshold - totalCount;

            if (totalCount === 0) {
                return {
                    message: 'Starting',
                    description: 'New elements appear with each correct answer',
                    type: 'info',
                    progress: 0
                };
            } else if (totalCount < 2 * X) {
                // Before color phase (2X): calculate when next shape will actually color
                const nextColorTime = calculateNextColorTime(totalCount);
                const answersUntilColor = nextColorTime - totalCount;
                
                // Check if any shapes have already colored (based on age, not filter state)
                let hasColoredShapes = false;
                self.shapeSets.forEach(set => {
                    const shapeAge = totalCount - set.birthCount;
                    // Shape has colored if its age >= X
                    if (shapeAge >= X) {
                        hasColoredShapes = true;
                    }
                });
                
                const remainingForPhase = (2 * X) - totalCount;
                const progress = totalCount / (2 * X);
                
                if (hasColoredShapes) {
                    // Shapes are already coloring through aging - clarify that colors work, but color phase enhances them
                    if (remainingForPhase > 1) {
                        return {
                            message: 'Colors Active',
                            description: `${remainingForPhase} more until color phase (enhanced effects)`,
                            type: 'info',
                            progress: progress
                        };
                    } else {
                        return {
                            message: 'Colors Active',
                            description: '1 more until color phase (enhanced effects)',
                            type: 'info',
                            progress: progress
                        };
                    }
                } else {
                    // No shapes have colored yet - show when first will color
                    if (answersUntilColor > 1) {
                        return {
                            message: 'Building',
                            description: `${answersUntilColor} more until first elements color`,
                            type: 'info',
                            progress: progress
                        };
                    } else {
                        return {
                            message: 'Almost There',
                            description: '1 more until first elements color',
                            type: 'info',
                            progress: progress
                        };
                    }
                }
            } else if (totalCount >= 2 * X && totalCount < 3 * X) {
                // Phase 2: Color Change - shapes age to color after X answers from birth
                const remaining = (3 * X) - totalCount;
                const progress = (totalCount - 2 * X) / X;
                return {
                    message: 'Colors Active',
                    description: `Color after ${X} answers. ${remaining} more until pulse`,
                    type: 'info',
                    progress: progress
                };
            } else if (totalCount >= 3 * X && totalCount < 4 * X) {
                // Phase 3: Pulse Effect - shapes continue to be created
                const remaining = (4 * X) - totalCount;
                const progress = (totalCount - 3 * X) / X;
                return {
                    message: 'Pulse Active',
                    description: `Aged elements pulse. ${remaining} more until color wave`,
                    type: 'info',
                    progress: progress
                };
            } else if (totalCount >= 4 * X) {
                // Phase 4+: Color Wave (every X correct answers) - shapes continue to be created
                const waveCount = Math.floor((totalCount - 4 * X) / X) + 1;
                const progress = ((totalCount - 4 * X) % X) / X;
                const nextWaveRemaining = remaining;
                return {
                    message: `Color Wave ${waveCount}`,
                    description: nextWaveRemaining > 0 ? `${nextWaveRemaining} more until next color wave` : 'Next color wave colors all aged',
                    type: 'info',
                    progress: progress
                };
            }

            // Fallback (shouldn't reach here)
            return {
                message: 'Building',
                description: `${remaining} more correct answer${remaining === 1 ? '' : 's'} for ${next.effect}`,
                type: 'info',
                progress: 0.5
            };
        };

        // Handle window resize
        window.addEventListener('resize', function() {
            self.shapeSets.forEach(set => {
                const primary = set.primaryElement;
                const rect = primary.getBoundingClientRect();
                let x = Number.parseFloat(primary.style.left);
                let y = Number.parseFloat(primary.style.top);

                // For jellyfish, use base size for boundary checks to account for CSS scale animations
                // For all themes, account for shadow/glow extents to prevent scrollbars
                let checkWidth, checkHeight;
                let shadowExtent = 0;
                if (set.isJellyfish && set.bellSize) {
                    const bellWidth = set.bellSize * 1.2;
                    const bellHeight = set.bellSize * 0.7;
                    // Jellyfish has box-shadows with visible glow up to ~120px
                    shadowExtent = 120;
                    checkWidth = bellWidth + shadowExtent * 2;
                    checkHeight = bellHeight + shadowExtent * 2;
                } else if (set.isMaple) {
                    // Account for drop-shadow extent (20px is the largest shadow)
                    shadowExtent = 20;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else if (set.isMushroom) {
                    // Mushroom has box-shadows up to 90px in pulse animation
                    shadowExtent = 90;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else if (set.isFirefly) {
                    // Firefly has box-shadows up to 110px in pulse animation
                    shadowExtent = 110;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else if (set.isPearl) {
                    // Pearl has box-shadows up to 35px in pulse animation
                    shadowExtent = 35;
                    checkWidth = rect.width + shadowExtent * 2;
                    checkHeight = rect.height + shadowExtent * 2;
                } else {
                    checkWidth = rect.width;
                    checkHeight = rect.height;
                }

                // Adjust boundary checks to account for shadow/glow padding
                const boundaryPadding = shadowExtent;
                if (x + checkWidth > window.innerWidth - boundaryPadding) {
                    primary.style.left = (window.innerWidth - checkWidth - boundaryPadding) + 'px';
                }
                if (x < boundaryPadding) {
                    primary.style.left = boundaryPadding + 'px';
                }
                if (y + checkHeight > window.innerHeight - boundaryPadding) {
                    primary.style.top = (window.innerHeight - checkHeight - boundaryPadding) + 'px';
                }
                if (y < boundaryPadding) {
                    primary.style.top = boundaryPadding + 'px';
                }
            });
        });
    };

    // Export
    global.OceanOfMaya.VisualThemes.BaseTheme = BaseTheme;

})(typeof window !== 'undefined' ? window : this);

