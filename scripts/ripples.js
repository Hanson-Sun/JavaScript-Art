print = console.log;


var width = 600;
var height = 600;
var dampening = 0.98;


var currentgrid = new Array(height);
for(i=0;i<height;i++){
	currentgrid[i] = new Array(width).fill(0);
}

var previousgrid = new Array(height);
for(i=0;i<height;i++){
	previousgrid[i] = new Array(width).fill(0);
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
	pixelDensity(1);
	background(33, 37, 57);
	count= 50000;
}

function draw() {
	var scale = 1;
	background(33, 37, 57);
	loadPixels();
	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {

			currentgrid[x][y] = (previousgrid[x - 1][y] + previousgrid[x + 1][y] + previousgrid[x][y - 1] + previousgrid[x][y + 1]) / 2 - currentgrid[x][y];

			currentgrid[x][y] = currentgrid[x][y] * dampening;
			index = (x + y * width) * 4

			//b[n = (x + y * width) * 4] = b[n + 1] = b[n + 2] = b[n + 3] = currentgrid[x][y];
			pixels[index + 0] = 9+scale*currentgrid[x][y];
			pixels[index + 1] = 10+scale*currentgrid[x][y];
			pixels[index + 2] = 15+scale*currentgrid[x][y];


		}
	}
	updatePixels();

	let ok = previousgrid;
	previousgrid = currentgrid;
	currentgrid = ok;
	if(count>19){
previousgrid[Math.floor(random(width))][Math.floor(random(height))] = 30000;
count= 0
	}
	
	count=count+1
}

function mouseClicked() {

	previousgrid[Math.floor(mouseX)][Math.floor(mouseY)] = 30000;

}


function windowResized() {
  	if(h<100){
		h = 100
	}
	c.position((windowWidth-width)/2,h);
}