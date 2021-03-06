// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dotsTotal = 240;
var ghostScore = 200;
var ghostsEaten = 0;
var level = 1;
var fruit = {name: 'Cherry', points: 100, notEaten: true};
var unlockPoint = Infinity;

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde];

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayPowerPellets();
    displayDotsLeft();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '     Level: ' + level);
}

function displayPowerPellets() {
  console.log('\nPower-Pellets: ' + powerPellets);
}

function displayDotsLeft() {
  console.log('\nDots: ' + dotsTotal);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if ((240 - dotsTotal) > unlockPoint) {
    console.log('(f) Eat ' + fruit.name + ' / '+ fruit.points + ' points');
  }
  if (dotsTotal >= 10) {
    console.log('(d) Eat 10 Dots');
  }
  if (dotsTotal >= 100) {
    console.log('(D) Eat 100 Dots');
  }
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  console.log('(1) Eat Inky (' + displayEdible(inky.edible) + ')');
  console.log('(2) Eat Blinky (' + displayEdible(blinky.edible) + ')');
  console.log('(3) Eat Pinky (' + displayEdible(pinky.edible) + ')');
  console.log('(4) Eat Clyde (' + displayEdible(clyde.edible) + ')');
  console.log('(q) Quit');
}

function displayEdible(edibleness) {
  if (edibleness) {
    return 'edible'
  } else {
    return 'inedible'
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot(dots) {
  if (dotsTotal >= dots) {
    console.log('\nChomp! Eats ' + dots + ' dots.');
    dotsTotal -= dots;
    score += dots;
  } else{
    console.log('\nNot enough dots left to eat.')
  }
}

function eatGhost(ghost) {
  if (ghost.edible) {
    console.log('\nNom! Eats ' + ghost.character + ' ' + ghost.name + '.');
    checkGhostsEaten();
    score += ghostScore;
    ghostsEaten++;
    ghost.edible = false;
  } else {
    lives--;
    console.log('\n' + ghost.colour + ' ' + ghost.name + ' kills Pac-Man!')
    checkLives();
  }
}

function checkLives() {
  if (lives <= 0) {
    process.exit();
  }
}

function checkGhostsEaten() {
  if (ghostsEaten === 1) {
    ghostScore = 400;
  } else if (ghostsEaten === 2) {
    ghostScore = 800;
  } else if (ghostsEaten === 3) {
    ghostScore = 1600;
  }
}

function eatPowerPellet() {
  var canEat = true;
  for (var ghost of ghosts) {
    if (ghost.edible){
      canEat = false;
    }
  }
  if (canEat) {
    if (powerPellets > 0) {
      console.log('\nChomp! Eats 1 Power-Pellet.');
      powerPellets--;
      for (var ghost of ghosts) {
        ghost.edible = true;
      }
      score += 50;
      setTimeout(function() {
        for (var ghost of ghosts) {
          ghost.edible = false;
        }
        drawScreen();
      }, 10000);
    } else {
      console.log('\nNo more Power-Pellet left!');
    }
  } else{
    console.log('\nNot yet! Edible ghosts are here.');
  }
}

function checkLevel() {
  if (powerPellets <= 0 && dotsTotal <= 0) {
    level++;
    if (level === 2){
      fruit.name = 'Strawberry';
      fruit.points = 300;
      fruit.notEaten = true;
    } else if (level >= 3 && level <= 4) {
      fruit.name = 'Orange';
      fruit.points = 500;
      fruit.notEaten = true;
    } else if (level >= 5 && level <= 6) {
      fruit.name = 'Apple';
      fruit.points = 700;
      fruit.notEaten = true;
    } else if (level >= 7 && level <= 8) {
      fruit.name = 'Pineapple';
      fruit.points = 1000;
      fruit.notEaten = true;
    } else if (level >= 9 && level <= 10) {
      fruit.name = 'Galaxian Spaceship';
      fruit.points = 2000;
      fruit.notEaten = true;
    } else if (level >= 11 && level <= 12) {
      fruit.name = 'Bell';
      fruit.points = 3000;
      fruit.notEaten = true;
    } else if (level >= 13) {
      fruit.name = 'Key';
      fruit.points = 5000;
      fruit.notEaten = true;
    }

    setFruitUnlockPoint();
    powerPellets = 4;
    dotsTotal = 240;
    for (var ghost of ghosts) {
      ghost.edible = false;
    }
  }

  if (level === 1 && fruit.notEaten) {
    setFruitUnlockPoint();
  }
}

function setFruitUnlockPoint() {
  unlockPoint = Math.floor(Math.random() * (240 - 10 + 1)) + 10;
}

function eatFruit() {
  score += fruit.points;
  console.log('\nChomp! Eats ' + fruit.name + ' for ' + fruit.points + ' points!');
  unlockPoint = Infinity;
  fruit.notEaten = false;
}



// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'd':
      eatDot(10);
      break;
    case 'D':
      eatDot(100);
      break;
    case 'f':
      if ((240 - dotsTotal) > unlockPoint) {
        eatFruit();
      } else {
        console.log('\nInvalid Command!');
      }
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  checkLevel();
  setTimeout(drawScreen, 600); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  clearScreen();
  displayStats();
  displayPowerPellets();
  displayDotsLeft();
  displayMenu();
  displayPrompt();
  console.log('\n\nGame Over!\n');
});
