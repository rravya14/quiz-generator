const quizzes = [
  {
    title: "Blue Quiz 💙",
    theme: "#0d47a1",
    light: "#bbdefb",
    hover: "#90caf9",
    bg: "#e3f2fd",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Paris", "Madrid", "Berlin", "Rome"],
        answer: "Paris"
      },
      {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
      },
      {
        question: "What does HTML stand for?",
        options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Tool Mark Language"],
        answer: "Hyper Text Markup Language"
      },
      {
        question: "What year was JavaScript created?",
        options: ["1995", "2000", "1985", "2010"],
        answer: "1995"
      }
    ]
  },
  {
    title: "Green Quiz 💚",
    theme: "#1b5e20",
    light: "#c8e6c9",
    hover: "#a5d6a7",
    bg: "#e8f5e9",
    questions: [
      {
        question: "What gas do plants release?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
        answer: "Oxygen"
      },
      {
        question: "What process makes food in plants?",
        options: ["Photosynthesis", "Evaporation", "Digestion", "Respiration"],
        answer: "Photosynthesis"
      },
      {
        question: "Which part of the plant carries water?",
        options: ["Root", "Leaf", "Stem", "Flower"],
        answer: "Stem"
      },
      {
        question: "Which color do most leaves appear?",
        options: ["Green", "Red", "Yellow", "Purple"],
        answer: "Green"
      }
    ]
  },
  {
    title: "Pink Quiz 🌸",
    theme: "#ad1457",
    light: "#f8bbd0",
    hover: "#f48fb1",
    bg: "#fce4ec",
    questions: [
      {
        question: "Which color symbolizes love?",
        options: ["Pink", "Blue", "Black", "Green"],
        answer: "Pink"
      },
      {
        question: "Which of these is usually pink?",
        options: ["Rose", "Sunflower", "Lavender", "Lily"],
        answer: "Rose"
      },
      {
        question: "Which cartoon is famous for wearing pink?",
        options: ["Pink Panther", "Tom", "Jerry", "Scooby-Doo"],
        answer: "Pink Panther"
      },
      {
        question: "What fruit is often pink inside?",
        options: ["Banana", "Watermelon", "Pineapple", "Apple"],
        answer: "Watermelon"
      }
    ]
  }
];

let currentQuiz = 0;
let currentQuestion = 0;
let score = 0;

const quizTitle = document.getElementById("quizTitle");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");

function setTheme(quiz) {
  document.documentElement.style.setProperty('--theme', quiz.theme);
  document.documentElement.style.setProperty('--light', quiz.light);
  document.documentElement.style.setProperty('--hover', quiz.hover);
  document.documentElement.style.setProperty('--bg', quiz.bg);
  quizTitle.textContent = quiz.title;
}

function loadQuiz() {
  setTheme(quizzes[currentQuiz]);
  currentQuestion = 0;
  score = 0;
  scoreBox.textContent = "";
  showQuestion();
}

function showQuestion() {
  const quiz = quizzes[currentQuiz];
  const q = quiz.questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedBtn, correctAnswer) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    }
    if (btn === selectedBtn && btn.textContent !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (selectedBtn.textContent === correctAnswer) score++;
  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizzes[currentQuiz].questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  questionEl.textContent = "🎉 Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreBox.textContent = `Your score: ${score} / ${quizzes[currentQuiz].questions.length}`;

  const continueBtn = document.createElement("button");
  continueBtn.textContent =
    currentQuiz < quizzes.length - 1 ? "Next Quiz →" : "Finish 🎉";
  continueBtn.classList.add("next-btn");
  continueBtn.style.display = "block";
  continueBtn.onclick = () => {
    currentQuiz++;
    if (currentQuiz < quizzes.length) {
      loadQuiz();
    } else {
      questionEl.textContent = "🌈 All quizzes completed!";
      optionsEl.innerHTML = "";
      scoreBox.textContent = "Thanks for playing!";
    }
  };
  optionsEl.appendChild(continueBtn);
}

loadQuiz();
