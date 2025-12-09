export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    const w = this.scale.width;
    const h = this.scale.height;
    this.add.text(w / 2, h / 2, 'Loading...', { fontSize: '18px', color: '#000' }).setOrigin(0.5);
  }

  create() {
    // Generate background texture (sky gradient)
    const g = this.add.graphics();
    g.fillStyle(0x87ceeb, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg', 800, 600);
    g.clear();

    // Bobber texture (red circle)
    const bob = this.add.graphics();
    bob.fillStyle(0xff4444, 1);
    bob.fillCircle(16, 16, 12);
    bob.lineStyle(2, 0x000000, 1);
    bob.strokeCircle(16, 16, 12);
    bob.generateTexture('bobber', 32, 32);
    bob.clear();

    // Fish texture (yellow ellipse)
    const fish = this.add.graphics();
    fish.fillStyle(0xffcc33, 1);
    fish.fillEllipse(32, 16, 48, 24);
    fish.lineStyle(2, 0x000000, 1);
    fish.strokeEllipse(32, 16, 48, 24);
    fish.generateTexture('fish', 64, 32);
    fish.clear();

    this.scene.start('MenuScene');
  }
}
