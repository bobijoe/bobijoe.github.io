function Firework() {
  this.vel_ = createVector(random(-1, 1), random(-15, -21));
  this.hu = random(255);
  this.lifespan = 255;

  this.firework = new Particle(random(width), height, this.vel_, this.hu);



  this.update = function() {
    if (!this.explosion) {
      this.firework.applyForce(gravity);
      this.firework.update();
    } else {
      this.lifespan -= 5;

      for (var i = 0; i < this.explosion.length; i++) {
        this.explosion[i].applyForce(gravity);
        this.explosion[i].update();
      }
    }


    if (this.firework.vel.y >= 0 && !this.explosion) {
      this.explosion = [];
      this.fade = 255;

      this.x = this.firework.pos.x;
      this.y = this.firework.pos.y;

      for (var i = 1; i < 100; i++) { // Create 100 more particles
        this.v = p5.Vector.random2D();
        this.v.setMag(random(0, 2));
        this.explosion.push(new Particle(this.x, this.y, this.v, this.hu));
      }
    }
  }

  this.show = function() {
    //stroke(this.hu, 255, 255, this.lifespan);

    if (!this.explosion) {
      this.firework.show(255);
    } else {
      for (var i = 0; i < this.explosion.length; i++) {
        this.explosion[i].show(this.lifespan);
      }
    }
  }
}
