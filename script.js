const bandPlan = [
    { band: "160 m", frequency: "1,810 - 2,000 MHz" },
    { band: "80 m", frequency: "3,500 - 3,800 MHz" },
    { band: "60 m", frequency: "5,260 - 5,410 MHz" },
    { band: "40 m", frequency: "7,000 - 7,200 MHz" },
    { band: "30 m", frequency: "10,100 - 10,150 MHz" },
    { band: "20 m", frequency: "14,000 - 14,350 MHz" },
    { band: "17 m", frequency: "18,068 - 18,168 MHz" },
    { band: "15 m", frequency: "21,000 - 21,450 MHz" },
    { band: "12 m", frequency: "24,740 - 24,990 MHz" },
    { band: "10 m", frequency: "28,000 - 29,700 MHz" },
    { band: "6 m", frequency: "50,000 - 52,000 MHz" },
];

let score = 0;
let currentQuestion = {};
let questionType = "";
let correctAnswerIndex = 0;

function generateQuestion() {
    questionType = Math.random() < 0.5 ? "band_to_frequency" : "frequency_to_band";
    currentQuestion = bandPlan[Math.floor(Math.random() * bandPlan.length)];
    const options = [...bandPlan].sort(() => Math.random() - 0.5).slice(0, 4);

    if (!options.some((opt) => opt.band === currentQuestion.band)) {
        options[0] = currentQuestion;
    }

    correctAnswerIndex = options.findIndex((opt) => opt.band === currentQuestion.band);

    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const nextButton = document.getElementById("nextButton");

    nextButton.disabled = true;
    answersElement.innerHTML = "";

    if (questionType === "band_to_frequency") {
        questionElement.textContent = `Hvilke frekvenser ligger innenfor ${currentQuestion.band} båndet?`;
        options.forEach((opt, i) => {
            const li = document.createElement("li");
            li.innerHTML = `<button onclick="checkAnswer(${i})">${opt.frequency}</button>`;
            answersElement.appendChild(li);
        });
    } else {
        questionElement.textContent = `Hva slags bånd er ${currentQuestion.frequency}?`;
        options.forEach((opt, i) => {
            const li = document.createElement("li");
            li.innerHTML = `<button onclick="checkAnswer(${i})">${opt.band}</button>`;
            answersElement.appendChild(li);
        });
    }
}

function checkAnswer(selectedIndex) {
    const nextButton = document.getElementById("nextButton");
    if (selectedIndex === correctAnswerIndex) {
        score++;
        document.getElementById("score").textContent = `Riktig! Poeng: ${score}`;
    } else {
        document.getElementById("score").textContent = `Feil. Riktig svar var ${
            questionType === "band_to_frequency"
                ? bandPlan[correctAnswerIndex].frequency
                : bandPlan[correctAnswerIndex].band
        }.`;
    }
    nextButton.disabled = false;
}

function nextQuestion() {
    document.getElementById("score").textContent = "";
    generateQuestion();
}

// Start første spørsmål
generateQuestion();
