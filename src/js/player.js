import * as ex from "excalibur";
import {Resources} from "./resources.js";
import {Animation, AnimationStrategy, Color, Input} from "excalibur";


export class player extends ex.Actor {
    onGround = true;
    jumped = false;
    hurt = false;
    hurtTime = 0;
    startx = 0;
    starty = 0;
    left = false;
    slide = false;
    vault = false;
    side = '';
    slidefast = false;

    CurHP;
    hud;

    //uiElements
    healthbar;
    effectsdisplay;
    testEffect;

    PStats = new PlayerStats()

    constructor(x, y) {
        super({
            name: 'player',
            pos: new ex.Vector(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("player"),
            collider: ex.Shape.Box(11, 27, ex.Vector.Half, ex.vec(2, 12))
        });
        this.startx = x;
        this.starty = y;

        this.CurHP = this.PStats.StatResults.MaxHP
        this.hud = new HTMLUI(UIType.Hud, "PlayerHud")

        this.healthbar = this.hud.createUIElement('HPBar', 'div')
        this.healthbar.innerText = this.CurHP
        let HPStyle = this.healthbar.style
        HPStyle.backgroundColor = Color.Blue
        HPStyle.color = Color.Red

    }

    //Animations needs to be public to reference them in all functions

    //Need to convert images to SpriteSheets first
    PIdleSheet = ex.SpriteSheet.fromImageSource({
        image: Resources.PIdleSheet,
        grid: {
            rows: 1,
            columns: 10,
            spriteHeight: 48,
            spriteWidth: 72
        }
    })
    PWalkSheet = ex.SpriteSheet.fromImageSource({
        image: Resources.PWalkSheet,
        grid: {
            rows: 1,
            columns: 8,
            spriteHeight: 48,
            spriteWidth: 72
        }
    })
    PStab = ex.SpriteSheet.fromImageSource({
        image: Resources.PStab,
        grid: {
            rows: 1,
            columns: 7,
            spriteHeight: 48,
            spriteWidth: 72
        }
    })
    PWallSlideS = ex.SpriteSheet.fromImageSource({
        image: Resources.PWallSlide,
        grid: {
            rows: 1,
            columns: 3,
            spriteHeight: 48,
            spriteWidth: 72
        }
    })
    PWallClimb = ex.SpriteSheet.fromImageSource({
        image: Resources.PWallClimb,
        grid: {
            rows: 1,
            columns: 5,
            spriteHeight: 48,
            spriteWidth: 72
        }
    })
    PWallHang = ex.SpriteSheet.fromImageSource({
        image: Resources.PWallHang,
        grid: {
            rows: 1,
            columns: 1,
            spriteHeight: 48,
            spriteWidth: 72
        }
    })
    PJump = ex.SpriteSheet.fromImageSource({
        image: Resources.PJump,
        grid: {
            rows: 1,
            columns: 3,
            spriteHeight: 48,
            spriteWidth: 72
        }
    })

    //Create Anims
    PlayerIdleAnim = ex.Animation.fromSpriteSheet(this.PIdleSheet, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 150)
    PlayerIdleAnimLeft = ex.Animation.fromSpriteSheet(this.PIdleSheet, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 150)
    PlayerWalkAnimRight = ex.Animation.fromSpriteSheet(this.PWalkSheet, [0, 1, 2, 3, 4, 5, 6, 7], 150)
    PlayerWalkAnimLeft = ex.Animation.fromSpriteSheet(this.PWalkSheet, [0, 1, 2, 3, 4, 5, 6, 7], 150)
    PStabRight = ex.Animation.fromSpriteSheet(this.PStab, [0, 1, 2, 3, 4, 5, 6], 10, AnimationStrategy.End)
    PStabLeft = ex.Animation.fromSpriteSheet(this.PStab, [0, 1, 2, 3, 4, 5, 6], 10, AnimationStrategy.End)

    PWallhangR = ex.Animation.fromSpriteSheet(this.PWallHang, [0], 20, AnimationStrategy.Loop)
    PWallhangL = ex.Animation.fromSpriteSheet(this.PWallHang, [0], 20, AnimationStrategy.Loop)
    PWallSlideR = ex.Animation.fromSpriteSheet(this.PWallSlideS, [1, 2], 150, AnimationStrategy.Loop)
    PWallSlideL = ex.Animation.fromSpriteSheet(this.PWallSlideS, [1, 2], 150, AnimationStrategy.Loop)
    PWallClimbR = ex.Animation.fromSpriteSheet(this.PWallClimb, [0, 1, 2, 3, 4], 150, AnimationStrategy.End)
    PWallClimbL = ex.Animation.fromSpriteSheet(this.PWallClimb, [0, 1, 2, 3, 4], 150, AnimationStrategy.End)


    //Create single sprites
    jumpSprite = this.PJump.getSprite(1, 0);

    addAnims() {

        //Anims flipped
        this.PlayerWalkAnimLeft.flipHorizontal = true
        this.PStabLeft.flipHorizontal = true;
        this.PlayerIdleAnimLeft.flipHorizontal = true;
        this.PWallhangL.flipHorizontal = true;
        this.PWallSlideL.flipHorizontal = true;
        this.PWallClimbL.flipHorizontal = true;

        //Register Anims
        this.graphics.add("PIdle", this.PlayerIdleAnim);
        this.graphics.add("PIdleL", this.PlayerIdleAnimLeft)
        this.graphics.add("PWalkR", this.PlayerWalkAnimRight);
        this.graphics.add("PWalkL", this.PlayerWalkAnimLeft);
        this.graphics.add("PStabR", this.PStabRight);
        this.graphics.add("PStabL", this.PStabLeft);
        this.graphics.add("PWallHangR", this.PWallhangR)
        this.graphics.add("PWallHangL", this.PWallhangL)
        this.graphics.add("PWallSlideR", this.PWallSlideR)
        this.graphics.add("PWallSlideL", this.PWallSlideL)
        this.graphics.add("PWallClimbL", this.PWallClimbL)
        this.graphics.add("PWallClimbR", this.PWallClimbR)

        //Register single sprites
        this.graphics.add("PJump", this.jumpSprite)
    }

    onInitialize(_engine) {
        this.addAnims()
        this.addTag('player')
        this.attacking = false

        this.on('postcollision', (evt) => this.onPostCollision(evt))
        this.on('collisionend', (evt) => this.onCollisionEnd())
        this.on('exitviewport', () => {
            this.pos = new ex.vec(this.startx, this.starty)
            this.vel.y = 0;
        })
    }

    onCollisionEnd(evt) {
        this.slide = false;
        this.vault = false;
        this.onGround = false
    }

    onPostCollision(evt) {
        if (evt.side === ex.Side.Bottom) {
            console.log(evt.other.name);
            this.onGround = true;
        }
        if ((evt.side === ex.Side.Left || evt.side === ex.Side.Right)) {
            if (this.onGround) return;
            if (evt.other.name === "Slide") this.slide = true;
            if (evt.other.name === "Vault") this.vault = true;
            if (evt.side === ex.Side.Left) this.side = 'Left'
            if (evt.side === ex.Side.Right) this.side = 'Right'
        }
    }

    /**
     * PlayerUI
     */
    UpdatePlayerHud(){
        this.healthbar.innerText = this.CurHP
    }

    onPreUpdate(_engine, _delta) {
        this.UpdatePlayerHud()
        if(this.stabbed){
            this.addTag("stabbed")
        }else {
            this.removeTag("stabbed")
        }
        //this part handles sprite, input and velocity
        this.vel.x = 0;

        if (this.vault || this.slide) {
            console.log(this.vault + " " + this.slide)
            if (this.vault) {
                //Vault
                this.vel.y = -100;
                this.onGround = false;
                if (this.side === "Left") {
                    this.graphics.use("PWallClimbL")
                    if (this.PWallClimbL.done) {
                        this.PWallClimbL.reset()
                    }
                } else if (this.side === "Right") {
                    this.graphics.use("PWallClimbR")
                    if (this.PWallClimbR.done) {
                        this.PWallClimbR.reset()
                    }
                }
                //Set animation later - need to draw it first

            } else if (this.slide) {
                console.log('sliding')
                //Go down fast or hang
                this.vel.y = -15
                this.vel.x = 0
                //prevent default jump function to run
                this.onGround = false;

                //Input Handling
                if (_engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
                    //Speed up Going Down
                    this.slidefast = true;
                    this.vel.y = 150;
                } else {
                    this.slidefast = false;
                }
                //Direction and Animation handling
                if (this.side === 'Right') {
                    console.log('Right, Slidefast: ' + this.slidefast)
                    //Set hang or slide animation
                    if (this.slidefast) {
                        this.graphics.use("PWallSlideR");
                    } else {
                        this.graphics.use("PWallHangR")
                    }
                    if (_engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
                        //Jump to right
                        if (_engine.input.keyboard.isHeld(ex.Input.Keys.Left) && !_engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
                            this.jumpSprite.flipHorizontal = true
                            this.graphics.use("PJump")
                            this.vel.x = -150
                            this.vel.y = -250
                        }

                    }
                }
                if (this.side === 'Left') {
                    console.log('Left, Slidefast: ' + this.slidefast)
                    //Set hang or slide animation
                    if (this.slidefast) {
                        this.graphics.use("PWallSlideL");
                    } else {
                        this.graphics.use("PWallHangL")
                    }
                    if (_engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
                        //Jump to right
                        if (_engine.input.keyboard.isHeld(ex.Input.Keys.Right) && !_engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
                            this.jumpSprite.flipHorizontal = false
                            this.graphics.use("PJump")
                            this.vel.x = 150
                            this.vel.y = -250
                        }
                    }
                }
            }
        } else {
            if (_engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
                this.vel.x = -150;
            }
            if (_engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
                this.vel.x = 150;
            }
            if (_engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.onGround) {
                this.vel.y = -400;
                this.onGround = false;
            }
            if (this.vel.x < 0 && !this.hurt) { //Walk Left
                this.left = true;
                if (this.onGround) {
                    this.graphics.use("PWalkL");
                }
            }
            if (this.vel.x > 0 && !this.hurt) {
                if (this.onGround) this.graphics.use("PWalkR");
                this.left = false;
            }
            if (this.vel.x === 0 && !this.hurt && this.onGround) {
                if (this.left) {
                    this.graphics.use("PIdleL")
                } else {
                    this.graphics.use("PIdle")
                }

            }
            if (this.attacking) {
                if (this.left) {
                    this.graphics.use("PStabL")
                    if(this.PStabLeft.currentFrameIndex === 4){
                        this.collider.useBoxCollider(45, 27, ex.Vector.Half, ex.vec(2, 12));
                        this.stabbed = true
                    }
                    if (this.PStabLeft.done) {
                        this.PStabLeft.reset()
                        this.attacking = false
                        this.stabbed = false
                        this.collider.useBoxCollider(18, 27, ex.Vector.Half, ex.vec(2, 12))
                    }
                } else {
                    this.graphics.use("PStabR")
                    if(this.PStabRight.currentFrameIndex === 4){
                        this.collider.useBoxCollider(45, 27, ex.Vector.Half, ex.vec(2, 12));
                        this.stabbed = true;
                    }
                    if (this.PStabRight.done) {
                        this.PStabRight.reset()
                        this.attacking = false
                        this.stabbed = false
                        this.collider.useBoxCollider(18, 27, ex.Vector.Half, ex.vec(2, 12))
                    }
                }
            }
            if (_engine.input.keyboard.wasPressed(ex.Input.Keys.E)) {
                this.attacking = true;
            }
            if (this.left && !this.onGround && !this.attacking) {
                console.log("jumpL")
                this.jumpSprite.flipHorizontal = true;
                this.graphics.use("PJump")
            } else if (!this.left && !this.onGround && !this.attacking) {
                console.log("jumpR")
                this.jumpSprite.flipHorizontal = false;
                this.graphics.use("PJump")
            }

            if(_engine.input.keyboard.wasPressed(Input.Keys.AltRight)){
                console.log(this.pos)
            }

        }
    }

}