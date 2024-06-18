import { Actor, Shape, CollisionType} from "excalibur"
import { Player } from "./player";
import { gameTimer } from "./gameTimer";
import { Game } from "./game";
export class endPoint extends Actor
{
    game
    timer
    constructor(timer)
    {
        super()
        this.timer = timer;
        //this.player = player;
    }
    onInitialize(engine)
    {
        this.game = engine
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
             this.game.goToScene('endscene')
             //console.log("end")
        }
    }
}