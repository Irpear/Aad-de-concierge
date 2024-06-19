import { ScreenElement, GraphicsGroup, Vector, Label, Font, Color } from "excalibur";
import { gameTimer } from "./gameTimer"
import { StartScreen } from "./startScreen";

export class Highscore extends ScreenElement {
    constructor() {
        super()
    }
    pName
    pTime
    static playerScores = [];
    onInitialize(engine) {
        console.log('HighScore Class is loaded');

        // haal de highscores op uit de localstorage
        let leaderStorage = localStorage.getItem("highscore");
        let highScoreList = JSON.parse(leaderStorage)
        // 
        if (!leaderStorage) {
            highScoreList = []
        }
        console.log("ee1")
        let currentPlayer = { PlayerName: "", PlayerTime: "", TimeNumber: -1 };
        currentPlayer.PlayerName = StartScreen.playerName
        currentPlayer.PlayerTime = gameTimer.endTime
        currentPlayer.TimeNumber = gameTimer.endTimeNum
        highScoreList.push(currentPlayer)


        let isSorted = false
        while (!isSorted) {
            console.log("sorting");
            isSorted = true
            for (let i = 1; i < highScoreList.length; i++) {
                let cur = highScoreList[i]
                let prev = highScoreList[i - 1]
                console.log(cur, prev);
                if (cur.TimeNumber < prev.TimeNumber) {
                    console.log("swap");
                    highScoreList[i] = prev
                    highScoreList[i - 1] = cur;
                    isSorted = false
                }
            }

        }
        highScoreList = highScoreList.slice(0, 5)
        console.log("eee")
        localStorage.setItem("highscore", JSON.stringify(highScoreList))
        Highscore.playerScores = highScoreList

        for (let i = 0; i < highScoreList.length; i++) {

            let playerInfo = new Label({
                text: highScoreList[i].PlayerName+ "  " + highScoreList[i].PlayerTime,
                pos: new Vector(engine.drawWidth / 2, engine.drawHeight  / 2 - 100 + (i*75)),
                font: new Font({
                    size: 50,
                    family: 'impact'
                }),
                color: Color.White
            })
            playerInfo.anchor = new Vector(0.5, 0.5)
            this.scene?.add(playerInfo)
            
        }


        let hDisplayGraphics = new GraphicsGroup({
            members: [

            ]
        })
    }
}