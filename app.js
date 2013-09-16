
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var gpio = require("pi-gpio");




gpio.open(16, "output", function(err) {        // Open pin 16 for output
    gpio.write(16, 1, function() {            // Set pin 16 high (1)
        gpio.read(16, function(err, value){
          //if(err) throw err;
          console.log(value);    // The current state of the pin
          gpio.close(16);  // Close pin 16
        });                      
    });
});



/*var gpio = require("gpio");
var gpio22, gpio4, intervalTimer;

// Flashing lights if LED connected to GPIO22
gpio22 = gpio.export(22, {
  ready: function() {
    intervalTimer = setInterval(function() {
      gpio22.set();
      console.log("gpio22: ", gpio22.value);
      setTimeout(function() { gpio22.reset(); }, 500);
    }, 1000);
  }
});

// Lets assume a different LED is hooked up to pin 4, the following code 
// will make that LED blink inversely with LED from pin 22 
gpio4 = gpio.export(4, {
  ready: function() {
    // bind to gpio22's change event
    gpio22.on("change", function(val) {
      gpio4.set(1 - val); // set gpio4 to the opposite value
      console.log("gpio4: ", gpio4.value);
    });
  }
});

// reset the headers and unexport after 10 seconds
setTimeout(function() {
  clearInterval(intervalTimer);          // stops the voltage cycling
  gpio22.removeAllListeners('change');   // unbinds change event
  gpio22.reset();                        // sets header to low
  gpio22.unexport();                     // unexport the header

  gpio4.reset();
  gpio4.unexport(function() {
    // unexport takes a callback which gets fired as soon as unexporting is done
    //process.exit(); // exits your node program
  });
}, 10000);*/


