import { Color, CoordPlane, FontUnit, Label, Scene, Vector ,Actor,Shape, CollisionType, CollisionGroup} from "excalibur";
import { Background } from "./background";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Resources } from "./resources";
import { platformManager } from "./platformManager";


export class Level extends Scene {
    onInitialize(engine) {
        // Voeg background nog toe.
        const background = new Actor;
        background.graphics.use(Resources.Mast.toSprite());
        background.scale = new Vector(5,5)
        background.pos= new Vector(400,-14000)
        this.add(background);
        //Haha i won't change this
        this.goku = new Player()
        this.add(this.goku)



        const smallEnemy = new Projectile()
        smallEnemy.pos = new Vector(-150,300)
        this.add(smallEnemy)

        const smallEnemy2 = new Projectile()
        smallEnemy2.pos = new Vector(1025,300)
        this.add(smallEnemy2)
        


        //it should later go to platform manager class

        const platformGroup = new CollisionGroup('platform',0b0100,0b0100)
        const platform = new Actor()
        platform.pos = new Vector(400,600)
        platform.graphics.use(Resources.Platform.toSprite())
        platform.collider.set(Shape.Box(128,32))
        platform.scale=new Vector(15,3);
        platform.body.collisionType=CollisionType.Fixed;
        platform.CollisionGroup= 0b0100;
        this.add(platform);
        let pmanager = new platformManager();
        this.add(pmanager);
        this.camera.strategy.lockToActor(this.goku);

        
    }

    onActivate(ctx) {
        console.log("reset het level")
    }


}