import { CollisionGroup, Color, Font, Scene, ScreenElement, Text, Vector } from "excalibur";
import { gameTimer } from "./gameTimer";
import { StartScreen } from "./startScreen";
export class Endscene extends Scene {

    endSceneText
    onInitialize() {
        console.log("Je bent bij de eindscene");
        const sElement = new ScreenElement()
        this.endSceneText = new Text({
            text: StartScreen.playerName + " "+ gameTimer.endTime,
            font: new Font({
                size: 50,
                family: 'Arial'
            }),
            color: Color.White
        })




        sElement.pos = new Vector(550, 400)
        sElement.graphics.use(this.endSceneText)


        this.add(sElement)
    }

}