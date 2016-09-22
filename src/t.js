//
//var ConversationV1 = require('watson-developer-cloud/conversation/v1');
//
//var conversation = new ConversationV1({
//    username: 'tesco.hack2016@gmail.com',
//    password: 'alpha123',
//    version_date: '2016-08-01'
//});
//
//setTimeout(()=>{
//    console.log(conversation);
//    console.log('waited');
//conversation.message({
//    input: 'What\'s the weather?',
//    workspace_id: 'vivek'
//}, function(err, response) {
//    if (err) {
//        console.error("jjjj"+err);
//    } else {
//        console.log(JSON.stringify(response, null, 2));
//    }
//})}, 5000);
//


var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
    username: 'tesco.hack2016@gmail.com',
    password: 'alpha123',
    version_date: '2016-05-19'
});

tone_analyzer.tone({text: 'Greetings from Watson Developer Cloud!'},
    function (err, tone) {
        if (err)
            console.log(err);
        else
            console.log(JSON.stringify(tone, null, 2));
    });