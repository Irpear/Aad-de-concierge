import { Actor, Shape } from "excalibur"

export class endPoint extends Actor()
{
    timer
    player
    constructor(timer,player)
    {
        super()
        this.timer = timer;
        this.player = player;
    }
    onInitialize()
    {
        super.onInitialize()
        let col = Shape.Box(128,64);
        this.body.collision
    }
}