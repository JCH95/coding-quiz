// Qeustions put into arrays for later use
var questions = [
    {
        title: "Which of the following is NOT a javascript data type?",
        options: ["Number", "String", "Function", "Boolean"],
        answer: "Function",
    },
    {
        title: "In javascript, arrays are surrouned by ___.",
        options: ["Curly braces", "Parentheses", "Quotation marks", "Square brackets"],
        answer: "Square brackets",
    },
    {
        title: "When linking your javascript filt to HTML, where does the link go?",
        options: ["At the top of the body section.", "At the bottom of the body section.", "In the head section.", "None of the above."],
        answer: "At the bottom of the body section.",
    },
    {
        title: "What is the correct syntax for making a comment in javascript?",
        options: ["//", "/* */", "<!-- -->", "%%"],
        answer: "//",
    },
]

// Variables for DOM Elements/Timer
var questionsEl = document.getElementById("questions");
var optionsEl = document.getElementById("options");
var timer = document.getElementById("time");
var initialsEl = document.getElementById("initials");
var response = document.getElementById("response");
var beginBtn = document.getElementById("begin");
var submitBtn = document.getElementById("submit");
var time = questions.length *20;
var questionIndex = 0;
var timerId;

// Start Quiz Function
function beginQuiz() {
    // Get begin page to hide, and have the questions page appear
    var beginScreen = document.getElementById("begin-screen");
    beginScreen.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");

    // Tell timer to start counting down
    timerId = setInterval(timerCount, 1000);
    timer.textContent = time;

    // Call function to get questions
    getQuestions();
}

// Get Questions Function
function getQuestions() {
    // Get current question
    var currentQuestion = questions[questionIndex];

    // Get title of each question
    var titles = document.getElementById("question-title");
    titles.textContent = currentQuestion.title;
    optionsEl.innerHTML = "";

    // Create loop for questions and make buttons for each new one
    currentQuestion.options.forEach(function(option, i) {
        var optionLoop = document.createElement("button");
        optionLoop.setAttribute("class", "options");
        optionLoop.setAttribute("value", option);
        optionLoop.textContent = i + 1 + ") " + option;

        // Listen for click on option
        optionLoop.onclick = optionSelect;
        optionsEl.appendChild(optionLoop);
    });
}

// Timer Countdown Function
function timerCount() {
    time--;
    timer.textContent = time;
    if (time <= 0) {
        finishQuiz();
    }
}

// Option Select Function
function optionSelect() {
    // Check if answer was right/wrong first
    if (this.value == questions[questionIndex].answer) {
        response.textContent = "Correct!";
        // Get next question
        questionIndex++;
        // Go to end of quiz when out of questions
        if (questionIndex > 3) {
            finishQuiz();
        }
        getQuestions();
    } else {
        time -= 20;
        if (time < 0) {
            time = 0;
        }
        timer.textContent = time;
        response.textContent = "Wrong!";
    }

    // Show response briefly
    response.setAttribute("class", "response");
    setTimeout(function() {
        response.setAttribute("class", "response hide");
    }, 1000);
}

// End Quiz Function
function finishQuiz() {
    // Hide questions
    questionsEl.setAttribute("class", "hide");
    // Stop timer
    clearInterval(timerId);

    // Display Finish Screen
    var finishScreen = document.getElementById("finish");
    finishScreen.removeAttribute("class");
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;
}

// Highscore Function
function saveScore() {
    // Remove extra spaces
    var initials = initialsEl.value.trim();

    // Check if initials value was empty or not
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscore")) || [];

        // Make record an object
        var newRecord = {
            score: time,
            initials: initials,
        };

        // Save scores
        highscores.push(newRecord);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // Display highscore
        var showScore = document.getElementById("scoreBtn");
        showScore.textContent = "Your high score is " + time + "!";
        highscores.appendChild(showScore);
    }
}

submitBtn.onclick = saveScore;
beginBtn.onclick = beginQuiz;