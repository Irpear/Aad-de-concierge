import { Actor, Color, Font, Keys, Label, Scene, Vector } from "excalibur";
import { NameInput } from "./nameInput";
import { projectileSpawner } from "./projectileSpawner";
import { birdSpawner } from "./birdSpawner";

export class StartScreen extends Scene {
    inputs = [];
    static selectedDifficulty = -1;
    static playerName;
    selectedLetterSlot = 0;
    difficultyActors = [];

    onInitialize() {
        const title = new Label({
            text: 'I Mast Ascend',
            pos: new Vector(this.engine.drawWidth / 2, 100),
            font: new Font({
                family: 'impact',
                size: 120,
            }),
        });
        title.anchor = new Vector(0.5, 0.5);

        const subtitle = new Label({
            text: 'Get to the top to fix the tower!',
            pos: new Vector(this.engine.drawWidth / 2, 200),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Impact',
            })
        });
        subtitle.anchor = new Vector(0.5, 0.5);

        const subtitle2 = new Label({
            text: 'Enter your name & select difficulty using the joystick',
            pos: new Vector(this.engine.drawWidth / 2, 300),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Impact',
            }),

        });
        subtitle2.anchor = new Vector(0.5, 0.5);

        const subtitle3 = new Label({
            text: '(Move joystick up/down to select letter & move right to confirm)',
            pos: new Vector(this.engine.drawWidth / 2, 340),
            font: new Font({
                size: 26,
                color: Color.White,
                family: 'Impact',
            }),

        });
        subtitle3.anchor = new Vector(0.5, 0.5);

        // Create name fields
        for (let i = 0; i < 4; i++) {
            let nameField = new NameInput(new Vector((this.engine.drawWidth / 2 - 180) + i * 120, 420), i);
            this.inputs.push(nameField);
            this.add(nameField);
        }

        // Create difficulty selectors
        const difficulties = [
            { pos: new Vector(this.engine.drawWidth / 2 - 250, 600), label: 'Easy', tag: 'difficulty0' },
            { pos: new Vector(this.engine.drawWidth / 2, 600), label: 'Normal', tag: 'difficulty1' },
            { pos: new Vector(this.engine.drawWidth / 2 + 250, 600), label: 'Hard', tag: 'difficulty2' }
        ];

        difficulties.forEach((difficulty, index) => {
            const actor = new Actor({
                pos: difficulty.pos,
                width: 150,
                height: 50,
                color: Color.Gray,
            });
            const label = new Label({
                text: difficulty.label,
                font: new Font({
                    size: 30,
                    color: Color.White,
                    family: 'Impact',
                }),
            });
            actor.addTag(difficulty.tag);
            label.anchor = new Vector(0.5, 0.5);
            actor.addChild(label);

            this.difficultyActors.push(actor);
            this.add(actor);
        });

        // Create and configure the start button
        const startButton = new Actor({
            pos: new Vector(this.engine.drawWidth / 2, 800),
            width: 270,
            height: 80,
            color: Color.Green,
        });
        const startButtonText = new Label({
            text: 'Start Game',
            font: new Font({
                size: 50,
                color: Color.White,
                bold: true,
                family: 'Impact',
            }),
        });

        // Center the button text within the button
        startButtonText.anchor = new Vector(0.5, 0.5);
        startButton.addChild(startButtonText);

        // Add an event listener for the start button
        startButton.on('pointerup', () => {
            StartScreen.playerName = '';
            // Collect the player's name from the inputs
            for (let i = 0; i < this.inputs.length; i++) {
                StartScreen.playerName += this.inputs[i].alphabet[this.inputs[i].selectedLetter];
            }
            switch(StartScreen.selectedDifficulty)
            {
             case 0: 
             projectileSpawner.spawnInterval = 10;
             birdSpawner.spawnInterval = 20;
             
             break;
             case 1: 
             
             projectileSpawner.spawnInterval = 7.5;
             birdSpawner.spawnInterval = 15;

             break;
             case 2: 
             
            projectileSpawner.spawnInterval = 5;
            birdSpawner.spawnInterval = 10;

             break;
             default: 
             projectileSpawner.spawnInterval = 7.5;
             birdSpawner.spawnInterval = 15;
             break;
            }
            this.engine.goToScene('level');
        });

        // Add actors
        this.add(title);
        this.add(subtitle);
        this.add(subtitle2);
        this.add(subtitle3);
        this.add(startButton);
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Right)) {
            if (this.selectedLetterSlot < 6) {
                this.selectedLetterSlot++;
            }
            if (this.nameConfirmed && StartScreen.selectedDifficulty < 2) {
                StartScreen.selectedDifficulty++;
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.Left)) {
            if (this.selectedLetterSlot > 0) {
                this.selectedLetterSlot--;
            }
            if (this.nameConfirmed && StartScreen.selectedDifficulty > 0) {
                StartScreen.selectedDifficulty--;
            }
        }

        // Update difficulty selection colors
        this.difficultyActors.forEach((actor, index) => {
            if (index === StartScreen.selectedDifficulty) {
                actor.color = Color.Green;
            } else {
                actor.color = Color.Gray;
            }
        });

        if (this.selectedLetterSlot >= 4) {
            this.nameConfirmed = true;
        } else {
            this.nameConfirmed = false;
        }
    }
}
