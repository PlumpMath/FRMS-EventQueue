var httputil = require('nodeunit').utils.httputil;
var http = require('http');

//	Tests the Full URL
exports.testCommonEventSourceCodeFullUrl = function(test) {
	var url = 'http://localhost:4000/log-event?eventid=CommunityTheater_Sm_Player_Impression&someid=1000064951&typecode=site&pagename=Profile&sourcecode=ForRent.com&sessionid=h91ok1f8pp1rjd564o68qokmk7&eventtime=1374700414&jsguid=73e26b2a-6adf-4625-A4bb-db2073a085d4';
	
	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
		console.log("testCommonEventSourceCodeFullUrl response code: ", responseCode);
		
  		res.on('data', function(d) {
    		//process.stdout.write(d);
  		});
  		
  		test.equal(responseCode, 200, 'Source Code with Full URL Passed with a 200 response code.');
		test.done();
	});
	req.end();

	req.on('error', function(e) {
 		console.error(e);
	});
};

//	Tests the URL with only Source Code
exports.testCommonEventSourceCodeJustSourceCode = function(test) {
	var url = 'http://localhost:4000/log-event?sourcecode=ForRent.com';
	
	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
		console.log("testCommonEventSourceCodeJustSourceCode response code: ", responseCode);
  		
  		res.on('data', function(d) {
    		//process.stdout.write(d);
  		});
  		
  		test.equal(responseCode, 500, 'Just Source Code passed and sent 500 response code.');
		test.done();
	});
	req.end();

	req.on('error', function(e) {
 		console.error(e);
	});
};


//	Tests the URL with no Source Code
exports.testCommonEventSourceCodeNoSourceCode = function(test) {
	var url = 'http://localhost:4000/log-event?eventid=CommunityTheater_Sm_Player_Impression&someid=1000064951&typecode=site&pagename=Profile&sessionid=h91ok1f8pp1rjd564o68qokmk7&eventtime=1374700414&jsguid=73e26b2a-6adf-4625-A4bb-db2073a085d4';

	var req = http.request(url, function(res) {
		var responseCode = res.statusCode;
		console.log("testCommonEventSourceCodeNoSourceCode response code: ", responseCode);
		
  		res.on('data', function(d) {
    		//process.stdout.write(d);
  		});
  		
  		test.equal(responseCode, 400, 'No Source Code in URL Passed Test with Response Code: 400');
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