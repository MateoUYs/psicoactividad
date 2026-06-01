const QUESTIONS = [
  {
    situation:
      "Lucía estudia únicamente porque quiere obtener una buena calificación en el examen final.",
    options: [
      "Motivación intrínseca",
      "Motivación extrínseca",
      "Motivación por dominio",
      "Perspectiva social"
    ],
    answer: "Motivación extrínseca",
    explanation:
      "Lucía realiza la actividad por una recompensa externa: la calificación. El interés principal no está en aprender, sino en el resultado obtenido."
  },
  {
    situation:
      "Martín continúa practicando programación durante varias horas porque quiere comprender cómo funciona realmente el código y mejorar sus habilidades.",
    options: [
      "Motivación de logro",
      "Motivación extrínseca",
      "Motivación por dominio",
      "Perspectiva conductual"
    ],
    answer: "Motivación por dominio",
    explanation:
      "Martín busca comprender profundamente una habilidad y mejorarla. El foco está en el aprendizaje y no solamente en una nota o recompensa."
  },
  {
    situation:
      "Una estudiante deja de participar porque cree que nunca podrá aprender la materia, aunque anteriormente había obtenido buenos resultados.",
    options: [
      "Perspectiva cognitiva",
      "Perspectiva social",
      "Motivación intrínseca",
      "Perspectiva conductual"
    ],
    answer: "Perspectiva cognitiva",
    explanation:
      "La situación está relacionada con las creencias que la estudiante tiene sobre sus propias capacidades y posibilidades de éxito."
  },
  {
    situation:
      "Un docente ofrece puntos extra a quienes entreguen las actividades antes de la fecha límite.",
    options: [
      "Perspectiva humanista",
      "Motivación por dominio",
      "Perspectiva conductual",
      "Perspectiva social"
    ],
    answer: "Perspectiva conductual",
    explanation:
      "Se utilizan incentivos externos para aumentar una conducta determinada. Es una característica típica de la perspectiva conductual."
  },
  {
    situation:
      "Un estudiante mejora notablemente cuando se siente escuchado, respetado y valorado por su docente y por el grupo.",
    options: [
      "Motivación de logro",
      "Perspectiva humanista",
      "Motivación extrínseca",
      "Perspectiva cognitiva"
    ],
    answer: "Perspectiva humanista",
    explanation:
      "La perspectiva humanista destaca la importancia de las necesidades afectivas, la autoestima, el respeto y el reconocimiento para favorecer el aprendizaje."
  }
];

const WORDS = [
  "Motivación",
  "Aprendizaje",
  "Autonomía",
  "Dominio",
  "Logro",
  "Autoeficacia",
  "Participación",
  "Esfuerzo",
  "Docencia",
  "Comprensión",
  "Clima de aula",
  "Retroalimentación"
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionStep = document.getElementById("question-step");
const scenarioText = document.getElementById("scenario-text");
const optionsWrap = document.getElementById("options");
const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");
const progressBar = document.getElementById("progress-bar");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const scoreOrb = document.getElementById("score-orb");
const resultChip = document.getElementById("result-chip");
const scoreFill = document.getElementById("score-fill");
const scoreLabel = document.getElementById("score-label");
const wordCloud = document.getElementById("word-cloud");
const soundSwitch = document.getElementById("sound-switch");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => item.classList.remove("visible"));
  screen.classList.add("visible");
}

function initQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  renderQuestion();
  showScreen(quizScreen);
}

function renderQuestion() {
  const question = QUESTIONS[currentQuestion];
  questionStep.textContent = `Pregunta ${currentQuestion + 1} de ${QUESTIONS.length}`;
  scenarioText.textContent = `"${question.situation}"`;
  progressBar.style.width = `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`;

  optionsWrap.innerHTML = "";
  feedback.hidden = true;
  nextBtn.textContent = currentQuestion === QUESTIONS.length - 1 ? "Ver resultado" : "Siguiente situación";
  answered = false;

  question.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "option-btn";
    optionBtn.type = "button";
    optionBtn.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
    optionBtn.addEventListener("click", () => selectOption(option, optionBtn));
    optionsWrap.appendChild(optionBtn);
  });
}

function selectOption(selected, selectedButton) {
  if (answered) {
    return;
  }
  answered = true;

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selected === question.answer;
  if (isCorrect) {
    score += 1;
  }

  [...optionsWrap.children].forEach((button) => {
    button.disabled = true;
    const clean = button.textContent.replace(/^[A-D]\)\s/, "");
    if (clean === question.answer) {
      button.classList.add("correct");
    }
  });

  selectedButton.classList.add(isCorrect ? "correct" : "wrong");

  feedbackTitle.textContent = isCorrect ? "Respuesta correcta" : "Respuesta incorrecta";
  feedbackText.textContent = question.explanation;
  feedback.hidden = false;

  playSound(isCorrect ? 880 : 240);
}

function showResult() {
  showScreen(resultScreen);
  const max = QUESTIONS.length;
  const ratio = score / max;
  scoreOrb.textContent = `${score}/${max}`;
  scoreFill.style.width = `${ratio * 100}%`;
  scoreLabel.textContent = `${Math.round(ratio * 100)}% de respuestas correctas`;

  if (score === max) {
    resultChip.textContent = "Nivel destacado";
    resultTitle.textContent = "Especialista en Motivación";
    resultMessage.textContent =
      "Lograste identificar correctamente los principales conceptos trabajados durante la presentación.";
    scoreOrb.style.background = "linear-gradient(140deg, #00a38f, #3cd9bd)";
    scoreFill.style.background = "linear-gradient(90deg, #15c3a3, #6df2d4)";
    launchConfetti();
  } else if (score >= 3) {
    resultChip.textContent = "Buen progreso";
    resultTitle.textContent = "Buen análisis";
    resultMessage.textContent =
      "Comprendés gran parte de las teorías de la motivación. Seguí explorando cómo se relacionan con la práctica docente.";
    scoreOrb.style.background = "linear-gradient(140deg, #1f6feb, #6bb5ff)";
    scoreFill.style.background = "linear-gradient(90deg, #2b7bff, #73b8ff)";
  } else {
    resultChip.textContent = "En construcción";
    resultTitle.textContent = "Seguí reflexionando";
    resultMessage.textContent =
      "La motivación es un fenómeno complejo. Revisar los distintos enfoques ayuda a comprender mejor las situaciones educativas.";
    scoreOrb.style.background = "linear-gradient(140deg, #d36a4f, #ff9b7d)";
    scoreFill.style.background = "linear-gradient(90deg, #e07a5f, #ffb08f)";
  }

  buildWordCloud();
}

function buildWordCloud() {
  wordCloud.innerHTML = "";
  const isMobile = window.matchMedia("(max-width: 780px)").matches;

  WORDS.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    const size = isMobile ? 0.98 + Math.random() * 0.34 : 1.05 + Math.random() * 0.4;
    span.style.fontSize = `${size}rem`;
    span.style.animationDelay = `${index * 0.16}s`;
    span.style.color = index % 2 === 0 ? "var(--primary)" : "var(--text-soft)";
    wordCloud.appendChild(span);
  });
}

function nextStep() {
  if (currentQuestion === QUESTIONS.length - 1) {
    showResult();
    return;
  }
  currentQuestion += 1;
  renderQuestion();
}

function playSound(frequency) {
  if (!soundSwitch.checked) {
    return;
  }
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.015);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.24);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.25);
}

function launchConfetti() {
  const pieces = 28;
  for (let i = 0; i < pieces; i += 1) {
    const burst = document.createElement("span");
    burst.style.position = "fixed";
    burst.style.width = "8px";
    burst.style.height = "14px";
    burst.style.borderRadius = "2px";
    burst.style.top = "14%";
    burst.style.left = `${18 + Math.random() * 64}%`;
    burst.style.background = i % 2 === 0 ? "#2d8eff" : "#3cd9bd";
    burst.style.zIndex = "5";
    burst.style.opacity = "0.8";
    burst.style.transition = "transform 1400ms cubic-bezier(.1,.8,.2,1), opacity 1400ms";
    document.body.appendChild(burst);

    requestAnimationFrame(() => {
      const moveX = (Math.random() - 0.5) * 180;
      const moveY = 260 + Math.random() * 180;
      burst.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 420}deg)`;
      burst.style.opacity = "0";
    });

    setTimeout(() => burst.remove(), 1500);
  }
}

function initParticles() {
  const canvas = document.getElementById("particles");
  const context = canvas.getContext("2d");
  const symbols = [".", "o", "*", "+", "[]", "{}"];
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(45, Math.floor(window.innerWidth / 22)) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: 0.12 + Math.random() * 0.35,
      size: 11 + Math.random() * 8,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      alpha: 0.12 + Math.random() * 0.2
    }));
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "600 14px Plus Jakarta Sans";

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width + 20) {
        p.x = -20;
      }
      if (p.x < -20) {
        p.x = canvas.width + 20;
      }

      context.fillStyle = `rgba(110, 140, 180, ${p.alpha})`;
      context.fillText(p.char, p.x, p.y);
    });

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

startBtn.addEventListener("click", initQuiz);
nextBtn.addEventListener("click", nextStep);
restartBtn.addEventListener("click", () => {
  showScreen(startScreen);
});

initParticles();
