const print = console.log;

var math = ["×", "+", "-", "%", "÷", "𝜽", "𝚺", "𝜱", "𝝅", "∫", "0", "42", "e", "∞", "f(x)", "x", "=", "γ", "√", "μ", "y", "( )", "!"];
particlelist = [];



particle = {
	x: null,
	y: null,
	vx: null,
	vy: null,
	type: null,
	radius: null
}




function generate(n) {
	for (i = 0; i < n; i++) {
		sign = Math.random() < 0.5 ? -1 : 1;
		sign2 = Math.random() < 0.5 ? -1 : 1;
		p = Object.create(particle);
		p.x = width * Math.random();
		p.y = height * Math.random();
		p.vx = Math.random() * 1.2 * sign;
		p.vy = Math.random() * 1.2 * sign2;
		p.type = math[Math.floor(Math.random() * math.length)];
		p.radius = random(2, 10);
		particlelist.push(p)
	}

}


function setup() {
	circles = [];
	var width = 600;
	var height = 600;

	maxlength = (width + height) * 15;
	repulse = (width + height) * 10;

	can = createCanvas(width, height);
	h = (windowHeight - height) / 2;
	if (h < 100) {
		h = 100;
	}

	can.position((windowWidth - width) / 2, h);

	generate(60);
	rand = [random(0, 100), random(0, 100), random(0, 100)]
	background(rand[0], rand[1], rand[2]);
	frameRate(60);
	

}

function draw() {
	background(rand[0], rand[1], rand[2]);

	for (p of particlelist) {
		posdiffx = mouseX - p.x;
		posdiffy = mouseY - p.y;
		mag = posdiffx * posdiffx + posdiffy * posdiffy;
		if (mag < repulse) {
			p.x -= -p.vx / Math.abs(p.vx) * 15 * (repulse - mag) / repulse;
			p.y -= p.vy / Math.abs(p.vy) * 15 * (repulse - mag) / repulse;
		}
		p.x += p.vx;
		p.y += p.vy;

		if (p.x >= can.width - p.radius) {
			p.x = can.width - p.radius;
			p.vx *= -1;
		} if (p.x <= p.radius) {
			p.x = p.radius;
			p.vx *= -1
		} if (p.y >= can.height - p.radius) {
			p.y = can.height - p.radius;
			p.vy *= -1
		} if (p.y <= p.radius) {
			p.y = p.radius;
			p.vy *= -1
		}

		for (p1 of particlelist) {
			if (p1 != p) {
				length = ((p1.y - p.y) * (p1.y - p.y) + (p1.x - p.x) * (p1.x - p.x))
				if (length < maxlength) {
					color = "rgba(255,255,255," + (maxlength - length) / maxlength * 0.5 + ")";
					stroke(color);

					strokeWeight((maxlength - length) / maxlength)
					line(p.x, p.y, p1.x, p1.y);
				}
			}
		}
		noStroke();
		fill("rgba(255,255,255,0.5)")
		circle(p.x, p.y, p.radius*2)
	}


}


function windowResized() {
	if (h < 100) {
		h = 100;
	}
	can.position((windowWidth - width) / 2, h);
}

function mouseClicked() {

	sign = Math.random() < 0.5 ? -1 : 1;
	sign2 = Math.random() < 0.5 ? -1 : 1;
	p = Object.create(particle);
	p.x = mouseX;
	p.y = mouseY;
	p.vx = Math.random() * 1.2 * sign;
	p.vy = Math.random() * 1.2 * sign2;
	p.type = math[Math.floor(Math.random() * math.length)];
	p.radius = random(2, 10);
	particlelist.push(p)

}