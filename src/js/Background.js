import { Actor, Vector, GraphicsGroup } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js'

export class Back extends Actor {
    offset;

    onInitialize(engine) {
        const BackImage = Resources.Back.toSprite();
        this.offset = BackImage.width;

        BackImage.height = 600;

        const group = new GraphicsGroup({
            members: [
                {
                    graphic: BackImage,
                    pos: new Vector(0, 0),
                },
                {
                    graphic: BackImage,
                    pos: new Vector(BackImage.width, 0),
                }
            ]
        });

        this.graphics.anchor = new Vector(0, 0);
        this.graphics.add(group);
        this.pos = new Vector(0, 0);
        this.vel = new Vector(-100, 0);
    }

    onPostUpdate(engine, delta) {
        if (this.pos.x < -this.offset) {
            this.pos = new Vector(0, 0);
        }
    }
}
