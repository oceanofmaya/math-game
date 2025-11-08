# Theme Music Files

This directory contains the theme music files for each visual theme.

## Current Music Files

- `jellyfish-theme.mp3` - "Ambiment" by Kevin MacLeod
- `firefly-theme.mp3` - "Ethereal Relaxation" by Kevin MacLeod
- `pearl-theme.mp3` - "Kalimba Relaxation Music" by Kevin MacLeod
- `mushroom-theme.mp3` - "Magic Forest" by Kevin MacLeod
- `maple-theme.mp3` - "Evening" by Kevin MacLeod

## File Specifications

- **Format**: MP3
- **Duration**: 30-120 seconds (loops seamlessly)
- **Bitrate**: 128-192 kbps
- **Volume**: Normalized to similar levels

## Attribution

All music tracks are licensed under [Creative Commons: By Attribution 4.0 License](http://creativecommons.org/licenses/by/4.0/).

Attribution information is configured in:

- `public/js/sound-manager.js` - `ThemeMusicRegistry` contains track metadata and attribution URLs
- `docs/features/sounds/README.md` - Complete sound system documentation
- `README.md` - Credits section lists all music attribution

## Adding New Music

If adding new theme music files:

1. Place the MP3 file in this directory
2. Add entry to `ThemeMusicRegistry` in `public/js/sound-manager.js` with:
   - Track path
   - Title and artist
   - License information
   - Attribution URL (if required)
3. Update `docs/features/sounds/README.md` with the new track information
4. Add attribution to the Credits section in `README.md`
