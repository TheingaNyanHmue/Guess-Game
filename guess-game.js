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

function showResult(text, cssClass) {
  resultEl.textContent = text;
  resultEl.className = cssClass || "";
}

function updateAttempt() {
  attemptEl.textContent = attempts;
}

function startGame() {
  target = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  playing = true;
  updateAttempt();
  showResult("", "");
  guessInput.value = "";
  restartBtn.style.display = "none";
  guessBtn.style.display = "inline-block";
  guessInput.focus();
}

function endGame(text, cssClass) {
  playing = false;
  showResult(text, cssClass);
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
    endGame("You WIN", "win");
  } else if (attempts >= MAX_ATTEMPTS) {
    endGame("You LOSE", "lose");
  } else if (value > target) {
    showResult(value + " is too high", "");
  } else {
    showResult(value + " is too low", "");
  }

  guessInput.value = 0;
  if (playing) {
    guessInput.focus();
  }
}

// Initial state (also on refresh)
guessInput.value = "";
attempts = 0;
updateAttempt();
showResult("", "");
guessBtn.style.display = "none";
restartBtn.style.display = "inline-block";

guessBtn.addEventListener("click", makeGuess);
restartBtn.addEventListener("click", startGame);
