import { Actor, Vector } from "excalibur";
export class cameraFollow extends Actor {
    player
    constructor() {
        super()
    }
    static camPos;
    onInitialize() {
        super.onInitialize();

    }
    onPreUpdate() {
        super.onPreUpdate();
        // console.log(this.player);
        if (this.player.pos.y < -280) {
            this.pos = new Vector(10, this.player.pos.y)
        } else {
            this.pos = new Vector(20, -280)
        }
        cameraFollow.camPos=this.pos;
    }
}