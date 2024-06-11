import { Actor, Sprite } from "excalibur";
import { Resources } from "./resources";

export class Background extends Actor {

    constructor() {
        super({
            //Voeg hier Width toe van de Resources van de background
            //Voeg hier Height toe van de Resources van de background
        })
    }
    sprite 
    
    // Als we de sprite willen vervoeren naar andere scenes 
    onInitialize(engine) {
        console.log("Background loaded");
        this.sprite = new Sprite({
            image: Resources.Stars, // Background toevoegen verander stars naar de juiste naam
        })
        this.graphics.use(this.sprite) // Deze sprite gebruiken voor de graphics
    }

}