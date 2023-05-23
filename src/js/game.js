import { Actor, Engine, Vector, Label, Color, Font } from "excalibur";
import { Resources, ResourceLoader } from "./resources.js";
import {Retro} from "../js/retro.js"
import { Background } from "./Background.js";

export class Game extends Engine {
  constructor() {
    super({ width: 640, height: 480 });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {

    this.add(new Background())

    this.add(new Retro());

  }
}

new Game();
