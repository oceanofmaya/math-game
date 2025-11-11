// Create namespace with collision prevention
(function(global) {
    'use strict';
    
    // Check for namespace collision
    if (global.OceanOfMaya && global.OceanOfMaya.MathGame) {
        console.warn('OceanOfMaya.MathGame already exists. Skipping initialization.');
        return;
    }
    
    // Create namespace structure if it doesn't exist
    if (!global.OceanOfMaya) {
        global.OceanOfMaya = {};
    }
    
    // Define the game module
    global.OceanOfMaya.MathGame = (function() {
        const Constants = global.OceanOfMaya.Constants || {};
        
        let numberCorrect = 0;
        let numberWrong = 0;
        let numberSkip = 0;
        let number1 = 0;
        let number2 = 0;
        let maxNumber = Constants.DEFAULT_MAX_NUMBER || 20;
        let currentOperation = Constants.DEFAULT_OPERATION || 'multiply'; // 'add', 'subtract', 'multiply', 'divide'
        let questionHistory = []; // Track recent questions to avoid duplicates

        const operationSymbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        };

        // Calculate maximum possible questions for current operation
        function getMaxPossibleQuestions(operation, max) {
            switch (operation) {
                case 'add':
                case 'multiply':
                    // For addition and multiplication: max * max combinations
                    return max * max;
                case 'subtract':
                    // For subtraction: number1 from 1 to max, number2 from 1 to number1
                    // Sum of 1 to max = max * (max + 1) / 2
                    return (max * (max + 1)) / 2;
                case 'divide':
                    // For division: number2 from 1 to max, multiplier from 1 to max
                    // number1 = number2 * multiplier, both from 1 to max
                    return max * max;
                default:
                    return max * max;
            }
        }

        // Calculate history size based on possible questions
        // Use 75% of possible questions to ensure we can always find a new question
        function getHistorySize(operation, max) {
            const maxPossible = getMaxPossibleQuestions(operation, max);
            // Use 75% of possible questions, but at least 5 and at most 100
            return Math.max(5, Math.min(100, Math.floor(maxPossible * 0.75)));
        }

        // Generate a question key for history tracking
        function getQuestionKey(n1, n2, op) {
            // Normalize order for commutative operations (add, multiply)
            if (op === 'add' || op === 'multiply') {
                return op + ':' + Math.min(n1, n2) + ',' + Math.max(n1, n2);
            }
            // For non-commutative operations (subtract, divide), order matters
            return op + ':' + n1 + ',' + n2;
        }

        // Check if question is in history
        function isQuestionInHistory(n1, n2, op) {
            const key = getQuestionKey(n1, n2, op);
            return questionHistory.includes(key);
        }

        // Add question to history
        function addQuestionToHistory(n1, n2, op) {
            const key = getQuestionKey(n1, n2, op);
            const historySize = getHistorySize(op, maxNumber);
            
            questionHistory.push(key);
            
            // Keep history size within limit
            if (questionHistory.length > historySize) {
                questionHistory.shift(); // Remove oldest
            }
        }

        return {
            setOperation: function(operation) {
                // Change operation and reset counts and visual effects
                currentOperation = operation;
                updateOperationUI();
                
                // Reset counts, visual effects, and question history
                global.OceanOfMaya.MathGame.resetCounts();
                questionHistory = [];
                
                // Generate new question
                global.OceanOfMaya.MathGame.generateNewNumbers();
            },

            generateNewNumbers: function () {
                const number1Element = document.getElementById("number1");
                const number2Element = document.getElementById("number2");
                const answerInput = document.getElementById("answer");
                
                if (!number1Element || !number2Element) {
                    console.error('Required DOM elements not found for number display');
                    return;
                }
                
                // Generate a new question that's not in recent history
                const maxAttempts = 100; // Prevent infinite loops
                let attempts = 0;
                let foundNewQuestion = false;
                
                while (!foundNewQuestion && attempts < maxAttempts) {
                    attempts++;
                    
                    if (currentOperation === 'divide') {
                        // For division, ensure whole number results
                        // Generate number2 (divisor) from 1 to maxNumber, then generate a multiplier from 1 to maxNumber
                        // number1 (dividend) = number2 × multiplier, ensuring the result is always a whole number
                        // Note: number1 can be up to maxNumber², but number2 is always ≤ maxNumber
                        number2 = Math.floor((Math.random() * maxNumber) + 1);
                        const multiplier = Math.floor((Math.random() * maxNumber) + 1);
                        number1 = number2 * multiplier;
                    } else if (currentOperation === 'subtract') {
                        // For subtraction, ensure non-negative results
                        number1 = Math.floor((Math.random() * maxNumber) + 1);
                        number2 = Math.floor((Math.random() * number1) + 1);
                    } else {
                        // For addition and multiplication
                        number1 = Math.floor((Math.random() * maxNumber) + 1);
                        number2 = Math.floor((Math.random() * maxNumber) + 1);
                    }
                    
                    // Check if this question was recently asked
                    if (!isQuestionInHistory(number1, number2, currentOperation)) {
                        foundNewQuestion = true;
                    }
                }
                
                // If we couldn't find a new question after max attempts, use the generated one anyway
                // This should rarely happen if history size is set correctly
                if (!foundNewQuestion) {
                    console.warn('Could not generate unique question after ' + maxAttempts + ' attempts. Using generated question.');
                }
                
                // Add to history
                addQuestionToHistory(number1, number2, currentOperation);
                
                number1Element.innerHTML = number1;
                number2Element.innerHTML = number2;
                
                // Focus the answer input for new problem
                if (answerInput) {
                    answerInput.focus();
                }
            },

            validateAnswer: function () {
                const doneButton = document.querySelector('input[type="submit"]');
                const answerInput = document.getElementById("answer");
                const tolerance = Constants.ANSWER_TOLERANCE || 0.0001;
                const correctDelay = Constants.CORRECT_ANSWER_DELAY || 1000;
                
                if (!answerInput) {
                    console.error('Answer input element not found');
                    return;
                }
                
                if (doneButton) {
                    doneButton.disabled = true;
                }

                let answer;
                switch (currentOperation) {
                    case 'add':
                        answer = number1 + number2;
                        break;
                    case 'subtract':
                        answer = number1 - number2;
                        break;
                    case 'multiply':
                        answer = number1 * number2;
                        break;
                    case 'divide':
                        answer = number1 / number2;
                        break;
                    default:
                        answer = number1 * number2;
                }

                const userAnswer = Number.parseFloat(answerInput.value);

                // Check if answer is valid number and matches
                if (!isNaN(userAnswer) && Math.abs(answer - userAnswer) < tolerance) {
                    changeAnswerMessageAndUpdateCount("Correct! Good job.", true);
                    nextQuestionAfterDelay(correctDelay, doneButton);
                } else {
                    changeAnswerMessageAndUpdateCount("Oops! Try again.", false);
                    if (doneButton) {
                        doneButton.disabled = false;
                    }
                    // Keep focus on answer input for retry
                    answerInput.focus();
                    answerInput.select();
                }
            },

            changeMaxNumber: function () {
                const maxNumberInput = document.getElementById("maxNumber");
                if (!maxNumberInput) {
                    console.error('Max number input element not found');
                    return;
                }
                
                maxNumber = Number.parseInt(maxNumberInput.value, 10) || Constants.DEFAULT_MAX_NUMBER || 20;
                
                // Reset question history when max number changes
                questionHistory = [];
                
                if (global.OceanOfMaya.VisualThemes && global.OceanOfMaya.VisualThemes.Manager) {
                    global.OceanOfMaya.VisualThemes.Manager.handleFactorChange();
                }
                global.OceanOfMaya.MathGame.generateNewNumbers();
            },

            refreshCount: function () {
                const countCorrectElement = document.getElementById("countCorrect");
                const countWrongElement = document.getElementById("countWrong");
                const countSkipElement = document.getElementById("countSkip");
                
                if (countCorrectElement) countCorrectElement.innerHTML = numberCorrect;
                if (countWrongElement) countWrongElement.innerHTML = numberWrong;
                if (countSkipElement) countSkipElement.innerHTML = numberSkip;
            },

            getCounts: function() {
                return {
                    correct: numberCorrect,
                    wrong: numberWrong,
                    skip: numberSkip
                };
            },

            skipQuestion: function () {
                numberSkip++;
                if (global.OceanOfMaya.VisualThemes && global.OceanOfMaya.VisualThemes.Manager) {
                    global.OceanOfMaya.VisualThemes.Manager.handleSkip();
                }
                global.OceanOfMaya.MathGame.clearAnswer();
                global.OceanOfMaya.MathGame.generateNewNumbers();
                global.OceanOfMaya.MathGame.refreshCount();
            },

            resetCounts: function () {
                numberCorrect = 0;
                numberWrong = 0;
                numberSkip = 0;
                // Reset question history when counts are reset
                questionHistory = [];
                if (global.OceanOfMaya.VisualThemes && global.OceanOfMaya.VisualThemes.Manager) {
                    global.OceanOfMaya.VisualThemes.Manager.handleFactorChange();
                }
                global.OceanOfMaya.MathGame.refreshCount();
            },

            changeVisualTheme: function () {
                const themeSelect = document.getElementById('visualThemeSelect');
                if (themeSelect && global.OceanOfMaya.VisualThemes && global.OceanOfMaya.VisualThemes.Manager) {
                    const selectedTheme = themeSelect.value;
                    // Only initialize if a theme is actually selected (not empty placeholder)
                    if (selectedTheme) {
                        global.OceanOfMaya.VisualThemes.Manager.initialize(selectedTheme);
                        // If in sample mode, reset and create new sample element
                        if (global.OceanOfMaya.VisualThemes.Manager.sampleMode) {
                            global.OceanOfMaya.VisualThemes.Manager.sampleReset();
                        } else {
                            global.OceanOfMaya.VisualThemes.Manager.updateHint();
                        }
                    }
                }
            },

            clearAnswer: function () {
                const answerInput = document.getElementById("answer");
                const answerMessage = document.getElementById("answerMessage");
                
                if (answerInput) answerInput.value = "";
                if (answerMessage) answerMessage.innerHTML = "";
            }
        };

        function updateOperationUI() {
            // Update operation symbol
            const symbolElement = document.getElementById("operationSymbol");
            if (symbolElement) {
                symbolElement.innerHTML = '&nbsp;' + operationSymbols[currentOperation] + '&nbsp;';
            }

            // Update active button state
            const operations = ['add', 'subtract', 'multiply', 'divide'];
            operations.forEach(function(op) {
                const btn = document.getElementById('op-' + op);
                if (btn) {
                    if (op === currentOperation) {
                        btn.classList.add('active');
                        btn.setAttribute('aria-pressed', 'true');
                    } else {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-pressed', 'false');
                    }
                }
            });
        }

        function changeAnswerMessageAndUpdateCount(answerMessage, isSuccess) {
            let answerMessageElement = document.getElementById("answerMessage");
            if (isSuccess) {
                answerMessageElement.classList.remove("fail");
                answerMessageElement.classList.add("success");
            } else {
                answerMessageElement.classList.remove("success");
                answerMessageElement.classList.add("fail");
            }

            answerMessageElement.innerHTML = answerMessage;
            updateCount(isSuccess);
        }

        function updateCount(isSuccess) {
            if (isSuccess) {
                numberCorrect++;
                global.OceanOfMaya.MathGame.refreshCount();
                if (global.OceanOfMaya.VisualThemes && global.OceanOfMaya.VisualThemes.Manager) {
                    global.OceanOfMaya.VisualThemes.Manager.handleCorrectAnswer();
                }
            } else {
                numberWrong++;
                global.OceanOfMaya.MathGame.refreshCount();
                if (global.OceanOfMaya.VisualThemes && global.OceanOfMaya.VisualThemes.Manager) {
                    global.OceanOfMaya.VisualThemes.Manager.handleWrongAnswer();
                }
            }
        }

        function nextQuestionAfterDelay(delay, doneButton) {
            const defaultDelay = Constants.DEFAULT_NEXT_QUESTION_DELAY || 3000;
            const actualDelay = (delay === null || delay === undefined) ? defaultDelay : delay;

            setTimeout(function () { 
                global.OceanOfMaya.MathGame.clearAnswer(); 
                global.OceanOfMaya.MathGame.generateNewNumbers(); 
                if (doneButton) {
                    doneButton.disabled = false;
                }
            }, actualDelay);
        }
    })();
})(typeof window !== 'undefined' ? window : this); 