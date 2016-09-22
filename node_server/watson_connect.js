var postCall = require('./PostCall');
var toneAnaliseUrl = "https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19";
var Watson = function () {
    this.toneAnalise = function (text) {
        var that = this;
        return new Promise(function (resolve, reject) {
            postCall(toneAnaliseUrl, {
                "text": text
            }).then(function (result) {
                var tone = (result.body.document_tone.tone_categories);

                resolve(that.extractHappiness(tone[0].tones));

            }).catch(function (err) {
                console.log(err);
            });
        });

    };
    this.extractHappiness = function (response) {
        return response[3]
    };
    this.toneMapper = function (tones) {
        tones.sort(function (toneA, toneB) {
            if (toneA.score < toneB.score)
                return -1;
            else
                return 1;
        });
        return tones;
    }

};

module.exports = new Watson();

//
//new Watson().toneAnalise('i hate you').then(function(value){
//    console.log(value);
//})

