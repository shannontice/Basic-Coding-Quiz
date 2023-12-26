// Global Variables 
var time = 60;
var timer;
var quesIndex = 0;
var startQuiz = document.querySelector('.start-quiz');
var startBtn = document.querySelector('#start');
var displayQuestions = document.querySelector('.display-questions');
var currentTime = document.querySelector('.current-time');
var currentQuestion = questions[quesIndex];
var answerChoices = document.querySelector('.answer-choices');
var enterScore = document.querySelector('.enter-score');
var saveButton = document.querySelector('#save');



// Functions

// Create a function to hide the intro information and show the first question in the quiz.
function startGame() {
    // Set/Reset time
    time = 60;
    // Set/Reset question index
    quesIndex = 0;
    // Hide start wrap --> Show first question wrap
    startQuiz.classList.add('hide');
    displayQuestions.classList.remove('hide');
    // Call funtion to display proper question and start the timer
    startTimer();
    showQuestion();


}

// Create a function to show the time the user has left. Give user a 10 second penalty for wrong answers.
function startTimer() {
    timer = setInterval(function () {
        time = (time - 1 < 0) ? 0 : time - 1;
        currentTime.innerText = 'Time Remaining: ' + time;

    }, 1000);
}

// Create a function to display the proper question and add a button to select each of the potential answer choices. 
function showQuestion() {

    // Select h2 from DOM where the question text will be added
    var questionText = document.querySelector('.question-text')
    // add current question text to the h2
    questionText.innerText = currentQuestion.questionAsked;

    // Clear previous MC options before loading new ones.
    answerChoices.innerHTML = '';


    // add loop to add a button to each of the answer choices and input proper text from the array associated with that question.
    for (var index = 0; index < currentQuestion.choices.length; index++) {
        // Add Buttons to select your answers
        var answerButtons = document.createElement('button');
        answerButtons.innerText = currentQuestion.choices[index];

        // Append newly created buttons into the div 
        answerChoices.append(answerButtons);
    }
}

// Create a function to check the answers selected by the user and move to the next question after an answer has been selected.
function answerCheck(eventObj) {
    eventObj.stopPropagation();

    // Select a variable to determine where the user is clicking. 
    var click = eventObj.target;
    // Make sure the click took place on a answer choice button and then log that selection
    if (click.tagName === 'BUTTON') {
        var selectedAnswer = click.innerText;


        // Compare the selected answer to the key and if the user is correct show them a 'Correct!' response, if the user is wrong show them an 'Incorrect' respsone.
        var checkAnswer = document.querySelector('.check-answer');
        if (selectedAnswer === currentQuestion.correctAnswer) {
            checkAnswer.innerText = 'Correct!';
            checkAnswer.classList.add('show');
        }
        else {
            checkAnswer.innerText = 'Incorrect';
            checkAnswer.classList.add('show');
            // Also add 10 second penalty if wrong
            time -= 10;
        }

        // Once the user has a second to read their answer feedback move onto the next question in the quiz.
        setTimeout(function () {
            // Remove feedback --> Go to next question 
            checkAnswer.classList.remove('show');

            quesIndex++;

            // If there are more questions continue with the quiz. If it is the last question end the game.
            if (quesIndex === questions.length) {
                endGame();
            }
            else {
                currentQuestion = questions[quesIndex];
                showQuestion(console.log('showing'));
            }
        }, 1000);

    }

}

// Create a function to stop the timer, log the users score and reset the quiz
function endGame() {
clearInterval(timer);
// Hide questions and show input for score log
displayQuestions.classList.add('hide')
enterScore.classList.remove('hide')
// Select final score variable and then input time to represent the score
var finalScore = document.querySelector('.final-score');
finalScore.innerText = 'Score: ' + time;
}

// Create a function to store name and score information into localStorage
function scoreStorage() {
    // Select input and use input value to save user info
    var userName = document.querySelector('#user-name');
    var nameValue = userName.value;

    // Pull raw scores from localStorage
    var rawScores = localStorage.getItem('userScores');
    var userScores = JSON.parse(rawScores) || [];

    // Push new name and score objets to the array
    userScores.push({
        names: nameValue,
        score: time,
    });

    // Store the updates array to localStorage
    localStorage.setItem ('userScores', JSON.stringify(userScores));

    // Bring the user to the highscore file 
    location = './highscores.html';

}


// Click Events
startBtn.addEventListener('click', startGame);

// Note: click goes on the entire div not the individual buttons
answerChoices.addEventListener('click', answerCheck);

// Add event for users to save their scores
saveButton.addEventListener('click', scoreStorage);