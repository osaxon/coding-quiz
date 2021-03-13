// DOM elements
const timer = $(".time");
const titleEl = $(".title")
const startBtn = $(".start-btn");
const formEl = $(".submit-score");
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
];


let questionNumber = 0;
let currentQuestion = questions[questionNumber];

let highScores = JSON.parse(storage.getItem("highScores")) || [];


let timeLeft = 100;

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
        titleEl.children().eq(2).text("You ran out of time. Want to try again?");
    }
};

function submitScore(){
    let playerScore = {
        name: nameEl.val(),
        score: timeLeft.toString(),
    };
    highScores.push(playerScore);
    console.log(highScores);
    storage.setItem("highScores",JSON.stringify(highScores));
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
    };
};



// event listeners

startBtn.on("click", setUp)
startBtn.on("click", function(){timer.text(timeLeft + "s remaining");})

questionListEl.on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    plAns = event.target.id;
    activeBtn = $("#"+plAns);
    if(plAns === currentQuestion.answer){
        questionNumber += 1;
        renderQuestion();
    } else {
        timeLeft -= 10;
        timer.text((timeLeft) + "s remaining")
        renderQuestion();
    }
})

submitBtn.on("click",submitScore);