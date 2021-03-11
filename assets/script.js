// DOM elements
let timer = document.querySelector(".time")
let titleEl = document.querySelector("body > div > header > h1");
let startBtn = document.getElementById("start");
let questionEl = document.querySelector(".question");
let questionBoxEl = document.querySelector(".question-box");
let optionA = document.getElementById("a");
let optionB = document.getElementById("b");
let optionC = document.getElementById("c");
let options = document.querySelector(".options")
let endGameMsgEl = document.querySelector(".end-game");
// end of DOM elements


/*  
Quiz questions stored as objects in an array
Options to each questions stored in an array as a property of the parent object
Correct answer stored as a property 
*/
let questions = [
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


let questionNumber = 0;
let currentQuestion = questions[questionNumber];
let currentOptionA = currentQuestion.options[0];
let currentOptionB = currentQuestion.options[1];
let currentOptionC = currentQuestion.options[2];


let score = 0;
let timeLeft = 100;

function setTime() {
    console.log("Stage: setTime")
    timer.textContent = timeLeft;
    let timerInterval = setInterval(function() {
      timeLeft--;
      timer.textContent = timeLeft;
  
      if(timeLeft === 0 || questionNumber > questions.length) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }

  function wrongAnswer() {
    
  }

function endQuiz() {
    console.log("Stage: endQuiz")
    options.style.display = 'none';
    questionBoxEl.style.display = 'none';
    if(timeLeft > 0){
        score = timeLeft * 10;
        endGameMsgEl.textContent = "Congratualtions on finishing the quiz! Your score is " + timeLeft;
    } else {
        endMsg.textContent = "Time's up you lose!!!"
    }
}

function setUp(){
    console.log("Stage: setUp")
    startBtn.style.display = 'none';
    titleEl.style.display = 'none';
    options.style.display = 'flex';
    setTime();
    renderQuestion();
}


function correctAnswer() {
    
    
}

function renderQuestion(){
    console.log("Stage: renderQuestion")
    if(questionNumber === questions.length){
        endQuiz();
    } else {
        currentQuestion = questions[questionNumber]
        questionEl.textContent = currentQuestion.question;
        optionA.textContent = currentQuestion.options[0];
        optionB.textContent = currentQuestion.options[1];
        optionC.textContent = currentQuestion.options[2];
    }

}

function mainLoop(){
    console.log("Stage: mainLoop")
    if(timeLeft == 0 || questionNumber == questions.length){
        endQuiz();
    } else {
        renderQuestion();
    }
}



// event listeners
startBtn.addEventListener("click", setUp)

options.addEventListener("click", function(event){
    event.preventDefault()
    plAns = event.target.id;
    console.log(plAns);
    if(plAns === currentQuestion.answer){
        console.log("Stage: correctAnswer")
        questionNumber += 1;
        renderQuestion();
    } else {
        console.log("Stage: wrongAns")
        timeLeft = timeLeft - 10;
        renderQuestion();
    }
})