
/**
**************************
*   COLOR PICKER LOGIC   *
*                        *
**************************
**/

// Variable set-up
var wheel = new Image();
wheel.crossOrigin = "anonymous";
var hex = "";
wheel.src = "static/color_wheel_resized.png";
var scale = new Image();
scale.crossOrigin = "anonymous";
scale.src = "static/black_white_gradient_resized.png";

// **EVENT LISTENERS**

// Handles the actions for the color wheel
wheel.onload = function() {
	// Draw the image onto the canvas
	var ctx = document.getElementById('color_canvas').getContext('2d');
	ctx.drawImage(wheel, 0, 0, wheel.width, wheel.height);
	
	// Listens for hovering over the canvas
	ctx.canvas.addEventListener('mousemove', function(e) {
		// Get current pixel and its hex code
		var pixel = getPixel(e, ctx);
		hex = getHex(pixel);
		
		// Update the preview boxes
		updateBoxes('preview_canvas', 'hex_preview', hex);
	});
	
	// Listens for a color change click and updates the selected color
	ctx.canvas.addEventListener('click', function(e) {
		updateBoxes('choice_canvas', 'hex_choice', hex);
	});
}

// Handles the actions for the grayscale canvas
scale.onload = function() {
	// Draw the image onto the canvas	
	var ctx = document.getElementById('grayscale_canvas').getContext('2d');
	ctx.drawImage(scale, 0, 0, scale.width, scale.height);
	
	// Listens for hovering over the canvas
	ctx.canvas.addEventListener('mousemove', function(e) {
		// Get current pixel and its hex code		
		var pixel = getPixel(e, ctx);
		hex = getHex(pixel);
		
		// Update the preview boxes
		updateBoxes('preview_canvas', 'hex_preview', hex);
	});
	
	// Listens for a color change click and updates the selected color
	ctx.canvas.addEventListener('click', function(e) {
		updateBoxes('choice_canvas', 'hex_choice', hex);
	});
}

// **UTILITY FUNCTIONS**

// Updates the preview box and hex code box with the new color value
function updateBoxes(color, code, newValue) {
		document.getElementById(color).style.background = newValue;
		document.getElementById(code).value = newValue;
}

// Takes an array of r, g, and b values and returns the hex code for the color
function getHex(imgData) {
	// Get the base 16 representation of the r, g, or b pixel
	// get the last two digits with slice
	var r = ("0" + (imgData[0]).toString(16)).slice(-2);
	var g = ("0" + (imgData[1]).toString(16)).slice(-2);
	var b = ("0" + (imgData[2]).toString(16)).slice(-2);
	hex = "#"+r+g+b;
	return hex;
}

// Takes an event and a context and extracts the corresponding pixel RGB values to an array
function getPixel(e, ctx) {
	var x = e.clientX - ctx.canvas.offsetLeft;
	var y = e.clientY - ctx.canvas.offsetTop;
	var color_img = ctx.getImageData(x, y, 1, 1);
	var pixel = color_img.data;
	return pixel;
}


/**
**************************
*    RGB SLIDER LOGIC    *
*                        *
**************************
**/

// Variable set-up
var red_input = document.getElementById('red_input');
var red_output = document.getElementById('red_output');
var green_input = document.getElementById('green_input');
var green_output = document.getElementById('green_output');
var blue_input = document.getElementById('blue_input');
var blue_output = document.getElementById('blue_output');
var r_hex = "00";
var g_hex = "00";
var b_hex = "00";

// **UTILITY FUNCTIONS**

// Pads a hex value withn the correct number of zeros
function pad(numStr){
  return (numStr.length < 2) ? "0" + numStr : numStr;
}

// Extracts a submitted value from a given element id
function submitHex(id) {
    var value = document.getElementById(id).value;
	return value;
}

// **EVENT LISTENERS**
// Listens for changes to the red, green, and blue sliders

red_input.addEventListener('input', function () {
	red_output.innerHTML = red_input.value;
	r_hex = parseInt(red_output.value, 10).toString(16);
	hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
	document.getElementById('rgb_canvas').style.background = hex;
	document.getElementById('rgb_hex').value = hex;
}, false);

green_input.addEventListener('input', function () {
	green_output.innerHTML = green_input.value;
	g_hex = parseInt(green_output.value, 10).toString(16);
	hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
	document.getElementById('rgb_canvas').style.background = hex;
	document.getElementById('rgb_hex').value = hex;
}, false);

blue_input.addEventListener('input', function () {
	blue_output.innerHTML = blue_input.value;
	b_hex = parseInt(blue_output.value, 10).toString(16);
	hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
	document.getElementById('rgb_canvas').style.background = hex;
	document.getElementById('rgb_hex').value = hex;
}, false);
