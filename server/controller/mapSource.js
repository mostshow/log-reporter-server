
var request = require('request');
var sourceMap = require('source-map');
var row = 2;
var col = 90;
var sourceMapSrc = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.map';

request(sourceMapSrc, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        try {
            // console.log(body)
            JSON.parse(body);
            let consumer = new sourceMap.SourceMapConsumer(body);
            let result = consumer.originalPositionFor({ line: row, column: col });
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    } else {
            console.log(response)
        //response.statusCode
        //response.statusMessage
    }
});
