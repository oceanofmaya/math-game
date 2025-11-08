# Game Features

The Math Game provides an interactive math practice experience with engaging visual feedback and intelligent question generation.

## Question Generation

### Operations

The game supports four mathematical operations:

- **Addition** (`+`): Two numbers from 1 to maxNumber
- **Subtraction** (`−`): number1 from 1 to maxNumber, number2 from 1 to number1 (ensures non-negative results)
- **Multiplication** (`×`): Two numbers from 1 to maxNumber
- **Division** (`÷`): Ensures whole number results by generating number2 (divisor) from 1 to maxNumber, then generating a multiplier from 1 to maxNumber, and setting number1 (dividend) = number2 × multiplier. This ensures the result is always a whole number. Note: number1 can be up to maxNumber², but number2 (the divisor) is always ≤ maxNumber.

### Duplicate Question Prevention

The game includes intelligent duplicate question prevention to ensure variety and engagement:

- **History Tracking**: Maintains a sliding window of recently asked questions
- **Dynamic History Size**: Automatically calculates history size based on:
  - Maximum number range (maxNumber)
  - Current operation type
  - Total possible questions for that operation
- **Smart Sizing**: Uses 75% of possible questions for history (with bounds: minimum 5, maximum 100)
  - Ensures a 25% buffer so a new question can always be found
  - Prevents excessive memory usage for large number ranges

#### History Size Calculation

The history size is calculated differently for each operation:

- **Addition/Multiplication/Division**: `maxNumber²` possible questions
  - Example: With maxNumber=20, there are 400 possible questions, history size = 300
- **Subtraction**: `maxNumber × (maxNumber + 1) / 2` possible questions (triangular number)
  - Example: With maxNumber=20, there are 210 possible questions, history size = 157

#### Question Normalization

- **Commutative Operations** (Addition, Multiplication): Questions are normalized so `3+5` and `5+3` are treated as the same question
- **Non-Commutative Operations** (Subtraction, Division): Order matters, so `10-3` and `3-10` are different questions

#### History Reset

Question history is automatically reset when:

- Operation type changes
- Maximum number range (maxNumber) changes
- Counts are reset

## Answer Validation

- **Floating-Point Tolerance**: Uses `ANSWER_TOLERANCE` (0.0001) to handle floating-point precision issues, especially important for division operations
- **Real-time Feedback**: Immediate feedback on correct/wrong answers
- **Skip Functionality**: Allows users to skip questions they don't know

## Score Tracking

- **Correct Answers**: Tracked separately from wrong/skip counts
- **Wrong Answers**: Counted independently
- **Skipped Questions**: Tracked separately
- **Visual Feedback**: Counts are displayed prominently and trigger visual theme effects

## Configuration

- **Maximum Number Range**: Configurable via the "Max Number" input field
- **Operation Selection**: Switch between addition, subtraction, multiplication, and division
- **Visual Themes**: Choose from multiple visual themes (Jellyfish, Firefly, Pearl)
- **Sample Mode**: Test visual themes without playing the game
