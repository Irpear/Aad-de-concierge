import { Color, CoordPlane, FontUnit, Label, Scene, Vector ,Actor,Shape, CollisionType} from "excalibur";
import { Background } from "./background";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Resources } from "./resources";


export class Level extends Scene {
    onInitialize(engine) {
        // Voeg background nog toe.

        //Haha i won't change this
        this.goku = new Player()
        this.add(this.goku)



        const smallEnemy = new Projectile()
        this.add(smallEnemy)

        const platform = new Actor()
        platform.pos = new Vector(400,600)
        platform.graphics.use(Resources.Platform.toSprite())
        platform.collider.set(Shape.Box(512,32))
        platform.scale=new Vector(15,3);
        platform.body.collisionType=CollisionType.Fixed;
        this.add(platform);
    }

    onActivate(ctx) {
        console.log("reset het level")
    }


}