wheel.onload = function() {
	var color_ctx = document.getElementById('color_canvas').getContext('2d');
	color_ctx.drawImage(wheel, 0, 0, wheel.width, wheel.height);
	
	// Event Listener that handles hovering over the color wheel
	color_ctx.canvas.addEventListener('mousemove', function(event) {
		hex = getHex(color_ctx)
		// Change the background of the preview box to the color of the crosshair as it hovers
		var previewColor = document.getElementById('preview_canvas').style.background = hex;
		document.getElementById('hex_preview').value = hex;
	});
	
	color_ctx.canvas.addEventListener('click', function(event) {
		document.getElementById('hex_choice').value = hex;
		var choiceColor = document.getElementById('choice_canvas').style.background = hex;
	});
}

scale.onload = function() {
	var gray_ctx = document.getElementById('grayscale_canvas').getContext('2d');
	gray_ctx.drawImage(scale, 0, 0, scale.width, scale.height);
	
	// Event Listener that handles hovering over the color wheel
	gray_ctx.canvas.addEventListener('mousemove', function(event) {
		hex = getHex(gray_ctx);
		// Change the background of the preview box to the color of the crosshair as it hovers
		var previewColor = document.getElementById('preview_canvas').style.background = hex;
		document.getElementById('hex_preview').value = hex;
	});
	
	gray_ctx.canvas.addEventListener('click', function(event) {
		document.getElementById('hex_choice').value = hex;
		var choiceColor = document.getElementById('choice_canvas').style.background = hex;
	});
}