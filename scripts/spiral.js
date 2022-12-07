const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");

var a = 5;
var offset = 0; // You have to choose a good offset for your project.

var numArms = 20;
var spin = 0;
var size = {value: 0, direction: 1};

const rand = [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)]

setInterval(() => {
    spin += Math.min(0.01 / numArms, 0.001);
    if ((size.value >= numArms / 3 && size.direction > 0)) {
        size.direction = 0;
    }
    size.value += 0.01 * size.direction / (1 + size.value);
    ctx.fillStyle=`rgb(${rand[0]}, ${rand[1]}, ${rand[2]})`;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.height, canvas.width);
    ctx.fill();
    for (let arm = 0; arm < numArms; arm++) {
        for (let p = 0; p < 100; p++) {
            const pX = a * p * size.value * Math.cos(p + (Math.PI / 2 * arm * spin)) + canvas.width / 2;
            const pY = a * p * size.value * Math.sin(p + (Math.PI / 2 * arm * spin)) + canvas.height / 2;
            const pZ = Math.cos(p + (Math.PI / 2 * arm * spin))*Math.cos(p + (Math.PI / 2 * arm * spin)) * 3 + Math.sin(p + (Math.PI / 2 * arm * spin))*Math.sin(p + (Math.PI / 2 * arm * spin));

            ctx.fillStyle= "white";
            ctx.beginPath();
            ctx.arc(pX, pY, pZ, 0, 2 * Math.PI)
            ctx.fill();
        }
    }
}, 50)