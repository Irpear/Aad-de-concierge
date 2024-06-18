import { Actor, Vector, Shape, CollisionType, Color, Random } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";
import { mathFunction } from "./mathFunctions";

export class Projectile extends Actor {
    canDespawn = false;
    constructor(position) {
        super({
            radius: 12,
            offset: new Vector(0, -250)
        })
        this.pos = position;
    }
    onInitialize(engine) {

        console.log("Projectile is created")

        let spr = Resources.Rock.toSprite();
        this.scale = new Vector(0.5, 0.5);

        this.rotation = mathFunction.Lerp(-30,30,Math.random())*0.01745329;
        this.graphics.use(spr);

        // this.pos = new Vector(500, 300)

        this.vel = new Vector(0, 800);
        let col = Shape.Circle(32);
        this.body.collisionType = CollisionType.Passive;
        this.collider.set(col);
        this.on("collisionstart", event => this.knockBack(event))
        this.on("enterviewport", event => this.markAsDespawnAble(event))
        this.on("exitviewport", event => this.killProjectile(event))
        //this.on(
    }
    knockBack(event) {
        if (event.other instanceof Player) {
            console.log("collided With Player")
            event.other.knockBack(this.pos);
        }
    }

    markAsDespawnAble(event) {
        this.canDespawn = true;
    }
    killProjectile() {
        if (this.canDespawn) {
            console.log("killed")
            this.kill();
        }
    }
}