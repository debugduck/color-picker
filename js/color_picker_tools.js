
/**
**************************
*   COLOR PICKER LOGIC   *
*                        *
**************************
**/

// Sets up the color wheel and grayscale images
var wheel = setImage("static/color_wheel_resized.png");
var scale = setImage("static/black_white_gradient_resized4.png");
//var rgb = "";

// Handles all of the actions that the event listeners are in charge of
wheel.onload = updateColorBoxes(wheel, 'color_canvas', 'preview_canvas', 'hex_preview', 'choice_canvas', 'hex_choice');
scale.onload = updateColorBoxes(scale, 'grayscale_canvas', 'preview_canvas', 'hex_preview', 'choice_canvas', 'hex_choice');

// **UTILITY FUNCTIONS**

// Creates a new image object with the given path
function setImage(img_src) {
	var img = new Image();
	img.crossOrigin = "anonymous";
	img.src = img_src;
	return img;
}

//Sets up an image and returns an array with the current pixel's r, g, b, a information
function getPixelFromImage(ctx) {
	var x = event.clientX - ctx.canvas.offsetLeft;
	var y = event.clientY - ctx.canvas.offsetTop;
	var img = ctx.getImageData(x, y, 1, 1);
	var px = img.data;
	return px;
}

// Takes a decimal value for the red, green, and blue values
// Returns a hex code for the color made from the given RGB values
function getHex(r, g, b) {
	// Get the base 16 representation of the r, g, or b pixel
	// Put these values together to get the hex value
	return ("#"+decToHex(r)+decToHex(g)+decToHex(b));
}

// Returns a base 16 representation of a given base 10 number
function decToHex(num) {
	return (num.toString(16)).slice(-2);
}

// **EVENT LISTENERS**

// Handles the creation and updating of the color and hex value boxes
function updateColorBoxes(img, canvas, prev_canvas, prev_hex, choice_canvas, choice_hex) {
	// Set up the image on its corresponding canvas
	var ctx = document.getElementById(canvas).getContext('2d');
	ctx.drawImage(img, 0, 0, img.width, img.height);
	
	// Adds event listeners to update the hex value and color box
	makeEventListener(ctx, prev_canvas, prev_hex, 'mousemove');	
	makeEventListener(ctx, choice_canvas, choice_hex, 'click');
}

// Create an event listener for clicking or hovering with the given HTML elements
function makeEventListener(ctx, canvas, hex_input, opt) {
	ctx.canvas.addEventListener(opt, function(event) {
		var pixel = getPixelFromImage(ctx);
		var hex = getHex(pixel[0], pixel[1], pixel[2]);
		// FILL HOVER OR CLICK BOXES (depending on the value of opt)
		var previewColor = document.getElementById(canvas).style.background = hex;
		var previewBox = document.getElementById(hex_input).value = hex;
	});	
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
	//alert("hi.")
	return value;
}

// **EVENT LISTENERS**

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