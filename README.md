# JavaScript Quiz
> A short quiz built with HTML, JavaScript and CSS.

## Link

https://osaxon.github.io/coding-quiz/ 

## Features

The main feature of the quiz is for players to answer a series of questions with a time limit to complete. 
* The player clicks a start button to begin the quiz and to begin a countdown from 100s
* Multiple choice questions appear one after another with a new question presented at each correct answeer
* A wrong answer decucts 10s from the remaining time
* At the end of the quiz the player submits their name and score and views top scores in a table

## Development

The components of the quiz have been built using the following:
* HTML for the main page and highscores page
* JavaScript for the logic
* CSS for styling 
Note: part way through the project I decided to change the layout design using Bootstrap v5 and also updated my JavaScript to use the jQuery API.

When starting on the development of the quiz, I listed the key challenges that I thought will be most difficult to implement and started working on a proof of concept. These were:
* Displaying questions dynamically i.e. one after the other when the player answers correctly
* Registering player input when the correct option is clicked
* Creating a timer that updates on screen and reduces by 10s for wrong answers
* Ending the quiz when timer is up or questions are finished

To solve the first challenge I've stored the questions in an object array with properties defined for the question, correct answer and an additional array for the options (a b c and d). When the page is loaded, the variable 'questionNumber' is set to 0 which acts as the starting index for the question array. After each succesful question, the question number increases by one and the object at that index within the array is written to the screen.

This method also helped solve the second challenge, by having the correct answer stored in the object array I am able to match the id of the selected button with the answer within the array. The HTML has a list of buttons each with an id a to d. A click event handles the player interaction and stores the id of the selected button in a variable. If the button id matches the correct answer, the quiz progresses, otherwise 10s are deducted for the remaining time.

The timer was quite simple to implement using the window object setInterval. The function takes 1 away from the remaining time every 100ms, i.e. every second. Toward the end of the development, I implemented two more setIntervals which change the style of the selected button to provide some feedback for the player for right or wrong answers.

To stop the quiz when all question elements from the array have been iterated, a check is performed at the first stage of the renderQuestions function which checks if the questionNumber variable is equal to the length of the question object array. If it matches, the endQuiz function is called which stops the quiz.

Once I had these basic elements in place I could then focus on optimising the code and styling the page. By this point, I had learnt some basic jQuery methods and created some layouts with Bootstrap. Therefore I decided to build on what I'd learnt and implement a basic Bootstrap layout and refactored my JavaScript to use jQuery DOM methods. 

Finally, I needed a way to store player scores in local storage and have the scores display on screen in order of highest to lowest. This turned out to be one of the most challenging parts of the project and I found myself doing a lot of research online on how to sort object arrays by one of the properties In this case, my highScores array stores objects with properties for player name and player score; I needed a way to sort the array by the player score.

In the end, I found the following solution online which helped me solve my problem:  https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/ 

## Future releases

I look forward to building on the quiz and implemented new features and ideas as I learn new skills!

For example, I could connect a database to store scores so that other players can see how the score against each other.
I also think it would be good to give the player 2 lives per question, and allow 2 wrong answers before moving to the next question. 
