
function Square(x, y, w, h, a, fixed) {

	var options = {
		friction: 0,
		restitution: 0.2,
		angle: a,
		isStatic: fixed,
		collisionFilter: {
            category: holeCategory
        }
	}

	var strokeColor;
  	var fillColor;
  	strokeColor = color('rgba(0, 0, 0, 0.25)');
  	fillColor = color('rgba(0 ,0, 0, 1)');

	// Make rectangle
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w;
	this.h = h;


	World.add(world, this.body);



	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		strokeWeight(10);
		noStroke();
		stroke(strokeColor);
    	fill(fillColor);
		rect(0, 0, this.w, this.h);
		pop();
	}
}