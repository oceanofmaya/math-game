# Math Game

Simple math game with visual effects.

## Live Demo

Play the game online at: **[https://lab.oceanofmaya.com/math-game](https://lab.oceanofmaya.com/math-game)**

## Table Of Contents

- [Math Game](#math-game)
  - [Live Demo](#live-demo)
  - [Table Of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Locally](#running-locally)
      - [Option 1: npx (Node.js)](#option-1-npx-nodejs)
      - [Option 2: Python](#option-2-python)
      - [Option 3: Direct File Opening](#option-3-direct-file-opening)
    - [Usage](#usage)
      - [Game Features](#game-features)
      - [Screenshots](#screenshots)
  - [Contributing](#contributing)
    - [Branching Strategy](#branching-strategy)
    - [Commit Messages](#commit-messages)
  - [Credits](#credits)
    - [Music Attribution](#music-attribution)
  - [License](#license)

## Getting Started

### Prerequisites

- Git
- Python 3.x (for local development server) OR Node.js (for npx option)

### Installation

Clone repository:

```console
git clone https://github.com/oceanofmaya/math-game.git
```

Navigate to directory:

```console
cd math-game
```

### Running Locally

This is a static website with no build step required. To run a local development server, use one of the following options:

#### Option 1: npx (Node.js)

```console
npx serve public
```

#### Option 2: Python

```console
python3 -m http.server --directory public 3000
```

#### Option 3: Direct File Opening

You can also open `public/index.html` directly in your browser:

```console
open public/index.html
```

Or simply double-click `public/index.html` in your file manager.

> **Note:** While direct file opening works, using a local server (Options 1 or 2) is recommended for a better development experience.

### Usage

- If using a local server (Options 1 or 2), visit [http://localhost:3000](http://localhost:3000) in your browser to play.
- If opening the file directly (Option 3), the game will load automatically in your browser.

#### Game Features

- **Four Operations**: Addition, subtraction, multiplication, and division
- **Configurable Difficulty**: Adjust the maximum number range (1-999)
- **Duplicate Prevention**: Intelligent question generation ensures variety by avoiding recently asked questions
- **Visual Feedback**: Engaging visual themes that respond to your performance
- **Score Tracking**: Track correct, wrong, and skipped answers

#### Screenshots

![Pearl Theme - Game Mode](screenshot-math-game-pearl-theme.png?raw=true "Pearl Theme - Game Mode")

![Jellyfish Theme - Sample Mode](screenshot-math-game-jellyfish-theme.png?raw=true "Jellyfish Theme - Sample Mode")

## Contributing

### Branching Strategy

Use `feature/<description>` for all branches. Examples: `feature/add-mushroom-theme`, `feature/v1.0.0`, `feature/fix-division-edge-case`.

Workflow: Create branch from `main` → Make changes → Update version/changelog if releasing → Open pull request → Merge to `main` via PR → GitHub Actions auto-creates tag `vX.Y.Z` from `project.toml`.

**All merges to `main` must occur through pull requests.**

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. Commit messages should follow the format:

```console
<type>(<scope>): <subject>

<body>

<footer>
```

Common types include:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `chore`: Changes to build process or auxiliary tools
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests

For detailed coding standards and conventions, see [.github/AGENTS.md](.github/AGENTS.md).

## Credits

- [**Kishore Murthy**](https://www.oceanofmaya.com "Kishore Murthy")

### Music Attribution

- **Firefly Theme**: "Ethereal Relaxation" by [Kevin MacLeod](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2100031)  
  Licensed under [Creative Commons: By Attribution 4.0 License](http://creativecommons.org/licenses/by/4.0/)

- **Jellyfish Theme**: "Ambiment" by [Kevin MacLeod](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100630)  
  Licensed under [Creative Commons: By Attribution 4.0 License](http://creativecommons.org/licenses/by/4.0/)

- **Pearl Theme**: "Kalimba Relaxation Music" by [Kevin MacLeod](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900039)  
  Licensed under [Creative Commons: By Attribution 4.0 License](http://creativecommons.org/licenses/by/4.0/)

- **Mushroom Theme**: "Magic Forest" by [Kevin MacLeod](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600044)  
  Licensed under [Creative Commons: By Attribution 4.0 License](http://creativecommons.org/licenses/by/4.0/)

- **Maple Theme**: "Evening" by [Kevin MacLeod](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300002)  
  Licensed under [Creative Commons: By Attribution 4.0 License](http://creativecommons.org/licenses/by/4.0/)

## License

This project is licensed under MIT - see the [LICENSE.md](LICENSE.md) file for details.
