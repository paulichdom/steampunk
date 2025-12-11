window.addEventListener('load', function () {
  // canvas setup
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  canvas.width = 500;
  canvas.height = 500;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', event => {
        const movementActionKeys =
          event.key === 'ArrowUp' ||
          event.key === 'ArrowDown';

        const shootActionKey = event.key === ' ';

        const isNotInTheArray = this.game.keys.indexOf(event.key) === -1

        if (movementActionKeys && isNotInTheArray) {
          this.game.keys.push(event.key)
        } else if (shootActionKey) {
          this.game.player.shootTop()
        }
      })

      window.addEventListener('keyup', event => {
        if (this.game.keys.indexOf(event.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(event.key), 1);
        }
      })
    }
  }

  class Projectile {
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

  class Particle {

  }

  class Player {
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

  class Enemy {

  }

  class Layer {

  }

  class Background {

  }

  class UI {

  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this)
      this.keys = [];
      this.ammo = 20;
    }

    update() {
      this.player.update()
    }

    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  // animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
})