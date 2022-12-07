


function setup() {
	var width = 600;
	var height = 600;
	res = 30;

	var currentgrid = new Array(height);
	for (i = 0; i < height; i = i + res) {
		currentgrid[i] = new Array(width).fill(0);
	}

	var previousgrid = new Array(height);
	for (i = 0; i < height; i = i + res) {
		previousgrid[i] = new Array(width).fill(0);
	}

	var c = createCanvas(width, height);
	c.center();
	//pixelDensity(1);
	var vectarr = new Array[width / 20][height / 20];


}

function draw() {
	background(220);

}