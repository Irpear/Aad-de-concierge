import { Actor, CollisionType, Keys, Vector, Shape, Debug, Physics, Ray } from "excalibur"
import { Resources } from "./resources"
import { mathFunction } from "./mathFunctions"

export class Player extends Actor {
    game
    xspeed = 0
    yspeed = 0
    jumpSpeed = 1000
    jumpDuration = 0.5
    jumpTime = 0;
    doJump = false;
    isJumping = false;

    constructor() {
        super({
            width: 100,
            height: 100,
            radius: 50
        })
    }


    onInitialize(engine) {
        this.game = engine;
        this.graphics.use(Resources.Fish.toSprite())
        this.collider.set(Shape.Box(64, 64)) // Makes sure that the Player stand on the platform and doesnt merge with the platform
        this.body.collisionType = CollisionType.Active;
        this.pos = new Vector(0,300)
        // Causes to fall down and land on the ground instead of spawning in the top of the screen.
    }




    onPostUpdate(engine, delta) {

        this.pInput(engine);
        this.pMove(delta);
        // Shooting or jumping Keys
    }
    // Detect player button press
    pInput(engine) {
        this.xspeed = 0;
        this.yspeed = 0;
        if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld(Keys.A)) {
            this.xspeed = -500
        }
        if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld(Keys.D)) {
            this.xspeed = 500
        }
        if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld(Keys.W)) {
            this.yspeed = -500
        }
        if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld(Keys.S)) {
            this.yspeed = 500
        }
        this.doJump = engine.input.keyboard.wasPressed(Keys.Space);
        // When the Spacebar is pressed jump 
    }
    // Calculate and apply velocity
    pMove(delta) {
        let xvel = mathFunction.Lerp(this.vel.x, this.xspeed, delta * 0.005);
        //let yvel = mathFunction.Lerp(this.vel.y, 1000, delta * 0.01);
        let yvel= mathFunction.Lerp(this.vel.y,this.yspeed,delta*0.005);
        //   const groundCheck = new Ray(this.pos,new Vector(0,1))

        if (this.doJump && !this.isJumping && Math.abs(this.vel.y) < 0.01) {
            // const groundCheck = new Ray(this.pos,new Vector(0,1))
            //  console.log(this.scene.physics.rayCast(groundCheck,{ignoreCollisionGroupAll: true,maxDistance: 60,collisionMask:0b0100,filter:()=>{return true}}));
            //  let rhit = this.scene.physics.rayCast(groundCheck,{ignoreCollisionGroupAll: true,maxDistance: 60,collisionMask:0b0100})
            //  if(rhit.length>0){

            this.isJumping = true;
            this.jumpTime = 0;
            // }
        }
        if (this.isJumping) {
            let jt = Math.sqrt(mathFunction.quadraticFormula(-1, 0, 1, this.jumpTime / this.jumpDuration));
            yvel = mathFunction.Lerp(1000, -this.jumpSpeed, jt)
            //  console.log(this.jumpTime);
            if (this.jumpTime > 0.1 && Math.abs(this.vel.y) < 0.01) {
                this.isJumping = false;
                yvel = 1000
            }
            this.jumpTime += delta / 1000;
            if (this.jumpTime > this.jumpDuration) {
                this.isJumping = false;
                //yvel = 1000;
            }

        }
        this.vel = new Vector(xvel, yvel);
    }

    gameOver(event) {
        // Als je wordt geraakt door de puinhoop game over

        // if (event.other instanceof Freeza) {
        // }
    }

}