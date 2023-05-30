import { Timer, Scene, Vector, RotationType, Label, TextAlign } from "excalibur";
import { Terrain } from './background.js';
import { playercharacter } from './retro.js';
import { projectile } from "./attack.js";
import { healthbar } from './health.js';
import { Blank } from "./blank.js";

export class Level extends Scene {
  playerCharacter;
  healthbar;
  score = 0;
  scoreLabel;
  scoreTimer;

  constructor() {
    super({ width: 1300, height: 600 });
  }

  onInitialize() {
    const enemyBulletTimer = new Timer({
      fcn: () => this.spawnEnemy(),
      repeats: true,
      interval: 500
    });
    this.add(enemyBulletTimer);
    enemyBulletTimer.start();

    const ground = new Terrain();
    this.add(ground);

    this.playerCharacter = new playercharacter();
    this.add(this.playerCharacter);

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
      },
      repeats: true,
      interval: 1000 // Update score every second
    });
    this.add(this.scoreTimer);
    this.scoreTimer.start();
  }

  onActivate(ctx) {
    this.add(new Blank());

    this.playerCharacter.health = 0;
    this.playerCharacter.pos = new Vector(650, 300);
    this.playerCharacter.actions.rotateTo(0, 1000, RotationType.Clockwise);
    this.healthbar.onHealthUpdate(this.playerCharacter.health);
  }

  onDeactivate(ctx) {
    this.add(new Blank());

    this.score = -10
  }

  spawnEnemy() {
    let direction = 1;
    let startpoint = 0;
    if (Math.random() < 0.5) {
      direction = -1;
      startpoint = 1300;
    }
    let Rock = new projectile(0 + startpoint, (Math.random() * 400) + 75, 300 * direction, 0, 0, 200);
    this.add(Rock);
  }
}
