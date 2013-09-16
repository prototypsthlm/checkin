
/*
 * GET home page.
 */

//var gpio = require("gpio");

// Calling export with a pin number will export that header and return a gpio header instance

/*var gpio4 = gpio.export(4, {
	// When you export a pin, the default direction is out. This allows you to set
	// the pin value to either LOW or HIGH (3.3V) from your program.
	direction: 'out',

	// set the time interval (ms) between each read when watching for value changes
	// note: this is default to 100, setting value too low will cause high CPU usage
	interval: 200,

	// Due to the asynchronous nature of exporting a header, you may not be able to
	// read or write to the header right away. Place your logic in this ready
	// function to guarantee everything will get fired properly
	ready: function() {

	}
});*/

var gpio = require("pi-gpio");

exports.index = function(req, res){

	/*gpio4.set(function() {
		console.log(gpio4.value); // should log 1
		res.render('index', { title: gpio4.value });
	});*/

	var state = req.query.state === "1" ? 1 : 0;
	var pin = req.query.pin ? parseInt(req.query.pin, 10) : 7;

	gpio.open(pin, "output", function(err) { // Open pin 16 for output

		if(err) throw err;

		gpio.write(pin, state, function() {

			gpio.read(pin, function(err, value){

				if(err) throw err;

				console.log("pin_val:", value);    // The current state of the pin

				gpio.close(pin);  // Close pin 16

				res.render('index', { title: value });

			});

		});

	});

};