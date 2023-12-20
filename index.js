//Array of words to guess
const words = [
  "serve",
  "serve",
  "change",
  "outrageous",
  "scorch",
  "cherry",
  "few",
  "magic",
  "humorous",
  "car",
  "three",
  "eggnog",
  "force",
  "planes",
  "repeat",
  "used",
  "mushy",
  "screeching",
  "impolite",
  "cool",
  "lengths",
  "lucky",
  "luxury",
  "lymph",
  "marquis",
  "matrix",
  "megahertz",
  "microwave",
  "mnemonic",
  "mystify",
  "naphtha",
  "nightclub",
  "nowadays",
  "numbskull",
  "nymph",
  "onyx",
  "ovary",
  "oxidize",
  "oxygen",
  "pajama",
  "peekaboo",
  "phlegm",
  "pixel",
  "pizazz",
  "pneumonia",
  "polka",
  "pshaw",
  "psyche",
  "puppy",
  "puzzling",
  "quartz",
  "queue",
  "quips",
  "quixotic",
  "quiz",
  "quizzes",
  "quorum",
  "razzmatazz",
  "rhubarb",
  "rhythm",
  "rickshaw",
  "schnapps",
  "scratch",
  "shiv",
  "snazzy",
  "sphinx",
  "spritz",
  "squawk",
  "staff",
  "strength",
  "strengths",
  "stretch",
  "stronghold",
  "stymied",
  "subway",
  "swivel",
  "syndrome",
  "thriftless",
  "thumbscrew",
  "topaz",
  "transcript",
  "transgress",
  "transplant",
  "triphthong",
  "twelfth",
  "unknown",
  "unworthy",
  "unzip",
  "uptown",
  "vaporize",
  "vixen",
  "vodka",
  "voodoo",
  "vortex",
  "voyeurism",
  "walkway",
  "waltz",
  "wave",
  "wavy",
  "waxy",
  "wellspring",
  "wheezy",
  "whiskey",
  "whizzing",
  "whomever",
  "wimpy",
  "witchcraft",
  "wizard",
  "woozy",
  "wristwatch",
  "wyvern",
  "xylophone",
  "yachtsman",
  "yippee",
  "yoked",
  "youthful",
  "yummy",
  "zephyr",
  "zigzag",
  "zilch",
  "zipper",
  "zodiac",
  "zombie",
];

//Get random word from array
const word = words[Math.floor(Math.random() * words.length)];
console.log(word);

//Replace letters of random word with _
const replaceLetters = (word) => {
  return word.replace(/./g, "_ ");
};
const replacedLetter = replaceLetters(word);

//Render _ on the page
const guessWordContainer = document.getElementById("guess-word");
const guessWord = document.createElement("p");
guessWord.innerText = replacedLetter;
guessWordContainer.appendChild(guessWord);

//Array of letters for the buttons
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

//Render letters on the buttons
const btnContainer = document.querySelector("#btn-container");

letters.forEach((letter) => {
  const letterBtn = document.createElement("button");
  letterBtn.classList.add("btn");
  letterBtn.textContent = letter;

  btnContainer.appendChild(letterBtn);
});

//Game values
let incorrectGuesses = 0;
const maxGuesses = 10;

//Update hangman image
const updateHangmanImg = () => {
  const hangmanImg = document.getElementById("hangman-img");

  if (incorrectGuesses <= maxGuesses) {
    hangmanImg.src = `/img/hangman_${incorrectGuesses}.png`;
  }
};

// Check if selected letter is in the word
const checkSelectedLetter = (selectedLetter, word) => {
  // Convert the word to an array of its letters for easier manipulation
  const wordArray = word.split("");
  let replacedWord = guessWord.innerText.split(" "); // Get the current displayed word

  // Check if the selected letter exists in the word
  let found = false;
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === selectedLetter) {
      // Replace the underscore with the selected letter
      replacedWord[i] = selectedLetter;
      found = true;
    }
  }

  // Update the displayed word
  guessWord.innerText = replacedWord.join(" ");

  // Check if the letter was not found in the word
  if (!found) {
    incorrectGuesses++;

    updateHangmanImg();
    console.log("Incorrect guess");

    if (incorrectGuesses >= maxGuesses) {
      setTimeout(() => {
        alert(
          `Game Over! YOU SUCK! Correct word: ${word}`,
          window.location.reload()
        );
      }, 500);
    }
  }

  if (guessWord.innerText.replace(/\s/g, "") === word) {
    setTimeout(() => {
      alert("YAY YOU WON!", window.location.reload());
    }, 500);
  }
};

// Attach click event listeners to the letter buttons
const letterButtons = document.querySelectorAll("#btn-container button");

const scrollToTop = () => {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
};

letterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectedLetter = event.target.textContent;
    checkSelectedLetter(selectedLetter, word);
    event.target.disabled = true;
    event.target.style.backgroundColor = "gray";
    event.target.style.color = "white";
    scrollToTop();
  });
});
