/**
**************************
*    RGB SLIDER LOGIC    *
*                        *
**************************
**/

document.getElementById("rgb-tab").className = 'active';

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
