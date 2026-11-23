const MAX_ATTEMPTS = 5;

let target = 0;
let attempts = 0;
let playing = false;

const guessInput = document.getElementById("guess-value");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const attemptEl = document.getElementById("attempt");
const resultEl = document.getElementById("result");

function isNumeric(value) {
  return value.trim() !== "" && isFinite(Number(value));
}

function updateAttempt() {
  attemptEl.textContent = attempts;
}

function startGame() {
  target = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  playing = true;
  updateAttempt();
  resultEl.textContent = "";
  guessInput.value = "";
  restartBtn.style.display = "none";
  guessBtn.style.display = "inline-block";
  guessInput.focus();
}

function endGame(text) {
  playing = false;
  resultEl.textContent = text;
  guessBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

function makeGuess() {
  if (!playing) return;

  const raw = guessInput.value;
  if (!isNumeric(raw)) return;

  const value = Number(raw);
  attempts++;
  updateAttempt();

  if (value === target) {
    endGame("You WIN");
  } else if (attempts >= MAX_ATTEMPTS) {
    endGame("You LOSE");
  } else if (value > target) {
    resultEl.textContent = value + " is too high";
  } else {
    resultEl.textContent = value + " is too low";
  }

  guessInput.value = 0;
  if (playing) {
    guessInput.focus();
  }
}

guessBtn.addEventListener("click", makeGuess);
restartBtn.addEventListener("click", startGame);

// Start the first game when the page opens
startGame();
