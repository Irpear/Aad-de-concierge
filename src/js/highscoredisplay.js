import { ScreenElement, GraphicsGroup, Vector, Label, Font, Color } from "excalibur";
import { gameTimer } from "./gameTimer"
import { StartScreen } from "./startScreen";
import { Endscene } from "./endScene";

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
        let leaderStorage = localStorage.getItem("highscore"+Endscene.difficultyString+Endscene.modeString);
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

        let curIndex = highScoreList.length-1;
        let isSorted = false
        while (!isSorted) {
            //console.log("sorting");
            isSorted = true
            for (let i = 1; i < highScoreList.length; i++) {
                let cur = highScoreList[i]
                let prev = highScoreList[i - 1]
               // console.log(cur, prev);
                if (cur.TimeNumber < prev.TimeNumber) {
                 //   console.log("swap");
                    if(curIndex==i)
                        {
                            curIndex=i-1;
                        }
                    else if(curIndex==i-1)
                        {
                            curIndex=i
                        }
                    highScoreList[i] = prev
                    highScoreList[i - 1] = cur;
                    isSorted = false
                }
            }

        }
        highScoreList = highScoreList.slice(0, 5)

        
        localStorage.setItem("highscore"+Endscene.difficultyString+Endscene.modeString, JSON.stringify(highScoreList))
        Highscore.playerScores = highScoreList
        if(curIndex==5 && highScoreList.length==5)
            {
                highScoreList.push(currentPlayer);
            }

        for (let i = 0; i < highScoreList.length; i++) {

            let playerInfo = new Label({
                text: highScoreList[i].PlayerName+ "  " + highScoreList[i].PlayerTime,
                pos: new Vector(engine.drawWidth / 2, engine.drawHeight  / 2 - 100 + (i*75)),
                font: new Font({
                    size: 50,
                    family: 'impact'
                }),
                color: (i==curIndex)?Color.Yellow:Color.White
            })
            playerInfo.anchor = new Vector(0.5, 0.5)
            this.scene?.add(playerInfo)
            
        }
    }
}