var httputil = require('nodeunit').utils.httputil;
var http = require('http');

//	Tests the Full URL
exports.testCommonEventEventIdFullUrl = function(test) {
	var url = 'http://localhost:4000/log-event?eventid=CommunityTheater_Sm_Player_Impression&someid=1000064951&typecode=site&pagename=Profile&sourcecode=ForRent.com&sessionid=h91ok1f8pp1rjd564o68qokmk7&eventtime=1374700414&jsguid=73e26b2a-6adf-4625-A4bb-db2073a085d4';
	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
		console.log("Common ID Full URL Status Code: ", responseCode);
		
  		res.on('data', function(d) {
    		process.stdout.write(d);
  		});
  		
  		test.equal(responseCode, 200, 'Event ID with Full URL Passed with a 200 response code.');
		test.done();
	});
	req.end();

	req.on('error', function(e) {
 		console.error(e);
	});
};

//	Tests the URL with only eventid
/*exports.testCommonEventEventIdJustId = function(test) {
	var url = 'http://localhost:4000/log-event?eventid=CommunityTheater_Sm_Player_Impression';
	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
		console.log("Common ID Just Event ID: ", responseCode);
		
		test.equal(responseCode, 500, 'Just Event ID passed and sent 500 response code.');
		test.done();
		
  		res.on('data', function(d) {
    		process.stdout.write(d);
  		});
	});
	req.end();

	req.on('error', function(e) {
 		console.error(e);
	});
};
*/