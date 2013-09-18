
/*
 * GET home page.
 */

var tellstick = require('tellstick');
var td = tellstick();

exports.index = function(req, res){

	res.json(200, { message: 'success'} );

};

exports.list = function(req, res){

	td.list(function(err, list){
		if(!err){
			res.json(200, { message: 'success', list: list } );
		}
		else {
			res.json(500, { message: 'failure'} );
		}
	});
	
};

exports.toggle = function(req, res){

	var server_up = '1';
	var server_down = '2';

	var on, off;

	if(req.query.status){
		if(req.query.status === "down"){
			on = server_down;
			off = server_up;
		}
		else if(req.query.status === "up"){
			on = server_up;
			off = server_down;
		}
	}

	if(req.query.on){
		on = req.query.on;
	}
	
	if(req.query.off){
		off = req.query.off;
	}

	if(on && off){

		td.turnOn(on, function(err){

			if(!err){
				console.log('Switch is turned on:', on);
				td.turnOff(off, function(err){
					if(!err){
						console.log('Switch is turned off:', off);
						res.json(200, { message: 'success'} );
					}
					else {
						console.log("failed turning off device:", off);
						res.json(500, { message: 'failure'} );
					}
				});
			} 
			else {
				console.log("failed turning on device:", on);
				res.json(500, { message: 'failure'} );
			}

		});
	}

};

exports.on = function(req, res){

	var device_id = req.params.id;

	if(device_id){
		td.turnOn(device_id, function(err){
			if(!err){
				console.log('Switch is turned on:', device_id);
				res.json(200, { message: 'success'} );
			} 
			else {
				console.log("failed turning on device:", device_id);
				res.json(500, { message: 'failure'} );
			}
		});
	}
	else {
		res.json(500, { message: 'failure: no ID specified.'});
	}

};

exports.off = function(req, res){

	var device_id = req.params.id;

	if(device_id){
		td.turnOff(device_id, function(err){
			if(!err){
				console.log('Switch is turned off:', device_id);
				res.json(200, { message: 'success'} );
			} 
			else {
				console.log("failed turning off device:", device_id);
				res.json(500, { message: 'failure' } );
			}
		});
	}
	else {
		res.json(500, { message: 'failure: no ID specified.'});
	}

};