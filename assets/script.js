var timer = document.querySelector(".time")
var titleEl = document.querySelector("body > div > header > h1");
var startBtn = document.getElementById("start");
var wrong = document.getElementById("wrong");
var endMsg = document.querySelector(".end-message");
var questionEl = document.querySelector(".question");
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
        question: "What function iterates through an array or list?",
        options: ["if statement", "for loop", "magic"],
        answer: "b",
    },
    {
        question: "What does OOP stand for?",
        options: ["Object Oriented Programming","Objects Over People", "Olis Object Program"],
        answer: "a",
    },
];

var questionNumber = 0;
let currentQuestion = questions[questionNumber];
var currentOptionA = currentQuestion.options[0];
var currentOptionB = currentQuestion.options[1];
var currentOptionC = currentQuestion.options[2];


var score = 0;
var timeLeft = 100;

function setTime() {
    timer.textContent = timeLeft;
    var timerInterval = setInterval(function() {
      timeLeft--;
      timer.textContent = timeLeft;
  
      if(timeLeft === 0 || questionNumber > questions.length) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

  function wrongAnswer() {
      timeLeft = timeLeft - 10;
  }

function endQuiz() {
    options.style.display = 'none';
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
    setTime();
    renderQuestion();
}


function correctAnswer() {
    console.log("correct");
    questionNumber += 1;
    console.log(questionNumber)
    if(questionNumber == questions.length){
        endQuiz();
    } else {
        renderQuestion();
    }
    
}

function renderQuestion(){
    currentQuestion = questions[questionNumber];
    questionEl.textContent = currentQuestion.question;
    optionA.textContent = currentQuestion.options[0];
    optionB.textContent = currentQuestion.options[1];
    optionC.textContent = currentQuestion.options[2];
    mainLoop();
}

function mainLoop(){
    if(timeLeft == 0 || questionNumber == questions.length){
        endQuiz();
    }
}



// event listeners
startBtn.addEventListener("click", setUp)

options.addEventListener("click", function(event){
    event.preventDefault()
    plAns = event.target.id;
    console.log(plAns);
    if(plAns === currentQuestion.answer){
        correctAnswer();
    } else {
        wrongAnswer();
    }
})