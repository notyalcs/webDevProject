//var wordBank = ["hello", "goodbye", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] Moved to be local
//let randomWord = "";
let chosenWord = "";
let wordAnswer = "";
let maxWrong = 6;
let guesses = 0;
let wordLength = 0;
let status = null;
let letters = [];
let score = 0;

function createButtons() {
    //let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let asciiPosition = 65;


    // Changed to ascii instead of alphabet and added onclick event
    for (let i = 0; i < 26; i++) {
        let newButton = document.createElement("BUTTON");
        newButton.innerHTML = "&#" + asciiPosition;
        asciiPosition++;
        newButton.id = newButton.innerHTML;
        newButton.className = "alphabet";
        newButton.onclick = function () {
            letterPressed(newButton.id)
        };
        userKeyboard.appendChild(newButton);
    }

    // for (let i = 0; i < alphabet.length; i++) {
    //     let button = document.createElement("button");
    //     button.setAttribute('class', 'alphabet')
    //     button.innerHTML = alphabet[i];
    //     userKeyboard.appendChild(button);
    // }
}

function letterPressed(letter) {
    console.log(letter);
}

function chooseWord() {
    let wordBank = [
        "committee", "A body of persons delegated to consider, investigate, take action on, or report on some matter.",
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

    //document.getElementById("maxLetters").innerHTML = maxWrong;
    //wordLength = randomWord.length;
}

function createLetters() {
    chosenWord = chooseWord();

    document.getElementById("chosenWord").innerHTML = "";
    letters = [];

    for (let i = 0; i < chosenWord.length; i++) {
        document.getElementById("chosenWord").innerHTML += "-";
        letters.push(chosenWord.charAt(i));
    }
}

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
    }
    document.getElementById(letter).disabled = true;
    document.getElementById(letter).className = "pressed";
}

function replaceLine(letter) {
    let text = document.getElementById("chosenWord").innerHTML;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord.charAt(i) == letter) {
            text = text.substring(0, i) + letter + text.substring(i + 1, text.length);
            text[i] = letter;
        }
    }

    document.getElementById("chosenWord").innerHTML = text;
    checkDone();
    // checkDone();
}

function updateScore(amount) {
    score += amount;
    document.getElementById("score").innerHTML = "Score: " + score;
}

function loseLife() {
    guesses++;
    // document.getElementById("wrong").innerHTML = guesses;
    if (guesses < 7) {
        document.getElementById("hangmanPicture").src = "./images2/" + (guesses + 1) + ".jpg";
    } else {
        setTimeout(gameOver, 0);
        // gameOver();
    }
}

function checkDone() {
    let done = true;
    let activeWord = document.getElementById("chosenWord").innerHTML;
    for (let i = 0; i < activeWord.length; i++) {
        if (activeWord.charAt(i) == "-") {
            done = false;
        }
    }
    if (done) {
        setTimeout(victory, 0);
        // victory();
    }
}

function getName() {
    let name = null;
    name = prompt("Thank you for playing!\nPlease enter your name:", "Name");
    // setTimeout(function () {
    //     name = prompt("Thank you for playing!\nPlease enter your name:", "Name")
    // }, 0);
    return name;
}

function victory() {
    let name = getName();
    document.getElementById("results").innerHTML = "Congratulations " + name + ", you won!";
    document.getElementById("endGame").disabled = true;
    // Database stuff
    // recordScore();
    // displayLeaderboard();
}

function gameOver() {
    document.getElementById("endGame").disabled = true;
    let buttonLetters = document.getElementsByClassName("alphabet");
    while (buttonLetters.length > 0) {
        buttonLetters[0].disabled = true;
        buttonLetters[0].className = "pressed";
    }

    let name = getName();
    document.getElementById("results").innerHTML = "Game over " + name;
}

function restart() {
    score = 0;
    createLetters();

    guesses = 0;
    document.getElementById("hangmanPicture").src = "./images2/" + (guesses + 1) + ".jpg";
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


////-------- Timer for the Game -------//

// function timer() {
//     let sec = 59;
//     let timer = setInterval(function () {
//         document.getElementById('gameTimer').innerHTML = '00:' + sec;
//         sec--;
//         if (sec < 0) {
//             clearInterval(timer);
//         }
//     }, 1000);
// }

//window.onload = timer;


function wordGuess() {
    for (let i = 0; i < wordLength; i++) {

    }
    document.getElementById("guessedWord").innerHTML = status
}
createButtons();
createLetters();
//chooseWord();