
function rand(n) {
	return Math.round(Math.random() * n);
}

cardlist = document.querySelectorAll(".card");

cardlist.forEach(function (card) {
	var bgcolor = getComputedStyle(card).getPropertyValue('--card-color');


	var size = 6;
	card.style.clipPath = "polygon(" + rand(size) + "% " + rand(size) + "%," + (100 - rand(size)) + "% " + rand(size) + "%," + (100 - rand(size)) + "% " + (100 - rand(size)) + "%," + rand(size) + "% " + (100 - rand(size)) + "%)"


	card.addEventListener('mousemove', function (e) {

		card.style.transition = "transform 0.1s";
		let xpos = e.pageX - card.offsetLeft;
		let ypos = e.pageY - card.offsetTop;
		let xy = xpos + " " + ypos;
		let ratio = card.offsetWidth / 35 * card.offsetHeight / card.offsetWidth
		let rotx = (card.offsetWidth / 2 - xpos) / ratio;
		let roty = (card.offsetHeight / 2 - ypos) / ratio;

		let bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", 150, from(rgba(255,255,255,0.1)), to(rgba(255,255,255,0.0))), " + bgcolor;

		card.style.transform = "scale3D(1.05,1.05,1.05) rotateY(" + (1 * rotx) + "deg) rotateX(" + roty + "deg) translateZ(20px)";
		card.style.background = bgWebKit;
			
			
	});
	card.addEventListener("mouseenter", function (e) {
		card.style.transition = "transform 0.1s";
		let xpos = e.pageX - card.offsetLeft;
		let ypos = e.pageY - card.offsetTop;
		let xy = xpos + " " + ypos;
		let ratio = card.offsetWidth / 35 * card.offsetHeight / card.offsetWidth
		let rotx = (card.offsetWidth / 2 - xpos) / ratio;
		let roty = (card.offsetHeight / 2 - ypos) / ratio;

		card.style.transform = "scale3D(1.05,1.05,1.05) rotateY(" + (1 * rotx) + "deg) rotateX(" + roty + "deg) translateZ(20px)";
		document.getElementById("cursor").style.transform =" scale(1.5)";

	});
	card.addEventListener('mouseleave', function (e) {
		card.style.background = bgcolor;
		card.style.transition = "transform 0.5s"
		card.style.transform = "none";
		document.getElementById("cursor").style.transform =" scale(0.95)";
	});



});

title = document.getElementById("title");


	title.addEventListener('mousemove', function (e) {

		title.style.transition = "transform 0.1s";
		let xpos = e.pageX - title.offsetLeft;
		let ypos = e.pageY - title.offsetTop;
		let xy = xpos + " " + ypos;
		let ratio = title.offsetWidth / 35 * title.offsetHeight / title.offsetWidth
		let rotx = (title.offsetWidth / 2 - xpos) / ratio/4;
		let roty = (title.offsetHeight / 2 - ypos) / ratio*1.5;

		title.style.transform = "scale3D(1.05,1.05,1.05) rotateY(" + (1 * rotx) + "deg) rotateX(" + roty + "deg) translateZ(20px)";
		document.getElementById("cursor").style.transform =" scale(1.5)";
	});
	title.addEventListener("mouseenter", function (e) {
		title.style.transition = "transform 0.1s";
		let xpos = e.pageX - title.offsetLeft;
		let ypos = e.pageY - title.offsetTop;
		let xy = xpos + " " + ypos;
		let ratio = title.offsetWidth / 35 * title.offsetHeight / title.offsetWidth
		let rotx = (title.offsetWidth / 2 - xpos) / ratio/4;
		let roty = (title.offsetHeight / 2 - ypos) / ratio*1.5;

		title.style.transform = "scale3D(1.05,1.05,1.05) rotateY(" + (1 * rotx) + "deg) rotateX(" + roty + "deg) translateZ(20px)";
	});
	title.addEventListener('mouseleave', function (e) {
		title.style.transition = "transform 0.5s"
		title.style.transform = "none";
		document.getElementById("cursor").style.transform =" scale(0.95)";
	});




window.addEventListener('mousemove', function (e) {

	let xpos = e.pageX;
	let ypos = e.pageY;
	let cursor = document.getElementById("cursor");
	cursor.style.visibility = "visible";
	cursor.style.top = ypos-7.5 + "px";
	cursor.style.left = xpos-7.5 + "px";
	

	//console.log(xpos,ypos,cursor.style.top,cursor.style.left)
});

linklist = document.querySelectorAll(".link");

linklist.forEach(function (link) {


	link.addEventListener("mouseenter", function (e) {

		document.getElementById("cursor").style.transform = "scale(8)";


	});
	link.addEventListener('mouseleave', function (e) {
		document.getElementById("cursor").style.transform = "scale(1.5)";

	});



});

imglist = document.querySelectorAll(".cardimg");

imglist.forEach(function (img) {


	var size = 6;
	img.style.clipPath = "polygon(" + rand(size) + "% " + rand(size) + "%," + (100 - rand(size)) + "% " + rand(size) + "%," + (100 - rand(size)) + "% " + (100 - rand(size)) + "%," + rand(size) + "% " + (100 - rand(size)) + "%)"

});

function poem(){
	window.open("html/poem.html");
}