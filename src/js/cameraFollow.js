import { Actor, Vector } from "excalibur";
export class cameraFollow extends Actor
{
    player
    constructor()
    {
        super()
    }
    onInitialize()
    {
        super.onInitialize();
    }
    onPreUpdate()
    {
        super.onPreUpdate();
       // console.log(this.player);
        this.pos = new Vector(this.pos.x,this.player.pos.y)
    }
}