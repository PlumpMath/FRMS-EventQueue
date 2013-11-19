var httputil = require('nodeunit').utils.httputil;
var http = require('http');

//	Tests the Full URL
exports.testCommonEventSessionIdFullUrl = function(test) {
	var url = 'http://localhost:4000/log-event?eventid=CommunityTheater_Sm_Player_Impression&someid=1000064951&typecode=site&pagename=Profile&sourcecode=ForRent.com&sessionid=h91ok1f8pp1rjd564o68qokmk7&eventtime=1374700414&jsguid=73e26b2a-6adf-4625-A4bb-db2073a085d4';
	
	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
		
  		res.on('data', function(d) {
    		//process.stdout.write(d);
  		});
  		
  		test.equal(responseCode, 200, 'Session Id with Full URL Passed with a 200 response code.');
		test.done();
	});
	req.end();

	req.on('error', function(e) {
 		console.error(e);
	});
};

//	Tests the URL with only Session Id
exports.testCommonEventSessionIdJustSessionId = function(test) {
	var url = 'http://localhost:4000/log-event?sessionid=h91ok1f8pp1rjd564o68qokmk7';
	
	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
  		
  		res.on('data', function(d) {
    		//process.stdout.write(d);
  		});
  		
  		test.equal(responseCode, 400, 'Just Session Id passed and sent 400 response code.');
		test.done();
	});
	req.end();

	req.on('error', function(e) {
 		console.error(e);
	});
};

//	Tests the URL with no Session Id
exports.testCommonEventSourceCodeNoSourceCode = function(test) {
	var url = 'http://localhost:4000/log-event?eventid=CommunityTheater_Sm_Player_Impression&someid=1000064951&typecode=site&pagename=Profile&sourcecode=ForRent.com&jsguid=73e26b2a-6adf-4625-A4bb-db2073a085d4';

	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
		
  		res.on('data', function(d) {
    		//process.stdout.write(d);
  		});
  		
  		test.equal(responseCode, 500, 'No Session ID in URL Passed Test with Response Code: 500');
		test.done();
	});
	req.end();

	req.on('error', function(e) {
 		console.error(e);
	});
};


/*
	GIT Instructions
	
	1) git status
	2) git add fileName.js (only if a file needs to be added)
	3) git commit -m "message about the commit"
	4) git push
*/