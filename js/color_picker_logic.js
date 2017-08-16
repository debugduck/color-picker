document.getElementById("picker-tab").className = 'active';

// Counts the number of cards on the page
var id_count = 1;
var card_count = 0;

var canvas = document.getElementById('gradient-box'),
    ctx = canvas.getContext('2d'),
	treq;

function draw() {
    var grH = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    grH.addColorStop(0, '#fff');
    grH.addColorStop(1,  'hsl(' + HUE.value + ', 100%, 50%)');
    
    ctx.fillStyle = grH;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var grV = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    grV.addColorStop(0, 'rgba(0,0,0,0)');
    grV.addColorStop(1,  '#000');

    ctx.fillStyle = grV;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

HUE.oninput = function() {
   cancelAnimationFrame(treq);
   treq = requestAnimationFrame(draw);
};

draw();

// **EVENT LISTENERS**

	
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
	var cardDiv = "<div class=\"color-swatch\" id=\"card-"+ id_count + "\">  <div class=\"mdl-cell mdl-cell--2-col mdl-cell--4-col-phone\">  <div class=\"demo-card-wide mdl-card mdl-shadow--2dp\" id=\"color-swatch-" + id_count + "\"> <div class=\"mdl-card__title\" id=\"color-title-" + id_count + "\"><h6 class=\"mdl-card__title-text\"></div>    <div class=\"mdl-card__supporting-text\"> <output type=\"text\" name=\"hex_selected\" id=\"color-hex-" + id_count + "\">#ffffff</output></h6></div>  <div class=\"mdl-card__menu\"> <button onClick=\"removeCard(this)\"class=\"mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect\" value=\"" + id_count + "\"> <i class=\"material-icons\">clear</i></button></div>  </div></div></div>"
	document.getElementById("cards").innerHTML += cardDiv;
	// Get current pixel and its hex code
	var pixel = getPixel(e, ctx);
	hex = getHex(pixel);
	document.getElementById(("color-title-" + id_count)).style.background = hex;
	document.getElementById(("color-hex-" + id_count)).value = hex;
	id_count += 1;
	card_count += 1;
	
	
});

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

// Removes the selected color swatch from the page
function removeCard(element) {
	cardNum = element.value;
	id = "card-" + cardNum;
	card_count -= 1;
	if(card_count === 0) {
		id_count = 1;
	}
	document.getElementById("card-" + cardNum).remove();

}
