import { Actor, Vector, Shape, CollisionType, Color, Random, SpriteSheet,range} from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";
import { mathFunction } from "./mathFunctions";

export class Bird extends Actor {
    canDespawn = false;
    dir = 1;
    constructor(position, dir) {
        super()
        this.dir = dir;
        this.pos = position;
        this.pos.x *= dir;

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Duck,
            grid: { rows: 2, columns: 5, spriteWidth: 120, spriteHeight: 117 }
        })

        const fly = Animation.fromSpriteSheet(runSheet, range(0, 8), 100)

        this.graphics.add("fly", fly)
        this.graphics.use('fly')
    }
    onInitialize(engine) {

        console.log("Bird is created")

        let spr = Resources.Bird.toSprite();
        this.scale = new Vector(this.dir * 0.33, 0.33);

        this.graphics.use(spr);

        // this.pos = new Vector(500, 300)

        this.vel = new Vector(this.dir * -mathFunction.Lerp(600, 1000, Math.random()), 0);
        let col = Shape.Circle(128)
        this.body.collisionType = CollisionType.Passive;
        this.collider.set(col);
        this.on("collisionstart", event => this.knockUp(event))
        this.on("enterviewport", event => this.markAsDespawnAble(event))
        this.on("exitviewport", event => this.killProjectile(event))

    }
    knockUp(event) {
        if (event.other instanceof Player) {
            console.log("collided With Player")
            event.other.knockUp(this.pos);
            Resources.KnockBack.play(0.5)
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