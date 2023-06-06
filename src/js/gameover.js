import { Scene } from "excalibur";
import { RetryButton } from "./retrybutton";

export class GameOver extends Scene {
    retrybutton;

    constructor() {
        super();
    }

    onInitialize() {
        this.retrybutton = new RetryButton();
        this.retrybutton.enableCapturePointer = true;
        this.add(this.retrybutton);
    }

    onActivate(ctx) {
    }
}