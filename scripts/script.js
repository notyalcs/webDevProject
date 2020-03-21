var wordBank = ["hello", "goodbye", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
let randomWord = "";
let wordAnswer = "";
let maxWrong = 6;
let wordLength = 0;
let status = null;

function createButtons() {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    for (let i = 0; i < alphabet.length; i++) {
        let button = document.createElement("button");
        button.setAttribute('class', 'alphabet')
        button.innerHTML = alphabet[i];
        userKeyboard.appendChild(button);
    }
}

function chooseWord() {
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(randomWord);
    document.getElementById("maxLetters").innerHTML = maxWrong;
    wordLength = randomWord.length;
}
function wordGuess(){
    for(let i = 0; i < wordLength; i++){
        
    }
    document.getElementById("guessedWord").innerHTML = status
}
createButtons();
chooseWord();