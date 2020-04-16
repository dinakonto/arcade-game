/*
 * FUNCTIONS
 */

// Random number function
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Reset score and lives
function resetGame() {
  myScore.init();
  lives.push(new Life(1), new Life(2), new Life(3));
  let gameOverScreen = document.querySelector('#game-over');
  gameOverScreen.style.display = "none";
}

// Player loses all three lives
function loseGame() {
  let gameOverScreen = document.querySelector('#game-over');
  let finalScoreArea = document.querySelector('#final-score');
  let finalScore = myScore.final();
  let playAgainBtn = document.querySelector('#play-again-btn');
  gameOverScreen.style.display = "flex";
  finalScoreArea.innerText = finalScore;
  playAgainBtn.addEventListener('click', function() {resetGame()});
}

// When player makes it to the top
function winLevel() {
  player.reset();
  gem.reset();
  myScore.update(100);
}

/*
 * CLASSES
 */

// Lives class
class Life {
  constructor(n) {
    this.sprite = 'images/Heart.png';
    this.x = 385 + (n*30);
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, 10, 26, 40);
  }
}

// Gems class
class Gem {
  constructor() {
    this.sprite = 'images/Gem Blue.png';
    this.reset();
  }
  collect() {
    this.x = -100;
    this.y = -100;
    myScore.update(50);
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  reset() {
    this.xArr = [0, 100, 200, 300, 400]; // One for each column
    this.x = this.xArr[randomNum(0, 5)]; // Choose one from the array at random
    this.yArr = [60, 140, 220]; // One for each row
    this.y = this.yArr[randomNum(0, 3)]; // Choose one from the array at random
  }
}

// Enemy class
class Enemy {
  constructor() { // Variables applied to each instance
    this.sprite = 'images/enemy-bug.png';
    this.x = (-100 - randomNum(10, 50)); // Position off-screen at random distance to the left
    this.yArr = [60, 140, 220]; // One for each row
    this.y = this.yArr[randomNum(0, 3)]; // Choose one from the array at random
    this.speed = randomNum(50, 400); // Random speed
  }
  update(dt) { // Move the enemy along the x axis
    this.x += (this.speed * dt);
    if (player.x + 60 > this.x && // IF player collides with an enemy
      player.x < this.x + 60 &&
      player.y + 60 > this.y &&
      player.y < this.y + 60) {
        player.reset();
        lives.pop(); // Minus one life
        if (lives.length === 0) { // No lives left
          loseGame();
        }
    } else if (this.x > 505) { // Once enemy reaches the right, restart from left
      this.x = -100;
      this.y = this.yArr[randomNum(0, 3)];
      this.speed = randomNum(50, 400);
    }
  }
  render() { // Draw the enemy on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

};

// Player class
class Player {
  constructor() { // Variables applied to each instance
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-cat-girl.png';
  }
  reset() {
    player.x = 200;
    player.y = 380;
  }
  update() {
    if (this.x + 60 > gem.x && // IF player collects a gem
      this.x < gem.x + 60 &&
      this.y + 60 > gem.y &&
      this.y < gem.y + 60) {
        gem.collect();
      }
  }
  render() { // Draw the player on screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(k) { // k = key pressed
    switch (k) {
      case 'left':
        if (this.x > 20) {
          this.x -= 100;
          break;
        } else {
          break;
        }
      case 'up':
        if (this.y > 100) {
          this.y -= 80;
          break;
        } else if (this.y < 100) { // Get to the top
          winLevel();
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

/*
 * INSTANTIATE ELEMENTS
 */

// Instantiate elements
const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Player();
const lives = [new Life(1), new Life(2), new Life(3)];
const gem = new Gem();

// Keep score
const myScore = function() {
  let scoreText = `Score: `;
  let score = 0;
  return {
    init: function() {
      score = 0;
      return scoreText + score;
    },
    update: function(n) {
      score += n;
      return scoreText + score;
    },
    render: function() {
      ctx.font = "20px Courier New";
      ctx.fillText(scoreText + score, 0, 40);
    },
    final: function() {
      return score;
    }
  }
}();

/*
 * LISTENERS
 */

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
