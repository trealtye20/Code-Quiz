// DATA
// Global variable for applicatoin state
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

console.log(questions[1].text);
console.log(questions[0].answer);

for (var i = 0; i < questions.length; i++) {
    console.log("i = : ", i);
    console.log(questions[i].text);
    console.log(questions[i].choices);
    console.log(questions[i].answer);
}

var quizQuestionsIndex = 0;

// HTML elements
var startScreenEl = document.getElementById("start-screen");
var startBtn = document.getElementById("start");


function startQuiz() {
    startScreenEl.setAttribute("class", "hide");
};

startBtn.addEventListener("click", startQuiz);

