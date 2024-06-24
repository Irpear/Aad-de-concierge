
import { Actor, Axes, Buttons, Color, Engine, Font, Input, Keys, Label, Vector } from "excalibur";
import { StartScreen } from "./startScreen";
import { Game } from "./game";

export class NameInput extends Actor {
    game
    alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    selectedLetter = 0
    letterLabel = null;
    thisTag;
    gpadY = 0
    bpress = false
    stickMovedY = false

    constructor(pos, index) {
        super({
            pos: pos,
            color: Color.Gray,
            height: 100,
            width: 100,
        })
        this.addTag(`${index}`);
        this.name = "Nameslot"
    }


    onInitialize() {
        this.letterLabel = new Label({
            text: "A",
            font: new Font({
                size: 100,
                color: Color.White,
                family: 'Arial',
            })
        });
        this.letterLabel.anchor = new Vector(0.5, 0.5)
        this.addChild(this.letterLabel)
        this.thisTag = Array.from(this.tags)
    }

    onPreUpdate(engine) {
        if (Game.gpad != null) {
            this.gpadY = Game.gpad.getAxes(Axes.LeftStickY)
            this.bpress = Game.gpad.isButtonPressed(Buttons.Face1);
        }

        if (this.thisTag == this.scene.selectedLetterSlot) {
            this.color = Color.Green
            if (engine.input.keyboard.wasPressed(Keys.Up) || this.gpadY > 0 && this.stickMovedY === false) {
                if (this.selectedLetter > 24) {
                    this.selectedLetter = -1
                }
                this.selectedLetter++
                this.letterLabel.text = this.alphabet[this.selectedLetter]
            }
            if (engine.input.keyboard.wasPressed(Keys.Down) || this.gpadY < 0 && this.stickMovedY === false) {
                if (this.thisTag == this.scene.selectedLetterSlot) {
                    if (this.selectedLetter < 1) {
                        this.selectedLetter = 26
                    }
                    this.selectedLetter--
                    this.letterLabel.text = this.alphabet[this.selectedLetter]
                }
            }
        } else {
            this.color = Color.Gray
        }

        if (this.scene.nameConfirmed === true) {
            this.color = Color.Green
        } else if (this.scene.nameConfirmed === false && !this.thisTag === this.scene.selectedLetterSlot) {
            this.color = Color.Gray
        }

        if (this.gpadY != 0) {
            this.stickMovedY = true;
        } else {
            this.stickMovedY = false;
        }
    }
}