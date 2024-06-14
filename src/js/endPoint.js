import { Actor, Shape, CollisionType} from "excalibur"
import { Player } from "./player";
import { gameTimer } from "./gameTimer";
export class endPoint extends Actor
{
    timer
    constructor(timer)
    {
        super()
        this.timer = timer;
        //this.player = player;
    }
    onInitialize()
    {
        super.onInitialize()
        let col = Shape.Box(128,64);
        this.body.collisionType = CollisionType.Passive;
        this.collider.set(col);
        this.on("precollision", event => this.endRun(event))
    }
    endRun(event)
    {
        if(event.other instanceof Player)
        {
             this.timer.endTime();
             //console.log("end")
        }
    }
}