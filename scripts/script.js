/////////////////////////////////////////////////////////////
//        COMP 1537 Hangman Project                        //
//       Sean, Alkarim, Gaurav, Joban                      //
//                 Group D1                                //
/////////////////////////////////////////////////////////////

/////////////////////////////
//     Global Variables    //
/////////////////////////////
let chosenWord = "";
let wordAnswer = "";
let maxWrong = 6;
let guesses = 0;
let wordLength = 0;
let status = null;
let letters = [];
let score = 0;
let input;

/////////////////////////////
//     Firebase Linking    //
/////////////////////////////
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

////////////////////////////////////////
//     Dynamically Create Alphabet    //
////////////////////////////////////////
function createButtons() {
    let asciiPosition = 65;
    
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
}

////////////////////////////////////////////////////////
//     Choose Word and Definition From a Word Bank    //
////////////////////////////////////////////////////////
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
}

///////////////////////////////////////////////////////////////////
//     Button event, Check to See if Chosen Letter is in Word    //
///////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////
//     Create the Display of the Number of Letters    //
////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////
//     Change the Dash to Display the Chosen Letter    //
/////////////////////////////////////////////////////////
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
}

/////////////////////////////////
//     Update Score Display    //
/////////////////////////////////
function updateScore(amount) {
    score += amount;
    document.getElementById("score").innerHTML = "Score: " + score;
}

////////////////////////////////////////////////////////////////
//     Lose Life and Update Graphics and Trigger Game Over    //
////////////////////////////////////////////////////////////////
function loseLife() {
    guesses++;
    if (guesses < 7) {
        document.getElementById("hangmanPicture").src = "./images2/" + (guesses + 1) + ".jpg";
    } else {
        document.getElementById("hangmanPicture").src = "./images2/8.jpg";
        setTimeout(gameOver, 200);
    }
}

//////////////////////////////////////////////////////
//     Check if the Entire Word has Been Guessed    //
//////////////////////////////////////////////////////
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
    }
}

////////////////////////////////
//     Get the User's Name    //
////////////////////////////////
function getName() {
    input = null;
    input = prompt("Thank you for playing!\nPlease enter your name:", "Name");
    return input;
}

//////////////////////////////////////////////////
//     Trigger Victory + Disable All Letters    //
//////////////////////////////////////////////////
function victory() {
    document.getElementById("chosenWord").style.color = "green";
    input = getName();
    document.getElementById("results").innerHTML = "Congratulations " + input + ", you won!";
    document.getElementById("endGame").disabled = true;
    let buttonLetters = document.getElementsByClassName("alphabet");
    while (buttonLetters.length > 0) {
        buttonLetters[0].disabled = true;
        buttonLetters[0].className = "pressed";
    }
    saveScore();
}

///////////////////////////////////////////////////
//     Trigger Game Over + Disable All Letters   //
///////////////////////////////////////////////////
function gameOver() {
    document.getElementById("endGame").disabled = true;
    reveal();
    document.getElementById("chosenWord").style.color = "red";
    let buttonLetters = document.getElementsByClassName("alphabet");
    while (buttonLetters.length > 0) {
        buttonLetters[0].disabled = true;
        buttonLetters[0].className = "pressed";
    }

    input = getName();
    document.getElementById("results").innerHTML = "Game over " + input;
    
    saveScore();
}

///////////////////////////////////////
//     Save Scores to the Database   //
///////////////////////////////////////
function saveScore() {
    if (input !== "") {
        // Add new entry.
        db.collection("tests").doc().set({
            name: input,
            score: score
        })
            .then(function () {
                console.log("Entry succesfully written!");
                updateTests();
            })
            .catch(function (err) {
                console.error("Error writing entry: ", err);
            });
    } else {
        alert("Please enter a name");
    }
}

///////////////////////////////////////////////////////
//     Get the High Scores from Database + Display   //
///////////////////////////////////////////////////////
function updateTests() {
    // Clear current scores.
    document.getElementById("scoreboard").innerHTML = "<tr><th>Name</th><th>Score</th></tr>";

    // Get the top 5 scores.
    db.collection("tests").orderBy("score", "desc").limit(5).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            document.getElementById("scoreboard").innerHTML += "<tr>" +
                "<td>" + doc.data().name + "</td>" +
                "<td>" + doc.data().score + "</td>" +
                "</tr>";
        })
    })
}
window.onload = updateTests;

///////////////////////////////////////////////////
//     Reveal the Answer When the Game is Over   //
///////////////////////////////////////////////////
function reveal() {
    let word = "";
    for (let i = 0; i < letters.length; i++) {
        word += letters[i];
    }
    document.getElementById("chosenWord").innerHTML = word;
}

//////////////////////////////////////////
//     Reset Buttons + Get a New Word   //
//////////////////////////////////////////
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


// function wordGuess() {
//     for (let i = 0; i < wordLength; i++) {

//     }
//     document.getElementById("guessedWord").innerHTML = status
// }
createButtons();
createLetters();
//chooseWord();