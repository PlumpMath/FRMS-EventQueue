var testTimedEvents = require('./testTimedEvents.js');
var testTimedEventsNoCode = require('./testTimedEventsNoCode.js');
var testTimedEventsNoLength = require('./testTimedEventsNoLength.js');
var testTimedEventsNoSessionID = require('./testTimedEventsNoSessionID.js');
var testTimedEventsNoSiteID = require('./testTimedEventsNoSiteID.js');
var testTimedEventsNoTime = require('./testTimedEventsNoTime.js');


exports.test = function(test){
        testTimedEvents.testTimedEvents(test);
        testTimedEventsNoCode.testTimedEventsNoCode(test);
        testTimedEventsNoLength.testTimedEventsNoLength(test);
        testTimedEventsNoSessionID.testTimedEventsNoSessionID(test);
        testTimedEventsNoSiteID.testTimedEventsNoSiteID(test);
        testTimedEventsNoTime.testTimedEventsNoTime(test);
        
        console.log("All Tests Successfully Completed");
};