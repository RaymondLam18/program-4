import { Actor, Vector, Engine, Random, Input } from "excalibur";
import { Resources } from "./resources.js";

export class Retro extends Actor {
  onInitialize(engine) {
    this.anchor = new Vector(0, 1); // Set the anchor point to the bottom-left corner
    this.rand = new Random();
    this.graphics.use(Resources.Retro.toSprite());
    this.scale = new Vector(0.5, 0.5); // Adjust the scale to make the Retro actor smaller
    this.w = Resources.Retro.width * this.scale.x;
    this.h = Resources.Retro.height * this.scale.y;
    
    // Set the initial position to the left bottom corner of the screen
    this.pos = new Vector(
      this.w,
      engine.drawHeight - this.h
    );

    this.vel = new Vector(0, 0);

    // Register keyboard event handlers for arrow keys and WASD keys
    engine.input.keyboard.on('hold', this.onKeyDown.bind(this));
    engine.input.keyboard.on('release', this.onKeyUp.bind(this));
  }

  onKeyDown(evt) {
    // Start moving Retro when the arrow key or WASD key is pressed
    switch (evt.key) {
      case Input.Keys.Up:
      case Input.Keys.W:
        this.vel.y = -100;
        break;
      case Input.Keys.Left:
      case Input.Keys.A:
        this.vel.x = -100;
        break;
      case Input.Keys.Down:
      case Input.Keys.S:
        this.vel.y = 100;
        break;
      case Input.Keys.Right:
      case Input.Keys.D:
        this.vel.x = 100;
        break;
    }
  }

  onKeyUp(evt) {
    // Stop moving Retro when the arrow key or WASD key is released
    switch (evt.key) {
      case Input.Keys.Up:
      case Input.Keys.Down:
      case Input.Keys.W:
      case Input.Keys.S:
        this.vel.y = 0;
        break;
      case Input.Keys.Left:
      case Input.Keys.Right:
      case Input.Keys.A:
      case Input.Keys.D:
        this.vel.x = 0;
        break;
    }
  }

  onPostUpdate(engine) {
    const newPos = this.pos.add(this.vel.scale(engine.deltaTime / 1000));

    // Check if the new position is within the screen boundaries
    if (newPos.x >= 0 && newPos.x + this.w <= engine.drawWidth) {
      this.pos.x = newPos.x;
    }
    if (newPos.y >= 0 && newPos.y + this.h <= engine.drawHeight) {
      this.pos.y = newPos.y;
    }
  }
}