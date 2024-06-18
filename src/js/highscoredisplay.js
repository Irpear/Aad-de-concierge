import { ScreenElement, GraphicsGroup } from "excalibur";
import { gameTimer } from "./gameTimer"

export class Highscore extends ScreenElement {
    constructor() {
        super()
    }

    onInitialize(){
        console.log('HighScore Class is loaded');
        let hDisplayGraphics = new GraphicsGroup({
            members: [
                
            ]
        })
    }
}