const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");

const memoized = {};

function checkIfBelongsToMandelbrotSet(x, y) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var maxIterations = 50;
    if (memoized[`[${x},${y}]`]) {
        console.log(`[${x},${y}]`)
        return memoized[`[${x},${y}]`];
    }
    for (var i = 0; i < maxIterations; i++) {
        var tempRealComponent = realComponentOfResult * realComponentOfResult
            - imaginaryComponentOfResult * imaginaryComponentOfResult
            + x;
        var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
            + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;

        // Return a number as a percentage
        if (realComponentOfResult * imaginaryComponentOfResult > 5) {
            memoized[`[${x},${y}]`] = (i / maxIterations * 100)
            return memoized[`[${x},${y}]`];
        }
    }
    memoized[`[${x},${y}]`] = 0;
    return 0;
}

var magnificationFactor = 200;
var panX = 2;
var panY = 1.5;
function render() {
    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
            var belongsToSet =
                checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX,
                    y / magnificationFactor - panY); //hey check messenger
            if (belongsToSet == 0) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x, y, 1, 1); // Draw a black pixel
            } else {
                ctx.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
                ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
            }
        }
    }
}

setInterval(function () {
    magnificationFactor += 10;
    panX *= 0.97;
    panY *= 0.97;
    render();
}, 100)