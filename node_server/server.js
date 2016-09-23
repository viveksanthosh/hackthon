var express = require('express');
var dataStore = require('./dataStore');
var graphStrore = require('./graphStore');
var ratingStore = require('./ratingStore');
var watson = require('./watson_connect');
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
    var previousQuestion = req.body.questionNumber.previousQuestion;

    var toAsk = req.body.questionNumber.toAsk;
    var currentQuestion = req.body.questionNumber.current;
    var botMessage = "";

    //answer, previous question, category
    watson.toneAnalise(req.body.message, previousQuestion ,toAsk[currentQuestion[0]]).then(joyData=> {
       // graphStrore.addData(toAsk[currentQuestion[0]]);

        //console.log(previousQuestion + joyData.score);
        //console.log(toAsk[currentQuestion[0]]);
    });
    dataStore.addData("user", userMessage);

    if (currentQuestion === 'end') {
        botMessage = "@Bot: " + "Thank yoo for taking our survey, have a nice day";
    } else {
        botMessage = "@Bot: " + questions[toAsk[currentQuestion[0]]][currentQuestion[1]];
        currentQuestion = incrementQuestions(toAsk, currentQuestion);
    }

    dataStore.addData("bot", botMessage);

    var chatHistory = dataStore.getData();
    res.status(201).json({
        conversation: chatHistory.history, nextQuestion: {
            toAsk: toAsk,
            current: currentQuestion,
            previousQuestion: questions[toAsk[currentQuestion[0]]][currentQuestion[1]]
        }
    });

});

router.get('/history', function (req, res) {

    var botData = "@Bot, Hello, how are you today? We would like to get some feedback on your purchase \n";

    var selectedQuestions = questionsToBeAsked();
    botData += questions[selectedQuestions[0]][0];
    dataStore.addData("bot", botData);

    res.status(200).json({
        conversation: dataStore.getData().history, nextQuestion: {
            toAsk: selectedQuestions,
            current: [0, 1],
            previousQuestion: questions[selectedQuestions[0]][0]

        }
    });
});

router.post('/submitRatings', function (req, res) {
    ratingStore.setData(req.body);
    res.status(200).send();
});


app.use(router);

app.listen(8000, ()=> {
    console.log("started no port 8000")
});


function questionsToBeAsked() {
    var rating = require('./ratings');

    if (rating.Delivery <= 2 && rating.Product <= 2) {
        return (["Delivery", "Product"]);
    }
    else if (rating.Product <= 2) {
        return (["Product"]);
    }
    else if (rating.Delivery <= 2) {
        return (["Delivery"]);
    } else {
        return (["Process", "Navigation"]);
    }

}

function incrementQuestions(selectedQuestions, current) {
    var currentQuestion = selectedQuestions[current[0]];
    var currentQuestionLength = questions[currentQuestion].length;
    if ((currentQuestionLength - 1) > current[1]) {
        current[1]++;
    }
    else {
        if (current[0] >= (selectedQuestions.length - 1))
            return "end";
        current[0]++;
        current[1] = 0;
    }
    return current;
}


