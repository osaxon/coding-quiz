var timer = document.querySelector(".time")
var titleEl = document.querySelector("body > div > header > h1");
var startBtn = document.getElementById("start");
var wrong = document.getElementById("wrong");
var endMsg = document.querySelector(".end-message");
var question = document.querySelector(".question");
var optionA = document.getElementById("a");
var optionB = document.getElementById("b");
var optionC = document.getElementById("c");
var options = document.querySelector(".options")

// Quiz questions stored as objects in an array
var questions = [
    {
        question: "What symbol is used to assign a value to a variable",
        options: ["=","%","=="],
        answer: "a",
    },
    {
        question: "question 2",
        options: ["This", "that", "or this"],
        answer: "b",
    },
    {
        question: "question 3"
    }
];

var questionNumber = 0;
let currentQuestion = questions[questionNumber];





var score = 0;
var timeLeft = 15;

function setTime() {
    timer.textContent = timeLeft;
    var timerInterval = setInterval(function() {
      timeLeft--;
      timer.textContent = timeLeft;
  
      if(timeLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        endQuiz();
      }
  
    }, 1000);
  }

  function wrongAnswer() {
      timeLeft = timeLeft - 10;
      // mainLoop
  }

function endQuiz() {
    if(timeLeft > 0){
        endMsg.textContent = "Your score is " + timeLeft;
    } else {
        endMsg.textContent = "Time's up you lose!!!"
    }
}

function setUp(){
    startBtn.style.display = 'none';
    titleEl.style.display = 'none';
    options.style.display = 'flex';
    setTime()
    mainLoop()
}

function mainLoop(){
    var currentOptionA = currentQuestion.options[0];
    var currentOptionB = currentQuestion.options[1];
    var currentOptionC = currentQuestion.options[2];
    question.textContent = currentQuestion.question;
    optionA.textContent = currentOptionA;
    optionB.textContent = currentOptionB;
    optionC.textContent = currentOptionC;

}

function correctAnswer() {
    console.log("correct");
    questionNumber++;
    mainLoop();
}

function renderQuestion(questionNum){
    
}


// event listeners
startBtn.addEventListener("click", setUp)

options.addEventListener("click", function(event){
    plAns = event.target.id;
    console.log(plAns);
    if(plAns == currentQuestion.answer){
        correctAnswer()
    }
})