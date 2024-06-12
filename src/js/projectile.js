import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Projectile extends Actor {
    constructor() {
        super()
    }
    onInitialize(engine) {

        console.log("Projectile is created")

        this.graphics.use(Resources.Fish.toSprite())
       // this.pos = new Vector(500, 300)


        
    }
}