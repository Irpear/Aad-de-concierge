import { Actor, Canvas, CollisionGroup, Color, Font, Graphic, Label, Raster, Rectangle, Scene, ScreenElement, Shape, Text, Vector } from "excalibur";
import { gameTimer } from "./gameTimer";
import { StartScreen } from "./startScreen";
import { Highscore } from "./highscoredisplay";
export class Endscene extends Scene {

    leaderboardText
    playerInfo
    onInitialize() {
        console.log("Je bent bij de eindscene");
        const sElement = new ScreenElement()
        const playersInfo = localStorage.getItem('leaderboard');

        let boardTest = new Highscore()
        this.add(boardTest)
        this.leaderboardText = new Label({
            text: 'LEADERBOARD',
            pos: new Vector(this.engine.drawWidth / 2, this.engine.drawHeight / 4),
            font: new Font({
                family: 'impact',
                size: 120,
            }),
            color: Color.Yellow
        });
        this.leaderboardText.anchor = new Vector(0.5, 0.5)



     
        this.add(this.leaderboardText)


    }

}