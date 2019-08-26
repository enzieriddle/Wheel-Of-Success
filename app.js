/* Variables ------------------------------*/
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const phraseUl = document.querySelector("#phrase ul");
let missed = 0;
const startButton = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
const letterButton = document.querySelectorAll("button");
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
function getRandomPhraseAsArray(phrases) {
  // Randomly choose phrase from phrases array.
  phrases = phrases[Math.floor(Math.random() * phrases.length)];
  // Split array into new array of characters.
  let phraseArray = phrases.split("");
  return phraseArray;
}

function addPhraseToDisplay(phraseArray) {
  // Loop through split array.
  for (i = 0; i < phraseArray.length; i += 1) {
    // Create list item.
    let listItem = document.createElement("li");
    // Put character inside of list item.
    listItem.append(phraseArray[i]);
    // Append list item to #phrase <ul> tag.
    phraseUl.append(listItem);
    /* If character is a space, add class of 'space'
       to list item. If not, add class of 'letter'.*/
    if (listItem.textContent === " ") {
      listItem.className = "space";
    } else {
      listItem.className = "letter";
    }
  }
}

function checkLetter(letterButton) {
  const letterClass = document.querySelectorAll(".letter");
  /* Check if letter in letterClass match the letter in the button the
  player has chosen. */
  let matchedLetter = null;
  for (i = 0; i < letterClass.length; i += 1) {
    if (letterButton.textContent === letterClass[i].textContent) {
      console.log(letterButton.textContent + " " + letterClass[i].textContent);
      /* If there is a match, add 'show' class to list item containing
      that letter. Store the matching letter in a variable.*/
      letterClass[i].classList.add("show");
      matchedLetter = letterButton.textContent;
    }
  }
  return matchedLetter;
}

// Check whether the game has been won or lost.
function checkWin() {
  // Select objects that have classes of 'letter' and 'show.'
  let letterClass = document.querySelectorAll(".letter");
  const showClass = document.querySelectorAll(".show");
  /* Compare number of letters with the class .show with number of letterClass
  with the class .letters */
  /* If they are equal, display .win class. If the misses are greater
  than or equal to 5, display the .lose class */
  if (letterClass.length === showClass.length) {
    /* Remove 'class' from tag with ID of 'overlay.'
       Apply '.win' class to tag with ID of 'overlay.' */
    overlay.removeAttribute("class");
    overlay.classList.add("win");
    overlay.style.display = "block";
  } else if (missed >= 5) {
    /* Remove 'class' from tag with ID of 'overlay.'
       Apply '.lose' class to tag with ID of 'overlay.' */
    overlay.removeAttribute("class");
    overlay.classList.add("lose");
    overlay.style.display = "block";
  } else {
    overlay.display = "none";
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
  e.target.classList.add("chosen");
  // Set button to disabled.
  e.target.disabled = "true";
  let letterFound = checkLetter(e.target);
  /* Check the value of the letterFound variable.
  If the value is null, increase the 'missed' counter by 1. */
  if (letterFound === null) {
    missed += 1;
    let liveHeart = document.querySelectorAll(
      "li img[src='images/liveHeart.png']"
    );
    /* Create a loop that runs as long as there are still tries left.
    remove one of the hearts.*/
    if (liveHeart.length > 0) {
      liveHeart[0].setAttribute("src", "images/lostHeart.png");
      // Increase the missed count by 1.
    }
  }
  checkWin();
});

/* Function Calls ------------------------------*/
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
