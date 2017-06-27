// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/W-ou_sVlTWk

function Hole(x, y, r, fixed) {
  var options = {
    friction: 0.6,
    restitution: 0.95,
    isStatic: fixed,
    mass: 0,
    collisionFilter: {
        category: holeCategory
    }
  }
  var strokeColor;
  var fillColor;
  strokeColor = color('rgba(23, 216, 248, 0.25)');
  fillColor = color('rgba(23, 216, 248, 1)');

  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  World.add(world, this.body);

  this.isOffScreen = function() {
    var pos = this.body.position;
    return (pos.y > height + 100);
  }

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  }

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(16);
    stroke(strokeColor);
    fill(fillColor);
    ellipse(0, 0, this.r * 2);
    // line(0, 0, this.r, 0);
    pop();
  }

}
