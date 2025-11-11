# AI Agent Guidelines

When working on this repository, please adhere to the following coding standards and conventions.

## File Naming Conventions

- All markdown files should be named using uppercase letters only.
- All files that are not markdown should be named using lowercase with dashes separating words.

## Branching Strategy

Use `feature/<description>` for all branches. Examples: `feature/add-mushroom-theme`, `feature/v1.0.0`, `feature/fix-division-edge-case`.

Workflow: Create branch from `main` → Make changes → Update version/changelog if releasing → Open pull request → Merge to `main` via PR → GitHub Actions auto-creates tag `vX.Y.Z` from `project.toml`.

**All merges to `main` must occur through pull requests.**

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification as documented in [README.md#contributing](../README.md#contributing). All commit messages must use the conventional commit format with appropriate types (feat, fix, docs, chore, refactor, etc.).

**Keep commit messages concise**: Since changes are documented in `CHANGELOG.md`, commit messages should be brief and descriptive. Avoid verbose bullet points in commit messages - the changelog provides the detailed change list.

## Logging

Always use appropriate logging levels when logging messages like `console.info()`, `console.error()`, `console.warn()`, `console.info()`, `console.debug()`, etc.

## Linting

All lint errors must be fixed before completing a task. Use `read_lints` to check for lint errors in files you've modified. Lint errors should be resolved immediately after making code changes.

## Constants and CSS Variables

**NEVER hard-code values unnecessarily.** Always use existing constants or CSS variables, or create new ones if needed.

### JavaScript Constants

- **Location**: `public/js/constants.js` contains all game constants (timing, thresholds, sizes, physics, etc.)
- **Usage**: Always reference `OceanOfMaya.Constants` instead of hard-coding:
  - Timing values (delays, durations)
  - Threshold multipliers (X, color thresholds, capacity)
  - Size ranges (min/max for shapes)
  - Physics constants (velocities, rotation speeds)
  - Sample mode limits
  - Answer validation tolerance
- **Example**: Use `Constants.CORRECT_ANSWER_DELAY` instead of `1000`
- **Fallback**: Always provide fallback values: `Constants.DEFAULT_MAX_FACTOR || 20`

### CSS Variables

- **Location**: `:root` in `public/css/style.css` defines all CSS variables
- **Usage**: Always use CSS variables instead of hard-coding:
  - Spacing: `var(--spacing-xs)`, `var(--spacing-sm)`, `var(--spacing-md)`, `var(--spacing-lg)`, `var(--spacing-xl)`, `var(--spacing-2xl)`
  - Colors: `var(--color-primary)`, `var(--color-gray-400)`, `var(--color-text-primary)`, etc.
  - Typography: `var(--font-size-base)`, `var(--font-size-md)`, `var(--font-size-lg)`, etc.
  - Border radius: `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`
  - Transitions: `var(--transition-fast)`, `var(--transition-base)`, `var(--transition-slow)`
- **Example**: Use `padding: var(--spacing-lg)` instead of `padding: 8px`
- **Creating New Variables**: If a new value is needed repeatedly, add it to `:root` in `style.css`

### When Hard-coding is Acceptable

- Layout constraints that are already defined as CSS variables (e.g., use `var(--max-width-input)` for inputs, `var(--max-width-fieldset)` for fieldsets). If a new layout constraint is needed repeatedly, add it as a CSS variable first.
- Specific visual effects (e.g., `rgba()` colors for shadows, gradients, or theme-specific effects that are not part of the design system)
- One-off values that don't represent a design system value and won't be reused
- Browser-specific fallbacks or calculations

### Code Review Checklist

Before committing, verify:

- [ ] No magic numbers in JavaScript (use `Constants` object)
- [ ] No hard-coded spacing/padding/margin in CSS (use spacing variables)
- [ ] No hard-coded font sizes in CSS (use typography variables)
- [ ] No hard-coded colors in CSS (use color variables)
- [ ] No hard-coded border radius in CSS (use radius variables)
- [ ] No hard-coded transitions in CSS (use transition variables)
- [ ] No hard-coded max-width values in CSS (use `var(--max-width-input)` or `var(--max-width-fieldset)`)

## Visual Themes Organization

All visual theme code must be organized by theme in dedicated folders:

- **JavaScript**: Each theme's JavaScript implementation must be in `public/js/visual-themes/`
  - `base-theme.js` - BaseTheme class (shared foundation)
  - `manager.js` - Manager class (orchestrates themes)
  - `[theme-name].js` - Individual theme implementations (e.g., `whimsy.js`)

- **CSS**: Each theme's styles must be in `public/css/visual-themes/`
  - `[theme-name].css` - Theme-specific styles and animations (e.g., `whimsy.css`)

When creating a new theme:

1. Create `public/js/visual-themes/[theme-name].js` extending BaseTheme
2. Create `public/css/visual-themes/[theme-name].css` for theme styles
3. Register the theme in Manager's `initialize()` method
4. Add theme CSS link and script reference in `index.html`
5. Document the theme in `docs/features/visual-themes/[THEME_NAME].md`

## Versioning and Changelog

All changes merged into this repository must include:

1. **Changelog Entry**: Update `CHANGELOG.md` with a new version entry following this pattern:
   - Major version grouping: `## Version X` (if creating a new major version, otherwise add to existing major version section)
   - Version heading: `### X.Y.Z - YYYY-MM-DD` (placed under the appropriate major version section)
   - Category headings: Use `#### Category` for organizing changes (e.g., `Breaking Changes`, `Updates`, `UI/UX Improvements`, `Chore`, `Features`, etc.)
   - List items under each category describing the changes

2. **Version Update**: Update the version in all locations to match the version in `CHANGELOG.md` following [semantic versioning](https://semver.org/):
   - `project.toml` - Update the `version` field in the `[project]` section
   - `public/js/constants.js` - Update the `VERSION` constant in `OceanOfMaya.Constants`
   - `public/index.html` - Update the `content` attribute of the `<meta name="version">` tag

   All three locations must contain the same version number (e.g., `1.0.0`).

3. **Git Tag and Release**: Tags and GitHub releases are automatically created by GitHub Actions when changes are merged to `main`. The workflow reads the version from `project.toml`, extracts the changelog entry for that version from `CHANGELOG.md`, creates a tag `vX.Y.Z` if it doesn't already exist, and creates a GitHub release with the changelog content.

   **Manual tag/release creation** (if automation fails or for special cases):

   ```bash
   git tag -a vX.Y.Z -m "Version X.Y.Z"
   git push origin vX.Y.Z
   ```

   Tags should match the version format in `CHANGELOG.md` and `project.toml` (e.g., if CHANGELOG shows `1.0.0`, update `project.toml` to `1.0.0` and the workflow will create tag `v1.0.0` and a corresponding GitHub release).
