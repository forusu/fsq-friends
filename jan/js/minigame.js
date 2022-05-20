var canvas;
var ctx;

var framerate = 120;// able to update this depending on the client
var delta;			// sry, too sigma to explain

// Input and buffer variables
left=right=0;		// left and right inputs
jump=false;
jump_buffer=0;

// Player variables
gay_ified=181;		// rainbow trail (bad for your eyes and mental health)
xthiccness=30;		// player size on x

px=py=0;			// player x and y position
vx=vy=0;			// player x and y velocity
gravity=10;
speed=14;
accel=0.04;			// acceleration
decel=0.2;			// deceleration
pivotcel=0.1;		// acceleration when changing directions
drawWrappedBoy = false



window.onload = function() {
	canvas = document.getElementById("gc");
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth-18;
	canvas.height = window.innerHeight-34;

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth-18;
		canvas.height = window.innerHeight-34;
		draw();
	})
		
		
	document.addEventListener("keydown",inputPressed);
	document.addEventListener("keyup",inputReleased);

	delta = 1/framerate;
	delta_adjuster = 60*delta;
	setInterval(process,1000/framerate);
}


function inputPressed(evt) {
	switch(evt.keyCode) {
		// Jumpinput
		case 38:
			if(!jump){
				jump_buffer = 0.075;
			}
			jump = true
			break;
		// Directional Inputs
		case 37:
			left = -1;
			break;
		case 39:
			right = 1;
			break;
   	 }
}

function inputReleased(evt) {
	switch(evt.keyCode) {
		// Jumpinput
		case 38:
			if(jump_buffer < 0.02) {
				jump_buffer = 0;
			}
			jump = false
			break;
		// Directional Inputs
		case 37:
			left = 0;
			break;
		case 39:
			right = 0;
			break;
   	 }
}


function process() {
	physics();
	draw();
	buffer();
}


function buffer() {
	jump_buffer -= delta
	jump_buffer = Math.max(0,jump_buffer)
}

function physics() {
	
	// Intended Movement and acceleration
	var intMove = (left + right) * speed;
	var cel = 0;
	
	if(Math.sign(intMove)*Math.sign(vx) == -1) {
		cel = pivotcel;
	}
	else {
		if(Math.abs(intMove) > Math.abs(vx)) {
			cel = accel;
		}
		else {
			cel = decel;
		}
	}
	
	vx = vx + (intMove - vx) * cel * delta_adjuster;
	
	
	// Gravity
	if(py < canvas.height-45) {
		vy -= 0.25 * delta_adjuster;

	}
	else {
		vy = 0;
		if(jump_buffer > 0) {
			jump_buffer = 0
			vy = 10;
		}
	}
	
	
	px += vx * delta_adjuster;
	py -= vy * delta_adjuster;
	py = Math.min(py, canvas.height-45);
	
	// Wrapping logic
	if(px < 0 || px > canvas.width-xthiccness) {
		drawWrappedBoy = true;
		if(px < 0-30) {
			px += canvas.width;
		}
		if(px > canvas.width-xthiccness) {
			px -= canvas.width;
		}
	}
}


function draw() {
	ctx.fillStyle = 'rgb(120,120,120)';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = 'hsl(181,100%,41%)';
	ctx.fillRect(px,py,xthiccness,30);

	if (drawWrappedBoy) {
		ctx.fillStyle = 'hsl(181,100%,41%)';
		ctx.fillRect(px+canvas.width,py,xthiccness,30);
	}
}
