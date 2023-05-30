import { Actor, Vector } from "excalibur";

export class Blank extends Actor {
    constructor() {
        super({ width: 1300, height: 600 });
        this.pos = new Vector(650, 300);
        this.on('collisionstart', (event) => {
            if (event.other.type >= 0) {
                event.other.kill();
            }
            this.kill();
        });
    }
}
