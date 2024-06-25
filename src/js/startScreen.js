import { Actor, Axes, Buttons, Color, Font, Keys, Label, Scene, Timer, Vector } from "excalibur";
import { NameInput } from "./nameInput";
import { projectileSpawner } from "./projectileSpawner";
import { birdSpawner } from "./birdSpawner";
import { Player } from "./player";
import { Endscene } from "./endScene";
import { Game } from "./game";
import { Resources } from "./resources";

export class StartScreen extends Scene {
    game;
    inputs = [];
    static selectedDifficulty = -1;
    static playerName;
    selectedLetterSlot = 0;
    difficultyActors = [];
    difficultyConfirmed = false;
    blinkTimer;
    gpadX = 0
    gpadY = 0
    bpress = false
    stickMovedX = false
    stickMovedY = false

    onInitialize() {

        this.blinkTimer = new Timer({
            fcn: () => this.blinkingHandler(),
            repeats: true,
            interval: 750,
        })
        this.add(this.blinkTimer)

        const title = new Label({
            text: 'I Mast Ascend',
            pos: new Vector(this.engine.drawWidth / 2, 100),
            font: new Font({
                family: 'impact',
                color: Color.Yellow,
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
            text: 'Enter your name & select difficulty',
            pos: new Vector(this.engine.drawWidth / 2, 300),
            font: new Font({
                size: 30,
                color: Color.White,
                family: 'Impact',
            }),

        });
        subtitle2.anchor = new Vector(0.5, 0.5);

        const subtitle3 = new Label({
            text: '(Move the joystick or use the arrow keys to select and confirm name & difficulty)',
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
            color: Color.Gray,
        });
        const startButtonText = new Label({
            text: 'Start Game',
            font: new Font({
                size: 50,
                color: Color.White,
                bold: false,
                family: 'Impact',
            }),
        });

        startButton.addTag("startButton")
        startButtonText.anchor = new Vector(0.5, 0.5);
        startButton.addChild(startButtonText);

        // Add actors
        this.add(title);
        this.add(subtitle);
        this.add(subtitle2);
        this.add(subtitle3);
        this.add(startButton);
    }
    onPreUpdate(engine) {
        if (Game.gpad != null) {
            this.gpadX = Game.gpad.getAxes(Axes.LeftStickX);
            this.gpadY = Game.gpad.getAxes(Axes.LeftStickY);
            this.bpress = Game.gpad.isButtonPressed(Buttons.Face1);
        }
        if (engine.input.keyboard.wasPressed(Keys.Right) || this.gpadX > 0 && this.stickMovedX === false) {
            if (this.selectedLetterSlot < 6 && !this.difficultyConfirmed) {
                this.selectedLetterSlot++;
            }
            if (this.nameConfirmed && StartScreen.selectedDifficulty < 2 && !this.difficultyConfirmed) {
                StartScreen.selectedDifficulty++;
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.Left) || this.gpadX < 0 && this.stickMovedX === false) {
            if (this.selectedLetterSlot > 0 && !this.difficultyConfirmed) {
                this.selectedLetterSlot--;
            }
            if (this.nameConfirmed && StartScreen.selectedDifficulty > 0 && !this.difficultyConfirmed) {
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
            if (StartScreen.selectedDifficulty === -1) {
                StartScreen.selectedDifficulty = 0
            }
        } else {
            this.nameConfirmed = false;
            StartScreen.selectedDifficulty = -1
        }

        if (engine.input.keyboard.wasPressed(Keys.Down) || this.gpadY > 0 && this.stickMovedY === false) {
            if (StartScreen.selectedDifficulty >= 0) {
                const startButton = this.actors.find(actor => actor.hasTag('startButton'));
                startButton.color = Color.Green
                if (!this.helpTextAdded) {
                    // Create and configure helping text
                    const startHelpText = new Label({
                        font: new Font({
                            size: 40,
                            color: Color.White,
                        }),
                        pos: new Vector(this.engine.drawWidth / 2, 730),
                    });
                    startHelpText.addTag("startHelpText")
                    startHelpText.anchor = new Vector(0.5, 0.5)

                    this.add(startHelpText)
                    this.helpTextAdded = true;
                }

                const startHelpText = this.actors.find(actor => actor.hasTag('startHelpText'));
                if (!this.difficultyConfirmed) {
                    startHelpText.text = '🇵​​​​​🇷​​​​​🇪​​​​​🇸​​​​​🇸​​​​​ 🇧​​​​​🇺​​​​​🇹​​​​​🇹​​​​​🇴​​​​​🇳​​​​​-𝟭 🇴​​​​​🇷​​​​​ 🇪​​​​​🇳​​​​​🇹​​​​​🇪​​​​​🇷​​​​​ 🇹​​​​​🇴​​​​​ 🇸​​​​​🇹​​​​​🇦​​​​​🇷​​​​​🇹​​​​​​'
                }
                this.difficultyConfirmed = true;
                this.blinkTimer.start()

            }
        }
        if (engine.input.keyboard.wasPressed(Keys.Up) || this.gpadY < 0 && this.stickMovedY === false && this.difficultyConfirmed === true) {
            const startHelpText = this.actors.find(actor => actor.hasTag('startHelpText'));
            if (startHelpText) {
                this.difficultyConfirmed = false
                this.blinkTimer.stop()
                startHelpText.text = ""
                const startButton = this.actors.find(actor => actor.hasTag('startButton'));
                startButton.color = Color.Gray
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.Enter) && this.difficultyConfirmed === true || this.bpress && this.difficultyConfirmed === true) {
            this.startGame();
        }

        if (this.gpadX != 0) {
            this.stickMovedX = true;
        } else {
            this.stickMovedX = false;
        }
        if (this.gpadY != 0) {
            this.stickMovedY = true;
        } else {
            this.stickMovedY = false;
        }
    }
    blinkingHandler() {
        const startHelpText = this.actors.find(actor => actor.hasTag('startHelpText'));
        if (startHelpText && startHelpText.text != "") {
            startHelpText.text = ""
        } else if (startHelpText && startHelpText.text === "") {
            startHelpText.text = '🇵​​​​​🇷​​​​​🇪​​​​​🇸​​​​​🇸​​​​​ 🇧​​​​​🇺​​​​​🇹​​​​​🇹​​​​​🇴​​​​​🇳​​​-𝟭 🇴​​​​​🇷​​​​​ 🇪​​​​​🇳​​​​​🇹​​​​​🇪​​​​​🇷​​​​​ 🇹​​​​​🇴​​​​​ 🇸​​​​​🇹​​​​​🇦​​​​​🇷​​​​​🇹​​​​​​​​​​'
        }
    }
    // startGame() {
    //     StartScreen.playerName = '';
    //     // Collect the player's name from the inputs
    //     for (let i = 0; i < this.inputs.length; i++) {
    //         StartScreen.playerName += this.inputs[i].alphabet[this.inputs[i].selectedLetter];
    //     }
    //     switch (StartScreen.selectedDifficulty) {
    //         case 0:
    //             Endscene.difficultyString = "Easy"
    //             projectileSpawner.spawnInterval = 10;
    //             birdSpawner.spawnInterval = 20;

    //             break;
    //         case 1:
    //             Endscene.difficultyString = "Normal"
    //             projectileSpawner.spawnInterval = 7.5;
    //             birdSpawner.spawnInterval = 15;

    //             break;
    //         case 2:
    //             Endscene.difficultyString = "Hard"
    //             projectileSpawner.spawnInterval = 5;
    //             birdSpawner.spawnInterval = 10;

    //             break;
    //         default:
    //             Endscene.difficultyString = "Normal"
    //             projectileSpawner.spawnInterval = 7.5;
    //             birdSpawner.spawnInterval = 15;
    //             break;
    //     }
    //     switch (StartScreen.playerName) {
    //         default:
    //             Player.isGoku = false;
    //             Endscene.modeString = "";
    //             this.engine.goToScene('level');
    //             break;
    //         case "GOKU":
    //             Endscene.modeString = "Goku-mode";
    //             Player.isGoku = true;
    //             this.engine.goToScene('level');
    //             break;
    //     }

    // }
    startGame() {
        StartScreen.playerName = '';
        // Collect the player's name from the inputs
        for (let i = 0; i < this.inputs.length; i++) {
            StartScreen.playerName += this.inputs[i].alphabet[this.inputs[i].selectedLetter];
        }
        switch (StartScreen.selectedDifficulty) {
            case 0:
                Endscene.difficultyString = "Easy"
                projectileSpawner.spawnInterval = 12.5;
                birdSpawner.spawnInterval = 22.5;

                break;
            case 1:
                Endscene.difficultyString = "Normal"
                projectileSpawner.spawnInterval = 9;
                birdSpawner.spawnInterval = 17.5;

                break;
            case 2:
                Endscene.difficultyString = "Hard"
                projectileSpawner.spawnInterval = 6;
                birdSpawner.spawnInterval = 11;

                break;
            default:
                Endscene.difficultyString = "Normal"
                projectileSpawner.spawnInterval = 9;
                birdSpawner.spawnInterval = 17.5;
                break;
        }
        switch (StartScreen.playerName) {
            default:
                Player.isGoku = false;
                Endscene.modeString = "";
                this.engine.goToScene('level');
                break;
            case "GOKU":
                Endscene.modeString = "Goku-mode";
                Player.isGoku = true;
                this.engine.goToScene('level');
                break;
        }

    }

}
