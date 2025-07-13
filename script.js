"use strict";

const playerCardOne = document.querySelector(".player--0");
const playerCardTwo = document.querySelector(".player--1");
const score_0El = document.querySelector("#score--0");
const score_1El = document.querySelector("#score--1");
const currentScore_0 = document.querySelector("#current--0");
const currentScore_1 = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const diceRollBtn = document.querySelector(".btn--roll");
const newGameBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");

let activePlayer = 0; // player 1 = 0, player 2 = 1
let scores = [0, 0];
let currentScore = 0;
let playing = true;

diceEl.classList.add("hidden"); //hidden the dice image

// switch player functionality
function switchPlayer() {
  playerCardOne.classList.toggle("player--active");
  playerCardTwo.classList.toggle("player--active");
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
}

// init functionality
initializeGame();
function initializeGame() {
  currentScore = 0;
  currentScore_0.textContent = 0;
  currentScore_1.textContent = 0;
  score_0El.textContent = 0;
  score_1El.textContent = 0;
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  diceEl.classList.add("hidden");

  playerCardOne.classList.remove("player--winner");
  playerCardTwo.classList.remove("player--winner");
  playerCardTwo.classList.remove("player--active");
  playerCardOne.classList.add("player--active");
  document.querySelector(`#name--0`).textContent = `Player 1`;
  document.querySelector(`#name--1`).textContent = `Player 2`;
}

// rolling dice functionality

diceRollBtn.addEventListener("click", () => {
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // display dice roll image
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // check if its 1 or not
    // if it is 1 , switch to next player
    // else , add the score
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// hold button functionality
holdBtn.addEventListener("click", () => {
  if (playing) {
    // add current score to total score of active player
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //  check if score >= 100 , and announce who wins
    // finish the game
    // else , switch the player
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Won!`;
    } else {
      switchPlayer();
    }
  }
});

// newgame button functionality
newGameBtn.addEventListener("click", initializeGame);
