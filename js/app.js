// Random number function
function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

class Enemy {
  constructor() { // Variables applied to each instance
    this.sprite = 'images/enemy-bug.png';
    this.x = (-100 - randomNum(10, 50)); // Position off-screen to the left - make random
    this.yArr = [55, 135, 220]; // One for each row
    this.y = this.yArr[Math.floor(randomNum(1, 3))]; // Choose one from the array at random
    this.speed = randomNum(100, 400); // Variable speed, at random
  }
  update(dt) { // Move the enemy along the x axis
    this.x += (this.speed * dt); // Multiply by dt to run same speed on all computers
    if (this.x > 505) { // Once it reaches the end, reset it
      this.x = -100;
      this.speed = randomNum(100, 400);
      this.y = this.yArr[Math.floor(randomNum(1, 3))];
    }
  }
  render() { // Draw the enemy on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Player class
class Player {
  constructor() { // Variables applied to each instance
    this.x = 201;
    this.y = 380;
    this.sprite = 'images/char-boy.png';
  }
  update() {
    // No code needed here
  }
  render() { // Draw the player on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(k) { // k = key pressed
    switch (k) {
      case 'left':
        if (this.x > 20) {
          this.x -= 101;
          break;
        } else {
          break;
        }
      case 'up':
        if (this.y > 100) {
          this.y -= 82;
          break;
        } else if (this.y < 100) { // Get to the top
          console.log('You win');
          this.x = 101;
          this.y = 380;
        } else {
          break;
        }
      case 'right':
        if (this.x < 401) {
          this.x += 101;
          break;
        } else {
          break;
      }
      case 'down':
        if (this.y < 380) {
          this.y += 82;
          break;
        } else {
          break;
        }
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
