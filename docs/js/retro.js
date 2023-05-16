import { Actor, Vector, Engine, Random } from "excalibur";
import { Resources } from "../js/resources.js";

export class Retro extends Actor {
    onInitialize(engine) {
      this.anchor = new Vector(0, 0);
      this.rand = new Random();
      this.graphics.use(Resources.Retro.toSprite());
      this.w = Resources.Retro.width;
      this.h = Resources.Retro.height;
      this.pos = new Vector(
        this.rand.integer(this.w, engine.drawWidth - this.w),
        this.rand.integer(this.h, engine.drawHeight - this.h)
      );
      this.vel = new Vector(Math.random() * 80 - 40, Math.random() * 80 - 40);
  
      this.angularVelocity = Math.random() + 0.2;
      this.rotation = 12;
    }
  
    onPostUpdate(engine) {
      if (this.pos.x < 0 || this.pos.x + this.w > engine.drawWidth) {
        this.vel.x = -this.vel.x;
      }
      if (this.pos.y < 0 || this.pos.y + this.h > engine.drawHeight) {
        this.vel.y = -this.vel.y;
      }
    }
  }
  