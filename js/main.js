"use strict";

// Selecting elements
const player1El = document.querySelector(".player--1");
const player2El = document.querySelector(".player--2");
const score1El = document.querySelector("#score--1");
const score2El = document.getElementById("score--2");
const current1El = document.getElementById("current--1");
const current2El = document.getElementById("current--2");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Start conditions
let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0, activePlayer = 1, scores = [0, 0], playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  diceEl.classList.add("hidden");
  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");
  player1El.classList.add("player--active");
  player2El.classList.remove("player--active");
};
// Start Project
init();

// Switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle("player--active");
  player2El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Diplay dice
    diceEl.src = `images/dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to cureent score
      currentScore += dice; // currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer - 1];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer - 1] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// New Game
btnNew.addEventListener("click", init);

