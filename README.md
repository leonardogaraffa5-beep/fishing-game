# Phaser Fishing Game

Polished Phaser 3 browser fishing game for GitHub Pages with optional Supabase leaderboard integration.

## Quick Start

1. Install dependencies:
   ```powershell
   npm install
   ```

2. Run dev server:
   ```powershell
   npm run dev
   ```

3. Open `http://localhost:8080` in your browser.

## Controls

- **Mouse/Touch**: Click or drag to cast/reel
- **Space**: Cast/Reel toggle
- **M**: Mute/Unmute audio

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Copy all project files into the repo root.
3. Push to GitHub:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -m main
   git remote add origin https://github.com/YOUR_USERNAME/your-repo.git
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to Settings → Pages
   - Set Source to `Deploy from a branch`
   - Select `main` branch and `/docs` folder
   - Save

5. Your game will be live at `https://YOUR_USERNAME.github.io/your-repo`

## Optional: Supabase Leaderboard

To enable a global leaderboard:

1. Create a Supabase project at https://supabase.com
2. Create a table named `leaderboard`:
   ```sql
   CREATE TABLE leaderboard (
     id bigserial PRIMARY KEY,
     score integer NOT NULL,
     created_at timestamp with time zone DEFAULT now(),
     meta jsonb
   );
   ```

3. Enable Row-Level Security and add a policy for anonymous inserts.
4. Get your project URL and anon key from Supabase settings.
5. Update `config.js` with your credentials:
   ```javascript
   window.SUPABASE_URL = 'https://your-project.supabase.co';
   window.SUPABASE_KEY = 'your-anon-key';
   ```

6. Redeploy to GitHub Pages.

## Project Structure

```
fishing-game/
├── index.html           # Main game container
├── config.js            # Supabase config (optional)
├── styles.css           # Styling
├── package.json         # Dependencies
├── src/
│   ├── main.js          # Game bootstrap
│   ├── audio/
│   │   └── sfx.js       # WebAudio SFX (no external files)
│   ├── network/
│   │   └── leaderboard.js  # Supabase/localStorage client
│   └── scenes/
│       ├── BootScene.js     # Asset loader & texture generator
│       ├── MenuScene.js     # Start menu
│       ├── GameScene.js     # Main gameplay
│       └── LeaderboardScene.js  # Score display
├── assets/
│   └── licenses.md      # Asset attribution
├── docs/                # GitHub Pages output (built files)
├── .github/
│   └── workflows/
│       └── deploy.yml   # CI to deploy to Pages (optional)
└── .gitignore
```

## Features

- ✅ Placeholder sprite/audio generated at runtime (no external assets needed)
- ✅ Touch-friendly controls and keyboard input
- ✅ Local high-score tracking (localStorage)
- ✅ Optional global leaderboard (Supabase)
- ✅ Accessible UI with ARIA labels and keyboard support
- ✅ Mobile-responsive and performant

## Roadmap

- Add real sprites and audio from Kenney/OpenGameArt
- Implement Supabase leaderboard with RLS policies
- Add difficulty levels and power-ups
- Add analytics
- Enhance visual polish (particle effects, animations)

## License

MIT (or specify your license)

## Credits

- Built with Phaser 3 (https://phaser.io/)
- Uses Supabase for leaderboards (https://supabase.com/)
- WebAudio SFX generated at runtime
