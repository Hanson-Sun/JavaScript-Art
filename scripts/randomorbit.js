const print = console.log;

var cl = [];
var visc = 0;
var radius = 10;
var mass = 100;
var bouncyness = 1;
var charge = 0;
var grav = 0;
var genamount = 10;
var cmass = 800000000 * 0.6;
var lifeduration = 350;
var timestep = 0.05 * 0.6;
var math = ["×", "+", "-", "%", "÷", "𝜽", "𝚺", "𝜱", "𝝅", "∫", "0", "42", "e", "∞", "f(x)", "x", "=", "γ", "√", "μ"]
width = 600;
height = 600;
radius = 35 * 0.6;

class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(vect) {
		return (new Vector2D(this.x + vect.x, this.y + vect.y));
	}

	sub(vect) {
		return (new Vector2D(this.x - vect.x, this.y - vect.y));
	}
	mult(a) {
		return (new Vector2D(this.x * a, this.y * a));
	}

	dot(vect) {
		return this.x * vect.x + this.y * vect.y;
	}

	cross(vect) {
		return this.x * vect.y - this.y * vect.x;
	}

	mag() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	magsqr() {
		return (this.x * this.x) + (this.y * this.y);
	}

	normalize() {
		this.mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
		return (new Vector2D((this.x / this.mag), (this.y / this.mag)))
	}

	findAngle(vect, type = "deg") {
		this.dot = this.x * vect.x + this.y * vect.y;
		this.mag1 = ((this.x ** 2) + (this.y ** 2)) ** 0.5;
		this.mag2 = ((vect.x ** 2) + (vect.y ** 2)) ** 0.5;
		if (type == "deg") {
			return Math.acos(this.dot / this.mag1 / this.mag2) * 180 / Math.PI;
		} else if (type == "rad") {
			return Math.acos(this.dot / this.mag1 / this.mag2);
		}
	}
}

var cpos = new Vector2D(width / 2, height / 2);

class Circle {
	constructor(list, s, l, pos, vel, mass, charge, radius, bouncyness, color) {
		this.sym = s;
		this.life = l;
		this.list = list;
		this.list.push(this);
		this.charge = charge;
		this.pos = pos;
		this.vel = vel;
		this.mass = mass;
		this.radius = radius;
		this.bouncyness = bouncyness;
		this.color = color;
		this.prevpos = this.pos;
		this.force = new Vector2D(0, 0);
		this.history = [];
		if (this.charge < 0) {
			this.color = "red";
		} else if (this.charge > 0) {
			this.color = "blue";
		} else {
			this.color = color;
		}

	}

	velocity(v) {
		this.pos = this.pos.add(v.mult(timestep));
	}

	accelerate(a) {
		this.vel = this.vel.add(a.mult(timestep));
	}

	gravityinteract() {
		this.q1 = this.mass;
		this.x1 = this.pos;
		this.x2 = cpos;
		this.dx = this.x1.sub(this.x2);
		this.dxmsqr = this.dx.magsqr();
		if (this.dxmsqr > (this.radius + 20) * (this.radius + 20)) {
			this.dxnorm = this.dx.normalize();
			this.a = this.dxnorm.mult(-0.002 * cmass / this.dxmsqr);
			this.acceleration = this.acceleration.add(this.a)
		}

	}
	collide() {


		this.posdiff1 = this.pos.sub(cpos);
		if (this.posdiff1.mag() <= (this.radius + radius)) {
			let zero = new Vector2D(0, 0);
			this.direction1 = (cpos.sub(this.pos)).normalize();
			this.direction2 = (this.prevpos.sub(cpos)).normalize();
			this.overlap = this.radius + radius - this.posdiff1.mag();

			this.posdiff1 = this.pos.sub(cpos);
			this.posdiffmag = this.posdiff1.mag();

			this.massconst1 = 2 * cmass / (this.mass + cmass);
			this.vdiff1 = this.vel.sub(zero);
			this.dot1 = (this.vdiff1.dot(this.posdiff1)) / (this.posdiffmag ** 2);
			this.massconst2 = 2 * this.mass / (this.mass + cmass);
			this.pos = this.pos.sub(this.direction1.mult(this.overlap * cmass / (this.mass + cmass)));
			this.vel = (this.vel.sub(this.posdiff1.mult(this.dot1 * this.massconst1))).mult(Math.sqrt(this.bouncyness));


		}


	}
	updateCircle() {


		this.life++;
		this.acceleration = new Vector2D(0, 0);
		this.force = new Vector2D(0, 0);
		this.gravityinteract();
		this.accelerate(this.acceleration);
		this.collide();
		this.velocity(this.vel);
		this.bruh++;
		

		if (this.history.length > 50) {
			this.history.shift();
		}

		this.history.push(this.pos);

	}

	draw() {


		var opacity = 0.5;



		//noStroke();
		//circle(this.pos.x, this.pos.y, this.radius);
		beginShape();
		noFill();
		stroke("rgba(255,255,255," + opacity + ")");
		strokeWeight(this.radius);
		for (let p of this.history) {
			//circle(p.x, p.y, this.radius);
			curveVertex(p.x, p.y);
		}
		endShape();


	}

}



function generate() {

	size = Math.random() * 10 + 5;
	//life = size * 3;
	//life = 0;
	sign = Math.random() < 0.5 ? -1 : 1;
	sign2 = Math.random() < 0.5 ? -1 : 1;
	vx = 3 * sign * Math.random();

	vx = 1 * sign * Math.random();
	vy = (6.5 * sign2 * Math.random()) + 4;

	vell = new Vector2D(vx, vy);
	s = math[Math.floor(Math.random() * math.length)]
	addsub = Math.random() < 0.5 ? -20 : width;
	x = addsub + Math.random() * 10;
	y = Math.random() * (height + 40) - 20;

	p = new Vector2D(x, y);
	//print(p);
	new Circle(cl, s, 0, p, vell, mass, charge, size, bouncyness, "black");

}


function setup() {
	circles = [];
	var width = 600;
	var height = 600;


	can = createCanvas(width, height);
	h = (windowHeight - height) / 2;
	if (h < 100) {
		h = 100;
	}

	can.position((windowWidth - width) / 2, h);

	rand = [random(0, 100), random(0, 100), random(0, 100)]
	background(rand[0], rand[1], rand[2]);
	frameRate(60);
	count = 0;

	for (i = 0; i < 10; i++) {
		//generate();
	}
	m = random(0.3, 1.3);
	for (i = 0; i < 160; i++) {
		size = 2 * 0.6;

		vell = new Vector2D(60 * m, 0);
		p = new Vector2D(100 * 0.6, 900 * 0.6 - i * 5 * 0.6);

		new Circle(cl, size, 0, p, vell, mass, charge, size, bouncyness, "black");
	}


}

function draw() {

	count++;
	background(rand[0], rand[1], rand[2]);
	fill(255, 255, 255);
	noStroke();
	circle(cpos.x, cpos.y, radius * 2);
	opacity = 0.5;
	fill("rgba(255,255,255," + opacity + ")");
	stroke("rgba(255,255,255," + opacity + ")");
	for (circ of cl) {
		circ.updateCircle();
		circ.draw();
	}

	if (count > 20) {
		count = 0;
		//generate();
	}

}


function windowResized() {
	if (h < 100) {
		h = 100;
	}
	can.position((windowWidth - width) / 2, h);
}

function mouseClicked() {
	//cpos = new Vector2D(mouseX, mouseY);


}