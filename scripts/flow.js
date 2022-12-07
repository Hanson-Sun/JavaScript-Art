
var timestep = 1;
var cl = [];


class Snow {
	constructor(pos, v, r) {
		this.pos = pos
		this.v = v;
		this.r = r;
		cl.push(this)

	}
	update() {

		this.pos = this.pos.add(this.v);
		this.edge();

	}

	edge() {
		if (this.pos.y > height + this.r + 20) {
			this.pos.y = random(-20, height + 20);
			this.pos.x = random(-20, width + 20);
		}
		if (this.pos.y < -this.r - 20) {
			this.pos.y = random(-20, height + 20);
			this.pos.x = random(-20, width + 20);
		}

		if (this.pos.x > width + this.r + 20) {
			this.pos.y = random(-20, height + 20);
			this.pos.x = random(-20, width + 20);
		}
		if (this.pos.x < -this.r - 20) {
			this.pos.y = random(-20, height + 20);
			this.pos.x = random(-20, width + 20);

		}
	}
}


function setup() {

	width = 600;
	height = 600;
	can = createCanvas(width, height);
	h = (windowHeight - height) / 2;
	zOff = 0.0;
	zOff2 = 0.0;
	if (h < 100) {
		h = 100;
	}

	can.position((windowWidth - width) / 2, h);

	for (i = 0; i < 2800; i++) {
		new Snow(createVector(random(width), random(height)), createVector(0, 0), 1);
	}
	count = 0;
	res = random(300, 450);
	s = random(1, 1.7)
	v = random(0.2, 0.35)
	frameRate(60);
	noStroke();
}

function draw() {

	fill(0, 20);
	rect(0, 0, width, height)
	fill(200);
	count++;


	for (let i = 0; i < cl.length; i++) {

		c = cl[i]

		let xOff = c.pos.x / res;
		let yOff = c.pos.y / res;


		let wAngle = noise(xOff, yOff, count / res) * 2 * 3.14 * s;


		c.v = p5.Vector.fromAngle(wAngle).mult(v * wAngle)

		c.update();
		circle(c.pos.x, c.pos.y, c.r * 2);
	}



}


function windowResized() {
	if (h < 100) {
		h = 100;
	}
	can.position((windowWidth - width) / 2, h);
}

function mouseClicked() {
	res = random(300, 450);
	s = random(1, 1.5)
	v = random(0.2, 0.35)

}