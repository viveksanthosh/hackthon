var util = require('util');
var fs = require('fs');

var graphStore = function () {
    this.addData = function (questionField, field, data) {
        var graphData = this.getData();

        graphData[questionField].field.push(field);
        graphData[questionField].value.push(data);

        console.log(graphData);
        //graphData.data.push(data);

        fs.writeFileSync('./graph.json', JSON.stringify(graphData), 'utf-8');
    };

    this.getData = function () {
        return require('./graph.json');
    };

};


module.exports = new graphStore();

/*

 {
 "Process": {
 "field": [],
 "value": []
 },
 "Navigation": {
 "field": [],
 "value": []
 },
 "Product": {
 "field": [],
 "value": []
 },
 "Delivery": {
 "field": [],
 "value": []
 }
 }
*/