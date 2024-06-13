import { Color, CoordPlane, FontUnit, Label, Scene, Vector ,Actor,Shape, CollisionType, CollisionGroup} from "excalibur";
import { Background } from "./background";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Resources } from "./resources";
import { platformManager } from "./platformManager";
import { cameraFollow } from "./cameraFollow";
import { wolkManager } from "./wolkManager";
import { vector } from "excalibur/build/dist/Util/DrawUtil";
import { gameTimer} from "./gameTimer";


export class Level extends Scene {
    onInitialize(engine) {
        //TODO background Image is not centered if there is time over should be fixed
        // Voeg background nog toe.
        const mast3 = new Actor();
        mast3.graphics.use(Resources.Mast3.toSprite());
        mast3.pos= new Vector(12,-18500)
        mast3.scale=new Vector(2,2)
        this.add(mast3);

        const mast1 = new Actor();
        mast1.graphics.use(Resources.Mast1.toSprite());
        mast1.pos= new Vector(0,-3400)
        mast1.scale=new Vector(2,2)
        this.add(mast1);

        const mast2 = new Actor();
        mast2.graphics.use(Resources.Mast2.toSprite());
        mast2.pos= new Vector(12,-11400)
        mast2.scale=new Vector(2,2)
        this.add(mast2);

     


        //Haha i won't change this
        this.goku = new Player()
        this.add(this.goku)



        const smallEnemy = new Projectile()
        smallEnemy.pos = new Vector(-575,300)
        smallEnemy.scale = new Vector(-1,1);
        this.add(smallEnemy)

        const smallEnemy2 = new Projectile()
        smallEnemy2.pos = new Vector(575,300)
        this.add(smallEnemy2)
    

        //it should later go to platform manager class

        const platformGroup = new CollisionGroup('platform',0b0100,0b0100)
        const platform = new Actor()
        platform.pos = new Vector(0,600)
        platform.graphics.use(Resources.Platform.toSprite())
        platform.collider.set(Shape.Box(128,32))
        platform.scale=new Vector(15,3);
        platform.body.collisionType=CollisionType.Fixed;
        platform.CollisionGroup= 0b0100;
        this.add(platform);
        let pmanager = new platformManager();
        this.add(pmanager);
        
        const camFollow = new cameraFollow();
        camFollow.pos = new Vector(0,400);
        camFollow.player = this.goku;
        this.add(camFollow);
        this.camera.strategy.lockToActor(camFollow);
        this.camera.zoom = 0.5;

        let cmanager = new wolkManager();
        this.add(cmanager);
        let timer = new gameTimer();
        this.add(timer);
    }

    onActivate(ctx) {
        console.log("reset het level")
    }


}