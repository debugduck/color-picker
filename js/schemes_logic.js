document.getElementById("schemes-tab").className = 'active';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Takes an array of r, g, and b values and returns the hex code for the color
function getHex(red, green, blue) {
	// Get the base 16 representation of the r, g, or b pixel
	// get the last two digits with slice
	red = ("0" + red.toString(16)).slice(-2);
	green = ("0" + green.toString(16)).slice(-2);
	blue = ("0" + blue.toString(16)).slice(-2);
	console.log(red);
	console.log(green);
	console.log(blue);
	var hex = "#"+red+blue+green;
	return hex;
}

var r = getRandomIntInclusive(0, 255);
var g = getRandomIntInclusive(0, 255);
var b = getRandomIntInclusive(0, 255);
var hex = getHex(r, g, b);
console.log(hex);
document.getElementById("scheme_canvas_one").style.background = hex;
document.getElementById("hex_scheme_one").value = hex;
