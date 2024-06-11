import { Actor, Keys, Vector } from "excalibur"
import { Resources } from "./resources"

export class Player extends Actor {

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
    }




    onPostUpdate(engine) {
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -500
        }
        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 500
        }
        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -500
        }
        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = 500
        }
    
        this.vel = new Vector(xspeed, yspeed);

        // Shooting or jumping Keys
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            // When the Spacebar is pressed jump 
        }

    }

    gameOver(event) {
        // Als je wordt geraakt door de puinhoop game over

        // if (event.other instanceof Freeza) {
        // }
    }

}