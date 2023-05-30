import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class projectile extends Actor {
    constructor(xpos, ypos, xvel, yvel, type, speedFactor) {
        super({ width: Resources.PlayerProjectile.width, height: Resources.PlayerProjectile.height });
        this.xpos = xpos;
        this.ypos = ypos;
        this.xvel = xvel;
        this.yvel = yvel;
        this.type = type;
        this.speedFactor = speedFactor;
    }

    onInitialize() {
        if (this.type === 0) {
            this.graphics.use(Resources.Rock.toSprite());
            this.on("collisionstart", (event) => {
                if (event.other.type === 1) {
                    event.other.kill();
                    this.kill();
                }
            });
            this.scale = new Vector(0.2, 0.2);
        } else {
            this.graphics.use(Resources.PlayerProjectile.toSprite());
            this.on("collisionstart", (event) => {
                if (event.other.type === 0) {
                    event.other.kill();
                    this.kill();
                }
            });
            this.scale = new Vector(2, 2);
        }
        this.pos = new Vector(this.xpos, this.ypos);

        let normalvelocity = new Vector(this.xvel, this.yvel);
        this.vel = normalvelocity.normalize().scale(this.speedFactor);
    }

    onPreUpdate() {
        this.on('exitviewport', (event) => {
            this.kill();
        });
    }
}
