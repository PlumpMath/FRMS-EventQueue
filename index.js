module.exports = function(conn){

    client = conn;
	var lastReq = 0;

	function isValid(req){
		if(typeof req.query.sessionid === "undefined" && typeof req.cookies.PHPSESSID === "undefined"){
			// Cant' find a session id anywhere, request invalid
			return false;
		}

		if(typeof req.query.eventid === 'string'
				&& typeof req.query.someid === 'string'
				&& typeof req.query.typecode === 'string'
				&& typeof req.query.pagename === 'string'			
				&& typeof req.query.sourcecode === 'string'){
			// Valid "Common Event"
			return true;
		} else if((typeof req.query.siteid === 'string'
				|| typeof req.query.site === 'string')
				&& typeof req.query.code === 'string'
				&& typeof req.query.time === 'string'			
				&& typeof req.query.length === 'string'){
			// Valid "Timed Event"
			return true;
		} else {
			// Missing fields, request invalid
			return false;
		}      
      }

     return {
      logevent: function(req, res, next) {
      
        if(!isValid(req)){
			res.send(400);		
			return;
		}
		
		if(typeof req.query.sessionid === "undefined"){
			req.query.sessionid = req.cookies.PHPSESSID;
		}
		if(typeof req.query.eventtime === "undefined"){
			req.query.eventtime = Math.round((new Date()).getTime() / 1000);
		}
		if(typeof req.query.jsguid === "undefined"){
			req.query.jsguid = guid();
		}
	
		var resqueObj = {
				"class" : "QueueHandler\\UserEventBuffer",
				"args" : [{
					"event" : req.query
				}]
		};	
		
		// Push to redis
		console.log('trying to push to redis');
		client.rpush("resque:queue:userEventBuffer", JSON.stringify(resqueObj), function(err, replies){
			if(err){
				res.send(500, err);
			}else{
				res.send(200);
				lastReq = new Date().getTime();
				console.log('success: '+lastReq);
			}
		});
		
		
		   /**
     * Returns a RFC 4122 compliant UUID
     */
    var guid = function(){
    	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(match){
    		if(match === 'x'){
    			// Replace x's with a random hex digit
    			return (Math.floor(Math.random() * 16)).toString(16);
    		} else {
    			// Replace y with one of 4 chars
    			var options = ['8', '9', 'A', 'B'];
    			return options[Math.floor(Math.random() * 4)];
    		}
    	});
    };

	client.on("error", function (err) {
	    console.log("error event - " + client.host + ":" + client.port + " - " + err);
	});
	
	
	function createWorker() {
	var worker = cluster.fork();
	workers[worker.process.pid] = {worker:worker, lastCb: new Date().getTime() + 5000};
	worker.on('message', function checkStatus(m) {
		if(m.cmd === "processed") {
			workers[m.process].lastCb = m.lastRequest;
		}
	})
	console.log('worker'+worker);
    }
		
		//eof
      }
  
    }
}