/* Variables ------------------------------*/
const qwerty = document.querySelector("#querty");
const phrase = document.querySelector("#phrase");
const phraseUl = document.querySelector("#phrase ul");
let missed = 0;
const startButton = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
const keyrowButton = document.querySelectorAll("button");

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
    if (splitRandomPhrase[i].textContent === "text") {
      splitRandomPhrase[i].className = "letter";
    } else {
      splitRandomPhrase[i].className = "";
    }
  }
}

function checkLetter(letterButton) {
  // Get the elements with a class of "letter."
  const letterClass = document.querySelectorAll(".letter");
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

/* Event Listeners ------------------------------*/

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener("click", e => {
  overlay.style.display = "none";
});

for (i = 0; i < keyrowButton.length; i += 1) {
  keyrowButton[i].addEventListener("click", e => {
    keyrowButton[i].className = "chosen";
    keyrowButton[i].disabled = "true";
  });
}

/* Function Calls ------------------------------*/
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
