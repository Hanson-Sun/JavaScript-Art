const print = console.log;

var cl = [];

var timestep = 0.1;

width = 600;
height = 600;


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


class Circle {
	constructor(list, pos, vel, radius, color, ispivot = false) {
		this.list = list;
		this.list.push(this);
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = color;
		this.prevpos = this.pos;
		this.futurepos = new Vector2D(0, 0)
		this.force = new Vector2D(0, 0);
		this.ispivot = ispivot;

	}

	velocity(v) {
		this.pos = this.pos.add(v);
	}

	accelerate(a) {
		this.vel = this.vel.add(a);
	}

	collide() {
		for (var c of collides) {
			if (c != this) {
				this.posdiff1 = this.pos.sub(c.pos);
				if (this.posdiff1.magsqr() <= (this.radius + c.radius) * (this.radius + c.radius)) {
					//c.ispivot = true;
					this.ispivot = true;
					const index = this.list.indexOf(this);
					if (index > -1) {
						this.list.splice(index, 1);
					}
					
					this.draw();
					collides.push(this);

					break;

				}
			}
		}
	}

	check() {
		if (this.pos.x < -10) {
			this.pos = checkgenerate();
		}
		else if (this.pos.x > width + 10) {
			this.pos = checkgenerate()
		}
		else if (this.pos.y < -10) {
			this.pos = checkgenerate()
		}
		else if (this.pos.y > height + 10) {
			this.pos = checkgenerate()
		}
	}


	draw() {

		// fill(this.color)
		// if (this.ispivot) {
		// 	fill("white")
		// }
		circle(this.pos.x, this.pos.y, 2 * this.radius)
	}

}




function setup() {
	var width = 600;
	var height = 600;
	collides = [];
	scale = random(3, 7);
	vel = random(1, 5);
	noStroke();
	fill("white");

	can = createCanvas(width, height);
	h = (windowHeight - height) / 2;
	if (h < 100) {
		h = 100;
	}

	can.position((windowWidth - width) / 2, h);

	rand = [random(0, 60), random(0, 60), random(0, 80)]
	background(rand[0], rand[1], rand[2]);
	frameRate(60);
	start = new Circle(cl, new Vector2D(300, 300), new Vector2D(0, 0), 20, "white", true);
	collides.push(start);
	start.draw();

	for (i = 0; i < 1600; i++) {
		new Circle(cl, new Vector2D(random(width),random(height)), new Vector2D(0, 0), random(1.5, 3), "rgba(255,255,255, 0.1)", false);
	}
	weighted = -random(0,0.2)

}



function checkgenerate() {
	works = false;
	while (works == false) {
		works = true;
		randpos = new Vector2D(random(width), random(height))
		for (var c of collides) {
			posdiff1 = randpos.sub(c.pos);
			if (posdiff1.magsqr() <= (scale * c.radius) * (scale * c.radius)) {
				works = false;
				break
			}
		}
	}
	return randpos;
}



function draw() {

	//background(rand[0],rand[1],rand[2]);
	//fill(255, 255, 255);
	//fill("rgba(0,0,0, 0.3)")
	//rect(0, 0, width, height)


	for (i = 0; i < 5; i++) {
		for (circ of cl) {
			circ.collide();
			if (!circ.ispivot) {
				circ.check();
				scale = ((circ.pos.sub(start.pos)).normalize()).mult(weighted)
				circ.vel = (new Vector2D(random(-vel, vel), random(-vel, vel))).add(scale);
				circ.velocity(circ.vel);
			}
		}
	}

	// if(collides.length > 1000){
	// 	collides.shift();
	// }

	//for(c of cl){
	// 	c.draw();
	// }
	// for (c of collides) {
	// 	c.draw();
	// }
	if (cl.length < 2000) {
		new Circle(cl, checkgenerate(), new Vector2D(0, 0), random(1.5, 3), "rgba(255,255,255, 0.1)", false);
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