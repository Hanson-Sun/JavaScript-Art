
class Circle {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;

	}
	draw() {
		noStroke();
		let num = random(0.25, 1);
		fill('rgba(255,255,255,' + num + ')');
		circle(this.x, this.y, this.r * 2);
	}
}

function setup() {
	circles = [];
	var width = 600;
	var height = 600;
	radius = 100;
	run = true;

	can = createCanvas(width, height);
	h = (windowHeight - height) / 2;
	if (h < 100) {
		h = 100;
	}

	can.position((windowWidth - width) / 2, h);
	background(random(0, 100), random(0, 100), random(0, 100));
	frameRate(30);
	iter = 5;
}

function draw() {
	if (run) {
		found = false;
		while (found == false) {
			isdraw = true;
			circ = new Circle(random(width), random(height), random(radius));


			for (c of circles) {
				if (c != circ) {
					pos = ((circ.x - c.x) ** 2 + (circ.y - c.y) ** 2) ** 0.5;
					if (pos < (c.r + circ.r) + 2) {
						//print("bruh")
						isdraw = false;
						break;
					}
				}
			}

			if (isdraw) {
				circ.draw();
				circles.push(circ);
				found = true;
			}

		}


	}
}


function windowResized() {
	if (h < 100) {
		h = 100;
	}
	can.position((windowWidth - width) / 2, h);
}

function mouseClicked() {
	//run = !run;
	var count = 0;
	while(count < 100){
		isdraw = true;
		circ = new Circle(random(width), random(height), random(radius));


		for (c of circles) {
			if (c != circ) {
				pos = ((circ.x - c.x) ** 2 + (circ.y - c.y) ** 2) ** 0.5;
				if (pos < (c.r + circ.r) + 2) {
					//print("bruh")
					isdraw = false;
					break;
				}
			}
		}

		if (isdraw) {
			circ.draw();
			circles.push(circ);
			count++;
		}		
	}

}