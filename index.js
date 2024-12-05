import { films } from '/data.js';
let localFilms = [...films];

// Some useful elements
const guessInput = document.getElementById('guess-input');
const messageContainer = document.getElementsByClassName('message-container')[0];
const emojiCluesContainer = document.getElementsByClassName('emoji-clues-container')[0];
const guessForm = document.getElementById("guess-form");
const guessBtn = document.getElementById("guess-btn");
let label = document.getElementById("guess-input");
const resetGame = document.getElementById("reset-game");

// check if array is empty:

function stillEmojis(arr) {
    return arr.length > 0;
}

// remove set of emojis already guessed (either correct or incorrect):

function removeSetEmojisFromLocalFilms(arr, value) {
    return arr.filter(item => item.title !== value.title);
}

// tell the user if the guess was correct or incorrect:

function displayResult(result) {
    guessBtn.textContent = result;
    setTimeout(() => {
        guessBtn.textContent = "Submit Guess";
    }, 2000);
}


// Initialize the first film:

let currentFilm = localFilms[Math.floor(Math.random() * localFilms.length)];
emojiCluesContainer.textContent = currentFilm.emoji;

// assign maximum attemps:

let count = 3;

// main add event listener that trigger out all the game:

guessForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const userGuess = guessInput.value.trim();
    console.log("User Guess:", userGuess);

    if (count > 0) {
        if (userGuess.toLowerCase() === currentFilm.title.toLowerCase()) {
            // bring user positive resault
            guessInput.value = "";
            displayResult("Correct!");
            label.textContent = "Congratulations, you guessed the movie";
            messageContainer.textContent="Continue guessing next movie";

            // Remove guessed movie from localFilms:

            localFilms = removeSetEmojisFromLocalFilms(localFilms, currentFilm);

            if (stillEmojis(localFilms)) {
                // bring a new movie and reset the account
                currentFilm = localFilms[Math.floor(Math.random() * localFilms.length)];
                emojiCluesContainer.textContent = currentFilm.emoji;
                count = 3;
                resetGame.textContent = "";
            } else {
                // when localFilms array is empty:
                messageContainer.textContent = "Game is over! Refresh the page to start a new game.";
                emojiCluesContainer.textContent = "";
                resetGame.innerHTML = `<button id="reset-game">Start a New Game</div>`;
                resetGame.addEventListener("click", () => {
                    location.reload(); //
                });
            }
        } else {
            // bring user negative resault
            count -= 1;
            if (count > 0) {
                messageContainer.textContent = `Try again! You have ${count} guesses remaining.`;
                displayResult("Incorrect");
            } else {
                // Handle when no guesses are left
                messageContainer.textContent = `No guesses left. The film was ${currentFilm.title}!`;
                resetGame.textContent ="Continue guessing next movie";
                guessInput.value = "";

                count = 3;

                // Move to the next movie
                localFilms = removeSetEmojisFromLocalFilms(localFilms, currentFilm);

                if (stillEmojis(localFilms)) {
                    currentFilm = localFilms[Math.floor(Math.random() * localFilms.length)];
                    emojiCluesContainer.textContent = currentFilm.emoji;
                } else {
                    emojiCluesContainer.textContent = ""; // Clear emoji clues
                    messageContainer.textContent = "That's all folks!";
                    emojiCluesContainer.textContent = ""; // Clear emoji clues
                    resetGame.innerHTML = `<button id="reset-game">Start a New Game</button>`;
                    resetGame.addEventListener("click", () => {
                    location.reload();
                });

                }
            }
        }
    }
});
