import { Actor, Vector,Shape,CollisionType, Color } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Projectile extends Actor {
    canDespawn = false;
    constructor(position) {
        super()
        this.pos = position;
    }
    onInitialize(engine) {

        console.log("Projectile is created")

        let spr = Resources.Fish.toSprite();
        spr.tint = Color.fromHSL(0,1,0.5,1);
        this.graphics.use(spr);
    
       // this.pos = new Vector(500, 300)

        this.vel = new Vector(0,800);
        let col = Shape.Circle(32);
        this.body.collisionType = CollisionType.Passive;
        this.collider.set(col);
        this.on("collisionstart", event => this.knockBack(event))
        this.on("enterviewport", event => this.markAsDespawnAble(event))
        this.on("exitviewport", event => this.killProjectile(event))
        //this.on(
    }
    knockBack(event)
    {
        if(event.other instanceof Player)
            {
                 console.log("collided With Player")
                 event.other.knockBack(this.pos);
            }
    }

    markAsDespawnAble(event)
    {
        this.canDespawn = true;
    }
    killProjectile()
    {
        if(this.canDespawn){
     console.log("killed")
        this.kill();
        }
    }
}