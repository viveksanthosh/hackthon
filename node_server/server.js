var express = require('express');
var dataStore = require('./jsonManuplitation/dataStore');
var ratingStore = require('./jsonManuplitation/ratingStore');
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

    var botMessage = "@Bot: " + "i'm watson";
    dataStore.addData("bot", botMessage);

    var chatHistory = dataStore.getData();
    res.status(201).json(chatHistory.history);

});

router.get('/history', function(req, res){
   res.status(200).json( dataStore.getData().history);
});

router.post('/submitRatings', function(req, res){
    ratingStore.setData(req.body);
    res.status(200).send();
});


app.use(router);

app.listen(8000, ()=> {
    console.log("started no port 8000")
});




