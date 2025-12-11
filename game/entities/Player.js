 import { Projectile } from "./Projectile.js";

 export class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.speedY = 0;
      this.maxSpeed = 3;
      this.projectiles = [];
    }

    update() {
      const goUp = this.game.keys.includes('ArrowUp');
      const goDown = this.game.keys.includes('ArrowDown');

      if (goUp) this.speedY = -this.maxSpeed;
      else if (goDown) this.speedY = this.maxSpeed;
      else this.speedY = 0;

      this.y += this.speedY;

      // handle projectiles
      this.projectiles.forEach(projectile => {
        projectile.update()
      })

      this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
    }

    draw(context) {
      context.fillStyle = 'black';
      context.fillRect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach(projectile => {
        projectile.draw(context)
      })
    }

    shootTop() {
      const hasAmmo = this.game.ammo > 0

      if (hasAmmo) {
        this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
        this.game.ammo--;
      }
    }
  }