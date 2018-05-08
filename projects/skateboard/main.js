var m; // Motorcycle

var g; // Gravity

var groundTexture;
var finish;
var terrain = [];
var terrainR = [];
var checkpoints = [];
var backgroundImgs = [];

var skateboardImg;

var cheats = false;

var cX = 2300;
var cY = 270;

var lastSave = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  createBackgroundImgs();

  m = new Moto();

  var gradHeight = 50;

  groundTexture = createImage(1, 2 * height);
  groundTexture.loadPixels();

  for (var y = 1; y <= 5; y++) {
      groundTexture.set(0, y, color(153));
  }
  for (var y = 6; y < groundTexture.height; y++) {
    groundTexture.set(0, y, color(187));
  }
  groundTexture.updatePixels();
  setTerrain();

  skateboardImg = createGraphics(109, 28);
  // Grip
  skateboardImg.strokeWeight(1);
  skateboardImg.stroke(0);
  skateboardImg.noFill();

  skateboardImg.line(0, 0, 9, 4);
  skateboardImg.line(10, 4, 98, 4);
  skateboardImg.line(99, 4, 108, 0);

  // Board
  skateboardImg.stroke(208, 164, 129);

  skateboardImg.point(1, 1);
  skateboardImg.line(2, 2, 9, 5);
  skateboardImg.line(10, 5, 98, 5);
  skateboardImg.line(99, 5, 107, 1);

  skateboardImg.stroke(237, 196, 168);

  skateboardImg.line(0, 1, 2, 3);
  skateboardImg.line(2, 3, 9, 6);
  skateboardImg.line(10, 6, 98, 6);
  skateboardImg.line(99, 6, 106, 3);
  skateboardImg.line(106, 3, 108, 1);

  finish = createGraphics(50, 2 * height);
  finish.background(0);
  finish.noStroke();
  finish.fill(255);
  var isWhite = true;
  for (var y = 0; y < finish.height / 10; y++) {
    for (var x = 0; x < finish.width / 10; x++) {
      if (isWhite) {
        finish.rect(x * 10, y * 10, 10, 10);
        isWhite = false;
      } else {
        isWhite = true;
      }
    }
  }

  sky = createGraphics(width, height);

  for (var y = 0; y < sky.height; y++) {
    r = map(y, 0, sky.height, 103, 175);
    g = map(y, 0, sky.height, 146, 199);
    b = map(y, 0, sky.height, 197, 223);

    sky.noFill();
    sky.stroke(r, g, b);

    sky.line(0, y, sky.width, y);
  }
}

function draw() {
  g = createVector(0, 0.05);
  background(0);

  translate(-m.p1.x + width / 2, -m.p1.y + height / 2);

  image(sky, m.p1.x - (width / 2), m.p1.y - (height / 2), width, height);

  var x = 0;
  for (var i = 0; i < backgroundImgs.length; i++) {
    x += backgroundImgs[i].width;

    if(terrain[x] > terrain[x + backgroundImgs[i].width]) {
      var y = terrain[x] - backgroundImgs[i].height;
    } else {
      var y = terrain[x + backgroundImgs[i].width] - backgroundImgs[i].height;
    }

    y += 53;
    if (x > (m.p1.x - (width * 0.55)) - backgroundImgs[i].width && x < (m.p1.x + (width * 0.55)) + backgroundImgs[i].width) {
      image(backgroundImgs[i], x, y);
    }
  }

  m.update();

  for (var x = 0; x < m.p1.x + (width * 0.55); x++) {
    if (x > m.p1.x - (width * 0.55)) {
      image(groundTexture, x, terrain[x]);
    }
  }

  for (var x = 0; x < m.p1.x + (width * 0.55); x++) {
    if (x > (m.p1.x - (width * 0.55)) - 100) {
      for (var i = 0; i < checkpoints.length; i++) {
        if (x == checkpoints[i][0]) {
          image(finish, x, checkpoints[i][1] + 1);

          if (m.p1.x > x) {
            lastSave = [x, checkpoints[i][1] + 15];
          }
        }
      }
    }
  }


  if (keyIsPressed) {
    if        (key == 'w') {
      cY -= 10;
    } else if (key == 'a') {
      cX -= 10;
    } else if (key == 's') {
      cY += 10;
    } else if (key == 'd') {
      cX += 10;
    }/* else if (key == '&') {
      cheats = true;            No cheats
    } else if (key == '*') {    for  you!
      cheats = false;
    } */
  }

  if (cheats) {
    m.p1.x = cX;
    m.p1.y = cY;
    m.v1.x = 0;
    m.v1.y = 0;
  } else {
    cX = m.p1.x;
    cY = m.p1.y;
  }

  if (frameCount % 60 == 0) {
    var fr = frameRate();
    print("Framerate: " + floor(fr));
  }
}
