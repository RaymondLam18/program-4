import { Actor, Engine, Vector, Input, Timer } from "excalibur";
import { Resources, ResourceLoader } from './resources.js'
import { projectile } from "./attack.js";

export class playercharacter extends Actor {
    pointerX;
    pointerY;

    shootDirectionX;
    shootDirectionY;

    canShoot;
    isShooting;
    counter;

    health;

    constructor() {
        super({ width: Resources.Player.width, height: Resources.Player.height });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Player.toSprite());
        this.scale = new Vector(0.5, 0.5);
        this.pos = new Vector(650, 300);
        this.counter = 0;
        this.isShooting = false;

        engine.input.pointers.primary.on('down', (event) => {
            this.isShooting = true;
        });

        engine.input.pointers.primary.on('up', (event) => {
            this.isShooting = false;
        });

        this.health = 0;

        this.on('collisionstart', (event) => {
            if (this.health < 10) {
                if (event.other.type === 0) {
                    event.other.kill();
                    this.health = this.health + 1;
                    console.log(`je hebt ${10 - this.health} hp over`);
                    engine.currentScene.healthbar.onHealthUpdate(this.health);
                    if (this.health >= 10) {
                        this.vel = new Vector(0, 0);
                    }
                }
            }
        });

        this.on('exitviewport', (event) => {
            engine.goToScene('gameover');
            
        });
    }

    onPreUpdate(engine, delta) {
        this.pointerX = engine.input.pointers.primary.lastScreenPos.x;
        this.pointerY = engine.input.pointers.primary.lastScreenPos.y;

        this.shootDirectionX = this.pointerX - this.pos.x;
        this.shootDirectionY = this.pointerY - this.pos.y;

        let x = 0;
        let y = 0;

        if (this.health < 10) {
            if (engine.input.keyboard.isHeld(Input.Keys.W)) {
                if (this.pos.y > 125) {
                    y = -300;
                }
            }
            if (engine.input.keyboard.isHeld(Input.Keys.A)) {
                if (this.pos.x > 50) {
                    x = -300;
                }
            }
            if (engine.input.keyboard.isHeld(Input.Keys.D)) {
                if (this.pos.x < 1250) {
                    x = 300;
                }
            }
            if (engine.input.keyboard.isHeld(Input.Keys.S)) {
                if (this.pos.y < 450) {
                    y = 300;
                }
            }
            this.vel = new Vector(x, y);
        }

        this.counter = this.counter + delta;
        if (this.counter > 300) {
            this.canShoot = true;
        }
        if (this.health < 10) {
            if (this.isShooting && this.canShoot) {
                engine.currentScene.add(new projectile(this.pos.x, this.pos.y, this.shootDirectionX, this.shootDirectionY, 1, 800));
                this.counter = 0;
                this.canShoot = false;
            }
        }

        if (this.health > 9) {
            this.deathAnimation();
        }
    }

    deathAnimation() {
        this.angularVelocity = this.angularVelocity + 0.1;
        let fallingspeed = this.vel.y;
        fallingspeed = fallingspeed + 5;
        this.vel = new Vector(0, fallingspeed);
    }
}