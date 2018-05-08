var fireworks = [];

var gravity; // Has to be defined in setup

function setup() {
  gravity = createVector(0, 0.2);

  createCanvas(windowWidth, 1080, P2D);
  colorMode(HSB, 255, 255, 255, 255);

  frameRate(40);

  noStroke();
  fill(0);
  rect(0, 0, width, height);
}

function draw() {
  background(0, 0, 10, 100);

  // Create fireworks
  if (random(1) < 0.15) { // 15% chance of firework being created every frame.
    fireworks.push(new Firework);
  }


  for (var i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].lifespan < 0) {
      fireworks.splice(i, 1);
    }

  }

  print(fireworks.length + " Fireworks");

}

function windowResized() {
  resizeCanvas(windowWidth, height);

  noStroke();
  fill(0);
  rect(0, 0, width, height);
}
