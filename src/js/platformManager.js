
import { Color, CoordPlane, FontUnit, Label, Scene, Vector ,Actor,Shape, CollisionType, CollisionGroup} from "excalibur";
import { Resources } from "./resources";
import { mathFunction } from "./mathFunctions";

export class platformManager extends Actor
{
    platforms = [];
    minAngle=45
    maxAngle=135
    distance=256
    pox = 500
    poy = 500

    constructor()
    {
        super()
    }
    onInitialize()
    {
        super.onInitialize()
        this.spawnNextPlatform();
        this.spawnNextPlatform();
        this.spawnNextPlatform();
    }
    spawnNextPlatform()
    {
        let chosenAngle = mathFunction.Lerp(this.minAngle,this.maxAngle,Math.random())*0.01745329;
        console.log(chosenAngle);
        let xc = Math.cos(chosenAngle)*this.distance;
        let yc = -Math.sin(chosenAngle)*this.distance;
        let pos = new Vector(xc+this.pox,yc+this.poy);
        this.pox = pos.x;
        this.poy = pos.y;
        let platform = new Actor();
        platform.graphics.use(Resources.Platform.toSprite())
        platform.pos = pos//new Vector(500,200);
        platform.collider.set(Shape.Box(128,32))
        platform.scale=new Vector(2,3);
        platform.body.collisionType=CollisionType.Fixed;
        platform.CollisionGroup= 0b0100;
        this.scene.add(platform);
        this.platforms.push(platform);
        console.log(platform,pos);
    }
}