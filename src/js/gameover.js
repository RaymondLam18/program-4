import { Actor, Scene, Vector } from "excalibur";
import { Resources } from "./resources";
import { RetryButton } from "./retrybutton";

export class GameOver extends Scene {
    retrybutton;

    constructor() {
        super();
    }

    onInitialize() {
        const bg = new Actor()
        bg.graphics.use(Resources.Space.toSprite())
        bg.pos = new Vector(650, 100);

        this.add(bg)
        
        this.retrybutton = new RetryButton();
        this.retrybutton.enableCapturePointer = true;
        this.add(this.retrybutton);
    }
}