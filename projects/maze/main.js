var cols, rows;
var scl = 40;
var grid = [];

var current;

var stack = [];

var saved = false;
var done = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(windowWidth / scl);
  rows = floor(height / scl);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var cell = new Cell(x, y);
      grid.push(cell);
    }
  }

  current = grid[0];

}

function draw() {
  background(255);
  strokeWeight(2);

  if (windowWidth - (cols * scl) > 0) {
    translate((windowWidth - (cols * scl)) / 2, 0);
  }

  for (var index = 0; index < grid.length; index++) {
    grid[index].show();
  }

  current.visited = true;
  if (stack[0]) {
    current.highlight();
  }

  /////////////////////////////////////////////////////////////
  // For steps, go to:                                       //
  // https://en.wikipedia.org/wiki/Maze_generation_algorithm //
  // ... and look for "Recursive backtracker"                //
  /////////////////////////////////////////////////////////////

  // STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // Step 2
    stack.push(current);

    // Step 3
    removeWalls(current, next);

    // Step 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  if (saved === false && !stack[0]) {
    done = true;

    if (frameCount % 2 === 0){
      frameRate(2);
      fill(0);
      textSize(height / 5);
      textAlign(CENTER, CENTER);
      text("Press 's' to save!", 0, 0, width, height);
    }
  } else if (saved === true) {
    fill(0);
    textSize(height / 5);
    textAlign(CENTER, CENTER);
    text("Your maze is saved.", 0, 0, width, height);
  }
}

function index(x, y) {
  if (x < 0 || y < 0 || x > cols-1 || y > rows-1) {
    return -1;
  }
  return x + y * cols;
}

function removeWalls(current, next) {
  var x = current.x - next.x;
  if (x === 1) {
    current.walls[3] = false;
    next.walls[1] = false;
  } else if (x === -1) {
    current.walls[1] = false;
    next.walls[3] = false;
  }
  var y = current.y - next.y;
  if (y === 1) {
    current.walls[0] = false;
    next.walls[2] = false;
  } else if (y === -1) {
    current.walls[2] = false;
    next.walls[0] = false;
  }
}

function keyPressed() {
  if (saved == false && !stack[0] && done == true) {
    if (key === 's' || key === 'S') {
      var dateAndTime = month() + '/' + day() + '/' + year();
      print(dateAndTime);

      saveMaze(dateAndTime);
    }
  }
}

function saveMaze(dateAndTime) {
  background(255);
  strokeWeight(2);

  resizeCanvas(cols * scl, rows * scl);

  for (var index = 0; index < grid.length; index++) {
    grid[index].show();
  }

  saveCanvas('Maze_From' + dateAndTime, 'png');

  saved = true;
}

function windowResized() {
  if (windowWidth > cols * scl) {
    resizeCanvas(windowWidth, height);
  }
}
