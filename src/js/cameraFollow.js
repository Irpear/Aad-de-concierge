import { Actor, Vector } from "excalibur";
export class cameraFollow extends Actor {
    player
    constructor() {
        super()
    }
    onInitialize() {
        super.onInitialize();

    }
    onPreUpdate() {
        super.onPreUpdate();
        // console.log(this.player);
        if (this.player.pos.y < -280) {
            this.pos = new Vector(this.pos.x, this.player.pos.y)
        } else {
            this.pos = new Vector(this.pos.x, -280)
        }
    }
}