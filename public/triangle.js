// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/W-ou_sVlTWk

function Triangle(x, y, sides, r, fixed) {
  var options = {
    friction: 0.6,
    restitution: 0.95,
    isStatic: fixed,
    mass: 0,
    collisionFilter: {
        category: ballCategory
    }
  }
  var strokeColor;
  var fillColor;
  strokeColor = color('rgba(0, 0, 0, 0.25)');
  fillColor = color('rgba(0 ,0, 0, 1)');

  this.body = Bodies.polygon(x, y, sides, r, options);
  this.sides = sides;
  this.r = r;
  World.add(world, this.body);


  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeCap(ROUND);
    strokeWeight(10);
    stroke(strokeColor);
    fill(fillColor);
    polygon(pos.x, pos.y, this.r, this.sides);
    pop();
  }

  function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
      var sx = x + cos(a) * radius;
      var sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

}
