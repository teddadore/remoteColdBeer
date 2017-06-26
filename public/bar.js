
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

	var c1, c2;
	c1 = color(210, 210, 210);
  	c2 = color(181, 181, 181);

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
		noStroke();
		fill(c1);
		rect(0, 0, this.w, this.h);
		pop();
	}

}