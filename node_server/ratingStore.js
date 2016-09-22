var util = require('util');
var fs = require('fs');

var dataStore = function () {
    this.setData = function (chatContext, data) {
        fs.writeFileSync('./ratings.json', JSON.stringify(chatContext), 'utf-8');
    };

    this.getData = function () {
        return require('./ratings.json');
    };

};


module.exports = new dataStore();