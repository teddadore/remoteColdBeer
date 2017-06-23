var socket;
var yA;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255, 0, 0);

	// socket = io.connect('http://localhost:3000');
	socket = io.connect('172.20.33.122:3000');
	// socket.on('mouse', newDrawing);
}

function newDrawing (data) {
	noStroke();
	fill(255, 0, 100);
	ellipse(data.x, data.y, 20, 20);
}



function draw() {

	if (keyIsDown(UP_ARROW)) {
    	upRight();
    	// console.log("Arrow Key UP!");
  	}

  	if (keyIsDown(DOWN_ARROW)) {
    	downRight();
    	// console.log("Arrow Key DOWN!");
  	}

  	if (mouseIsPressed) {
  		if (yA >= 8 ) {
  			upRight();
  			socket.emit('rightPlayer', yA);
  		} else if (yA <= 4) {
  			downRight();
  			socket.emit('rightPlayer', yA);
  		}
  	}

  	window.ondevicemotion = function(event) {	
	    accX = Math.round(event.accelerationIncludingGravity.x*10) / 10;  
	    accY = Math.round(event.accelerationIncludingGravity.y*10) / 10;  
	    
	    movement = 10;
	    
	    xA = -(accX / 10) * movement;
	    yA = -(accY / 10) * movement;
	}
	
}


function upRight() {
	var data = "right up";

	socket.emit('rightPlayer', data);
}

function downRight() {
	var data = "right down";

	socket.emit('rightPlayer', data);
}


