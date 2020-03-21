//var wordBank = ["hello", "goodbye", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] Moved to be local
//let randomWord = "";
let chosenWord = "";
let wordAnswer = "";
let maxWrong = 6;
let guesses = 0;
let wordLength = 0;
let status = null;
let letters = [];


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
        newButton.onclick = function () {letterPressed(newButton.id)};
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
    let wordBank = ["hello", "goodbye", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase();
    console.log(randomWord);

    return randomWord;

    //document.getElementById("maxLetters").innerHTML = maxWrong;
    //wordLength = randomWord.length;
}

function createLetters() {
    chosenWord = chooseWord();

    for (let i = 0; i < chosenWord.length; i++) {
        document.getElementById("chosenWord").innerHTML += "-";
        letters.push(chosenWord.charAt(i));
    }

    return letters;
}

function letterPressed(letter) {
    let inWord = false;
    for (let i = 0; i < letters.length; i++) {
        if (letter == letters[i]) {
            replaceLine(letter);
            inWord = true;
        } 
    }
    if (inWord == false) {
        loseLife();
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
}

function loseLife() {
    guesses++;
    document.getElementById("wrong").innerHTML = guesses;
}



function wordGuess(){
    for(let i = 0; i < wordLength; i++){
        
    }
    document.getElementById("guessedWord").innerHTML = status
}
createButtons();
createLetters();
//chooseWord();