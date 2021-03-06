// DOM elements
const timer = $(".time");
const titleEl = $(".title")
const startBtn = $(".start-btn");
const formEl = $(".submit-score");
const scoresTblEl = $(".high-scores");
const nameEl = formEl.children().eq(0).children().eq(0);
const submitBtn = formEl.children().eq(1).children().eq(0);
const questionEl = $(".question-text");
const questionListEl = $(".question-list");
const storage = window.localStorage;
// end of DOM elements



/*  
Quiz questions stored as objects in an array
Options to each questions stored in an array as a property of the parent object
Correct answer stored as a property 
*/
let questions = [
    {
        question: "What symbol is used to assign a value to a variable",
        options: ["=","%","==",":-)"],
        answer: "a",
    },
    {
        question: "What function can be used to iterate through an array or list?",
        options: ["if statement","for loop","magic","a function room"],
        answer: "b",
    },
    {
        question: "What does OOP stand for?",
        options: ["Object Oriented Programming","Objects On Platform", "On One Pal","Ok Object Programming"],
        answer: "a",
    },
    {
        question: "What method can we use to join two strings together?",
        options: ["string.glue()", "string.stick()","string.concat()","join.string()"],
        answer: "c",
    },
    {
        question: "What tool can we use to debug and check for errors in the web browser?",
        options: ["Pen and paper","Inspector", "Vscode","Terminal"],
        answer: "b",
    },
];

let questionNumber = 0;
let currentQuestion = questions[questionNumber];
let highScores = JSON.parse(storage.getItem("highScores")) || [];
let timeLeft = 75;

function endQuiz() {
    timer.hide();
    questionListEl.hide();
    formEl.show();
    if(timeLeft > 0){
        titleEl.children().eq(1).text("Congratulations!!!")
        titleEl.children().eq(2).text("Your final score is " + timeLeft + ".")
        score = timeLeft * 10;
    } else {
        titleEl.children().eq(1).text("Unlucky!!!")
        titleEl.children().eq(2).text("You ran out of time. Click the Home button to give it another go");
    }
};

function renderScores() {
    let sortedArr = highScores.sort((a, b) => (a.score < b.score) ? 1 : -1);
    for(i = 0; i < highScores.length; i++){
        let newTr = $("<tr>");
        let newTh = $("<th>");
        let scoreTd = $("<td>");
        let nameTd = $("<td>");
        newTh.attr("scope","row");
        newTh.text((i + 1));
        scoreTd.text(sortedArr[i].score);
        nameTd.text(sortedArr[i].name);
        scoresTblEl.children().eq(1).append(newTr);
        scoresTblEl.children().eq(1).children().eq(i).append(newTh);
        scoresTblEl.children().eq(1).children().eq(i).append(scoreTd);
        scoresTblEl.children().eq(1).children().eq(i).append(nameTd);
    }
}

function submitScore(){
    let playerScore = {
        name: nameEl.val(),
        score: timeLeft.toString(),
    };
    highScores.push(playerScore);
    storage.setItem("highScores",JSON.stringify(highScores));
    renderScores();
    location.href = "scores.html";
}

function setUp(){
    startBtn.hide();
    titleEl.children().eq(0).hide();
    questionListEl.show();
    let timerInterval = setInterval(function() {
      timeLeft--;
      timer.text(timeLeft + "s remaining")
  
      if(timeLeft === 0 || questionNumber == questions.length) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        endQuiz();
      }
  
    }, 1000);
    renderQuestion();
}

function renderQuestion(){
    if(questionNumber === questions.length){
        endQuiz();
    } else {
        titleEl.children().eq(1).text("Question " + (questionNumber + 1))
        currentQuestion = questions[questionNumber]
        questionEl.text(currentQuestion.question);
        questionListEl.children().eq(0).text(currentQuestion.options[0]);
        questionListEl.children().eq(1).text(currentQuestion.options[1]);
        questionListEl.children().eq(2).text(currentQuestion.options[2]);
        questionListEl.children().eq(3).text(currentQuestion.options[3]);
    };
};

renderScores();

startBtn.on("click", setUp)
startBtn.on("click", function(){timer.text(timeLeft + "s remaining");})

questionListEl.on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    plAns = event.target.id;
    let activeBtn = $("#"+plAns);
    if(plAns === currentQuestion.answer){
        activeBtn.addClass("list-group-item-success")
        let success = setInterval(function(){
            activeBtn.removeClass("list-group-item-success")
        },150);
        questionNumber += 1;
        renderQuestion();
    } else {
        activeBtn.addClass("list-group-item-danger")
        timeLeft -= 10;
        timer.text((timeLeft) + "s remaining")
        let danger = setInterval(function(){
            activeBtn.removeClass("list-group-item-danger");
        },450);
        renderQuestion();
    }
})

submitBtn.on("click",submitScore);

$("#view-scores").on("click",function(){
    location.href = "scores.html";
});
$(".home").on("click",function(event){
    location.href = "index.html";
});
