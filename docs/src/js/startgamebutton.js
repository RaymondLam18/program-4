import { Actor, Engine, Vector } from "excalibur";
import { Resources } from "./resources";

export class StartButton extends Actor{

    constructor(){
        super({width: Resources.StartButton.width, height: Resources.StartButton.height})
    }

    onInitialize(engine){
        this.graphics.use(Resources.StartButton.toSprite())
        this.scale = new Vector(5, 5);
        this.pos = new Vector(650,290)
        this.on('pointerup', (event) => {
            engine.goToScene('level')
        })
    }
}