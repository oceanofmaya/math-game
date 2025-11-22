// Visual Themes Manager
// Orchestrates visual effects based on game state
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.VisualThemes) {
        global.OceanOfMaya.VisualThemes = {};
    }

    // Theme Registry - Centralized theme configuration
    const ThemeRegistry = {
        'jellyfish': {
            constructor: function() {
                return new global.OceanOfMaya.VisualThemes.Jellyfish();
            },
            className: '.jellyfish-bell'
        },
        'firefly': {
            constructor: function() {
                return new global.OceanOfMaya.VisualThemes.Firefly();
            },
            className: '.firefly-glow'
        },
        'pearl': {
            constructor: function() {
                return new global.OceanOfMaya.VisualThemes.Pearl();
            },
            className: '.pearl'
        },
        'mushroom': {
            constructor: function() {
                return new global.OceanOfMaya.VisualThemes.Mushroom();
            },
            className: '.mushroom-cap'
        },
        'maple': {
            constructor: function() {
                return new global.OceanOfMaya.VisualThemes.Maple();
            },
            className: '.maple-leaf'
        }
    };

    // Visual Manager
    const Constants = global.OceanOfMaya.Constants || {};
    const Manager = {
        currentTheme: null,
        countCorrect: 0,
        countWrong: 0,
        countSkip: 0,
        X: Constants.DEFAULT_THRESHOLD_X || 5,
        colorsActivated: false, // Track if colors have been activated
        sampleMode: false, // Track if we're in sample mode
        sampleElementBirthCount: 0, // Track birth count for sample element

        initialize: function(themeName) {
            // Reset current theme before switching to new one
            if (this.currentTheme && this.currentTheme.reset) {
                this.currentTheme.reset();
            }
            this.countCorrect = 0;
            this.countWrong = 0;
            this.countSkip = 0;
            this.colorsActivated = false;
            
            // Use theme registry for dynamic theme creation
            const themeConfig = ThemeRegistry[themeName];
            if (themeConfig && themeConfig.constructor) {
                this.currentTheme = themeConfig.constructor();
            } else {
                console.warn('Unknown theme "' + themeName + '". Using default theme.');
                const defaultTheme = ThemeRegistry['jellyfish'];
                this.currentTheme = defaultTheme.constructor();
            }

            // Play theme music
            if (global.OceanOfMaya.Sound && global.OceanOfMaya.Sound.Manager) {
                global.OceanOfMaya.Sound.Manager.playThemeMusic(themeName);
            }
            
            // Update sample element dropdown to reflect current capacity
            this.updateSampleElementDropdown();
        },

        setX: function(value) {
            this.X = value || Constants.DEFAULT_THRESHOLD_X || 5;
            // Update sample mode dropdown when X changes
            this.updateSampleElementDropdown();
        },

        // Calculate maximum capacity based on current X threshold
        getMaxCapacity: function() {
            return Constants.MAX_CAPACITY_MULTIPLIER * this.X;
        },

        // Update sample element dropdown to reflect maximum game capacity
        updateSampleElementDropdown: function() {
            const dropdown = document.getElementById('sampleElementCount');
            if (!dropdown) return;

            const maxCapacity = this.getMaxCapacity();
            const currentValue = Number.parseInt(dropdown.value, 10);
            const defaultValue = Math.min(5, maxCapacity);
            
            // Determine which value to select (preserve current if valid, otherwise use default)
            const valueToSelect = (currentValue && currentValue <= maxCapacity) ? currentValue : defaultValue;
            
            // Clear existing options
            dropdown.innerHTML = '';
            
            // Add options from 1 to maxCapacity
            for (let i = 1; i <= maxCapacity; i++) {
                const option = document.createElement('option');
                option.value = i.toString();
                option.textContent = i.toString();
                if (i === valueToSelect) {
                    option.selected = true;
                }
                dropdown.appendChild(option);
            }
        },

        syncCounts: function() {
            if (global.OceanOfMaya && global.OceanOfMaya.MathGame && global.OceanOfMaya.MathGame.getCounts) {
                const counts = global.OceanOfMaya.MathGame.getCounts();
                this.countCorrect = counts.correct || 0;
                this.countWrong = counts.wrong || 0;
                this.countSkip = counts.skip || 0;
            }
        },

        handleCorrectAnswer: function() {
            // Don't process if in sample mode
            if (this.sampleMode) return;
            
            // Sync counts from MathGame (which already incremented correct)
            this.syncCounts();
            this.countWrong = 0;
            this.countSkip = 0;

            if (!this.currentTheme) return;

            const count = this.countCorrect;
            const maxCapacity = Constants.MAX_CAPACITY_MULTIPLIER * this.X;
            const colorThreshold = Constants.COLOR_THRESHOLD_MULTIPLIER * this.X;
            const pulseThreshold = Constants.PULSE_THRESHOLD_MULTIPLIER * this.X;
            const colorWaveThreshold = Constants.COLOR_WAVE_THRESHOLD_MULTIPLIER * this.X;

            // Always create new shapes on correct answers (with capacity management)
            this.currentTheme.birth(1, count, maxCapacity);

            // Check and update aging for shapes (remove grayscale when birthCount + X is reached)
            this.currentTheme.updateShapeAging(count, this.X);

            // Apply effects based on count thresholds
            if (count >= colorThreshold && count < pulseThreshold) {
                // First time reaching color threshold: activate colors for aged shapes
                if (!this.colorsActivated) {
                    this.currentTheme.removeGrayscaleFromAll(count, this.X);
                    this.colorsActivated = true;
                }
                this.currentTheme.color(1, count, this.X);
            } else if (count >= pulseThreshold && count < colorWaveThreshold) {
                // Pulse phase: apply pulse to aged mushrooms
                this.currentTheme.pulse(1, count, this.X);
            } else if (count >= colorWaveThreshold) {
                // Color wave phase: apply pulse to aged mushrooms AND color wave on multiples of X
                // Continue pulsing aged mushrooms even after pulse phase ends
                this.currentTheme.pulse(1, count, this.X);
                if (count % this.X === 0) {
                    // Color wave: apply color to ALL shape sets that have aged enough
                    this.currentTheme.color(-1, count, this.X);
                }
            }

            this.updateHint();
        },

        handleWrongAnswer: function() {
            // Don't process if in sample mode
            if (this.sampleMode) return;
            
            // Sync counts from MathGame (which already incremented wrong)
            this.syncCounts();

            if (!this.currentTheme) return;

            this.currentTheme.end(1);

            // Reset when total wrong + skip reaches X (not when either individually reaches X)
            if ((this.countWrong + this.countSkip) >= this.X) {
                this.currentTheme.reset();
                this.countCorrect = 0;
                this.countWrong = 0;
                this.countSkip = 0;
                this.colorsActivated = false;
                // Force hint update after reset to show starting state
                this.updateHint();
                return;
            }

            this.updateHint();
        },

        handleSkip: function() {
            // Don't process if in sample mode
            if (this.sampleMode) return;
            
            // Sync counts from MathGame (which already incremented skip)
            this.syncCounts();

            if (!this.currentTheme) return;

            this.currentTheme.end(1);

            // Reset when total wrong + skip reaches X (not when either individually reaches X)
            if ((this.countWrong + this.countSkip) >= this.X) {
                this.currentTheme.reset();
                this.countCorrect = 0;
                this.countWrong = 0;
                this.countSkip = 0;
                this.colorsActivated = false;
                // Force hint update after reset to show starting state
                this.updateHint();
                return;
            }

            this.updateHint();
        },

        handleFactorChange: function() {
            this.syncCounts();
            this.countCorrect = 0;
            this.countWrong = 0;
            this.countSkip = 0;
            this.colorsActivated = false;

            if (this.currentTheme) {
                this.currentTheme.reset();
            }

            this.updateHint();
        },

        updateHint: function() {
            if (!this.currentTheme) return;
            
            // Don't update hint in sample mode to prevent layout shifts
            if (this.sampleMode) return;

            const hintElement = document.getElementById('visualHint');
            if (!hintElement) return;

            const hint = this.currentTheme.getHint(this.countCorrect, this.countWrong, this.countSkip, this.X);
            
            // Get or create hint content container
            let hintContent = hintElement.querySelector('.hint-content');
            if (!hintContent) {
                hintContent = document.createElement('div');
                hintContent.className = 'hint-content';
                hintElement.appendChild(hintContent);
            }

            // Clear existing content
            hintContent.innerHTML = '';

            // Add message
            if (hint.message) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'hint-message';
                messageDiv.textContent = hint.message;
                if (hint.type === 'warning') {
                    messageDiv.classList.add('hint-warning');
                }
                hintContent.appendChild(messageDiv);
            }

            // Add description if present
            if (hint.description) {
                const descriptionDiv = document.createElement('div');
                descriptionDiv.className = 'hint-description';
                descriptionDiv.textContent = hint.description;
                hintContent.appendChild(descriptionDiv);
            }

            // Add progress bar if progress is available
            if (hint.progress !== undefined) {
                // Remove any existing progress bar
                const existingProgress = hintContent.querySelector('.hint-progress');
                if (existingProgress) {
                    existingProgress.remove();
                }

                const progressContainer = document.createElement('div');
                progressContainer.className = 'hint-progress-container';
                
                const progressBar = document.createElement('div');
                progressBar.className = 'hint-progress';
                if (hint.type === 'warning') {
                    progressBar.classList.add('hint-progress-warning');
                }
                progressBar.style.width = (hint.progress * 100) + '%';
                
                progressContainer.appendChild(progressBar);
                hintContent.appendChild(progressContainer);
            }
        },

        getCounts: function() {
            return {
                correct: this.countCorrect,
                wrong: this.countWrong,
                skip: this.countSkip
            };
        },

        // Sample Mode Methods
        setMode: function(mode) {
            const isSampleMode = mode === 'sample';
            this.sampleMode = isSampleMode;
            
            // Update button styles using CSS classes
            const gameButton = document.getElementById('gameModeButton');
            const sampleButton = document.getElementById('sampleModeButton');
            
            if (gameButton && sampleButton) {
                if (isSampleMode) {
                    gameButton.classList.add('inactive');
                    gameButton.classList.remove('active');
                    sampleButton.classList.add('active');
                    sampleButton.classList.remove('inactive');
                } else {
                    gameButton.classList.add('active');
                    gameButton.classList.remove('inactive');
                    sampleButton.classList.add('inactive');
                    sampleButton.classList.remove('active');
                }
            }
            
            // Show/hide appropriate UI elements using CSS classes only (no inline styles)
            const gameFields = document.querySelectorAll('.game-mode-fields');
            const sampleFields = document.getElementById('sampleModeFields');
            const countContainer = document.querySelector('.count-container');
            
            if (this.sampleMode) {
                // Hide game mode fields
                gameFields.forEach(field => {
                    if (field) {
                        field.classList.add('hidden');
                        field.classList.remove('game-mode-fields-visible');
                    }
                });
                // Hide count container
                if (countContainer) {
                    countContainer.classList.add('hidden');
                }
                // Show sample mode fields
                if (sampleFields) {
                    sampleFields.classList.remove('hidden');
                    sampleFields.classList.add('visible');
                }
                // Disable timed mode (doesn't make sense in sample mode)
                const timedModeButton = document.getElementById('timedModeButton');
                // Stop timer if running and reset timed mode (check before changing button state)
                if (global.OceanOfMaya && global.OceanOfMaya.MathGame) {
                    // Toggle timed mode off if it was on (this will stop timer and reset everything)
                    if (timedModeButton && timedModeButton.classList.contains('active')) {
                        global.OceanOfMaya.MathGame.toggleTimedMode();
                    }
                }
                // Update button state
                if (timedModeButton) {
                    timedModeButton.classList.add('inactive');
                    timedModeButton.classList.remove('active');
                    timedModeButton.setAttribute('aria-pressed', 'false');
                }
                // Reset and create sample element
                this.sampleReset();
            } else {
                // Show game mode fields
                gameFields.forEach(field => {
                    if (field) {
                        field.classList.remove('hidden');
                        field.classList.add('game-mode-fields-visible');
                    }
                });
                // Show count container
                if (countContainer) {
                    countContainer.classList.remove('hidden');
                }
                // Hide sample mode fields
                if (sampleFields) {
                    sampleFields.classList.add('hidden');
                    sampleFields.classList.remove('visible');
                }
                // Reset MathGame counts when switching back to game mode
                // This will also reset visual theme and Manager counts through handleFactorChange()
                if (global.OceanOfMaya.MathGame && global.OceanOfMaya.MathGame.resetCounts) {
                    global.OceanOfMaya.MathGame.resetCounts();
                } else {
                    // Fallback: reset manually if MathGame is not available
                    if (this.currentTheme && this.currentTheme.reset) {
                        this.currentTheme.reset();
                    }
                    this.countCorrect = 0;
                    this.countWrong = 0;
                    this.countSkip = 0;
                    this.colorsActivated = false;
                    this.updateHint();
                }
            }
        },

        toggleSampleMode: function() {
            // Legacy support - toggle between modes
            this.setMode(this.sampleMode ? 'game' : 'sample');
        },

        sampleBirth: function() {
            if (!this.sampleMode || !this.currentTheme) return;
            
            // Reset first to clear existing elements
            if (this.currentTheme.reset) {
                this.currentTheme.reset();
            }
            
            // Get the number of elements to create from the input
            const countInput = document.getElementById('sampleElementCount');
            const minCount = Constants.SAMPLE_ELEMENT_COUNT_MIN || 1;
            const maxCount = this.getMaxCapacity(); // Use actual game capacity instead of constant
            const elementCount = countInput ? Math.max(minCount, Math.min(maxCount, Number.parseInt(countInput.value, 10) || minCount)) : minCount;
            
            // Create elements with birthCount = 0
            this.sampleElementBirthCount = 0;
            // Create the specified number of elements
            this.currentTheme.birth(elementCount, 0, elementCount);
        },

        sampleAge: function() {
            if (!this.sampleMode || !this.currentTheme) return;
            
            // Ensure element exists first
            if (!this.hasSampleElement()) {
                this.sampleBirth();
                setTimeout(() => this.sampleAge(), 200);
                return;
            }
            
            // Simulate aging: set count to X so element ages
            // The element was born at count 0, so at count X it has age X
            this.currentTheme.updateShapeAging(this.X, this.X);
        },

        sampleColor: function() {
            if (!this.sampleMode || !this.currentTheme) return;
            
            // Ensure elements exist first
            if (!this.hasSampleElement()) {
                this.sampleBirth();
                setTimeout(() => this.sampleColor(), 200);
                return;
            }
            
            // Get the number of elements to color from the input (default to 1)
            const countInput = document.getElementById('sampleElementCount');
            const minCount = Constants.SAMPLE_ELEMENT_COUNT_MIN || 1;
            const maxCount = this.getMaxCapacity(); // Use actual game capacity instead of constant
            const colorCount = countInput ? Math.max(minCount, Math.min(maxCount, Number.parseInt(countInput.value, 10) || minCount)) : minCount;
            
            // First ensure elements are aged
            this.currentTheme.updateShapeAging(this.X, this.X);
            // Then apply color to the specified number
            this.currentTheme.color(colorCount, this.X, this.X);
        },

        samplePulse: function() {
            if (!this.sampleMode || !this.currentTheme) return;
            
            // Ensure elements exist first
            if (!this.hasSampleElement()) {
                this.sampleBirth();
                setTimeout(() => this.samplePulse(), 200);
                return;
            }
            
            // Get the number of elements to pulse from the input (default to 1)
            const countInput = document.getElementById('sampleElementCount');
            const minCount = Constants.SAMPLE_ELEMENT_COUNT_MIN || 1;
            const maxCount = this.getMaxCapacity(); // Use actual game capacity instead of constant
            const pulseCount = countInput ? Math.max(minCount, Math.min(maxCount, Number.parseInt(countInput.value, 10) || minCount)) : minCount;
            
            // Ensure elements are aged
            this.currentTheme.updateShapeAging(this.X, this.X);
            // Apply pulse to the specified number
            this.currentTheme.pulse(pulseCount, this.X, this.X);
        },


        sampleColorWave: function() {
            if (!this.sampleMode || !this.currentTheme) return;
            
            // Ensure elements exist first
            if (!this.hasSampleElement()) {
                this.sampleBirth();
                setTimeout(() => this.sampleColorWave(), 200);
                return;
            }
            
            // Ensure elements are aged
            this.currentTheme.updateShapeAging(this.X, this.X);
            // Apply color wave (all elements)
            this.currentTheme.color(-1, this.X, this.X);
        },

        sampleEnd: function() {
            if (!this.sampleMode || !this.currentTheme) return;
            
            // Get the number of elements to end from the input (default to 1)
            const countInput = document.getElementById('sampleElementCount');
            const minCount = Constants.SAMPLE_ELEMENT_COUNT_MIN || 1;
            const maxCount = this.getMaxCapacity(); // Use actual game capacity instead of constant
            const endCount = countInput ? Math.max(minCount, Math.min(maxCount, Number.parseInt(countInput.value, 10) || minCount)) : minCount;
            
            // End the specified number of elements (will show fade-out effect for each)
            this.currentTheme.end(endCount);
        },

        sampleReset: function() {
            if (!this.sampleMode || !this.currentTheme) return;
            
            // Reset everything
            if (this.currentTheme.reset) {
                this.currentTheme.reset();
            }
            this.sampleElementBirthCount = 0;
            
            // Create fresh elements after a brief delay (number from input)
            setTimeout(() => {
                this.sampleBirth();
            }, 150);
        },

        // Helper to check if sample element exists
        hasSampleElement: function() {
            if (!this.currentTheme) return false;
            
            // Check if any theme elements exist in the DOM
            const themeSelect = document.getElementById('visualThemeSelect') || document.getElementById('visualThemeSelectSample');
            if (!themeSelect) return false;
            
            const themeName = themeSelect.value;
            const themeConfig = ThemeRegistry[themeName];
            
            if (!themeConfig || !themeConfig.className) {
                return false;
            }
            
            return document.querySelector(themeConfig.className) !== null;
        },

        // Helper to get theme class name
        getThemeClassName: function(themeName) {
            const themeConfig = ThemeRegistry[themeName];
            return themeConfig ? themeConfig.className : null;
        }
    };

    // Export
    global.OceanOfMaya.VisualThemes.Manager = Manager;

})(typeof window !== 'undefined' ? window : this);

