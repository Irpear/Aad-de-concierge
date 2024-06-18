// @ts-nocheck
import { Actor, Color, Engine, Font, Input, Keys, Label, Vector } from "excalibur";
import { StartScreen } from "./startScreen";

export class NameInput extends Actor {
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

    alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    selectedLetter = 0
    letterLabel = null;
    thisTag;

    

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
        if (this.thisTag == this.scene.selectedLetterSlot) {
            this.color = Color.Green
            if (engine.input.keyboard.wasPressed(Keys.Down)) {
                if (this.selectedLetter > 24) {
                    this.selectedLetter = -1
                }
                this.selectedLetter++
                this.letterLabel.text = this.alphabet[this.selectedLetter]
            }
            if (engine.input.keyboard.wasPressed(Keys.Up)) {
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

        if (this.scene.confirmName === true) {
            this.color = Color.Green
        } else if (this.scene.confirmName === false && !this.thisTag === this.scene.selectedLetterSlot) {
            this.color = Color.Gray
        }   
    }
}