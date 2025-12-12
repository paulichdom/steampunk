import { Player } from "./entities/Player.js";
import { InputHandler } from "./entities/InputHandler.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this)
    this.keys = [];
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 500;
  }

  update(deltaTime) {
    this.player.update()

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
  }

  draw(context) {
    this.player.draw(context);
  }
}