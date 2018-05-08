function Particle(x, y, vel_, hu_) {
  this.pos = createVector(x, y);
  this.vel = vel_; // random(-8, -18)
  this.acc = createVector(0, 0);

  this.hu = hu_;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function(a) {
    stroke(this.hu, 255, 255, a);
    strokeWeight(5);

    point(this.pos.x, this.pos.y);
  }
}
