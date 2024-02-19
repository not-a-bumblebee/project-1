let boardArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let circle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<circle cx="12" cy="12" r="7" />
</svg>`;

let cross = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<line x1="18" y1="6" x2="6" y2="18" />
<line x1="6" y1="6" x2="18" y2="18" />
</svg>
`;

let squares = document.querySelectorAll(".square");
let t3ResultRef = document.querySelector(".t3-result")
let t3ButtonsRef = document.querySelectorAll(".t3-btn")
let winner
let playerSign
let aiSign
let round

const aiTurn = () => {
    let aiOptions = [];

    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            let currentSquare = boardArr[i][x]
            console.log("ai square",currentSquare);
            if ( currentSquare ==0) {
                console.log("add?");
                aiOptions.push([i, x])
            }
        }
    }


    let choice = aiOptions[Math.floor(Math.random() * (aiOptions.length - 0) + 0)];
    console.log(aiOptions, choice);
    boardArr[choice[0]][choice[1]] = "b";

    squares[choice[0]*3  +choice[1]].innerHTML = aiSign;

    round++;



}

const t3Init = (sign) => {
    squares.forEach(x => x.innerHTML = "")
    t3ResultRef.classList.remove("green");
    t3ResultRef.classList.remove("red");
    t3ResultRef.innerText = ""
    round = 0
    winner = undefined
    sign == "O" ? playerSign = circle : playerSign = cross
    if (sign == "O") {
        playerSign = circle;
        aiSign = cross;
    }
    else {
        playerSign = cross;
        aiSign = circle;
    }
    t3ButtonsRef.forEach(x => x.disabled = true);


}
const playerTurn = (row, col) => {
    if (!winner && boardArr[row][col] ==0 && playerSign) {

        if (boardArr[row][col] === 0) {
            boardArr[row][col] = "a";
            console.log("row  ",row," col ",col);
            console.log(boardArr);
            squares[row *3  + col].innerHTML = playerSign;
        }
        round++;
        checkForWinner("a");
        //checking again
        if (!winner) {
            aiTurn();
            checkForWinner("b");
        }
    }


}

const checkForWinner = (entity) => {

    let winnerExists = false

    //checking Horz 1
    if (boardArr[0][0] == entity && boardArr[0][1] == entity && boardArr[0][2] == entity) {
        winnerExists = true
    }
    //horz 2
    else if (boardArr[1][0] == entity && boardArr[1][1] == entity && boardArr[1][2] == entity) {
        winnerExists = true
    }
    //horz 3
    else if (boardArr[2][0] == entity && boardArr[2][1] == entity && boardArr[2][2] == entity) {
        winnerExists = true
    }
    //vert 1
    else if (boardArr[0][0] == entity && boardArr[1][0] == entity && boardArr[2][0] == entity) {
        winnerExists = true
    }
    //vert 2
    else if (boardArr[0][1] == entity && boardArr[1][1] == entity && boardArr[2][1] == entity) {
        winnerExists = true
    }
    //vert 3
    else if (boardArr[0][2] == entity && boardArr[1][2] == entity && boardArr[2][2] == entity) {
        winnerExists = true
    }
    //diag1
    else if (boardArr[0][0] == entity && boardArr[1][1] == entity && boardArr[2][2] == entity) {
        winnerExists = true
    }
    //diag2
    else if (boardArr[2][0] == entity && boardArr[1][1] == entity && boardArr[0][2] == entity) {
        winnerExists = true
    }
    else if(round==9) {
        winner = "tie"
    }

    if (winnerExists) {
        entity == "a" ? winner = "player" : winner = "ai"

        if (winner == "player") {
            t3ResultRef.innerText = "Victory!";
            t3ResultRef.classList.add("green");
        }
        else{
            t3ResultRef.innerText = "Defeat";
            t3ResultRef.classList.add("red");
        }
     
    }
    else if(winner =="tie"){
        t3ResultRef.innerText = "Tie?";
    }



}