var balls = [];

var radius = 10;
var mass = 10;
var charge = 40;
var k = 0;
var timestep = 0.25;
var SUM_THRESHOLD =0.07;

class Ball {
	constructor(x, y, charge, vx, vy, ax, ay) {
		this.x = x;
		this.y = y;
		this.charge = charge;
		this.vx = vx;
		this.vy = vy;
		this.ax = ax;
		this.ay = ay;
	}
}

function randomsign() {
	return Math.round(Math.random()) * 2 - 1;
}

function generate(n) {
	for (i = 0; i < n; i++) {
		ball = new Ball(Math.random() * width, Math.random() * height, randomsign() * charge, randomsign() * Math.random() * 10, randomsign() * Math.random() * 10, 0, 0);
		balls.push(ball);
		console.log("bruh")
	}
}

function edgeDetect(b) {
	if (b.x >= width - radius) {
		b.x = width - radius;
		b.vx *= -1;

	} if (b.x <= radius) {
		b.x = radius;
		b.vx *= -1;

	} if (b.y >= height - radius) {
		b.y = height - radius;
		b.vy *= -1;

	} if (b.y <= radius) {
		b.y = radius;
		b.vy *= -1;
	}

}

function chargeForce(b) {
	for (b2 of balls) {
		if (b != b2) {
			let distsqr = (b2.x - b.x) * (b2.x - b.x) + (b2.y - b.y) * (b2.y - b.y);
			if (distsqr > radius * radius * 4) {
				let dist = Math.sqrt(distsqr);
				let scale = k * b2.charge * b.charge / distsqr;
				let forcey = (b2.y - b.y) / dist * scale;
				let forcex = (b2.x - b.x) / dist * scale;
				b2.ax = forcex / mass;
				b2.ay = forcey / mass;
				b.ax = -1 * forcex / mass;
				b.ay = -1 * forcey / mass;
			}

		}
	}
}
function collide(b) {
	for (b2 of balls) {
		if (b != b2) {
			distsqr = (b2.x - b.x) * (b2.x - b.x) + (b2.y - b.y) * (b2.y - b.y);
			dist = Math.sqrt(distsqr);
			if (dist < radius * 2) {
				dd = radius*2 - dist;
				dx = b2.x - b.x;
				dy = b2.y - b.y;

				ddx = dd*0.5*dx/dist;
				ddy = dd*0.5*dy/dist;

				b.x = b.x - ddx;
				b.y = b.y - ddy;

				b2.x = b2.x + ddx;
				b2.y = b2.y + ddy;

				pvx = b.vx;
				pvy = b.vy;
				b.vx = b2.vx;
				b.vy = b2.vy;
				b2.vx = pvx;
				b2.vy = pvy;
				

			}
		}
	}
}
function metaball() {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			let index = (x + y * width) * 4;
			var closestD2 = Infinity;
			var color = null;
			var sum = 0;

			for (var ball of balls) {

				var dx = x - ball.x;
				var dy = y - ball.y;
				var d2 = dx * dx + dy * dy;

				sum += 4 * ball.charge / d2;

				if (d2 < closestD2) {
					closestD2 = d2;
					if (ball.charge < 0) {
						color = "red";
					} else {
						color = "blue";
					}
				}


			}

			if (Math.abs(sum) > SUM_THRESHOLD) {
				//let scale = map(Math.abs(sum),0,100,0,SUM_THRESHOLD)
				//let scale = Math.abs(sum)/SUM_THRESHOLD;
				//scaleval = Math.floor(0.1*scale);

				//let s = Math.floor(map(Math.abs(sum),SUM_THRESHOLD,1000,100,255));
				//console.log(Math.abs(sum),SUM_THRESHOLD,s);
				if (color == "red") {
					
					pixels[index + 0] = 255;
					pixels[index + 1] = 80;
					pixels[index + 2] = 80;
				} else {
					pixels[index + 0] = 80;
					pixels[index + 1] = 80;
					pixels[index + 2] = 255;
				}

			}
		}
	}

	updatePixels();

}
function setup() {
	var width = 600;
	var height = 600;
	c = createCanvas(width, height);
	h = (windowHeight-height)/2
	if(h<100){
		h = 100
	}
	c.position((windowWidth-width)/2,h);
	generate(10);
	pixelDensity(1);

}

function draw() {
	background(220);
	loadPixels();
	for (b of balls) {
		chargeForce(b)


		b.vx = b.vx + b.ax *timestep;
		b.vy = b.vy + b.ay *timestep;
		b.x = b.x + b.vx *timestep;
		b.y = b.y + b.vy*timestep;

		//circle(b.x, b.y, radius * 2);
		collide(b)
		edgeDetect(b);
	}

	metaball();

}

function mouseClicked() {
		ball = new Ball(mouseX, mouseY, randomsign() * charge, randomsign() * Math.random() * 10, randomsign() * Math.random() * 10, 0, 0);
		balls.push(ball);

}

function windowResized() {
  	if(h<100){
		h = 100
	}
	c.position((windowWidth-width)/2,h);
}