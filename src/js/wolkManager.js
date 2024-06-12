import { Actor } from "excalibur";
import { mathFunction } from "./mathFunctions";

export class wolkManager extends Actor
{
    cloudList=[]
    cloudAmount=20;
    minY
    maxY

    constructor()
    {
        super();
    }
    onInitialize()
    {
        super.onInitialize();
    }
    onPreUpdate()
    {

    }
    spawnCloud()
    {
        for(let i = 0;i<this.cloudAmount;i++)
        {
            let ypos = mathFunction.Lerp(this.minY,this.maxY,Math.random());
            let xpos
        }
    }
    handleCloudMovement()
    {
        
    }
}