import { Color, CoordPlane, FontUnit, Label, Scene, Vector } from "excalibur";
import { Background } from "./background";
import { Player } from "./player";
import { Projectile } from "./projectile";


export class Level extends Scene {
    onInitialize(engine) {
        // Voeg background nog toe.


        this.goku = new Player()
        this.add(this.goku)



        const smallEnemy = new Projectile()
        this.add(smallEnemy)

    }

    onActivate(ctx) {
        console.log("reset het level")
    }


}