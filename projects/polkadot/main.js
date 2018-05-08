var dots = [];

var p;
var start = 20;
var score = start;
var high = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);

  p = new Player;
}

function draw() {
  background(222, 25, 21);

  p.update();
  p.show();

  for (var i = dots.length - 1; i >= 0; i--) {
    dots[i].update();
    dots[i].show();

    var r = dots[i].size / 2;

    var dX = dots[i].pos.x;
    var dY = dots[i].pos.y;

    var d = false;

    if(dX + r < 0) {
      d = true;
    }
    if(dX - r > width) {
      d = true;
    }

    if(dY + r < 0) {
      d = true;
    }
    if(dY - r > height) {
      d = true;
    }

    var pX = p.pos.x;
    var pY = p.pos.y;

    if ((dist(pX, pY, dX, dY) - score / 2) - dots[i].size / 2 <= 0) {
      if (dots[i].size == dots[i].size_) {
        if (dots[i].size < score) {
          score += sqrt(dots[i].size / PI);
          d = true;
        } else {
          if (score - start > high) {
            high = score - start;
          }
          score = start;
        }
      }
    }

    if (d) {
      dots.splice(i, 1);
    }
  }


  var a = 0;
  for (var i = 0; i < dots.length; i++) {
    a += PI * pow(dots[i].size_ / 2, 2);
  }
  a += PI * pow(score / 2, 2);

  if(a < 0.25 * width * height) {
    dots.push(new Dot);
  }

  var size = height / 50

  textSize(size);
  textAlign(RIGHT, CENTER);
  fill(0, 0, 255);
  text("Best: " + floor(high), 0, 0, width, size + 2);
  textAlign(LEFT, CENTER);
  text("Current: " + floor(score - 20), 0, 0, width, size + 2)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
