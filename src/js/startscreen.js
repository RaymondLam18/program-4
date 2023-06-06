import { Scene } from "excalibur";
import { StartButton } from "./startgamebutton";

export class Start extends Scene {
    startbutton;

    constructor() {
        super();
    }

    onInitialize() {
        this.startbutton = new StartButton();
        this.startbutton.enableCapturePointer = true;
        this.add(this.startbutton);
    }

    onActivate(ctx) {
    }
}