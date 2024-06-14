
import { Color, CoordPlane, FontUnit, Label, Scene, Vector ,Actor,Shape, CollisionType, CollisionGroup} from "excalibur";
import { Resources } from "./resources";
import { mathFunction } from "./mathFunctions";
import { endPoint } from "./endPoint";
export class platformManager extends Actor
{
    platforms = [];
    minAngle=30
    maxAngle= 150
    distanceY= 280
    distanceX= 600
    pox = 0
    poy = 300

    minX = -575
    maxX = 575
    
    timer

    constructor(timer)
    {
        super()
        this.timer=timer;
    }
    onInitialize()
    {
        let yp = this.poy;
        let xp = mathFunction.Lerp(this.minX,this.maxX,Math.random());

        let pos = new Vector(xp,yp);
        this.pox = pos.x;
        this.poy = pos.y;
        let platform = new Actor();
        platform.graphics.use(Resources.Platform.toSprite())
        platform.pos = pos//new Vector(500,200);
        platform.collider.set(Shape.Box(128,32))
        platform.scale=new Vector(2,1);
        platform.body.collisionType=CollisionType.Fixed;
        this.scene.add(platform);
        this.platforms.push(platform);

        super.onInitialize()
        for(let i = 0;i<100;i++)
        {
        this.spawnNextPlatform();
        }
        let endPlatform = new endPoint(this.timer)
        endPlatform.pos = new Vector(this.pox,this.poy-32);
        this.scene.add(endPlatform);
        //this.spawnNextPlatform();
        //this.spawnNextPlatform();
    }
    spawnNextPlatform()
    {
        let chosenAngle = mathFunction.Lerp(this.minAngle,this.maxAngle,Math.random())*0.01745329;
      //  console.log(chosenAngle);
        let xc = Math.cos(chosenAngle)*this.distanceX;
        let yc = -Math.sin(chosenAngle)*this.distanceY;
        if(xc+this.pox>this.maxX || xc+this.pox<this.minX)
        {
            xc*=-1;
        }
        let pos = new Vector(xc+this.pox,yc+this.poy);
        this.pox = pos.x;
        this.poy = pos.y;
        let platform = new Actor();
        platform.graphics.use(Resources.Platform.toSprite())
        platform.pos = pos//new Vector(500,200);
        platform.collider.set(Shape.Box(128,32))
        platform.scale=new Vector(2,1);
        platform.body.collisionType=CollisionType.Fixed;
        this.scene.add(platform);
        this.platforms.push(platform);
       // console.log(platform,pos);
    }
}