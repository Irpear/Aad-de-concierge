import { ScreenElement, GraphicsGroup } from "excalibur";
import { gameTimer } from "./gameTimer"
import { StartScreen } from "./startScreen";

export class Highscore extends ScreenElement {
    constructor() {
        super()
    }
    pName
    pTime
    onInitialize() {
        console.log('HighScore Class is loaded');

        // haal de highscores op uit de localstorage
        let leaderStorage = localStorage.getItem("highscore");
        let highScoreList = JSON.parse(leaderStorage)
        // 
        if (!leaderStorage) {
            highScoreList = []
        }

        let currentPlayer = { PlayerName: "", PlayerTime: "", TimeNumber: -1 };
        currentPlayer.PlayerName = StartScreen.playerName
        currentPlayer.PlayerTime = gameTimer.endTime
        currentPlayer.TimeNumber = gameTimer.endTimeNum
        highScoreList.push(currentPlayer)


        let cycle = 0
        let isSorted = false
        while (!isSorted) {
            isSorted = true
            for (let i = 1; i < highScoreList.length; i++) {
                let cur = highScoreList[i]
                let prev = highScoreList[i - 1]
                if (cur.TimeNumber < prev.TimeNumber) {
                    highScoreList[i] = prev
                    highScoreList[i] = cur;
                    isSorted = false
                }
            }
            if(cycle>100){
                isSorted = true
            }
            cycle++
        }
        // highScoreList = highScoreList.slice(0,5)
        localStorage.setItem("highscore", JSON.stringify(highScoreList))




        let hDisplayGraphics = new GraphicsGroup({
            members: [

            ]
        })
    }
}