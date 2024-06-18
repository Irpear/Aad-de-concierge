import { CollisionGroup, Color, Font, Label, Scene, ScreenElement, Text, Vector } from "excalibur";
import { gameTimer } from "./gameTimer";
import { StartScreen } from "./startScreen";
export class Endscene extends Scene {

    leaderboardText
    playerInfo
    onInitialize() {
        console.log("Je bent bij de eindscene");
        const sElement = new ScreenElement()


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

    }

}