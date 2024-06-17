import { Actor, Vector } from "excalibur";
import { mathFunction } from "./mathFunctions";
import { Resources } from "./resources";

export class wolkManager extends Actor
{
    cloudList=[]
    cloudAmount=50;
    minYp=-10000
    maxYp=-25000
    minXv=50
    maxXv=250

    constructor()
    {
        super();
    }
    onInitialize()
    {
        super.onInitialize();
        this.spawnCloud();
    }
    onPreUpdate()
    {
        this.recycleCloud();
    }
    //Spawn all cloud actors
    spawnCloud()
    {
        for(let i = 0;i<this.cloudAmount;i++)
        {
            let ypos = mathFunction.Lerp(this.minYp,this.maxYp,Math.random());
            let xvel = mathFunction.Lerp(this.minXv,this.maxXv,Math.random());
            let cloud = new Actor();
            cloud.graphics.use(Resources.Cloud.toSprite());
            cloud.pos = new Vector(-1600,ypos);
            cloud.vel = new Vector(xvel,0);
            cloud.z =-1;
            this.scene.add(cloud);
            this.cloudList.push(cloud);
        }
    }
    //Moves cloud back to left side of screen, but wit different y
    recycleCloud()
    {
        for(let i =0;i<this.cloudAmount;i++)
        if(this.cloudList[i].pos.x>1600)
            {
                let ypos = mathFunction.Lerp(this.minYp,this.maxYp,Math.random());
                let xvel = mathFunction.Lerp(this.minXv,this.maxXv,Math.random());
                this.cloudList[i].pos = new Vector(-1600,ypos);
                this.cloudList[i].vel = new Vector(xvel,0)
            }
    }
}