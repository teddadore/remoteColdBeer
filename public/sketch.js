// Sockets
var socket;

// Background Constants
var Y_AXIS = 1;
var X_AXIS = 2;
var bg1, bg2;

// Matter Module Aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Events = Matter.Events,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

// Pieces
var engine;
var world;
var circle;
var hole;
var square;
var paddle;
var player;

var fullBar =[];
var holeRow1 = [];
var holeRow2 = [];

// Matter Constraints
var mConstraint;
var constraintBarLeft;
var constraintBarRight;

// Matter Collision Categories
var defaultCategory = 0x0001,
  barCategory = 0x0002,
  holeCategory = 0x0004,
  ballCategory = 0x0008;

// Hit flag for restarting bar
var hitFlag = false;




function setup() {
	var canvas = createCanvas(860, 700);
	engine = Engine.create();
  	world = engine.world;

	// socket = io.connect('https://remotecoldbeer.herokuapp.com');
	// socket = io.connect('http://localhost:3000');
	socket = io.connect('http://www.remotecoldbeer.com');
	

	socket.on('rightPlayer', moveRight);
	socket.on('leftPlayer', moveLeft);

	function collision(event) {
	    var pairs = event.pairs;
	    for (var i = 0; i < pairs.length; i++) {
	      var categoryA = pairs[i].bodyA.collisionFilter.category;
	      var categoryB = pairs[i].bodyB.collisionFilter.category;
	      // console.log(bodyA.collisionFilter.category, bodyB.collisionFilter.category);

	      if (categoryA == ballCategory && categoryB == holeCategory) {
	        // restartBar();
	        hitFlag = true;
	      } else if (categoryA == holeCategory && categoryB == ballCategory) {
	        // restartBar();
	        hitFlag = true;
	      }
	    }
	}
	Events.on(engine, 'collisionStart', collision);

	var canvasMouse = Mouse.create(canvas.elt);
  	canvasMouse.pixelRatio = pixelDensity();
  	var optionsMouse = {
	    mouse: canvasMouse
	}
	mConstraint = MouseConstraint.create(engine, optionsMouse);
	circle = new Particle(canvas.width/2, canvas.height * 0.88, 20);


	// Background colors
	bg1 = color(219, 134, 90);
  	bg2 = color(237, 212, 49);

	// Canvas measurements
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;

	// Hole measurements
	var firstRow = canvasHeight * 0.77;
	var secondRow1 = canvasHeight * 0.5;
	var secondRow2 = canvasHeight * 0.4;
	var thirdRow = canvasHeight * 0.15;
	var xGapRandom1 = random(160, 200);
	var xGapRandom2 = random(350, 380);

	// Bar measurements
	barChain = 10;
	barSidesW = 20;
	barSidesH = 20;
	barMiddleW = (canvasWidth - ((barSidesW * 2) + (barChain * 2) + (10 * 2)) );
	barMiddleH = 20;
	barBottomPos = canvas.height - barSidesH;

	// Add Holes
	for (var i = 0; i < 5; i++) {
	    var x = i * xGapRandom1;
	    if(x == 0) {
	      x = random(50, 80)
	    } 
	    holeRow1.push(new Hole(x, firstRow, random(25, 38), true));
	}

	for (var i = 0; i < 3; i++) {
	    var x = i * xGapRandom2;
	    if(x == 0) {
	      x = random(100, 140)
	    } 
	    holeRow2.push(new Square(x, random(secondRow1, secondRow2), 25, random(80, 180), 0, true));
	}

	paddle = new Square(canvasWidth/2, thirdRow, 220, 50, 0, true);

	// Add Bar
	// barLeft = new Player(barSidesW, barBottomPos, barSidesW/2, 0, "blue", true);
	barLeft = new Bar(barSidesW, barBottomPos, barSidesW, barSidesH, 0, true);
  	barMiddle = new Bar(canvas.width/2, canvas.height-barSidesH, barMiddleW, barSidesW, 0, false);
  	// barRight = new Player(canvas.width - barSidesW, barBottomPos, barSidesW/2, 0, "red", true);
  	barRight = new Bar(canvas.width - barSidesW, barBottomPos, barSidesW, barSidesH, 0, true);
  	// player = new Player(0, 0, barSidesH/2, 0, "blue", true);

  	// Add Bar Constraints and Options
	var optionsBarLeft = {
		bodyA: barLeft.body,
	    bodyB: barMiddle.body,
	    pointA: { x: 10, y: 0 },
	    pointB: { x: -(barMiddleW/2), y: 0 },
	    length: barChain,
	    stiffness: 0.8
  	}
	var optionsBarRight = {
		bodyA: barMiddle.body,
		bodyB: barRight.body,
		pointA: { x: barMiddleW/2, y: 0 },
		pointB: { x: -10, y: 0 },
		length: barChain,
		stiffness: 0.8
	}
	constraintBarLeft = Constraint.create(optionsBarLeft);
	constraintBarRight = Constraint.create(optionsBarRight);

	// Add Pieces to the World
	World.add(world, [circle, mConstraint, constraintBarLeft, constraintBarRight]);

	// Adds the 'walls' (bounds of canvas)
	World.add(world, [
	    Bodies.rectangle(canvasWidth/2, 0, canvasWidth, 20, { isStatic: true, collisionFilter: {category: defaultCategory} }),
	    Bodies.rectangle(canvasWidth/2, canvasHeight, canvasWidth, 20, { isStatic: true, collisionFilter: {category: defaultCategory} }),
	    Bodies.rectangle(canvasWidth, canvasHeight/2, 20, canvasHeight, { isStatic: true, collisionFilter: {category: defaultCategory} }),
	    Bodies.rectangle(0, canvasHeight/2, 20, canvasHeight, { isStatic: true, collisionFilter: {category: defaultCategory}})
	]);
	console.log(barMiddleW, barMiddle.body.position.x);
}


function draw() {
	setGradient(0, 0, width, height, bg2, bg1, Y_AXIS);
	Engine.update(engine);

	noStroke(255);
  	fill(170);
 	rectMode(CENTER);
  	ellipseMode(CENTER);

  	circle.show();
  	for (var i = 0; i < holeRow1.length; i++) {
    	holeRow1[i].show();
    }

    for (var i = 0; i < holeRow2.length; i++) {
    	holeRow2[i].show();
    }

    paddle.show();

	barLeft.show();
	barMiddle.show();
	barRight.show();

	if (hitFlag == true) {
	    restartBar();
	}

	spinSquares();
	movePaddle();

	if (keyIsDown(UP_ARROW)) {
    	upRight();
    	console.log("Arrow Key UP!");
  	}

  	if (keyIsDown(DOWN_ARROW)) {
    	downRight();
    	console.log("Arrow Key DOWN!");
  	}
}

function spinSquares() {

	holeRow2.forEach(function(element){
		Body.rotate(element.body, 0.01);
	});
}

function movePaddle() {
	var paddleY = paddle.body.position.y;
	var paddleX = paddle.body.position.x;
	var py = canvasWidth/2 + canvasWidth/3 * Math.sin(engine.timing.timestamp * 0.0004);

	Body.setVelocity(paddle.body, { x: py - paddleX, y: paddleY });
	Body.setPosition(paddle.body, { x: py, y: paddleY });
}

function moveRight(data) {
	if (data == "right up") {
		upRight();
		// console.log("uppp");
	}
	if (data == "right down") {
		downRight();
		// console.log("dnnnnn");
	}
}

function moveLeft(data) {
	if (data == "left up") {
		upLeft();
		// console.log("uppp");
	}
	if (data == "left down") {
		downLeft();
		// console.log("dnnnnn");
	}
}

function upRight() {
  var py = barRight.body.position.y - 1;

  if (barRight.body.position.y >= (barLeft.body.position.y - 150)) {
    Body.setVelocity(barRight.body, { x: barRight.body.position.x, y: py - barRight.body.position.y });
    Body.setPosition(barRight.body, { x: barRight.body.position.x, y: py });
    console.log("Right: " + barRight.body.position.y);
    
  } else {
    console.log("Too high, my dude! " + "left: " + barLeft.body.position.y + " right: " + barRight.body.position.y);
  }
}

function downRight() {
  var py = barRight.body.position.y + 1;

  if (barRight.body.position.y < barBottomPos) {
    if (barRight.body.position.y <= (barLeft.body.position.y + 150) ) {
      Body.setVelocity(barRight.body, { x: barRight.body.position.x, y: py - barRight.body.position.y });
      Body.setPosition(barRight.body, { x: barRight.body.position.x, y: py });
      console.log("Right: " + barRight.body.position.y);
      
    } else {
      console.log("Too low, my dude! " + "left: " + barLeft.body.position.y + " right: " + barRight.body.position.y);
    }
  }
}

function upLeft() {
  var py = barLeft.body.position.y - 1;

  if (barLeft.body.position.y >= (barRight.body.position.y - 150)) {
    Body.setVelocity(barLeft.body, { x: barLeft.body.position.x, y: py - barLeft.body.position.y });
    Body.setPosition(barLeft.body, { x: barLeft.body.position.x, y: py });
    console.log("Left: " + barLeft.body.position.y);
    
  } else {
    console.log("Too high, my dude! " + "left: " + barRight.body.position.y + " right: " + barRight.body.position.y);
  }
}

function downLeft() {
  var py = barLeft.body.position.y + 1;

  if (barLeft.body.position.y < barBottomPos) {
    if (barLeft.body.position.y <= (barRight.body.position.y + 150)) {
      Body.setVelocity(barLeft.body, { x: barLeft.body.position.x, y: py - barLeft.body.position.y });
      Body.setPosition(barLeft.body, { x: barLeft.body.position.x, y: py });
      console.log("Left: " + barLeft.body.position.y);
      
    } else {
      console.log("Too low, my dude! " + "left: " + barLeft.body.position.y + " right: " + barRight.body.position.y);
    }
  }
}

function restartBar() {
  var rY = barRight.body.position.y;
  var lY = barLeft.body.position.y;

  while ( lY < barBottomPos ) {
    Body.setVelocity(barLeft.body, { x: barLeft.body.position.x, y: barBottomPos - lY });
    Body.setPosition(barLeft.body, { x: barLeft.body.position.x, y: lY++ });
  }

  while ( rY < barBottomPos ) {
    Body.setVelocity(barRight.body, { x: barRight.body.position.x, y: barBottomPos - rY });
    Body.setPosition(barRight.body, { x: barRight.body.position.x, y: rY++ });
  }

  console.log(barBottomPos, lY, rY);
  hitFlag = false;
}

// Creates background gradient
function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}



