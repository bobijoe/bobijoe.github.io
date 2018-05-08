function Cell(x, y) {
  this.x = x;
  this.y = y;

  this.walls = [true, true, true, true];

  this.visited = false;


  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(x, y - 1)];
    var right  = grid[index(x + 1, y)];
    var bottom = grid[index(x, y + 1)];
    var left   = grid[index(x - 1, y)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }

  }
  this.highlight = function() {
    var x = this.x * scl;
    var y = this.y * scl;
    noStroke();
    fill(51, 150);
    rect(x, y, scl, scl);

  }

  this.show = function() {
    var x = this.x * scl;
    var y = this.y * scl;

    if (this.visited) {
      fill(255);
    } else {
      fill(51);
    }
    noStroke();
    rect(x, y, scl, scl);


    stroke(0);
    if (this.walls[0]) {
      line(x, y, x + scl, y);
    }
    if (this.walls[1]) {
      line(x + scl, y, x + scl, y + scl);
    }
    if (this.walls[2]) {
      line(x + scl, y + scl, x, y + scl);
    }
    if (this.walls[3]) {
      line(x, y + scl, x, y);
    }
  }
}
