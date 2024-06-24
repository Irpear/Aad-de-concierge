import { Actor, CollisionType, Keys, Vector, Shape, Debug, Physics, Ray, Animation, range, SpriteSheet, Graphic, ConsoleAppender, clamp,Axes,Buttons } from "excalibur"
import { Resources } from "./resources"
import { mathFunction } from "./mathFunctions"
import { vector } from "excalibur/build/dist/Util/DrawUtil"
import { StartScreen } from "./startScreen"
import { Game } from "./game"

export class Player extends Actor {
    game
    xspeed = 0
    yspeed = 0
    jumpSpeed = 1000
    jumpDuration = 0.5
    jumpTime = 0;
    doJump = false;
    isJumping = false;
    kbTime = 0;
    kbVel;
    static playerPos;
    static playerVel;
    static isGoku=false;

    landed=true;
    constructor() {
        super({
            width: 100,
            height: 100,
            radius: 50
        })
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Aad,
            grid: { rows: 2, columns: 4, spriteWidth: 177, spriteHeight: 192 }
        })
        const idle = Animation.fromSpriteSheet(runSheet, [0], 80)
        const run = Animation.fromSpriteSheet(runSheet, range(4, 7), 80)
        const jump = Animation.fromSpriteSheet(runSheet, [2], 80)
        const hit = Animation.fromSpriteSheet(runSheet, [1], 80)

        this.graphics.add("idle", idle)
        this.graphics.add("run", run)
        this.graphics.add("jump", jump)
        this.graphics.add("hit", hit)

    }


    onInitialize(engine) {
        this.game = engine;
        //  this.graphics.use(Resources.Fish.toSprite())
        if(Player.isGoku)
            {
                console.log("Its over 9000");
                let gokuSprite = Resources.Goku.toSprite();
                gokuSprite.scale = new Vector(0.1,0.1);
                this.graphics.use(gokuSprite);
            }
        else
        {
            this.scale= new Vector(0.75,0.75);
        }
        this.collider.set(Shape.Box(84, 128, new Vector(0.5, 0.33))) // Makes sure that the Player stand on the platform and doesnt pass through the platform
        this.body.collisionType = CollisionType.Active;
        this.pos = new Vector(0, 300)
    }




    onPostUpdate(engine, delta) {
        this.pInput(engine);
        this.pMove(delta);
        Player.playerPos = this.pos
        Player.playerVel = this.vel;

     //   console.log(Player.playerPos);
        this.pos.x = clamp(this.pos.x,-1385,1385)

        if(!Player.isGoku)
        {
        this.graphics.use('idle')
        if (this.vel.y <= 0) {
            this.graphics.use('jump');
        } 
        else if (Math.abs(this.vel.x) > 50) {
            this.graphics.use('run');
        }
        if (this.kbTime > 0) {
            this.graphics.use('hit')
        }
        }
    }
    // Detect player button press
    pInput(engine) {
        //console.log(this.vel)
        this.xspeed = 0;
        this.yspeed = 0;
        let gpadX = 0;
        let gpadY = 0;
        let bpress = false;
        if(Game.gpad!=null){
        gpadX =  Game.gpad.getAxes(Axes.LeftStickX)
        gpadY = Game.gpad.getAxes(Axes.LeftStickY)
        bpress = Game.gpad.isButtonPressed(Buttons.Face1);
        }
        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A) || gpadX<0) {
            this.xspeed = -500
        }
        if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)|| gpadX>0) {
            this.xspeed = 500
        }
        if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld(Keys.W)|| gpadY>0) {
            this.yspeed = -1500
        }
        if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld(Keys.S)|| gpadY<0) {
            this.yspeed = 1500
        }
        // When the Spacebar is pressed jump 
        this.doJump = engine.input.keyboard.wasPressed(Keys.Space) || bpress;
    }
    // Calculate and apply velocity
    pMove(delta) {
        let xvel = mathFunction.Lerp(this.vel.x, this.xspeed, delta * 0.005);
        let yvel = 0;
        if(Player.isGoku){
            yvel= mathFunction.Lerp(this.vel.y,this.yspeed,delta*0.005);
        }
        else
        {
             yvel = mathFunction.Lerp(this.vel.y, 1000, delta * 0.01);
        }
        if (this.doJump && !this.isJumping && Math.abs(this.vel.y) < 850 && this.landed) {

            this.isJumping = true;
            this.jumpTime = 0;
            this.landed = false;
        }
        if (this.isJumping) {
            let jt = Math.sqrt(mathFunction.quadraticFormula(-1, 0, 1, this.jumpTime / this.jumpDuration));
            yvel = mathFunction.Lerp(1000, -this.jumpSpeed, jt)
            if (this.jumpTime > 0.1 && Math.abs(this.vel.y) < 0.01) {
                this.isJumping = false;
                yvel = 1000
            }
            this.jumpTime += delta / 1000;
            if (this.jumpTime > this.jumpDuration) {
                this.isJumping = false;
            }
        }
        else
        {
            if(Math.abs(this.vel.y)<100)
                {
                    this.landed = true;
                }
        }
        if (this.kbTime <= 0) {
            this.vel = new Vector(xvel, yvel);
        }
        else {
            this.vel = this.kbVel;
            this.kbTime -= delta * 0.01;
            this.kbVel.y = mathFunction.Lerp(this.kbVel.y, 1000, delta * 0.01);
        }
        let flipDir = Math.sign(this.vel.x);
        this.graphics.flipHorizontal = (flipDir > 0) ? true : false;
    }

    knockBack(projPos) {
        //let yd = this.pos.y-projPos.y 
        let yk = Math.max(Math.random(), 0.5) * -3000
        let xk = Math.sign(this.pos.x - projPos.x) * mathFunction.Lerp(350, 750, Math.random());

        this.kbTime = 1.5;
        this.kbVel = new Vector(xk, yk);
    }

    knockUp(projPos) {
        //let yd = this.pos.y-projPos.y 
        let yk = Math.max(Math.random(), 0.5) * -6000
        let xk = Math.sign(this.pos.x - projPos.x) * mathFunction.Lerp(100, 300, Math.random());

        this.kbTime = 1.5;
        this.kbVel = new Vector(xk, yk);
    }

}

