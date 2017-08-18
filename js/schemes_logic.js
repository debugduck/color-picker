document.getElementById("schemes-tab").className = 'active';

// Counts the number of cards on the page
var id_count = 0;
var card_count = 0;
var current_div = 0;

function submitNum(element) {
	var count = document.getElementById('num-schemes').value;
	console.log("in submitNum: " + count);
	for(i = 1; i <= count; i++) {
		generateCard();
	}
}

function generateCard() {
	if(id_count % 4 === 0 || current_div === 0) {
		current_div += 1;
		document.getElementById("schemes-body").innerHTML += "<div class=\"scheme-cards\"id=\"scheme-div-"+ current_div + "\"></div>";
	}
	cardDiv = "<div class=\"scheme-swatch\" id=\"scheme-card-"+ id_count + "\">  <div class=\"mdl-cell mdl-cell--2-col mdl-cell--4-col-phone\">  <div class=\"demo-card-wide mdl-card mdl-shadow--2dp\" id=\"scheme-swatch-" + id_count + "\"> <div class=\"mdl-card__title\" id=\"scheme-title-" + id_count + "\"><h6 class=\"mdl-card__title-text\"></div>    <div class=\"mdl-card__supporting-text\"> <output type=\"text\" name=\"hex_selected\" id=\"scheme-hex-" + id_count + "\">#ffffff</output></h6></div>  <div class=\"mdl-card__menu\"> <button onClick=\"removeCard(this)\"class=\"mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect\" value=\"" + id_count + "\"> <i class=\"material-icons\">clear</i></button></div> </div></div></div>";
	document.getElementById("scheme-div-" + current_div).innerHTML += cardDiv;
	document.getElementById("scheme-card-" + id_count).style.display = "inline-flex";
	// Get a random combination of rgb values and create a hex code
	var r = getRandomIntInclusive(0, 255);
	var g = getRandomIntInclusive(0, 255);
	var b = getRandomIntInclusive(0, 255);
	var hex = getHex(r, g, b);
	console.log(hex);
	document.getElementById(("scheme-title-" + id_count)).style.background = hex;
	document.getElementById(("scheme-hex-" + id_count)).value = hex;
	id_count += 1;
	card_count += 1;
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
	console.log(red);
	console.log(green);
	console.log(blue);
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
