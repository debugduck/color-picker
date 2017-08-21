document.getElementById("schemes-tab").className = 'active';

// Counts the number of cards on the page
var id_count = 0;
var card_count = 0;
var current_div = 0;

function submitNum() {
	var count = document.getElementById('num-schemes').value;
	if(card_count > 0) {
		removeAll();
	}
	for(i = 1; i <= count; i++) {
		generateCard();
	}
}

function generateCard() {
	if(id_count % 4 === 0 || current_div === 0) {
		current_div += 1;
		document.getElementById("schemes-body").innerHTML += "<div class=\"scheme-cards\"id=\"scheme-div-"+ current_div + "\"></div>";
	}
	cardDiv = "<div class=\"scheme-swatch\" id=\"scheme-card-"+ id_count + "\">  <div class=\"mdl-cell mdl-cell--2-col mdl-cell--4-col-phone\">  <div class=\"demo-card-wide mdl-card mdl-shadow--2dp\" id=\"scheme-swatch-" + id_count + "\"> <div class=\"mdl-card__title\" id=\"scheme-title-" + id_count + "\"><h6 class=\"mdl-card__title-text\"></div>    <div class=\"mdl-card__supporting-text mdl-card--expand\"> <output type=\"text\" name=\"hex_selected\" id=\"scheme-hex-" + id_count + "\">#ffffff</output><button onClick=\"showSliders(this)\"class=\"mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect scheme-edit-btn\" value=\"" + id_count + "\"> <i class=\"material-icons\">colorize</i></button><div class=\"schemes-edit-button\" id=\"scheme-edit-btn-"+ id_count + "\"></div><div class=\"scheme-edit\" id=\"scheme-edit-"+ id_count + "\"></div></div>  <div class=\"mdl-card__menu\"><button onClick=\"removeCard(this)\"class=\"mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect\" value=\"" + id_count + "\"> <i class=\"material-icons\">clear</i></button></div> </div></div></div>";
	document.getElementById("scheme-div-" + current_div).innerHTML += cardDiv;
	document.getElementById("scheme-card-" + id_count).style.display = "inline-flex";
	// Get a random combination of rgb values and create a hex code
	var r = getRandomIntInclusive(0, 255);
	var g = getRandomIntInclusive(0, 255);
	var b = getRandomIntInclusive(0, 255);
	var hex = getHex(r, g, b);
	document.getElementById(("scheme-title-" + id_count)).style.background = hex;
	document.getElementById(("scheme-hex-" + id_count)).value = hex;
	id_count += 1;
	card_count += 1;
}

function showSliders(element) {
	document.getElementById("scheme-edit-btn-" + element.value).style.display = 'none';
	if(document.getElementById("scheme-rgb-sliders-" + element.value) === null) {
		//$("scheme-edit-btn-" + element.value).hide();
		var sliders = "<div class=\"scheme-rgb-sliders\" id=\"scheme-rgb-sliders-" + element.value + "\"><h6>RGB Scale</h6><h6>Red: <output id=\"scheme-" + element.value + "-red-output\">0</output></h6><input class=\"mdl-slider mdl-js-slider\" id=\"scheme-" + element.value + "-red-input\" type=\"range\"min=\"0\" max=\"255\" value=\"0\" tabindex=\"0\"><!-- Default Slider --><h6>Green: <output id=\"scheme-" + element.value + "-green-output\">0</output></h6><input class=\"mdl-slider mdl-js-slider\" id=\"scheme-" + element.value + "-green-input\" type=\"range\"min=\"0\" max=\"255\" value=\"0\" tabindex=\"0\"><!-- Default Slider --><h6>Blue: <output id=\"scheme-" + element.value + "-blue-output\">0</output></h6><input class=\"mdl-slider mdl-js-slider\" id=\"scheme-" + element.value + "-blue-input\" type=\"range\"min=\"0\" max=\"255\" value=\"0\" tabindex=\"0\"><br ><button onClick=\"closeEdit(this)\" class=\"mdl-button mdl-js-button mdl-button--icon done-edit-btn\" id=\"scheme-edit-done-" + element.value + "\" value=\"" + element.value + "\"><i class=\"material-icons\">done</i></button></div>";
		var cardNum = element.value;
		document.getElementById("scheme-edit-" + cardNum).innerHTML += sliders;
		var red_input = document.getElementById("scheme-" + cardNum + "-red-input");
		var green_input = document.getElementById("scheme-" + cardNum + "-green-input");
		var blue_input = document.getElementById("scheme-" + cardNum + "-blue-input");
		var red_output = document.getElementById("scheme-" + cardNum + "-red-output");
		var green_output = document.getElementById("scheme-" + cardNum + "-green-output");
		var blue_output = document.getElementById("scheme-" + cardNum + "-blue-output");
		var curr_hex = document.getElementById("scheme-hex-" + cardNum).value
		var old_r = parseInt(curr_hex.substring(1, 3), 16);
		var old_g = parseInt(curr_hex.substring(3, 5), 16);
		var old_b = parseInt(curr_hex.substring(5, 7), 16);
		document.getElementById("scheme-" + cardNum + "-red-input").value = old_r;
		document.getElementById("scheme-" + cardNum + "-green-input").value = old_g;
		document.getElementById("scheme-" + cardNum + "-blue-input").value = old_b;
		document.getElementById("scheme-" + cardNum + "-red-output").value = old_r;
		document.getElementById("scheme-" + cardNum + "-green-output").value = old_g;
		document.getElementById("scheme-" + cardNum + "-blue-output").value = old_b;
		var r_hex = "00";
		var g_hex = "00";
		var b_hex = "00";

		// **EVENT LISTENERS**
		// Listens for changes to the red, green, and blue sliders

		red_input.addEventListener('input', function () {
			red_output.innerHTML = red_input.value;
			curr_hex = document.getElementById("scheme-hex-" + cardNum).value
			console.log(curr_hex);
			r_hex = parseInt(red_output.value, 10).toString(16);
			hex = "#" + pad(r_hex) + pad(curr_hex.substring(3, 5)) + pad(curr_hex.substring(5, 7));
			document.getElementById("scheme-title-" + cardNum).style.background = hex;
			document.getElementById("scheme-hex-" + cardNum).value = hex;
		}, false);

		green_input.addEventListener('input', function () {
			green_output.innerHTML = green_input.value;
			curr_hex = document.getElementById("scheme-hex-" + cardNum).value
			g_hex = parseInt(green_output.value, 10).toString(16);
			hex = "#" + pad(curr_hex.substring(1, 3)) + pad(g_hex) + pad(curr_hex.substring(5, 7));
			document.getElementById("scheme-title-" + cardNum).style.background = hex;
			document.getElementById("scheme-hex-" + cardNum).value = hex;
		}, false);

		blue_input.addEventListener('input', function () {
			blue_output.innerHTML = blue_input.value;
			curr_hex = document.getElementById("scheme-hex-" + cardNum).value
			b_hex = parseInt(blue_output.value, 10).toString(16);
			hex = "#" + pad(curr_hex.substring(1, 3)) + pad(curr_hex.substring(3, 5)) + pad(b_hex);
			document.getElementById("scheme-title-" + cardNum).style.background = hex;
			document.getElementById("scheme-hex-" + cardNum).value = hex;
		}, false);
	} else {
		document.getElementById("scheme-rgb-sliders-" + element.value).style.display = 'block';	
	}
}

function closeEdit(element) {
	document.getElementById("scheme-rgb-sliders-" + element.value).style.display = 'none';	
	document.getElementById("scheme-edit-btn-" + element.value).style.display = 'flex';
}

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
	var hex = "#"+red+blue+green;
	return hex;
}

// Removes the selected color swatch from the page
function removeCard(element) {
	cardNum = element.value;
	id = "scheme-card-" + cardNum;
	card_count -= 1;
	document.getElementById("scheme-card-" + cardNum).remove();
	if(card_count === 0) {
		id_count = 1;
		window.location.reload();		
	}
}

function removeAll() {
	for(i = 0; i <= id_count; i++) {
		if(document.getElementById("scheme-card-" + i) != null) {
			document.getElementById("scheme-card-" + i).remove();
		}
	}
}

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
		
