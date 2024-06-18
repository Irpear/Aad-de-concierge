import { Actor, Vector } from "excalibur";
import { Bird } from "./bird";
import { Player } from "./player";

export class birdSpawner extends Actor {
    spawnInterval = 10
    timeSinceLastSpawn = 0;
    Xoffset = 1800
    Yoffset = -600
    minX = 0
    maxX = 0

    constructor() {
        super();
    }
    onPreUpdate(_engine, _delta) {
        this.timeSinceLastSpawn += _delta * 0.01;
        if (this.timeSinceLastSpawn >= this.spawnInterval && Player.playerVel.y <= 200) {
            this.SpawnBird();
        }
    }
    SpawnBird() {
        let xp = this.Xoffset;
        let yp = (Math.random() * 1) * this.Yoffset + Player.playerPos.y;
        let proj = new Bird(new Vector(xp, yp));
        this.scene.add(proj);
        this.timeSinceLastSpawn = 0;
    }
}