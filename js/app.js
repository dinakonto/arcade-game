class Enemy {
  constructor() { // Variables applied to each enemy
    this.sprite = 'images/enemy-bug.png';
    this.x = -120; // Position off-screen to the left - make random
    this.yArr = [55, 135, 220]; // One for each row
    this.y = 55; // Choose one from the array at random
    this.speed = 50; // Variable speed, at random
  }
  update(dt) { // Move the enemy along the x axis
    this.x += (this.speed * dt); // Multiply by dt to run same speed on all computers
  }
  render() { // Draw the enemy on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Player class
class Player {
  constructor() {
    this.x = 201;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
  }
  update() {

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(k) {
    const move = 40;
    switch (k) {
      case 'left':
        console.log('Pressed left');
        this.x -= move;
        break;
      case 'up':
        console.log('Pressed up');
        this.y -= move;
        break;
      case 'right':
        console.log('Pressed right');
        this.x += move;
        break;
      case 'down':
        console.log('Pressed down');
        this.y += move;
        break;
    }
  }
};

// Instantiate the player and 3 enemies
const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Player();

// Listen for key presses and send the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
