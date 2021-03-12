// DOM elements
let timer = $(".time");
let titleEl = $(".title")
let startBtn = $(".start-btn");
let questionEl = $(".question-text");
let questionListEl = $(".question-list");
let optionA = $("a");
let optionB = $("b");
let optionC = $("c");
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



let gameWon = false;
let questionNumber = 0;
let currentQuestion = questions[questionNumber];
let currentOptionA = currentQuestion.options[0];
let currentOptionB = currentQuestion.options[1];
let currentOptionC = currentQuestion.options[2];


let score = 0;
let timeLeft = 100;


function endQuiz() {
    console.log("Stage: endQuiz")
    questionListEl.hide();
    if(timeLeft > 0){
        score = timeLeft * 10;
    } else {
        return;
    }
}

function setUp(){
    console.log("Stage: setUp")
    startBtn.hide();
    questionListEl.show();
    let timerInterval = setInterval(function() {
      timeLeft--;
      timer.text(timeLeft + "s remaining")
  
      if(timeLeft === 0 || questionNumber == questions.length) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        timer.hide();
      }
  
    }, 1000);
    renderQuestion();
}



function renderQuestion(){
    if(questionNumber === questions.length){
        endQuiz();
    } else {
        currentQuestion = questions[questionNumber]
        questionEl.text(currentQuestion.question);
        optionA.textContent = currentQuestion.options[0];
        optionB.textContent = currentQuestion.options[1];
        optionC.textContent = currentQuestion.options[2];
    };
};



// event listeners

startBtn.on("click", setUp)
startBtn.on("click", function(){timer.text(timeLeft + "s remaining");})
// startBtn.addEventListener("click", setUp)

questionListEl.on("click", function(event){
    event.preventDefault()
    plAns = event.target.id;
    if(plAns === currentQuestion.answer){
        questionNumber += 1;
        renderQuestion();
    } else {
        timeLeft = timeLeft - 10;
        renderQuestion();
    }
})