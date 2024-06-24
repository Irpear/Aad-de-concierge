import { Vector,Scene,Actor} from "excalibur";
import { Player } from "./player";
import { StartScreen } from "./startScreen";
import { gameTimer } from "./gameTimer";
import { Game } from "./game";
import { Level } from "./level";
import { Endscene } from "./endScene";

export class Restart
{
    static restart()
    {
        StartScreen.playerName="";
        StartScreen.selectedDifficulty= 0;
        Player.playerPos = new Vector(0,0);
        Player.playerVel = new Vector(0,0);
        gameTimer.endTime = "";
        gameTimer.endTimeNum =0;
        Level.scene.clear();
        Endscene.scene.clear();
       // Game.game.scenes["level"] = new Level();
       // Game.game.scenes["endScene"] = new Endscene();
        Game.game.goToScene('startScreen');
    }
}