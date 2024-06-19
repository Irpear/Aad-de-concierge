import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Debug } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Level } from './level.js'
import { StartScreen } from './startScreen.js'
import { Endscene } from './endScene.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1440,
            height: 900,
            displayMode: DisplayMode.FitScreen,
            suppressPlayButton: true,
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        this.level = new Level()
        this.startScreen = new StartScreen()
        this.add('startScreen', this.startScreen)
        this.endScene = new Endscene()
        this.add('endscene', this.endScene)
        this.add('level', this.level)
        this.goToScene('startScreen')
        this.toggleDebug()
    }
}

new Game()
