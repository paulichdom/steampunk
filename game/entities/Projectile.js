  export class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 3;
      this.markedForDeletion = false;
    }

    update() {
      this.x += this.speed;

      const isXCoord80pctGameWidth = this.x > this.game.width * 0.8
      if (isXCoord80pctGameWidth) this.markedForDeletion = true;
    }

    draw(context) {
      context.fillStyle = 'yellow';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }