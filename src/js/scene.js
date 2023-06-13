import { Timer, Scene, Vector, RotationType, Label, TextAlign } from "excalibur";
import { Back } from './background.js';
import { Retro } from './retro.js';
import { projectile } from "./attack.js";
import { healthbar } from './health.js';
import { Empty } from "./empty.js";

export class Level extends Scene {
  player;
  healthbar;
  score = 0;
  scoreLabel;
  scoreTimer;

  constructor() {
    super({ width: 1300, height: 600 });
  }

  onInitialize() {
    const asteroid = new Timer({
      fcn: () => this.spawnEnemy(),
      repeats: true,
      interval: 500
    });
    this.add(asteroid);
    asteroid.start();

    const ground = new Back();
    this.add(ground);

    this.player = new Retro();
    this.add(this.player);

    this.healthbar = new healthbar(0);
    this.add(this.healthbar);

    this.scoreLabel = new Label({
      text: 'Score: 0',
      pos: new Vector(10, 10),
      fontFamily: 'sans-serif',
      fontSize: 20,
      color: 'white',
      textAlign: TextAlign.Left
    });
    this.add(this.scoreLabel);

    this.scoreTimer = new Timer({
      fcn: () => {
        this.score += 10; // Increase score by 10 every second
        this.scoreLabel.text = `Score: ${this.score}`; // Update score label

        // Store score in local storage
        localStorage.setItem('score', this.score.toString());
      },
      repeats: true,
      interval: 1000 // Update score every second
    });
    this.add(this.scoreTimer);
    this.scoreTimer.start();
  }

  onActivate(ctx) {
    this.add(new Empty());

    this.player.health = 0;
    this.player.pos = new Vector(650, 300);
    this.player.actions.rotateTo(0, 1000, RotationType.Clockwise);
    this.healthbar.onHealthUpdate(this.player.health);
  }

  onDeactivate(ctx) {
    this.add(new Empty());

    // Reset score when deactivating the scene
    this.score = 0;
    this.scoreLabel.text = 'Score: 0';

  }

  spawnEnemy() {
    let direction = 1;
    let startpoint = 0;
    if (Math.random() < 0.5) {
      direction = -1;
      startpoint = 1300;
    }
    let Rock = new projectile(0 + startpoint, (Math.random() * 400) + 75, 300 * direction, 0, 0, 300);
    this.add(Rock);
  }
}
