
function randomNum(n) {
	return Math.round(Math.random() * n);
}


window.addEventListener('mousemove', function (e) {

	let xpos = e.pageX;
	let ypos = e.pageY;
	let cur = document.getElementById("cursor");
	cur.style.visibility = "visible";
	cur.style.top = ypos-7.5 + "px";
	cur.style.left = xpos-7.5 + "px";
	
	//console.log(xpos,ypos,cursor.style.top,cursor.style.left)
});
document.getElementById("cursor").style.transform = "scale(0)";
linklist = document.querySelectorAll(".link");

linklist.forEach(function (link) {


	link.addEventListener("mouseenter", function (e) {

		document.getElementById("cursor").style.transform = "scale(8)";


	});
	link.addEventListener('mouseleave', function (e) {
		document.getElementById("cursor").style.transform = "scale(0)";
		console.log("leave");
	});

});




