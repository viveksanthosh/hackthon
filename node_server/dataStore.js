var util = require('util');
var fs = require('fs');

var dataStore = function () {
    this.addData = function (chatContext, data) {
        var conversations = this.getData();

        conversations[chatContext].push(data);
        conversations.history.push(data);

        fs.writeFileSync('./data.json', JSON.stringify(conversations), 'utf-8');
    };

    this.getData = function () {
        return require('./data.json');
    };

};


module.exports = new dataStore();