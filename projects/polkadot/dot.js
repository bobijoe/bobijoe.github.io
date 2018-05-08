function Dot() {
  this.pos = createVector(random(width), random(height));

  this.size = 1;
  this.size_ = floor(random(score / 2, 3 * score));

  this.vel = p5.Vector.fromAngle(random(255));
  this.vel.setMag(random(0.5, 2));

  this.hu = random(255);

  this.update = function() {
    if (this.size < this.size_) {
      this.size++;
    } else {
      this.pos.add(this.vel);
    }

    this.show();
  }

  this.show = function() {
    noStroke();
    fill(this.hu, 255, 255);

    var x = this.pos.x;
    var y = this.pos.y;

    ellipse(x, y, this.size);
  }
}

function Player() {
  this.pos = createVector();

  this.update = function() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }

  this.show = function() {
    noStroke();
    fill(0, 0, 255);

    ellipse(this.pos.x, this.pos.y, score)
  }
}
