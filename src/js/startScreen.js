import { Actor, Color, Font, Keys, Label, Scene, Vector } from "excalibur";
import { NameInput } from "./nameInput";

export class StartScreen extends Scene {


    inputs = []
    static playerName
    selectedLetterSlot = 0;
    onInitialize() {
        const title = new Label({
            text: 'I Mast Ascend',
            pos: new Vector(this.engine.drawWidth / 2, 100),
            font: new Font({
                family: 'impact',
                size: 120,
            }),
        });
        title.anchor = new Vector(0.5, 0.5)

        const subtitle = new Label({
            text: 'Get to the top to fix the tower!',
            pos: new Vector(this.engine.drawWidth / 2, 200),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Arial',
            })
        });
        subtitle.anchor = new Vector(0.5, 0.5)

        const subtitle2 = new Label({
            text: 'Enter your name using the joystick',
            pos: new Vector(this.engine.drawWidth / 2, 350),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Arial',
            })
        });
        subtitle2.anchor = new Vector(0.5, 0.5)

        //Create namefields
        for (let i = 0; i < 4; i++) {
            let nameField = new NameInput(new Vector((this.engine.drawWidth / 2 - 180) + i * 120, 500), i)
            this.inputs.push(nameField)
            this.add(nameField)
        }


        // Create and configure the start button
        const startButton = new Actor({
            pos: new Vector(this.engine.drawWidth / 2, 700),
            width: 150,
            height: 50,
            color: Color.Green,
        });

        // Add a label to the start button
        const startButtonText = new Label({
            text: 'Start Game',
            font: new Font({
                size: 20,
                color: Color.Black,
                bold: true,
                family: 'Arial',
            }),
        });

        // Center the button text within the button
        startButtonText.anchor = new Vector(0.5, 0.5)
        startButton.addChild(startButtonText);

        // Add an event listener for the start button
        startButton.on('pointerup', () => {
            StartScreen.playerName = ''
            // De naam van de speler in de labels doorsturen naar de game
            for (let i = 0; i < this.inputs.length; i++) {
                StartScreen.playerName += this.inputs[i].alphabet[this.inputs[i].selectedLetter]
            }
            this.engine.goToScene('level');
        });

        // Add actors
        this.add(title);
        this.add(subtitle);
        this.add(subtitle2);
        this.add(startButton);
    }

    getNameFieldByTag(tag) {
        return this.actors.find(actor => actor.hasTag(`${tag}`));

    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Right)) {
            if (this.selectedLetterSlot < 4) {
                this.selectedLetterSlot++
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.Left)) {
            if (this.selectedLetterSlot > 0) {
                this.selectedLetterSlot--
            }
        }
        if (this.selectedLetterSlot === 4) {
            this.confirmName = true;
        } else {
            this.confirmName = false;
        }
    }
}