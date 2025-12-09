# Asset Licenses and Credits

This file tracks attributions for all assets used in the Fishing Game.

## Generated Assets

The following assets are **programmatically generated at runtime** using Phaser's graphics API and require no attribution:

- Background texture (sky gradient)
- Bobber sprite (red circle)
- Fish sprite (yellow ellipse)
- WebAudio SFX (triangle wave plop sound)

## Recommended Asset Replacements

When you're ready to enhance the game with real artwork and audio, consider these free/CC0 sources:

### Sprites & Images

- **Kenney.nl** — https://kenney.nl/assets
  - Licensed under CC0 (public domain)
  - Excellent asset packs for 2D games (fishing, water, UI)

- **OpenGameArt.org** — https://opengameart.org
  - Mixed licenses (check each asset)
  - Large collection of game sprites

- **itch.io Asset Packs** — https://itch.io/game-assets
  - Filter by license (CC0, CC-BY, etc.)
  - Many quality packs from indie developers

### Audio / SFX

- **Freesound.org** — https://freesound.org
  - Many CC0 and CC-BY licensed sound effects
  - Search for keywords like "plop", "water", "catch"

- **Incompetech** — https://incompetech.com/music/
  - Royalty-free background music

## How to Add Real Assets

1. Download/create your assets
2. Place images in `assets/images/` and audio in `assets/audio/`
3. Update `src/scenes/BootScene.js` preload section to load them:
   ```javascript
   this.load.image('fish', 'assets/images/fish.png');
   this.load.audio('plop', 'assets/audio/plop.ogg');
   ```
4. Remove the texture generation code in `BootScene.create()` once real assets are loaded
5. Update this file with proper attributions (name, URL, license)

## License Template

When adding CC-BY assets, include:

```
### Asset Name
- **Author**: Author Name
- **Source**: https://example.com/asset
- **License**: CC-BY 3.0 (https://creativecommons.org/licenses/by/3.0/)
- **Attribution**: "Asset Name by Author Name (CC-BY 3.0)"
```

---

For questions on licensing, see:
- https://creativecommons.org/licenses/
- https://choosealicense.com/
