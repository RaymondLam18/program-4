import { Actor, Scene, Vector } from "excalibur";
import { Resources } from "./resources";
import { StartButton } from "./startgamebutton";
import { Back } from "./background"

export class Start extends Scene {
    startbutton;

    constructor() {
        super();
    }

    onInitialize() {
        const ground = new Back();
        this.add(ground);

        this.startbutton = new StartButton();
        this.startbutton.enableCapturePointer = true;
        this.add(this.startbutton);
    }
}