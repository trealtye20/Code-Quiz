var questions = [
    {
        text: "What year was the attack on pearl harbor?",
        choices: ["1941", '1949', "1933", "1972"],
        answer: "1941"
    },
    {
        text: "Who was the second president of America",
        choices: ["George Washington", 'Abraham Lincoln', "John Adams", "James Monroe"],
        answer: 'John Adams'
    },
    {
        text: "What year did the French Revolution end",
        choices: ["1799", '1775', "1772", "1789"],
        answer: "1799"
    },
    {
        text: "Who abolished slavery in America",
        choices: ["Barack Obama", 'John F Kennedy', "George W Bush", "Abraham Lincoln"],
        answer: "Abraham Lincoln"
    },
]

var TIME_PER_QUESTION = 5;
var quizQuestionsIndex = 0;
var timerId;
var timeCount = questions.length * TIME_PER_QUESTION;

var startScreenEl = document.getElementById("start-screen");
var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var questionTextEl = document.getElementById("question-text");
var choicesEl = document.getElementById('choices');
var feedbackEl = document.getElementById('feedback');
var endScreenEl = document.getElementById('end-screen');
var finalScoreEl = document.getElementById('final-score');
var initialsInputEl = document.getElementById('initials');
var initialsSubmitBtn = document.getElementById('submit');


function quizStart() {
    startScreenEl.setAttribute("class", "hide");
    questionsEl.setAttribute("class", "show");
    timerId = setInterval(clockTicks, 1000);

    askQuestions();
};

function askQuestions() {
    var currentQuest = questions[quizQuestionsIndex];
    var questionText = currentQuest.text;

    questionTextEl.textContent = questionText;

    choicesEl.innerHTML = '';
    choicesEl.textContent = '';

    var choicesArr = currentQuest.choices;
    for (var i = 0; i < choicesArr.length; i++) {
        var liEl = document.createElement('button');
        console.log(choicesArr[i]);
        liEl.setAttribute('value', choicesArr[i]);
        liEl.textContent = (i + 1) + ". " + choicesArr[i];
        choicesEl.onclick = handleChoices;
        choicesEl.appendChild(liEl);
    }
}


function endQuiz() {
    clearInterval(timerId);
    questionsEl.setAttribute('class', 'hide');
    finalScoreEl.textContent = timeCount;
    endScreenEl.setAttribute('class', 'show');

    return;
}

function clockTicks() {
    timeCount--;
    timerEl.textContent = timeCount;
    
    if (!timeCount) {
        console.log("Time is up");
        clearInterval(timerId);
        endQuiz();
    }
}


function handleChoices(event) {
    console.log('handleChoices');
    var choiceValue = event.target.getAttribute('value');
    console.log(choiceValue);
    
    if (choiceValue === questions[quizQuestionsIndex].answer) {
        feedbackEl.textContent = "Correct!";
    }
    
    else {
        timeCount -= TIME_PER_QUESTION ; 
        if (timeCount < 0) {
            timeCount = 0;
        }
        timerEl.textContent = timeCount;
        feedbackEl.textContent = 'Wrong!';
    }
    
    feedbackEl.setAttribute('class', 'feedback');
    
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'hide');
    }, 1500);

    
    quizQuestionsIndex++;
    if (quizQuestionsIndex === questions.length) {
        endQuiz();
    }
    else {
        askQuestions();
    }
}

function saveScores() {
    console.log('saveScores');
    var initialsValue = initialsInputEl.value.trim();
    var scores = [];
    if (initialsValue) {
        scores = JSON.parse(localStorage.getItem('scores'));
        // console.log(scores);
        if (!scores) {
            scores = [];
        };

        var newScore = {
            score: timeCount,
            initials: initialsValue
        }
        console.log(scores);
        scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    location.href = "./highscores.html";

    return;
}

function handleInitialsKeyup(event) {
    console.log('handleInitialsKeyup');
    // console.log('event.key', event.key);
    if (event.key === 'Enter') {
        saveScores();
    }
    return;
}

function handleInitialsSubmit(event) {
    console.log('handleInitialsSubmit');

    saveScores();
}

startBtn.addEventListener("click", quizStart);

initialsInputEl.onkeyup = handleInitialsKeyup;
// initialsInputEl.addEventListener('keyup', handleInitialsKeyup);

initialsSubmitBtn.addEventListener('click', handleInitialsSubmit);

