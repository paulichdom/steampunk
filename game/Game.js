import { Player } from "./entities/Player.js";
import { InputHandler } from "./entities/InputHandler.js";
import { UI } from "./entities/UI.js";
import { Angler1 } from "./entities/enemies/Angler1.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this)
    this.ui = new UI(this)
    this.keys = [];
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 500;
    this.gameOver = false;
  }

  update(deltaTime) {
    this.player.update()

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.enemies.forEach(enemy => {
      enemy.update();
    })

    this.enemies.filter(enemy => !enemy.markedForDeletion);
    const shouldAddEnemy = (this.enemyTimer > this.enemyInterval) && !this.gameOver;

    if (shouldAddEnemy) {
      this.addEnemy()
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  draw(context) {
    this.player.draw(context);
    this.ui.draw(context);
    this.enemies.forEach(enemy => {
      enemy.draw(context);
    })
  }

  addEnemy() {
    this.enemies.push(new Angler1(this));
  }
}