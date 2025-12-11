  export class InputHandler {
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