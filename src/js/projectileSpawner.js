import { Actor, Vector } from "excalibur";
import { Projectile } from "./projectile";
import { Player } from "./player";
import { cameraFollow } from "./cameraFollow";
export class projectileSpawner extends Actor
{
    static spawnInterval=5
    timeSinceLastSpawn=0;
    Xoffset = 400
    Yoffset = -1200
    minX = 0
    maxX = 0
    
    constructor()
    {
        super();
    }
    onPreUpdate(_engine,_delta)
    {
        this.timeSinceLastSpawn+=_delta*0.01;
        if(this.timeSinceLastSpawn>=projectileSpawner.spawnInterval && Player.playerVel.y<=200)
            {
                this.SpawnProjectile();
            }
    }
    SpawnProjectile()
    {
        let xp = (Math.random()*2-1)*this.Xoffset+Player.playerPos.x;
        let yp = this.Yoffset + cameraFollow.camPos.y;
        let proj = new Projectile(new Vector(xp,yp));
        this.scene.add(proj);
        this.timeSinceLastSpawn = 0;
    }
}