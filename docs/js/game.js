import { Actor, Engine, Vector, Label, Color, Font } from "excalibur";
import { Resources, ResourceLoader } from "../js/resources.js";
import {Retro} from "../js/retro.js"
import { player } from "../js/player.js";

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
    backGround.vel = new Vector(-100, 0);
    this.add(backGround);

    this.add(new Retro());

    this.add(player());

    Retro.on("pointerup", (event) => {
      Retro.pos = new Vector(60, 100);
    });
  }
}

new Game();
