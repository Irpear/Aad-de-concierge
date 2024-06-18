import { Actor, Vector } from "excalibur";
import { Projectile } from "./projectile";
import { Player } from "./player";

export class birdSpawner extends Actor {
    spawnInterval = 10
    timeSinceLastSpawn = 0;
    Xoffset = -1000
    Yoffset = 400
    minX = 0
    maxX = 0

    constructor() {
        super();
    }
    onPreUpdate(_engine, _delta) {
        this.timeSinceLastSpawn += _delta * 0.01;
        if (this.timeSinceLastSpawn >= this.spawnInterval && Player.playerVel.y <= 200) {
            this.SpawnProjectile();
        }
    }
    SpawnProjectile() {
        let xp = (Math.random() * 2 - 1) * this.Xoffset + Player.playerPos.x;
        let yp = this.Yoffset + Player.playerPos.y;
        let proj = new Projectile(new Vector(xp, yp));
        this.scene.add(proj);
        this.timeSinceLastSpawn = 0;
    }
}