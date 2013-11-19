var httputil = require('nodeunit').utils.httputil;
var http = require('http');

exports.testTimedEvents = function(test) {
	var url = "http://localhost:4000/log-event?siteid=1000056808&code=Community_Theater_High_Bandwidth_Time_Viewed&time=39&length=96&sessionid=iu5l14qc9lojfateajfgga3ic4&eventtime=1366237451&jsguid=73e26b2a-6adf-4625-A4bb-db2073a085d4";
	var req = http.request(url, function(res) {
      res.on('data', function(d) {
        process.stdout.write(d);
      });
      test.equal(res.statusCode, 200);
	  test.done();
    });
    req.end();
    
    req.on('error', function(e) {
      console.error(e);
    });
};