import { Actor, Engine, Vector } from "excalibur";
import { Resources } from "./resources";
import { Game } from "./game";

export class RetryButton extends Actor{

    constructor(){
        super({width: Resources.RetryButton.width, height: Resources.RetryButton.height})
    }

    onInitialize(engine){
        this.graphics.use(Resources.RetryButton.toSprite())
        this.pos = new Vector(650,300)
        this.on('pointerup', (event) => {
            engine.goToScene('level')
        })
    }
}