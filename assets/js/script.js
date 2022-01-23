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

// Variables for DOM Elements
var questions = document.getElementById("questions");
var options = document.getElementById("options");
var timer = document.getElementById("time");
var initials = document.getElementById("iitials");
var response = document.getElementById("response");
var beginBtn = document.getElementById("begin");
var submitBtn = document.getElementById("submit");

// Variables for timer
var time = questions.length *20;
var currentQuestion = 0;
var timerId;