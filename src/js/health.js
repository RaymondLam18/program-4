import { Actor, SpriteSheet, Vector } from "excalibur";
import { Resources } from "./resources";

export class healthbar extends Actor {
    spritesheet;
    state;

    constructor(health) {
        super();
        this.state = health;
    }

    onInitialize() {
        this.spritesheet = SpriteSheet.fromImageSource({
            image: Resources.HealthBars,
            grid: {
                rows: 11,
                columns: 1,
                spriteWidth: 300,
                spriteHeight: 50
            }
        });

        this.pos = new Vector(1140, 40);
        this.graphics.use(this.spritesheet.getSprite(0, this.state));
    }

    onHealthUpdate(updatedHealth) {
        this.graphics.use(this.spritesheet.getSprite(0, updatedHealth));
    }
}
