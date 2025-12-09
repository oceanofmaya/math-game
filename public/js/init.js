// Initialize event handlers after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const Constants = OceanOfMaya.Constants;

  // Reset max number input to default
  const maxNumberInput = document.getElementById('maxNumber');
  if (maxNumberInput) {
    maxNumberInput.value = Constants.DEFAULT_MAX_NUMBER.toString();
  }

  // Initialize sample element count dropdown based on game capacity
  // This will be updated by VisualThemes.Manager.updateSampleElementDropdown()
  // after the manager is initialized

  // Mode toggle buttons
  const gameButton = document.getElementById('gameModeButton');
  const sampleButton = document.getElementById('sampleModeButton');

  // Help content elements (needed for updateHelpContent function)
  const helpTextGame = document.getElementById('helpTextGame');
  const helpTextSample = document.getElementById('helpTextSample');
  const helpLegend = document.getElementById('helpLegend');

  // Function to update help content based on current mode
  function updateHelpContent() {
    const isSampleMode = sampleButton && sampleButton.classList.contains('active');
    if (helpTextGame && helpTextSample) {
      if (isSampleMode) {
        helpTextGame.classList.add('hidden');
        helpTextSample.classList.remove('hidden');
        if (helpLegend) {
          helpLegend.textContent = 'Sample Mode';
        }
      } else {
        helpTextGame.classList.remove('hidden');
        helpTextSample.classList.add('hidden');
        if (helpLegend) {
          helpLegend.textContent = 'How to Play';
        }
      }
    }
  }

  // Helper function to add keyboard support to buttons
  function addKeyboardSupport(button, clickHandler) {
    if (button) {
      button.addEventListener('click', clickHandler);
      button.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickHandler();
        }
      });
    }
  }

  if (gameButton && sampleButton) {
    // Game mode button handler
    addKeyboardSupport(gameButton, function () {
      if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
        OceanOfMaya.VisualThemes.Manager.setMode('game');
      }
      gameButton.setAttribute('aria-pressed', 'true');
      sampleButton.setAttribute('aria-pressed', 'false');
      // Update help content if it's currently visible
      setTimeout(function () {
        if (helpContent && !helpContent.classList.contains('hidden')) {
          updateHelpContent();
        }
      }, 0);
    });
    // Sample mode button handler
    addKeyboardSupport(sampleButton, function () {
      if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
        OceanOfMaya.VisualThemes.Manager.setMode('sample');
      }
      gameButton.setAttribute('aria-pressed', 'false');
      sampleButton.setAttribute('aria-pressed', 'true');
      // Update help content if it's currently visible
      setTimeout(function () {
        if (helpContent && !helpContent.classList.contains('hidden')) {
          updateHelpContent();
        }
      }, 0);
    });
  }

  // Sample mode controls
  const sampleBirth = document.getElementById('sampleBirth');
  const sampleAge = document.getElementById('sampleAge');
  const sampleColor = document.getElementById('sampleColor');
  const samplePulse = document.getElementById('samplePulse');
  const sampleColorWave = document.getElementById('sampleColorWave');
  const sampleEnd = document.getElementById('sampleEnd');
  const sampleReset = document.getElementById('sampleReset');

  addKeyboardSupport(sampleBirth, function () {
    if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
      OceanOfMaya.VisualThemes.Manager.sampleBirth();
    }
  });
  addKeyboardSupport(sampleAge, function () {
    if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
      OceanOfMaya.VisualThemes.Manager.sampleAge();
    }
  });
  addKeyboardSupport(sampleColor, function () {
    if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
      OceanOfMaya.VisualThemes.Manager.sampleColor();
    }
  });
  addKeyboardSupport(samplePulse, function () {
    if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
      OceanOfMaya.VisualThemes.Manager.samplePulse();
    }
  });
  addKeyboardSupport(sampleColorWave, function () {
    if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
      OceanOfMaya.VisualThemes.Manager.sampleColorWave();
    }
  });
  addKeyboardSupport(sampleEnd, function () {
    if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
      OceanOfMaya.VisualThemes.Manager.sampleEnd();
    }
  });
  addKeyboardSupport(sampleReset, function () {
    if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
      OceanOfMaya.VisualThemes.Manager.sampleReset();
    }
  });

  // Theme selectors
  const themeSelect = document.getElementById('visualThemeSelect');
  const themeSelectSample = document.getElementById('visualThemeSelectSample');

  if (themeSelect) {
    themeSelect.addEventListener('change', function () {
      if (OceanOfMaya.MathGame) {
        OceanOfMaya.MathGame.changeVisualTheme();
      }
    });
  }

  if (themeSelectSample) {
    themeSelectSample.addEventListener('change', function () {
      if (OceanOfMaya.MathGame) {
        OceanOfMaya.MathGame.changeVisualTheme();
      }
    });
  }

  // Operation buttons
  const opAdd = document.getElementById('op-add');
  const opSubtract = document.getElementById('op-subtract');
  const opMultiply = document.getElementById('op-multiply');
  const opDivide = document.getElementById('op-divide');
  const opMixed = document.getElementById('op-mixed');
  const opReset = document.getElementById('op-reset');

  if (opAdd)
    opAdd.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.setOperation('add');
    });
  if (opSubtract)
    opSubtract.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.setOperation('subtract');
    });
  if (opMultiply)
    opMultiply.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.setOperation('multiply');
    });
  if (opDivide)
    opDivide.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.setOperation('divide');
    });
  if (opMixed)
    opMixed.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.setOperation('mixed');
    });
  if (opReset)
    opReset.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.resetCounts();
    });

  // Form submission and buttons
  const gameForm = document.getElementById('gameForm');
  const submitAnswer = document.getElementById('submitAnswer');
  const skipQuestion = document.getElementById('skipQuestion');
  const changeMaxNumber = document.getElementById('changeMaxNumber');

  if (gameForm) {
    gameForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (OceanOfMaya.MathGame) {
        OceanOfMaya.MathGame.validateAnswer();
      }
    });
  }

  if (submitAnswer) {
    submitAnswer.addEventListener('click', function (e) {
      e.preventDefault();
      if (OceanOfMaya.MathGame) {
        OceanOfMaya.MathGame.validateAnswer();
      }
    });
    // Keyboard support: Enter key submits answer
    submitAnswer.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (OceanOfMaya.MathGame) {
          OceanOfMaya.MathGame.validateAnswer();
        }
      }
    });
  }

  if (skipQuestion) {
    skipQuestion.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.skipQuestion();
    });
    // Keyboard support: Space or Enter skips question
    skipQuestion.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.skipQuestion();
      }
    });
  }

  if (changeMaxNumber) {
    changeMaxNumber.addEventListener('click', function () {
      if (OceanOfMaya.MathGame) OceanOfMaya.MathGame.changeMaxNumber();
    });
  }

  // Sync theme selects
  if (themeSelect && themeSelectSample) {
    themeSelectSample.addEventListener('change', function () {
      themeSelect.value = this.value;
      if (OceanOfMaya.MathGame) {
        OceanOfMaya.MathGame.changeVisualTheme();
      }
    });
    themeSelect.addEventListener('change', function () {
      themeSelectSample.value = this.value;
    });
  }

  // Ensure placeholder is selected on page load (override any browser restore behavior)
  if (themeSelect) {
    themeSelect.value = '';
  }
  if (themeSelectSample) {
    themeSelectSample.value = '';
  }

  // Initialize visual theme system
  // Theme will be initialized when user selects from dropdown (requires user interaction for audio)
  if (OceanOfMaya && OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
    OceanOfMaya.VisualThemes.Manager.sampleMode = false;
    // Don't initialize theme automatically - wait for user selection
    // But update sample element dropdown to reflect current capacity
    OceanOfMaya.VisualThemes.Manager.updateSampleElementDropdown();
  }

  // Initialize game
  if (OceanOfMaya.MathGame) {
    OceanOfMaya.MathGame.setOperation(Constants.DEFAULT_OPERATION);
    OceanOfMaya.MathGame.refreshCount();
  }

  // Display version
  const versionDisplay = document.getElementById('version-display');
  if (versionDisplay && Constants.VERSION) {
    versionDisplay.textContent = `v${Constants.VERSION}`;
  }

  // Help toggle button
  const helpToggle = document.getElementById('helpToggle');
  const helpContent = document.getElementById('helpContent');

  if (helpToggle && helpContent) {
    // Initialize help button to inactive (greyed out) since content is hidden by default
    helpToggle.classList.add('inactive');

    helpToggle.addEventListener('click', function () {
      const isHidden = helpContent.classList.toggle('hidden');
      // Toggle active state: blue when shown, grey when hidden
      if (isHidden) {
        helpToggle.classList.remove('active');
        helpToggle.classList.add('inactive');
        helpToggle.setAttribute('aria-expanded', 'false');
      } else {
        helpToggle.classList.remove('inactive');
        helpToggle.classList.add('active');
        helpToggle.setAttribute('aria-expanded', 'true');
        // Update content based on current mode when showing
        updateHelpContent();
      }
    });
    // Keyboard support for help toggle
    helpToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        helpToggle.click();
      }
    });
  }

  // Initialize button states
  if (gameButton && sampleButton) {
    gameButton.classList.add('active');
    gameButton.classList.remove('inactive');
    sampleButton.classList.add('inactive');
    sampleButton.classList.remove('active');
  }

  // Initialize timed mode button to inactive
  const timedModeButtonInit = document.getElementById('timedModeButton');
  if (timedModeButtonInit) {
    timedModeButtonInit.classList.add('inactive');
    timedModeButtonInit.classList.remove('active');
  }

  // Initialize help content to show game mode by default
  updateHelpContent();

  // Initialize mode visibility - use classes only, no inline styles
  const gameFields = document.querySelectorAll('.game-mode-fields');
  gameFields.forEach((field) => {
    if (field) {
      field.classList.remove('hidden');
    }
  });
  const sampleFields = document.getElementById('sampleModeFields');
  if (sampleFields) {
    sampleFields.classList.add('hidden');
    sampleFields.classList.remove('visible');
  }
  const countContainer = document.querySelector('.count-container');
  if (countContainer) {
    countContainer.classList.remove('hidden');
  }

  // Initialize sound manager
  if (OceanOfMaya.Sound && OceanOfMaya.Sound.Manager) {
    OceanOfMaya.Sound.Manager.initialize();

    // Set up music toggle button
    const musicToggleButton = document.getElementById('musicToggleButton');
    if (musicToggleButton) {
      // Initialize button state based on current mute status
      if (OceanOfMaya.Sound.Manager.isMuted) {
        musicToggleButton.classList.add('inactive');
      } else {
        musicToggleButton.classList.add('active');
      }

      // Define the click handler function
      const handleMusicToggle = function () {
        const isMuted = OceanOfMaya.Sound.Manager.toggleMute();
        musicToggleButton.title = isMuted ? 'Enable theme music' : 'Disable theme music';
        musicToggleButton.setAttribute('aria-pressed', isMuted ? 'false' : 'true');
        // Update button styling based on mute state (colors indicate state, icon stays the same)
        if (isMuted) {
          musicToggleButton.classList.add('inactive');
          musicToggleButton.classList.remove('active');
        } else {
          musicToggleButton.classList.add('active');
          musicToggleButton.classList.remove('inactive');
        }

        // Announce state change to screen readers
        const liveRegion = document.getElementById('ariaLiveRegion');
        if (liveRegion) {
          liveRegion.textContent = isMuted ? 'Theme music disabled' : 'Theme music enabled';
        }

        // If unmuted and theme is set, resume music
        if (
          !isMuted &&
          OceanOfMaya.VisualThemes &&
          OceanOfMaya.VisualThemes.Manager &&
          OceanOfMaya.VisualThemes.Manager.currentTheme
        ) {
          // Get current theme name from select element
          const themeSelect =
            document.getElementById('visualThemeSelect') || document.getElementById('visualThemeSelectSample');
          if (themeSelect) {
            OceanOfMaya.Sound.Manager.playThemeMusic(themeSelect.value);
          }
        }
      };

      // Add click and keyboard support
      musicToggleButton.addEventListener('click', handleMusicToggle);
      musicToggleButton.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleMusicToggle();
        }
      });
    }

    // Enable music after user interaction (required for autoplay)
    // Only plays if a theme has been selected
    const enableMusicAfterInteraction = function () {
      if (OceanOfMaya.VisualThemes && OceanOfMaya.VisualThemes.Manager) {
        const themeSelect =
          document.getElementById('visualThemeSelect') || document.getElementById('visualThemeSelectSample');
        if (themeSelect && themeSelect.value) {
          // Only play music if a theme is actually selected
          OceanOfMaya.Sound.Manager.playThemeMusic(themeSelect.value);
        }
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', enableMusicAfterInteraction);
      document.removeEventListener('keydown', enableMusicAfterInteraction);
    };

    document.addEventListener('click', enableMusicAfterInteraction, { once: true });
    document.addEventListener('keydown', enableMusicAfterInteraction, { once: true });
  }

  // Timed mode controls
  const timedModeButton = document.getElementById('timedModeButton');

  if (timedModeButton) {
    addKeyboardSupport(timedModeButton, function () {
      if (OceanOfMaya.MathGame) {
        OceanOfMaya.MathGame.toggleTimedMode();
      }
    });
  }

  // Mobile keyboard handling with body scrolling (avoid nested scroll containers)
  // Uses visualViewport when available for reliable keyboard detection
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  // Ensure we start at the top on page load (and after bfcache restores)
  window.addEventListener('pageshow', function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 0);
  });

  const form = document.getElementById('gameForm');
  const visualViewport = window.visualViewport || null;
  let initialViewportHeight = visualViewport ? visualViewport.height : window.innerHeight;
  let keyboardWasVisible = false;
  let scrollToTopTimeout = null;

  function getViewportHeight() {
    return visualViewport ? visualViewport.height : window.innerHeight;
  }

  function scrollInputIntoView(input) {
    if (!input) return;
    // Defer to allow keyboard to animate in
    setTimeout(function () {
      const viewportHeight = getViewportHeight();
      const padding = 20;
      const rect = input.getBoundingClientRect();
      if (rect.bottom > viewportHeight - padding) {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const delta = rect.bottom - (viewportHeight - padding);
        const targetY = Math.max(0, currentScrollY + delta);
        window.scrollTo({ top: targetY, behavior: 'auto' });
      }
    }, 300);
  }

  function scrollToTop() {
    if (scrollToTopTimeout) {
      clearTimeout(scrollToTopTimeout);
    }
    // Small delay to let keyboard dismissal finish
    scrollToTopTimeout = setTimeout(function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  // Handle answer input focus
  const answerInput = document.getElementById('answer');
  if (answerInput) {
    answerInput.addEventListener('focus', function () {
      scrollInputIntoView(this);
    });
  }

  // Handle max number input focus
  const maxNumberInputForScroll = document.getElementById('maxNumber');
  if (maxNumberInputForScroll) {
    maxNumberInputForScroll.addEventListener('focus', function () {
      scrollInputIntoView(this);
    });
  }

  // Handle viewport resize (keyboard appearing/disappearing)
  function handleViewportResize() {
    const currentHeight = getViewportHeight();
    const heightDifference = initialViewportHeight - currentHeight;

    // Keyboard appeared
    if (heightDifference > 150) {
      keyboardWasVisible = true;
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.id === 'answer' || activeElement.id === 'maxNumber')) {
        scrollInputIntoView(activeElement);
      }
    }
    // Keyboard dismissed
    else if (keyboardWasVisible && currentHeight >= initialViewportHeight - 10) {
      keyboardWasVisible = false;
      initialViewportHeight = currentHeight;
      scrollToTop();
    }
  }
  if (visualViewport) {
    visualViewport.addEventListener('resize', handleViewportResize);
  } else {
    window.addEventListener('resize', handleViewportResize);
  }

  // Also handle blur events to scroll back to top when input loses focus
  // This catches cases where keyboard is dismissed by tapping outside
  // The blur handler acts as a backup in case resize events don't fire reliably
  function handleInputBlur() {
    // Use a delay to allow resize event to fire first (more reliable on iOS)
    setTimeout(function () {
      if (keyboardWasVisible) {
        const currentHeight = getViewportHeight();
        if (currentHeight >= initialViewportHeight - 10) {
          keyboardWasVisible = false;
          initialViewportHeight = currentHeight;
          scrollToTop();
        }
      }
    }, 300);
  }

  if (answerInput) {
    answerInput.addEventListener('blur', handleInputBlur);
  }

  if (maxNumberInputForScroll) {
    maxNumberInputForScroll.addEventListener('blur', handleInputBlur);
  }
});

