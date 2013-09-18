
/*
 * GET home page.
 */

var tellstick = require('tellstick');
var td = tellstick();

var server_up = '1';
var server_down = '2';

exports.index = function(req, res){

	res.json(200, { message: 'success'} );

};

function setLights(req, res, on, off){

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

exports.sync = function(req, res){

	try {
		td.list(function(err, list){

			if(!err && list){

				var server_up_status = list[0][2];
				var server_down_status = list[1][2];

				if(server_down_status === "ON"){
					setLights(server_down, server_up);
				}
				else if(server_up_status === "ON") {
					setLights(server_up, server_down);
				}

			}
			else {
				res.json(500, { message: 'failure' } );
			}

		});
	}
	catch(e){
		res.json(500, { message: e } );
	}
	
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

	if(on && off){
		setLights(on, off);
	}
	else {
		res.json(500, { message: 'failure'});
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