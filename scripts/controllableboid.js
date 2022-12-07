const tau = Math.PI * 2;

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

class Boid {
    constructor(pos, size = 1, sight = 100 * size) {
        this.pos = new Vector2D(pos.x, pos.y);
        this.rot = Math.random() * tau;
        this.size = size;
        this.sight = sight;
        this.history = [];
    }

    rotate(rot = 0.01) {
        this.rot += rot;
        this.rot = this.rot % tau;
    }

    setRot(rot) {
        this.rot = rot;
        this.rot = this.rot % tau;
    }

    turnTo(pos, mag = 0.1) {
        if ((this.pos.x - pos.x) * Math.sin(this.rot) > (this.pos.y - pos.y) * Math.cos(this.rot)) {
            this.rotate(mag);
        } else {
            this.rotate(-mag);
        }
        this.rot = this.rot % tau;
    }

    step(len = 1) {
        this.pos.x += len * Math.cos(this.rot);
        this.pos.y += len * Math.sin(this.rot);
        if (this.pos.x < 0) {
            this.pos.x = canvas.width + this.pos.x;
        }
        else if (this.pos.x > canvas.width) {
            this.pos.x = this.pos.x - canvas.width;
        }
        if (this.pos.y < 0) {
            this.pos.y = canvas.height + this.pos.y;
        }
        else if (this.pos.y > canvas.height) {
            this.pos.y = this.pos.y - canvas.height;
        }
    }

    avoid(boidlist, mag = 0.1) {
        for (let i = 0; i < boidlist.length; i++) {
            const boid = boidlist[i];
            if (
                boid != this
                && new Vector2D(boid.pos.x - this.pos.x, boid.pos.y - this.pos.y).mag() < this.sight / 2
                && new Vector2D(boid.pos.x - this.pos.x, boid.pos.y - this.pos.y).dot(new Vector2D(Math.cos(this.rot), Math.sin(this.rot))) > 0
            ) {
                if ((this.pos.x - boid.pos.x) * Math.sin(this.rot) > (this.pos.y - boid.pos.y) * Math.cos(this.rot)) {
                    this.rotate(-Math.min(mag * 1.5, mag * 25 / new Vector2D(boid.pos.x - this.pos.x, boid.pos.y - this.pos.y).mag()));
                } else {
                    this.rotate(Math.min(mag * 1.5, mag * 25 / new Vector2D(boid.pos.x - this.pos.x, boid.pos.y - this.pos.y).mag()));
                }
            }
        }
    }

    align(boidlist, mag = 0.01) {
        for (let i = 0; i < boidlist.length; i++) {
            const boid = boidlist[i];
            if (
                boid != this
                && new Vector2D(boid.pos.x - this.pos.x, boid.pos.y - this.pos.y).mag() < this.sight
                && new Vector2D(boid.pos.x - this.pos.x, boid.pos.y - this.pos.y).dot(new Vector2D(Math.cos(this.rot), Math.sin(this.rot))) > -0.5
            ) {
                if ((-Math.cos(boid.rot)) * Math.sin(this.rot) > (-Math.sin(boid.rot)) * Math.cos(this.rot)) {
                    this.rotate(mag);
                } else {
                    this.rotate(-mag);
                }
            }
        }
    }

    steer(boidlist, mag = 0.01) {
        for (let i = 0; i < boidlist.length; i++) {
            const boid = boidlist[i];
            if (
                boid != this
                && new Vector2D(boid.pos.x - this.pos.x, boid.pos.y - this.pos.y).mag() < this.sight
            ) {
                if ((this.pos.x - boid.pos.x) * Math.sin(this.rot) > (this.pos.y - boid.pos.y) * Math.cos(this.rot)) {
                    this.rotate(mag);
                } else {
                    this.rotate(-mag);
                }
            }
        }
    }

    draw() {
        /*ctx.beginPath();
        ctx.moveTo(this.pos.x + this.size * 7 * Math.cos(this.rot), this.pos.y + this.size * 7 * Math.sin(this.rot));
        ctx.lineTo(this.pos.x - this.size * 7 * Math.cos(this.rot + 0.54), this.pos.y - this.size * 6 * Math.sin(this.rot + 0.54));
        ctx.lineTo(this.pos.x - this.size * 4 * Math.cos(this.rot), this.pos.y - this.size * 4 * Math.sin(this.rot));
        ctx.lineTo(this.pos.x - this.size * 7 * Math.cos(this.rot - 0.54), this.pos.y - this.size * 6 * Math.sin(this.rot - 0.54));
        ctx.lineTo(this.pos.x + this.size * 7 * Math.cos(this.rot), this.pos.y + this.size * 7 * Math.sin(this.rot));
        ctx.fill();*/

        beginShape()
        vertex(this.pos.x + this.size * 7 * Math.cos(this.rot), this.pos.y + this.size * 7 * Math.sin(this.rot));
        vertex(this.pos.x - this.size * 7 * Math.cos(this.rot + 0.54), this.pos.y - this.size * 6 * Math.sin(this.rot + 0.54));
        vertex(this.pos.x - this.size * 4 * Math.cos(this.rot), this.pos.y - this.size * 4 * Math.sin(this.rot));
        vertex(this.pos.x - this.size * 7 * Math.cos(this.rot - 0.54), this.pos.y - this.size * 6 * Math.sin(this.rot - 0.54));
        endShape(CLOSE);
    }
}

const rand = [Math.floor(Math.random(0) * 100), Math.floor(Math.random(0) * 100), Math.floor(Math.random(0) * 100)]

const boidlist = [];
for (let i = 0; i < 100; i++) {
    boidlist.push(new Boid(new Vector2D(Math.random() * 600, Math.random() * 600), 1, 100));
}

function setup() {
    const width = 600;
    const height = 600;

    var canvas = createCanvas(width, height);
    h = (windowHeight - height) / 2;
    if (h < 150) {
        h = 150;
    }

    canvas.position((windowWidth - width) / 2, h);
	var rand = [random(0, 100), random(0, 100), random(0, 100)]
	background(rand[0], rand[1], rand[2]);
	frameRate(60);
	fill("#ffffff");
	noStroke();
}

function windowResized() {
	if (h < 150) {
		h = 150;
	}
	canvas.position((windowWidth - width) / 2, h);
}

function draw() {
    background(rand[0], rand[1], rand[2])
	
        

    for (let i = 0; i < boidlist.length; i++) {
        const boid = boidlist[i];
        boid.align(boidlist);
        boid.steer(boidlist);
        boid.avoid(boidlist);
        boid.turnTo(new Vector2D(mouseX, mouseY),0.15);
        boid.step(2);
        boid.draw();
    }
}