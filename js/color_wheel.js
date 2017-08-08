// Sets up the color wheel and grayscale images
var wheel = new Image();
var scale = new Image();
wheel.crossOrigin = "anonymous";
scale.crossOrigin = "anonymous";
var hex = "";
wheel.src = "static/color_wheel_resized.png"
scale.src = "static/black_white_gradient_resized.png"

wheel.onload = updateColorBoxes(wheel, 'color_canvas', 'preview_canvas', 'hex_preview', 'choice_canvas', 'hex_choice');
scale.onload = updateColorBoxes(scale, 'grayscale_canvas', 'preview_canvas', 'hex_preview', 'choice_canvas', 'hex_choice');

// Takes the context for the canvas and returns the hex value of each pixel
function getHex(ctx) {
	var x = event.clientX - ctx.canvas.offsetLeft;
	var y = event.clientY - ctx.canvas.offsetTop;
	var img = ctx.getImageData(x, y, 1, 1);
	var px = img.data;
	// Get the base 16 representation of the r, g, or b pixel
	// get the last two digits with slice
	var r = ("0" + (px[0]).toString(16)).slice(-2);
	var g = ("0" + (px[1]).toString(16)).slice(-2);
	var b = ("0" + (px[2]).toString(16)).slice(-2);
	
	// Put these values together to get the hex value
	hex = "#"+r+g+b;
	return hex;
}

function updateColorBoxes(img, canvas, elt1, elt2, elt3, elt4) {
	var ctx = document.getElementById(canvas).getContext('2d');
	ctx.drawImage(img, 0, 0, img.width, img.height);
	
	// Adds event listeners to update the hex value and color box
	makeEventListener(ctx, elt1, elt2, 'mousemove');	
	makeEventListener(ctx, elt3, elt4, 'click');
}

function makeEventListener(ctx, box1, box2, opt) {
	// HOVER
	ctx.canvas.addEventListener(opt, function(event) {
		var hex = getHex(ctx);
		// PREVIEW BOXES
		var previewColor = document.getElementById(box1).style.background = hex;
		var previewBox = document.getElementById(box2).value = hex;
	});	
}


