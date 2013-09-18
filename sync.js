var tellstick = require('tellstick');
var td = tellstick();

td.list(function(err, list){

	if(!err){

		for(var d in list){

			var device = list[d];

			if(device){
				var id = device[0];
				var status = device[2];
				if(id && status && status === "ON"){
					td.turnOff(id);
				}
				else if(id && status && status === "OFF"){
					td.turnOn(id);
				}
			}

		}
		
	}

});