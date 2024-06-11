import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Level } from './level.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        this.level = new Level()
        this.add('level', this.level)
        this.goToScene('level')
    }
}

new Game()
