import { Actor, CollisionType, Keys, Vector,Shape} from "excalibur"
import { Resources } from "./resources"
import { mathFunction } from "./mathFunctions"

export class Player extends Actor {
    xspeed = 0
    yspeed = 0


    constructor() {
        super({
            width: 100,
            height: 100,
            radius:50
        })
    }


    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(0, 0)
        this.vel = new Vector(0, 0)
        this.collider.set(Shape.Box(64,64))
        this.body.collisionType=CollisionType.Active;
    }




    onPostUpdate(engine,delta) {
        
        this.pInput(engine);
        this.pMove(delta);
        // Shooting or jumping Keys
    }
    // Detect player button press
    pInput(engine)
    {
        this.xspeed = 0;
        this.yspeed = 0;
        if (engine.input.keyboard.isHeld(Keys.Left)|| engine.input.keyboard.isHeld(Keys.A)) {
            this.xspeed = -500
        }
        if (engine.input.keyboard.isHeld(Keys.Right)|| engine.input.keyboard.isHeld(Keys.D)) {
            this.xspeed = 500
        }
        if (engine.input.keyboard.isHeld(Keys.Up)|| engine.input.keyboard.isHeld(Keys.W)) {
            this.yspeed = -500
        }
        if (engine.input.keyboard.isHeld(Keys.Down)|| engine.input.keyboard.isHeld(Keys.S)) {
            this.yspeed = 500
        }
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            // When the Spacebar is pressed jump 
        }
    }
    // Calculate and apply velocity
    pMove(delta)
    {
        let xvel = mathFunction.Lerp(this.vel.x,this.xspeed,delta*0.005);
        let yvel = mathFunction.Lerp(this.vel.y,this.yspeed,delta*0.005);
        this.vel = new Vector(xvel,yvel);
        console.log(this.vel)
    }

    gameOver(event) {
        // Als je wordt geraakt door de puinhoop game over

        // if (event.other instanceof Freeza) {
        // }
    }

}