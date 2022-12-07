var gravity = 0.1;
var timestep = 0.99;
var snows = [];


class Snow {
	constructor(pos, v, f, r) {
		this.pos = pos
		this.v = v;
		this.f = f;
		this.r = r;

		snows.push(this)

	}
	update() {


		this.f.y += gravity;
		this.v = this.v.add(this.f.mult(timestep));
		this.v.limit(this.r*4);
		this.pos = this.pos.add(this.v.mult(timestep * this.r * 0.05));
		this.edge();
		
	}
	draw() {


		fill("rgba(255, 255, 255,0.5)");
		noStroke();
		circle(this.pos.x, this.pos.y, this.r * 2);


	}
	edge() {
		if (this.pos.y > height + this.r) {
			this.pos.y = -this.r * random(1, 10);
			this.pos.x = random(0, width);
			this.v = createVector(0,0);
			this.f = createVector(0,0);

		}

		if (this.pos.x > width + this.r) {
			//this.pos.y = -this.r * random(1, 10);
			this.pos.x = -this.r;
			this.v = createVector(0,0);
			this.f = createVector(0,0);
		}
		if (this.pos.x < -this.r) {
			//this.pos.y = -this.r * random(1, 10);
			this.pos.x = width+this.r;
			this.v = createVector(0,0);
			this.f = createVector(0,0);
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

	for (i = 0; i < 500; i++) {
		let r = pow(random(0, 1), 2);
  		bruh = constrain(r * 10, 1.5, 10);
		new Snow(createVector(random(width),random(height)),createVector(0,0),createVector(0,0), bruh);
	}

	frameRate(60);
}

function draw() {
	background(0, 0, 0);

	zOff = zOff + 0.005;
	zOff2 = zOff2 + 0.0085;
	//noiseDetail(2, 0);

	//console.log(n)


	for (s of snows) {
		

		let xOff = s.pos.x/width/25;
		let yOff = s.pos.y/height/25;
		noise2 = noise(zOff2)
		let wAngle = noise(xOff, yOff, zOff * s.r) * 2 * Math.PI * noise2;
		let wind = p5.Vector.fromAngle(wAngle);
		//console.log(wAngle);
		// s.f = s.f.add(wind);


		//console.log(dp.mag())

		let mag = s.v.mag()
		s.v = wind.setMag(mag)		

		s.update();
		s.draw();
	}


}


function windowResized() {
	if (h < 100) {
		h = 100;
	}
	can.position((windowWidth - width) / 2, h);
}
