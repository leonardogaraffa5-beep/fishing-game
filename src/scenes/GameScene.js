import { submitScore, getTopLocalScores } from '../network/leaderboard.js';
import { playPlop, setMuted } from '../audio/sfx.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.score = 0;
    this.casting = false;
    this.muted = false;
  }

  create() {
    this.add.image(400, 300, 'bg').setDisplaySize(800, 600);

    // Bobber sprite (casting line)
    this.bobber = this.physics.add.sprite(400, 150, 'bobber');
    this.bobber.setCollideWorldBounds(true);
    this.bobber.setBounce(0.2);

    // Input handlers
    this.input.on('pointerdown', () => this.cast());
    this.input.on('pointerup', () => this.reel());

    // Keyboard controls
    this.input.keyboard.on('keydown-SPACE', () => this.onSpace());
    this.input.keyboard.on('keydown-M', () => this.toggleMute());

    // HUD DOM wiring
    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => this.toggleMute());
    }
    this.domScore = document.getElementById('domScore');
    this.updateDomScore();

    // Fish spawning
    this.fishGroup = this.add.group();
    this.spawnTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnFish,
      callbackScope: this,
      loop: true
    });

    // HUD text
    this.scoreText = this.add.text(12, 12, 'Score: 0', {
      fontSize: '20px',
      color: '#fff',
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 2
    }).setDepth(10);

    this.timeLimit = 60;
    this.timerText = this.add.text(12, 40, 'Time: 60', {
      fontSize: '18px',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 2
    }).setDepth(10);

    // Timer event
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLimit--;
        this.timerText.setText('Time: ' + this.timeLimit);
        if (this.timeLimit <= 0) this.endGame();
      },
      loop: true
    });
  }

  updateDomScore() {
    if (this.domScore) {
      this.domScore.innerText = 'Score: ' + this.score;
    }
  }

  onSpace() {
    if (!this.casting) {
      this.cast();
    } else {
      this.reel();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.sound) this.sound.mute = this.muted;
    setMuted(this.muted);

    const btn = document.getElementById('muteBtn');
    if (btn) {
      btn.setAttribute('aria-pressed', String(this.muted));
      btn.textContent = this.muted ? 'Unmute' : 'Mute';
    }
  }

  cast() {
    if (this.casting) return;
    this.casting = true;
    playPlop();
    this.bobber.setVelocityY(280);
  }

  reel() {
    if (!this.casting) return;
    this.casting = false;
    this.tweens.add({
      targets: this.bobber,
      y: 120,
      duration: 600,
      ease: 'Sine.easeOut'
    });
  }

  spawnFish() {
    const x = Phaser.Math.Between(50, 750);
    const y = 520;
    const fish = this.physics.add.sprite(x, y, 'fish');
    fish.setVelocityY(-Phaser.Math.Between(40, 100));
    this.fishGroup.add(fish);

    // Remove fish after 5 seconds if not caught
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        if (fish.active) fish.destroy();
      }
    });
  }

  update() {
    // Check for fish caught
    this.physics.overlap(this.bobber, this.fishGroup, (bobber, fish) => {
      if (!fish.active) return;
      fish.destroy();
      this.score += 10;
      playPlop();
      this.scoreText.setText('Score: ' + this.score);
      this.updateDomScore();
    });

    // Keep bobber in bounds horizontally
    if (this.bobber.x < 20) this.bobber.x = 20;
    if (this.bobber.x > 780) this.bobber.x = 780;
  }

  async endGame() {
    this.spawnTimer.remove(false);
    this.timedEvent.remove(false);
    this.physics.pause();

    // Save to local storage
    const topLocal = getTopLocalScores();
    topLocal.push({ score: this.score, when: Date.now() });
    topLocal.sort((a, b) => b.score - a.score);
    topLocal.splice(5);
    localStorage.setItem('fishing_top', JSON.stringify(topLocal));

    // Try to submit to Supabase (if configured)
    try {
      await submitScore({ score: this.score });
    } catch (e) {
      console.warn('Could not submit to Supabase:', e);
    }

    // Transition to leaderboard
    this.time.delayedCall(1500, () => {
      this.scene.start('LeaderboardScene');
    });
  }
}
