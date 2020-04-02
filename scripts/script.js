/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////                COMP 1537 Hangman Project                    ////
////               Sean, Alkarim, Gaurav, Joban                  ////
////                         Group D1                            ////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
////                  Constant Variables                   ////
///////////////////////////////////////////////////////////////
const INITIAL_ASCII = 65;
const LETTER_COUNT = 26;
const GUESS_LIMIT = 7;
const GAME_OVER_WAIT = 200;

///////////////////////////////////////////////////////////////
////                   Global Variables                    ////
///////////////////////////////////////////////////////////////
let chosenWord = "";
let guesses = 0;
let letters = [];
let score = 0;
let userInput;

///////////////////////////////////////////////////////////////
////                   Firebase Linking                    ////
///////////////////////////////////////////////////////////////
let firebaseConfig = {
    apiKey: "AIzaSyAl5q_x-YE0E-Fh9oTEv2uRoVWT1O9pUok",
    authDomain: "comp1537-hangman.firebaseapp.com",
    databaseURL: "https://comp1537-hangman.firebaseio.com",
    projectId: "comp1537-hangman",
    storageBucket: "comp1537-hangman.appspot.com",
    messagingSenderId: "546718337292",
    appId: "1:546718337292:web:01d29f4f96ab851f506129",
    measurementId: "G-K0CC2YVP2Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Access to database.
let db = firebase.firestore();

///////////////////////////////////////////////////////////////
////              Button Object Constructor                ////
///////////////////////////////////////////////////////////////
function Button(buttonLetter, givenClass) {
    this.button = document.createElement("BUTTON");
    this.button.innerHTML = "&#" + buttonLetter;
    this.button.id = this.button.innerHTML;
    this.button.className = givenClass;
    this.button.onclick = function () {
        letterPressed(this.id);
    };
}

///////////////////////////////////////////////////////////////
////             Dynamically Create Alphabet               ////
///////////////////////////////////////////////////////////////
function createButtons() {
    let currentLetter = INITIAL_ASCII;
    for (let i = 0; i < LETTER_COUNT; i++) {
        let newButton = new Button(currentLetter, "alphabet");
        userKeyboard.appendChild(newButton.button);
        currentLetter++;
    }
}

///////////////////////////////////////////////////////////////
////      Choose Word and Definition From a Word Bank      ////
///////////////////////////////////////////////////////////////
function chooseWord() {
    let wordBank = [
        "committee", "A body of persons delegated to consider, investigate, take action on, or report on some matter.",
        "tattoo", "A form of body modification where a design is made by inserting ink.",
        "electricity", "Is the set of physical phenomena associated with the presence and motion of electric charge.",
        "syndrome", "A group of signs and symptons that occur together and characterize a particular abnormality or condition.",
        "dizzy", "Having a whirling sensation in the head with a tendency to fall.",
        "junk", "Something of little meaning, worth, or significance.",
        "jinxed", "To have foredoomed a failure or misfortune.",
        "awkward", "Lacking ease or grace; causing embarrassment.",
        "queue", "A waiting line especially of persons or vehicles.",
        "axiom", "A statement accepted as true as the basis for argument or inference.",
        "buffing", "The act of polishing or shining a surface.",
        "jazz", "American music developed especially from ragtime and blues."
    ];

    let randomNumber = Math.floor(Math.random() * wordBank.length);
    if (randomNumber % 2 == 1) {
        randomNumber--;
    }
    let randomWord = wordBank[randomNumber].toUpperCase();
    console.log(randomWord);

    document.getElementById("definition").innerHTML = wordBank[randomNumber + 1];

    return randomWord;
}

///////////////////////////////////////////////////////////////
////        Check to See if Chosen Letter is in Word       ////
///////////////////////////////////////////////////////////////
function letterPressed(letter) {
    let inWord = false;
    for (let i = 0; i < letters.length; i++) {
        if (letter == letters[i]) {
            replaceLine(letter);
            updateScore(1);
            inWord = true;
        }
    }
    if (inWord == false) {
        loseLife();
        updateScore(-1);
    } else {
        setTimeout(checkDone, 0);
    }
    document.getElementById(letter).disabled = true;
    document.getElementById(letter).className = "pressed";
}

///////////////////////////////////////////////////////////////
////      Create the Display of the Number of Letters      ////
///////////////////////////////////////////////////////////////
function createLetters() {
    chosenWord = chooseWord();
    document.getElementById("chosenWord").style.color = "black";
    document.getElementById("chosenWord").innerHTML = "";
    letters = [];

    for (let i = 0; i < chosenWord.length; i++) {
        document.getElementById("chosenWord").innerHTML += "-";
        letters.push(chosenWord.charAt(i));
    }
}

///////////////////////////////////////////////////////////////
////        Change Dash to Display the Chosen Letter       ////
///////////////////////////////////////////////////////////////
function replaceLine(letter) {
    let text = document.getElementById("chosenWord").innerHTML;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord.charAt(i) == letter) {
            text = text.substring(0, i) + letter + text.substring(i + 1, text.length);
            text[i] = letter;
        }
    }
    document.getElementById("chosenWord").innerHTML = text;
}

///////////////////////////////////////////////////////////////
////                 Update Score Display                  ////
///////////////////////////////////////////////////////////////
function updateScore(amount) {
    score += amount;
    document.getElementById("score").innerHTML = "Score: " + score;
}

///////////////////////////////////////////////////////////////
////    Lose Life + Update Graphics + Trigger Game Over    ////
///////////////////////////////////////////////////////////////
function loseLife() {
    guesses++;
    if (guesses < GUESS_LIMIT) {
        document.getElementById("hangmanPicture").src = "./images/" + (guesses + 1) + ".jpg";
    } else {
        document.getElementById("hangmanPicture").src = "./images/8.jpg";
        setTimeout(gameOver, GAME_OVER_WAIT);
    }
}

///////////////////////////////////////////////////////////////
////       Check if the Entire Word has Been Guessed       ////
///////////////////////////////////////////////////////////////
function checkDone() {
    let done = true;
    let activeWord = document.getElementById("chosenWord").innerHTML;
    for (let i = 0; i < activeWord.length; i++) {
        if (activeWord.charAt(i) == "-") {
            done = false;
        }
    }
    if (done) {
        victory();
    }
}

///////////////////////////////////////////////////////////////
////                 Get the User's Name                   ////
///////////////////////////////////////////////////////////////
function getName() {
    userInput = null;
    userInput = prompt("Thank you for playing!\nPlease enter your name:", "Name");

    if (userInput == null || userInput == "Name") {
        getName();
    }

    return userInput;
}

///////////////////////////////////////////////////////////////
////         Trigger Victory + Disable All Letters         ////
///////////////////////////////////////////////////////////////
function victory() {
    document.getElementById("chosenWord").style.color = "green";
    userInput = getName();
    document.getElementById("results").innerHTML = "Congratulations " + userInput + ", you won!";
    document.getElementById("endGame").disabled = true;
    let buttonLetters = document.getElementsByClassName("alphabet");
    while (buttonLetters.length > 0) {
        buttonLetters[0].disabled = true;
        buttonLetters[0].className = "pressed";
    }
    saveScore();
}

///////////////////////////////////////////////////////////////
////       Trigger Game Over + Disable All Letters         ////
///////////////////////////////////////////////////////////////
function gameOver() {
    document.getElementById("endGame").disabled = true;
    reveal();
    document.getElementById("chosenWord").style.color = "red";
    let buttonLetters = document.getElementsByClassName("alphabet");
    while (buttonLetters.length > 0) {
        buttonLetters[0].disabled = true;
        buttonLetters[0].className = "pressed";
    }

    userInput = getName();
    document.getElementById("results").innerHTML = "Game over " + userInput;

    saveScore();
}

///////////////////////////////////////////////////////////////
////              Save Scores to the Database              ////
///////////////////////////////////////////////////////////////
function saveScore() {
    if (userInput != "") {
        // Add new entry.
        db.collection("tests").doc().set({
                name: userInput,
                score: score
            })
            .then(function () {
                console.log("Entry succesfully written!");
                updateTests();
            })
            .catch(function (err) {
                console.error("Error writing entry: ", err);
            });
    }
}

///////////////////////////////////////////////////////////////
////       Get the High Scores from Database + Display     ////
///////////////////////////////////////////////////////////////
function updateTests() {
    // Clear current scores.
    document.getElementById("scoreboard").innerHTML = "<thead class='thead-dark'><tr><th>Rank</th><th>Name</th><th>Score</th></tr></thead>";
    
    // Get the scores in descending order
    let rank = 1;
    db.collection("tests").orderBy("score", "desc").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById("scoreboard").innerHTML += "<tr>" +
                "<td>" + "#" + rank + "</td>" +
                "<td>" + doc.data().name + "</td>" +
                "<td>" + doc.data().score + "</td>" +
                "</tr>";
                rank++;
        })
    })
}

///////////////////////////////////////////////////////////////
////        Reveal the Answer When the Game is Over        ////
///////////////////////////////////////////////////////////////
function reveal() {
    let word = "";
    for (let i = 0; i < letters.length; i++) {
        word += letters[i];
    }
    document.getElementById("chosenWord").innerHTML = word;
}

///////////////////////////////////////////////////////////////
////             Reset Buttons + Get a New Word            ////
///////////////////////////////////////////////////////////////
function restart() {
    score = 0;
    createLetters();

    guesses = 0;
    document.getElementById("hangmanPicture").src = "./images/" + (guesses + 1) + ".jpg";
    document.getElementById("results").innerHTML = "";

    let buttonLetters = document.getElementsByClassName("pressed");
    while (buttonLetters.length > 0) {
        buttonLetters[0].disabled = false;
        buttonLetters[0].className = "alphabet";
    }
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("endGame").disabled = false;

    console.log(letters);
}

///////////////////////////////////////////////////////////////
////          On load Create Buttons + Start Game          ////
///////////////////////////////////////////////////////////////
window.onload = createButtons();
window.onload = createLetters();
window.onload = updateTests();