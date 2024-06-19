import { Color, CoordPlane, FontUnit, Label, Scene, Vector, Actor, Shape, CollisionType, CollisionGroup } from "excalibur";
import { Background } from "./background";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Resources } from "./resources";
import { platformManager } from "./platformManager";
import { cameraFollow } from "./cameraFollow";
import { wolkManager } from "./wolkManager";
import { vector } from "excalibur/build/dist/Util/DrawUtil";
import { gameTimer } from "./gameTimer";
import { projectileSpawner } from "./projectileSpawner";
import { StartScreen } from "./startScreen";
import { birdSpawner } from "./birdSpawner";


export class Level extends Scene {
    timer
    onInitialize(engine) {

        //TODO background Image is not centered if there is time over should be fixed
        //Background
        const mast3 = new Actor();
        mast3.graphics.use(Resources.Mast3.toSprite());
        mast3.pos = new Vector(12, -18500)
        mast3.scale = new Vector(2, 2)
        this.add(mast3);

        const mast1 = new Actor();
        mast1.graphics.use(Resources.Mast1.toSprite());
        mast1.pos = new Vector(0, -3400)
        mast1.scale = new Vector(2, 2)
        this.add(mast1);

        const mast2 = new Actor();
        mast2.graphics.use(Resources.Mast2.toSprite());
        mast2.pos = new Vector(12, -11400)
        mast2.scale = new Vector(2, 2)
        this.add(mast2);

        //player object
        //Haha i won't change this
        let Goku = new Player()
        this.add(Goku);

        //The bottom platform
        const platform = new Actor()
        platform.z = 1000
        platform.pos = new Vector(0, 600)
        platform.graphics.use(Resources.Platform.toSprite())
        platform.collider.set(Shape.Box(128, 32))
        platform.scale = new Vector(15, 3);
        platform.body.collisionType = CollisionType.Fixed;
        this.add(platform);

        //Game timer
        this.timer = new gameTimer();
        this.add(this.timer);

        //Platform spawner
        let pmanager = new platformManager(this.timer);
        this.add(pmanager);

        //Camera Behaviour
        const camFollow = new cameraFollow();
        camFollow.pos = new Vector(0, 400);
        camFollow.player = Goku;
        this.add(camFollow);
        this.camera.strategy.lockToActor(camFollow);
        this.camera.zoom = 0.5;

        //Background Clouds
        let cmanager = new wolkManager();
        this.add(cmanager);


        let projSpawner = new projectileSpawner();
        this.add(projSpawner);

        let BirdSpawner = new birdSpawner();
        this.add(BirdSpawner);
    }

    onActivate(ctx) {
        console.log("reset het level")
    }


}