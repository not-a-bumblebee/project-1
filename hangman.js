let hangedUI = document.querySelector(".guess-ui")
let hangedInput = document.querySelector(".hangman-input")
let hangedBank = document.querySelector(".word-bank")
let hangedDemerits = document.querySelectorAll(".demerit")
let hangedStart = document.querySelector(".hangman-btn-retry")
let letterSubmitBtn = document.querySelector(".hangman-btn")
let hangedResult = document.querySelector(".hang-result")
let arr = ["pie", "pickled rick", "pajama sam two", "vampire", "doctor who", "ostrich","cow","dinosaur"]

let wordBankRight = []
let wordBankWrong = []

let chances

let choice

const re = /\w/g
let template


const hangedInit = () => {
    //Resets everything
    hangedDemerits.forEach(x => x.classList.add("hidden"))
    wordBankRight = []
    wordBankWrong = []
    hangedBank.innerText = ""
    hangedInput.disabled = false;
    letterSubmitBtn.disabled = false;
    hangedResult.classList.add("hidden")
    hangedResult.classList.remove("green")
    hangedResult.classList.remove("red")

    //init startup
    choice = arr[Math.floor(Math.random() * (arr.length - 0) + 0)];
    chances = 6;
    template = choice.replace(re, "_");
    hangedUI.innerText = template
    console.log("Answer is ", choice);
}
hangedInit()

//disables buttons, and reveals the end message
const handleEnd = () =>{
    hangedInput.disabled = true;
    letterSubmitBtn.disabled = true;
    hangedResult.classList.remove("hidden");
}

const hangedSubmit = () => {
    let input = hangedInput.value.toLowerCase()

    let tempArr = choice.split("");


    //check if letter used
    if (![...wordBankRight, ...wordBankWrong].find(x => x == input)) {
        console.log("letter unused ", input);
        //check if letter is correct
        if (tempArr.find(x => x == input)) {
            console.log("correct letter ", input);
            wordBankRight.push(input)

            //regex for swapping the '_' with the correct letters 
            let re2 = new RegExp(`[^${wordBankRight.join("")} ]`, "g");

            console.log(template, choice, re2);
            template = choice.replace(re2, "_")
            console.log(template, wordBankRight, wordBankWrong, choice);
            //Updates the big pretty letters
            hangedUI.innerText = template
            hangedBank.innerText = [...wordBankRight, ...wordBankWrong].sort().join("")
        }
        else {
            console.log("incorrect letter");
            //proccessing losses
            chances--
            wordBankWrong.push(input)

            //Updating html losses
            hangedBank.innerText = [...wordBankRight, ...wordBankWrong].sort().join("")
            for (let i = 0; i != 6 - chances; i++) {
                hangedDemerits[i].classList.remove("hidden")
            }
        }
    }
    //Resets entered input on submit
    hangedInput.value =""

    //game won
    if (template === choice) {
        console.log("YOU WIN");
        hangedResult.classList.add("green")
        hangedResult.innerText = "You Win!"
        handleEnd()

    }
    //game lost
    else if (chances == 0) {
        console.log("YOU LOSE");
        // hangedResult.classList.add("red")
        hangedResult.innerText = "You lose!"
        handleEnd()

    }

}
