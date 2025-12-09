export default class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    this.add.image(400, 300, 'bg').setDisplaySize(800, 600);

    this.add.text(400, 100, 'Fishing Game', {
      fontSize: '48px',
      color: '#003',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const startBtn = this.add.text(400, 260, 'Start Game', {
      fontSize: '28px',
      backgroundColor: '#004',
      color: '#fff',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    const leaderBtn = this.add.text(400, 340, 'Leaderboard', {
      fontSize: '24px',
      backgroundColor: '#004',
      color: '#fff',
      padding: { x: 16, y: 8 }
    }).setOrigin(0.5).setInteractive();

    startBtn.on('pointerdown', () => this.scene.start('GameScene'));
    startBtn.on('pointerover', () => startBtn.setStyle({ backgroundColor: '#006' }));
    startBtn.on('pointerout', () => startBtn.setStyle({ backgroundColor: '#004' }));

    leaderBtn.on('pointerdown', () => this.scene.start('LeaderboardScene'));
    leaderBtn.on('pointerover', () => leaderBtn.setStyle({ backgroundColor: '#006' }));
    leaderBtn.on('pointerout', () => leaderBtn.setStyle({ backgroundColor: '#004' }));
  }
}
