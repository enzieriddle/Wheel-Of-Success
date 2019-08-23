/* Variables ------------------------------*/
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const phraseUl = document.querySelector("#phrase ul");
let tries = document.querySelectorAll(".tries img");
let missed = 0;
const startButton = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
const letterButton = document.querySelectorAll("button");
const letterClass = document.querySelectorAll(".letter");
const showClass = document.querySelectorAll(".show");
const winClass = document.querySelector(".win");
const loseClass = document.querySelector(".lose");

const phrases = [
  "keep your eyes peeled",
  "an arm and a leg",
  "foaming at the mouth",
  "shot in the dark",
  "cry over spilt milk"
];

/* Functions ------------------------------*/
function getRandomPhraseAsArray(randomPhrase) {
  // Randomly choose phrase from phrases array.
  randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  // Split array into new array of characters.
  let splitRandomPhrase = randomPhrase.split("");
  return splitRandomPhrase;
}

function addPhraseToDisplay(splitRandomPhrase) {
  // Loop through split array.
  for (i = 0; i < splitRandomPhrase.length; i += 1) {
    // Create list item.
    let listItem = document.createElement("li");
    // Put character inside of list item.
    listItem.append(splitRandomPhrase[i]);
    // Append list item to #phrase <ul> tag.
    phraseUl.append(listItem);
    /* If character is a letter and not a space, add class
       of "letter" to list item.*/
    if (listItem.textContent === " ") {
      listItem.className = "space";
    } else {
      listItem.className = "letter";
    }
  }
}

function checkLetter(letterButton) {
  /* Check if letter in letterClass match the letter in the button the
  player has chosen. */
  for (i = 0; i < letterClass.length; i += 1) {
    if (letterButton.textContent === letterClass[i].textContent) {
      /* If there is a match, add 'show' class to list item containing
      that letter. Store the matching letter in a variable.*/
      letterClass.className = "show";
      let matchedLetter = letterButton.textContent;
      return matchedLetter;
    } else {
      return null;
    }
  }
}

// Check whether the game has been won or lost.
function checkWin() {
  /* Compare number of letters with the class .show with number of letterClass
  with the class .letters */
  /* If they are equal, display .win class. If the misses are greater
  than or equal to 5, display the .lose class */
  if (letterClass.length === showClass.length) {
    winClass.style.display = "block";
  } else if (misses >= 5) {
    loseClass.style.display = "block";
  }
}

/* Event Listeners ------------------------------*/

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener("click", e => {
  overlay.style.display = "none";
});

// Use event delegation to listen only to button events from the keyboard.
qwerty.addEventListener("click", e => {
  // When a player chooses a letter, add the “chosen” class to that button.
  e.target.className = "chosen";
  // Set button to disabled.
  e.target.disabled = "true";
  let letterFound = checkLetter(e);
  // Check the value of the letterFound variable.
  if (letterFound === "null") {
    // Create a loop that runs as long as there are still tries left.
    for (i = 0; i < tries.length; i += 1) {
      // If the value is null, remove one of the tries from the keyboard.
      tries[i].remove;
      // Increase the missed count by 1.
      missed += 1;
    }
  }
});

/* Function Calls ------------------------------*/
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
