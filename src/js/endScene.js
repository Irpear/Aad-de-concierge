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

        
        this.playerInfo = new Label({
            text: StartScreen.playerName + " " + gameTimer.endTime,
            pos: new Vector(this.engine.drawWidth / 2, this.engine.drawHeight / 2 - 100),
            font: new Font({
                size: 50,
                family: 'impact'
            }),
            color: Color.White
        })
        this.playerInfo.anchor = new Vector(0.5, 0.5)
        this.add(this.leaderboardText)
        this.add(this.playerInfo)
        this.add(boardTest)

    }

}