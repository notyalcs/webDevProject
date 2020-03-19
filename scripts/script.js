var wordBank = ["hello", "goodbye", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
let randomWord = "";
function createButtons() {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    for (let i = 0; i < alphabet.length; i++) {
        let button = document.createElement("button");
        button.setAttribute('class', 'alphabet')
        button.innerHTML = alphabet[i];
        userKeyboard.appendChild(button);
    }
}
function chooseWord(){
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(randomWord);
}
createButtons();
chooseWord();