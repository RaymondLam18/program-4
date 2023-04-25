import { Actor, Engine, Vector, Label, Color, Font } from "excalibur";
import { Resources, ResourceLoader } from "../js/resources.js";

export class Game extends Engine {
  constructor() {
    super({ width: 640, height: 480 });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    const backGround = new Actor();
    backGround.graphics.use(Resources.Back.toSprite());
    backGround.pos = new Vector(300, 250);
    backGround.scale = new Vector(0.5, 0.5);
    this.add(backGround);

    const Retro = new Actor({
      width: Resources.Retro.width,
      height: Resources.Retro.height,
    });
    Retro.graphics.use(Resources.Retro.toSprite());
    Retro.pos = new Vector(100, 200);
    Retro.scale = new Vector(0.5, 0.5);
    Retro.vel = new Vector(10, 0);
    this.add(Retro);

    Retro.on("pointerup", (event) => {
      event.kill();
    });
  }
}

new Game();
