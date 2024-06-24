import { Actor, Canvas, CollisionGroup, Color, Font, Graphic, Label, Raster, Rectangle, Scene, ScreenElement, Shape, Text, Vector } from "excalibur";
import { gameTimer } from "./gameTimer";
import { StartScreen } from "./startScreen";
import { Highscore } from "./highscoredisplay";
import { Restart } from "./restart";
export class Endscene extends Scene {

    leaderboardText
    playerInfo
    static difficultyString;
    static modeString;
    static scene;
    onInitialize() {
        Endscene.scene = this;
    }
    onActivate(ctx)
    {
        console.log("Je bent bij de eindscene");
        const sElement = new ScreenElement()
        const playersInfo = localStorage.getItem('leaderboard');

        let boardTest = new Highscore()
        this.add(boardTest)
        this.leaderboardText = new Label({
            text: 'LEADERBOARD',
            pos: new Vector(this.engine.drawWidth / 2, this.engine.drawHeight / 6),
            font: new Font({
                family: 'impact',
                size: 120,
            }),
            color: Color.Yellow
        });
        this.leaderboardText.anchor = new Vector(0.5, 0.5)
        this.add(this.leaderboardText)
        
        let ModeDifficulty = new Label({
            text: Endscene.modeString+" "+Endscene.difficultyString,
            pos: new Vector(this.engine.drawWidth / 2, this.engine.drawHeight / 6+120),
            font: new Font({
                family: 'impact',
                size: 90,
            }),
            color: Color.Yellow
        });
        ModeDifficulty.anchor=new Vector(0.5,0.5)
        this.add(ModeDifficulty);

        const restartButton = new Actor({
            pos: new Vector(this.engine.drawWidth / 2, 800),
            width: 270,
            height: 80,
            color: Color.Gray,
        });
        const restartText = new Label({
            text: 'Replay',
            font: new Font({
                size: 50,
                color: Color.White,
                bold: true,
                family: 'Impact',
            }),
        });
        restartText.anchor = new Vector(0.5, 0.5);
        restartButton.addChild(restartText);
        restartButton.on('pointerup', () => Restart.restart());
        this.add(restartButton);
    }
}