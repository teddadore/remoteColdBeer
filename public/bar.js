
function Bar(x, y, w, h, a, fixed, colCat) {
	if (colCat === undefined) {
	    colCat = barCategory;
	 }

	var options = {
		friction: 0,
		restitution: 0.2,
		angle: a,
		isStatic: fixed,
		collisionFilter: {
            category: colCat,
            mask: ballCategory | defaultCategory
        }
	}

	// Make rectangle
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w;
	this.h = h;


	World.add(world, this.body);


	this.removeFromWorld = function() {
	    World.remove(world, this.body);
	    // console.log("remove from bar class");
	  }


	this.show = function() {
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		rectMode(CENTER);
		strokeWeight(1);
		noStroke();
		fill(0);
		rect(0, 0, this.w, this.h);
		pop();
	}
}