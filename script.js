'use strict';
// dom variables
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//intial conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let gameActive = true;

// switching player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice
btnRoll.addEventListener('click', function () {
  if (gameActive) {
    // generating dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //displaying dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //checking for 1
    if (dice !== 1) {
      currentScore += dice;
      //dynamicall selecting players current score dom
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switching player
      switchPlayer();
    }
  }
});

// hold button functionality
btnHold.addEventListener('click', function () {
  if (gameActive) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      gameActive = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// new game functionality
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  (currentScore0El.textContent = 0), (currentScore1El.textContent = 0);
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  gameActive = true;
});
