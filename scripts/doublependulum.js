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
var timestep = 0.06 * 0.1;
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
	constructor(list, s, l, pos, vel, mass, charge, radius, bouncyness, color, ispivot = false) {
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
		this.ispivot = ispivot;
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

	updateCircle() {

		if (!this.ispivot) {
			this.life++;
			this.acceleration = new Vector2D(0, 0);
			this.force = new Vector2D(0, 0);
			this.acceleration.y += 600;
			this.accelerate(this.acceleration);
			this.vel = this.vel.mult(1);
			this.velocity(this.vel);
			this.bruh++;

			if (this == c3) {
				if (this.history.length > 2000) {
					this.history.shift();
				}

				if(c3.life > life){
					this.history.push(this.pos);
				}

				
			}

		}


	}

	draw() {


		var opacity = 0.5;


		if (this == c3) {
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

}



class Stiffjoint {
	constructor(list, c1, c2, len, breakforce, dampening, stiffness = 1) {
		this.c1 = c1;
		this.c2 = c2;
		this.breakforce = breakforce;
		this.dampening = dampening;
		this.len = len;
		this.force;
		this.dv;
		this.list = list;
		this.list.push(this);
		this.dd;
		this.color;
		this.stiffness = stiffness
	}


	update() {

		this.dp = this.c2.pos.sub(this.c1.pos);
		this.dpmag = this.dp.mag();
		this.dpdiff = (this.dpmag - this.len) * this.stiffness;
		this.dpunit = this.dp.normalize();


		this.dd = this.dpunit.mult(this.dpdiff);




		let disp = this.dd.mult(1/(this.c1.mass+this.c2.mass));

		if (!this.c1.ispivot) {


			this.c1.vel = this.c1.vel.add(disp.mult(this.c1.mass/timestep))
			this.c1.pos = this.c1.pos.add(disp.mult(this.c1.mass))

		} if (!this.c2.ispivot) {

			this.c2.vel = this.c2.vel.sub(disp.mult(this.c2.mass/timestep))
			this.c2.pos = this.c2.pos.sub(disp.mult(this.c2.mass))
		}

	}
	draw() {

		line(this.c1.pos.x, this.c1.pos.y, this.c2.pos.x, this.c2.pos.y);

	}

}



function setup() {
	circles = [];
	var width = 600;
	var height = 600;
 	life  = random(0,200);
	spjoint = [];


	can = createCanvas(width, height);
	h = (windowHeight - height) / 2;
	if (h < 100) {
		h = 100;
	}

	can.position((windowWidth - width) / 2, h);

	rand = [random(0, 100), random(0, 100), random(0, 100)]
	background(rand[0], rand[1], rand[2]);
	frameRate(60);

	p1 = new Vector2D(300, 300);
	v = new Vector2D(random(800), random(-300,300));

	c1 = new Circle(cl, 0, 0, p1, new Vector2D(0, 0), 0.1, 0, 10, 1, "black", true);

	p2 = new Vector2D(300, 150);

	c2 = new Circle(cl, 0, 0, p2, v, 0.1, 0, 5, 1, "black");

	new Stiffjoint(spjoint, c1, c2, 150, Infinity, 0, 1.1)

	v = new Vector2D(random(-300,300), 0);
	p3 = new Vector2D(300+random(-10,10), 0);

	c3 = new Circle(cl, 0, 0, p3, v, 0.1, 0, 5, 1, "black");

	new Stiffjoint(spjoint, c2, c3, 150, Infinity, 0, 1.1)
}

function draw() {
	background(rand[0], rand[1], rand[2]);
	fill(255, 255, 255);
	noStroke();
	opacity = 0.5;
	fill("rgba(255,255,255," + opacity + ")");
	stroke("rgba(255,255,255," + opacity + ")");
	for (i = 0; i < 13; i++) {
		for (circ of cl) {
			circ.updateCircle();
			//circ.draw();
		}

		for (i = 0; i < 12; i++) {
			for (j of spjoint) {
				j.update();
				//j.draw();
			}
		}


	}

	for (circ of cl) {
		//circ.updateCircle();
		circ.draw();


	} for (j of spjoint) {
		//j.update();
		stroke("rgba(255,255,255, 0.15)");
		strokeWeight(3);
		j.draw();
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
	c3.vel = c3.vel.mult(random(-3,3));

}