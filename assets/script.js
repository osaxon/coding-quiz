var timer = document.querySelector(".time")
var startBtn = document.getElementById("start");
var wrong = document.getElementById("wrong");
var endMsg = document.querySelector(".end-message");
var question = document.querySelector(".question");
var optionA = document.getElementById("a");
var questionNumber = 0;

var questions = [
    {
        question: "question 1",
        options: ["Is it this...","This...","Or this..."],
        answer: "a",
    },
];

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
  }

function endQuiz() {
    if(timeLeft > 0){
        endMsg.textContent = "Your score is " + timeLeft;
    } else {
        endMsg.textContent = "Time's up you lose!!!"
    }
}

function startQuiz(){
    console.log("started")
    setTime()
    var currentQuestion = questions[questionNumber];
    var currentOptionA = currentQuestion.options[0];
    question.textContent = currentQuestion.question;
    optionA.textContent = currentOptionA;

}


// event listeners
startBtn.addEventListener("click", startQuiz)
wrong.addEventListener("click", wrongAnswer)