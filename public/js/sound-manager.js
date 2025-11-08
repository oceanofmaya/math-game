// Sound Manager
// Handles theme music and sound effects
(function(global) {
    'use strict';

    // Create namespace structure
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    if (!global.OceanOfMaya.Sound) {
        global.OceanOfMaya.Sound = {};
    }

    // Theme Music Registry
    // Add your music files to public/sounds/music/ directory
    // See docs/features/sounds/README.md for music sources and licensing information
    const ThemeMusicRegistry = {
        'jellyfish': {
            track: 'sounds/music/jellyfish-theme.mp3',
            title: 'Ambiment',
            artist: 'Kevin MacLeod',
            volume: 0.25, // 25% volume for ambient music
            license: 'CC BY 4.0',
            attributionUrl: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100630'
        },
        'firefly': {
            track: 'sounds/music/firefly-theme.mp3',
            title: 'Ethereal Relaxation',
            artist: 'Kevin MacLeod',
            volume: 0.25, // 25% volume for ambient music
            license: 'CC BY 4.0',
            attributionUrl: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2100031'
        },
        'pearl': {
            track: 'sounds/music/pearl-theme.mp3',
            title: 'Kalimba Relaxation Music',
            artist: 'Kevin MacLeod',
            volume: 0.25, // 25% volume for ambient music
            license: 'CC BY 4.0',
            attributionUrl: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900039'
        },
        'mushroom': {
            track: 'sounds/music/mushroom-theme.mp3',
            title: 'Magic Forest',
            artist: 'Kevin MacLeod',
            volume: 0.25, // 25% volume for ambient music
            license: 'CC BY 4.0',
            attributionUrl: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600044'
        },
        'maple': {
            track: 'sounds/music/maple-theme.mp3',
            title: 'Evening',
            artist: 'Kevin MacLeod',
            volume: 0.25, // 25% volume for ambient music
            license: 'CC BY 4.0',
            attributionUrl: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300002'
        }
    };

    // Sound Manager
    const SoundManager = {
        currentAudio: null,
        currentTheme: null,
        isMuted: false,
        masterVolume: 1.0, // 0.0 to 1.0
        musicVolume: 0.25, // Default music volume (25%)

        // Initialize sound system
        initialize: function() {
            // Check if audio is supported
            if (typeof Audio === 'undefined') {
                console.warn('Audio not supported in this browser');
                return false;
            }

            // Check if user has interacted with the page (required for autoplay)
            // We'll start music only after user interaction
            return true;
        },

        // Play theme music
        playThemeMusic: function(themeName) {
            // Get theme music configuration
            const musicConfig = ThemeMusicRegistry[themeName];
            if (!musicConfig) {
                console.warn('No music found for theme: ' + themeName);
                return;
            }

            // Don't play if muted
            if (this.isMuted) {
                return;
            }

            // Reuse existing audio if it's for the same theme
            if (this.currentAudio && this.currentTheme === themeName) {
                // Try to play the existing audio (in case autoplay was blocked)
                if (this.currentAudio.paused) {
                    const playPromise = this.currentAudio.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(function(error) {
                            // If play fails, create a new audio element
                            console.log('Failed to resume existing audio, creating new one.');
                            this.stopMusic();
                            this._createAndPlayAudio(themeName, musicConfig);
                        }.bind(this));
                    }
                }
                return;
            }

            // Stop current music if playing different theme
            this.stopMusic();

            // Create and play new audio element
            this._createAndPlayAudio(themeName, musicConfig);
        },

        // Internal method to create and play audio
        _createAndPlayAudio: function(themeName, musicConfig) {
            // Create new audio element
            const audio = new Audio(musicConfig.track);
            audio.loop = true;
            audio.volume = this.masterVolume * this.musicVolume * (musicConfig.volume || 0.25);
            
            // Handle errors gracefully
            audio.addEventListener('error', function(e) {
                console.warn('Error loading theme music:', musicConfig.track, e);
            });

            // Start playing
            audio.play().catch(function(error) {
                // Autoplay was prevented - this is normal, user needs to interact first
                console.log('Autoplay prevented. Music will start after user interaction.');
            });

            this.currentAudio = audio;
            this.currentTheme = themeName;
        },

        // Stop current music
        stopMusic: function() {
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
                this.currentAudio = null;
            }
            this.currentTheme = null;
        },

        // Toggle mute
        toggleMute: function() {
            this.isMuted = !this.isMuted;
            if (this.currentAudio) {
                this.currentAudio.muted = this.isMuted;
            }
            return this.isMuted;
        },

        // Set master volume (0.0 to 1.0)
        setMasterVolume: function(volume) {
            this.masterVolume = Math.max(0, Math.min(1, volume));
            if (this.currentAudio) {
                const musicConfig = ThemeMusicRegistry[this.currentTheme];
                const musicVolume = musicConfig ? (musicConfig.volume || 0.25) : 0.25;
                this.currentAudio.volume = this.masterVolume * this.musicVolume * musicVolume;
            }
        },

        // Set music volume (0.0 to 1.0)
        setMusicVolume: function(volume) {
            this.musicVolume = Math.max(0, Math.min(1, volume));
            if (this.currentAudio) {
                const musicConfig = ThemeMusicRegistry[this.currentTheme];
                const musicVolume = musicConfig ? (musicConfig.volume || 0.25) : 0.25;
                this.currentAudio.volume = this.masterVolume * this.musicVolume * musicVolume;
            }
        },

        // Resume music if it was stopped (call after user interaction)
        resumeMusic: function() {
            if (this.currentTheme && !this.isMuted) {
                this.playThemeMusic(this.currentTheme);
            }
        }
    };

    // Export
    global.OceanOfMaya.Sound.Manager = SoundManager;

})(typeof window !== 'undefined' ? window : this);

