const questions = [
    {
        question: "Who is known as the father of computers?",
        answers: [
            { text: "Alan Turing", correct: false },
            { text: "Charles Babbage", correct: true },
            { text: "John von Neumann", correct: false },
            { text: "Bill Gates", correct: false },
        ]
    },
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Process Unit", correct: false },
            { text: "Central Processing Unit", correct: true },
            { text: "Computer Personal Unit", correct: false },
            { text: "Central Processor Unit", correct: false },
        ]
    },
    {
        question: "Which of the following is not a programming language?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "HTML", correct: true },
            { text: "C++", correct: false },
        ]
    },
    {
        question: "What does HTTP stand for?",
        answers: [
            { text: "HyperText Transfer Protocol", correct: true },
            { text: "HyperText Transmission Protocol", correct: false },
            { text: "HyperText Transfer Program", correct: false },
            { text: "HyperText Transmission Program", correct: false },
        ]
    },
    {
        question: "Which company developed the Java programming language?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Apple", correct: false },
            { text: "Sun Microsystems", correct: true },
            { text: "Google", correct: false },
        ]
    },
    {
        question: "What is the main function of an operating system?",
        answers: [
            { text: "To manage hardware resources", correct: true },
            { text: "To perform calculations", correct: false },
            { text: "To store data", correct: false },
            { text: "To control the internet", correct: false },
        ]
    },
    {
        question: "Which of the following is a database management system?",
        answers: [
            { text: "Oracle", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false },
            { text: "HTML", correct: false },
        ]
    },
    {
        question: "What does RAM stand for?",
        answers: [
            { text: "Random Access Memory", correct: true },
            { text: "Read Access Memory", correct: false },
            { text: "Readily Available Memory", correct: false },
            { text: "Randomly Accessible Memory", correct: false },
        ]
    },
    {
        question: "What is an IP address?",
        answers: [
            { text: "A unique identifier for a computer on a network", correct: true },
            { text: "A programming language", correct: false },
            { text: "A type of memory", correct: false },
            { text: "A piece of computer hardware", correct: false },
        ]
    },
    {
        question: "What does 'GUI' stand for?",
        answers: [
            { text: "Graphical User Interface", correct: true },
            { text: "Graphical User Internet", correct: false },
            { text: "General User Interface", correct: false },
            { text: "General User Internet", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const wrongSound = document.getElementById("wrong-sound");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        alert("Choose the correct answer!");
        wrongSound.play();
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
