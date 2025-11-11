// Game Constants
// Centralized configuration values for maintainability
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }

    global.OceanOfMaya.Constants = {
        // Game Configuration
        // Maximum number value used in problems (applies to all operations: addition, subtraction, multiplication, division)
        DEFAULT_MAX_NUMBER: 20,
        DEFAULT_OPERATION: 'multiply',
        DEFAULT_THRESHOLD_X: 5,
        
        // Timing Constants (in milliseconds)
        CORRECT_ANSWER_DELAY: 1000,
        DEFAULT_NEXT_QUESTION_DELAY: 3000,
        FADE_OUT_DURATION: 1500,
        
        // Visual Theme Thresholds
        COLOR_THRESHOLD_MULTIPLIER: 2,      // 2X
        PULSE_THRESHOLD_MULTIPLIER: 3,      // 3X
        COLOR_WAVE_THRESHOLD_MULTIPLIER: 4,  // 4X
        MAX_CAPACITY_MULTIPLIER: 3,          // 3X
        
        // Opacity Values
        COLORED_PRIMARY_OPACITY: 0.85,
        COLORED_SECONDARY_OPACITY: 0.9,
        
        // Size Ranges (in pixels)
        DEFAULT_PRIMARY_SIZE_MIN: 30,
        DEFAULT_PRIMARY_SIZE_MAX: 130,
        JELLYFISH_BELL_SIZE_MIN: 25,
        JELLYFISH_BELL_SIZE_MAX: 55,
        FIREFLY_SIZE_MIN: 8,
        FIREFLY_SIZE_MAX: 20,
        PEARL_SIZE_MIN: 25,
        PEARL_SIZE_MAX: 60,
        MUSHROOM_CAP_SIZE_MIN: 30,
        MUSHROOM_CAP_SIZE_MAX: 80,
        MAPLE_LEAF_SIZE_MIN: 40,
        MAPLE_LEAF_SIZE_MAX: 95,
        
        // Animation Delays (in seconds)
        JELLYFISH_BELL_ANIMATION_DELAY_MAX: 8,
        JELLYFISH_TENTACLE_ANIMATION_DELAY_MAX: 5,
        FIREFLY_ANIMATION_DELAY_MAX: 6,
        PEARL_ANIMATION_DELAY_MAX: 8,
        MUSHROOM_ANIMATION_DELAY_MAX: 8,
        MAPLE_ANIMATION_DELAY_MAX: 8,
        
        // Physics Constants
        BASE_VELOCITY_MULTIPLIER: 0.8,
        JELLYFISH_VELOCITY_X_MULTIPLIER: 0.8,
        JELLYFISH_VELOCITY_Y_MULTIPLIER: 0.6,
        FIREFLY_VELOCITY_X_MULTIPLIER: 1.5,
        FIREFLY_VELOCITY_Y_MULTIPLIER: 1.3,
        PEARL_VELOCITY_MULTIPLIER: 1.6,
        MUSHROOM_VELOCITY_MULTIPLIER: 0.6,
        MAPLE_VELOCITY_MULTIPLIER: 0.7,
        
        // Rotation Constants (degrees per frame)
        JELLYFISH_ROTATION_SPEED_MIN: 0.1,
        JELLYFISH_ROTATION_SPEED_MAX: 0.3,
        PEARL_ROTATION_SPEED_MIN: 0.4,
        PEARL_ROTATION_SPEED_MAX: 1.2,
        
        // Sample Mode
        SAMPLE_ELEMENT_COUNT_MIN: 1,
        SAMPLE_ELEMENT_COUNT_MAX: 20,
        SAMPLE_ELEMENT_COUNT_DEFAULT: 5,
        
        // Answer Validation
        ANSWER_TOLERANCE: 0.0001,
        
        // Application Version
        VERSION: '1.0.5'
    };

})(typeof window !== 'undefined' ? window : this);

