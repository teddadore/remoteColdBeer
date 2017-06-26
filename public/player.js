
function Player(x, y, r, a, playerColor, fixed, colCat) {
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

	var fillColor = playerColor;

	if (playerColor === "red") {
		fillColor = color('rgba(248, 6, 6, 1)');
	} else if (fillColor === "blue") {
		fillColor = color('rgba(17, 117, 228, 1)');
	}

	// var playerColor = color;
	console.log(playerColor);
	// strokeColor = color('rgba(0, 0, 0, 0.25)');
	// var colorBlue;
	// colorBlue = color('rgba(17, 117, 228, 1)');
	// var colorRed;
	// colorRed = color('rgba(248, 6, 6)');

	// if(color == "blue") {
		
	// } else if(color == "red" ){
		
	// }

	// Make circle
	this.body = Bodies.circle(x, y, r, options);
  	
  	this.r = r;


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
		// noStroke(fillColor);
		fill(fillColor);
		ellipse(0, 0, this.r * 2);
		pop();
	}

}