
function Square(x, y, w, h, a, barColor, fixed) {

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
	var fillColor = barColor;

	if (barColor === "middle") {
		fillColor = color('rgba(66 ,250, 110, 1)');
		strokeColor = color('rgba(66 ,250, 110, 0.25)');
	} else if (barColor === "top") {
		fillColor = color('rgba(251, 29, 90, 1)');
		strokeColor = color('rgba(251, 29, 90, 0.25)');
	}
	

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
		strokeWeight(16);
		noStroke();
		stroke(strokeColor);
    	fill(fillColor);
		rect(0, 0, this.w, this.h);
		pop();
	}
}