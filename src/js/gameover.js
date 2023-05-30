import { Scene } from "excalibur";
import { RetryButton } from "./retrybutton";

export class GameOver extends Scene {
    retrybutton;

    constructor() {
        super();
    }

    onInitialize() {
        console.log('game over screen is gemaakt');
        this.retrybutton = new RetryButton();
        this.retrybutton.enableCapturePointer = true;
        this.add(this.retrybutton);
    }

    onActivate(ctx) {
        console.log('game over screen is geactiveerd');
    }
}