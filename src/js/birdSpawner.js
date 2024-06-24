import { Actor, Vector } from "excalibur";
import { Bird } from "./bird";
import { Player } from "./player";

export class birdSpawner extends Actor {
    static spawnInterval = 10
    timeSinceLastSpawn = 0;
    Xoffset = 1800
    Yoffset = -1600
    minX = 0
    maxX = 0

    constructor() {
        super();
    }
    onPreUpdate(_engine, _delta) {
        this.timeSinceLastSpawn += _delta * 0.01;
        if (this.timeSinceLastSpawn >= birdSpawner.spawnInterval && Player.playerVel.y <= 400) {
            this.SpawnBird();
        }
    }
    SpawnBird() {
        let xp = this.Xoffset;
        let yp = (Math.random() * 1) * this.Yoffset + Player.playerPos.y;
        let proj = new Bird(new Vector(xp, yp),Math.sign(Math.random()*2-1));
        this.scene.add(proj);
        this.timeSinceLastSpawn = 0;
    }
}