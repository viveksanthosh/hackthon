var express = require('express');
var dataStore = require('./dataStore');
var ratingStore = require('./ratingStore');
var questions = require('./questionMap').questions;
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/conversation', function (req, res) {
    var userMessage = "@User: " + req.body.message;
    dataStore.addData("user", userMessage);
    var botMessage = "@Bot: " + questions[req.body.questionNumber];
    dataStore.addData("bot", botMessage);

    var chatHistory = dataStore.getData();
    res.status(201).json({conversation: chatHistory.history, nextQuestion: ++req.body.questionNumber});

});

router.get('/history', function (req, res) {
    require('./resetData');
    dataStore = require('./dataStore');
    var botData = "@Bot, Hello, how are you today? We would like to get some feedback on your purchase \n";
    botData += questions[0];
    dataStore.addData("bot", botData);

    res.status(200).json({conversation: dataStore.getData().history, nextQuestion: 1});
});

router.post('/submitRatings', function (req, res) {
    ratingStore.setData(req.body);
    res.status(200).send();
});


app.use(router);

app.listen(8000, ()=> {
    console.log("started no port 8000")
});




