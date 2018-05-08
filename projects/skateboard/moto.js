function Moto() {
  this.wDist = 50;
  this.p1 = createVector(1020, 270);
  this.p2 = createVector(this.p1.x + this.wDist, 270);

  this.v1 = createVector(2, 0);
  this.v2 = createVector(0.4, 0);

  this.vLim = 5

  this.a1 = createVector(0, 0);
  this.a2 = createVector(0, 0);

  this.COR1 = 0.1;
  this.COR2 = 0.3;

  this.r = 10;

  this.friction = 0.6;

  this.wSep = 40;

  this.applyForce = function(force, wheel) {
    if (wheel == 1) {
      this.a1.add(force);
    } else if (wheel == 2) {
      this.a2.add(force);
    }

  }

  this.update = function() {
    this.applyForce(g, 1);
    this.applyForce(g, 2);

    this.v1.add(this.a1);
    this.a1.mult(0);
    this.v2.add(this.a2);
    this.a2.mult(0);

    this.p1.add(this.v1);
    this.p2.add(this.v2);

    this.collide();

    this.bodge(); // Fix bugs manually

    this.suspension();

    this.show();

    this.genTerrain();
  }

  this.collide = function() {
    var x = this.p1.x;
    var y = this.p1.y;
    var r = this.r;
    var d = this.r * 2;
    for (var i = floor(x - d); i < x + d; i++) {
      if (dist(x, y, i, terrain[i]) < r) {
        var acc = p5.Vector.fromAngle(terrainR[i] - PI / 2);
        acc.setMag(g.mag() + this.v1.y * this.COR1);
        this.applyForce(acc, 1);

        i = x + d;

        var f = p5.Vector.fromAngle(terrainR[i]);
        f.setMag(((this.friction * g.y) / this.r) * 3);

        this.applyForce(f, 1);

        this.move();

        if (this.p2.x < this.p1.x) {
          this.p1.x = lastSave[0];
          this.p1.y = lastSave[1];

          this.v1.x = 0;
          this.v1.y = 0;
        }
      } else {
        var temp_ = false;
      }
    }

    x = this.p2.x;
    y = this.p2.y;
    for (var i = floor(x - d); i < x + d; i++) {
      if (dist(x, y, i, terrain[i]) < r) {
        var acc = p5.Vector.fromAngle(terrainR[i] - PI / 2);
        acc.setMag(g.mag() + this.v2.y * this.COR2);
        this.applyForce(acc, 2);

        i = x + d;

        var f = p5.Vector.fromAngle(terrainR[i]);
        f.setMag(((this.friction * g.y) / this.r) * 3);

        this.applyForce(f, 2);
      } else if (temp_ == false){
        this.flip();
      }
    }
  }

  this.move = function() {
    if (keyIsPressed === true) {
      var force;
      if        (key == 'w' || key == 'W') {
        if (this.v1.x < this.vLim) {
          force = createVector(1, 0);
          force.setMag(0.06);
        }
      } else if (key == 's' || key == 'S') {
        force = createVector(-1, 0)

        var magnitude = this.v1.mag();
        if (magnitude > 0.06) {
          magnitude = 0.06;
        }
        force.setMag(magnitude);
      }

      this.applyForce(force, 1);
    }
  }

  this.flip = function() {
    var x = this.p1.x;
    var y = this.p1.y;

    var x2 = this.p2.x;
    var y2 = this.p2.y;

    var a = atan2(y2 - y, x2 - x);

    if (keyIsPressed) {
      if (key == 'a' || key == 'A') {
        var a_ = a - HALF_PI;
      } else if (key == 'd' || key == 'D') {
        var a_ = a + HALF_PI;
      }

      var force = p5.Vector.fromAngle(a_);
      force.setMag(0.03);
      this.applyForce(force, 2);
    }
  }

  this.suspension = function() {
    // THE ANCHOR POINT IS WHEEL 1

    var x = this.p1.x;
    var y = this.p1.y;

    var x2 = this.p2.x;
    var y2 = this.p2.y;

    var a = atan2(y2 - y, x2 - x);

    var vec = p5.Vector.fromAngle(a);
    vec.setMag(this.wDist);
    this.p2.x = this.p1.x + vec.x;
    this.p2.y = this.p1.y + vec.y;
  }

  this.bodge = function() {
    if (this.p1.y + this.r > terrain[floor(this.p1.x)]) {
      this.p1.y = terrain[floor(this.p1.x)] - this.r;
      this.v1.y = 0;
    }

    if (this.p2.y + this.r > terrain[floor(this.p2.x)]) {
      this.p2.y = terrain[floor(this.p2.x)] - this.r;
      this.v2.y = 0;
    }
  }

  this.show = function() {
    var x = this.p1.x;
    var y = this.p1.y;

    var x2 = this.p2.x;
    var y2 = this.p2.y;

    var a = atan2(y2 - y, x2 - x);

    push();
    translate(this.p1.x, this.p1.y);
    rotate(a);
    image(skateboardImg, -27, -17);
    pop();

    noStroke();
    fill(40, 44, 53);
    ellipse(this.p1.x, this.p1.y, this.r * 2);
    ellipse(this.p2.x, this.p2.y, this.r * 2);
  }

  this.genTerrain = function() {
    while (this.p1.x > terrain.length - width) {
      var type = random(0, 1);
      var length = random(70, 200);
      var m = random(-1.13, 1.13);

      if (type < 0.5) {
        flat(h_, length);
      } else {
        slope(h_, m, length);
      }
      print("New terrain generated!")
    }
  }
}
