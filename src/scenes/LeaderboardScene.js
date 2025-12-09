import { getTopLocalScores, fetchTopScores } from '../network/leaderboard.js';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() { super('LeaderboardScene'); }

  async create() {
    this.add.image(400, 300, 'bg').setDisplaySize(800, 600);

    this.add.text(400, 60, 'Leaderboard', {
      fontSize: '40px',
      color: '#003',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Fetch top scores (remote or local)
    let scores = [];
    try {
      scores = await fetchTopScores(5);
    } catch (e) {
      console.warn('Could not fetch remote scores, using local:', e);
      scores = getTopLocalScores().slice(0, 5);
    }

    if (!scores || scores.length === 0) {
      scores = getTopLocalScores().slice(0, 5);
    }

    // Display scores
    if (scores.length === 0) {
      this.add.text(200, 200, 'No scores yet!\nPlay a game to get started.', {
        fontSize: '18px',
        color: '#006'
      });
    } else {
      scores.forEach((r, i) => {
        this.add.text(200, 150 + i * 40, `${i + 1}. Score: ${r.score}`, {
          fontSize: '20px',
          color: '#006',
          fontStyle: i === 0 ? 'bold' : 'normal'
        });
      });
    }

    // Back button
    const backBtn = this.add.text(400, 520, 'Back to Menu', {
      fontSize: '20px',
      backgroundColor: '#004',
      color: '#fff',
      padding: { x: 16, y: 8 }
    }).setOrigin(0.5).setInteractive();

    backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
    backBtn.on('pointerover', () => backBtn.setStyle({ backgroundColor: '#006' }));
    backBtn.on('pointerout', () => backBtn.setStyle({ backgroundColor: '#004' }));
  }
}
