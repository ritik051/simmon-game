console.log("JavaScript loaded");
let levelBtn = document.getElementById("level");
let startBtn = document.querySelector(".start-btn");
let quitBtn = document.querySelector(".quit-btn");
let colorBtns = document.querySelectorAll(".color-btn")
let msg = document.getElementById("msg");
let scoreBtn = document.getElementById("score");
let highScoreBtn = document.getElementById("high-score");

let level=0;
let score = 0;
let highScore = 0;
let compSequence = [];
let userSequence = [];
let gameStarted = false;
let acceptingInput = false;

function start() {
    if(gameStarted) return;
    console.log("started");
    level = 1;
    score = 0;
    compSequence = [];
    userSequence = [];
    gameStarted = true;
    levelBtn.innerText = "Level: " + level;
    scoreBtn.innerText = "Score: " + score;
    highScoreBtn.innerText = "High Score: " + highScore;
    msg.innerText = "";

    generateRandomColor();
    
    playSequence(compSequence);

    
}

function generateRandomColor() {
    let random = Math.floor(Math.random()*colorBtns.length);
    compSequence.push(colorBtns[random].classList[1]);
    console.log(compSequence);
}
function flashButton(color) {
    let btn = document.querySelector("."+color);
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    },500);
}
function playSequence(sequence) {
    for( let i=0; i< sequence.length;i++) {
        setTimeout(() => {
            flashButton(sequence[i]);
        },i*700)
    }
    setTimeout(() => {
        acceptingInput=true;
    },sequence.length*700);
}
function handleUserClick(event) {
    if (!gameStarted || !acceptingInput) return;
    let color = event.target.classList[1];
    userSequence.push(color);
    compareSequence();
    console.log(userSequence);
}
function compareSequence() {

    // Which position did the player just enter?
    let index = userSequence.length - 1;

    // First: was that particular click correct?
    if (userSequence[index] !== compSequence[index]) {
        console.log("Wrong");
        gameOver();
        return false;
    }

    console.log("Right");

    // Second: did they complete the entire sequence?
    if (userSequence.length === compSequence.length) {
        console.log("Level complete");
        // Next level will go here
        score++;

        if (score > highScore) {
            highScore = score;
        }
        level++;
        levelBtn.innerText = "Level " + level;
        scoreBtn.innerText = "Score: " + score;
        highScoreBtn.innerText = "High Score: " + highScore;
        userSequence = [];
        acceptingInput=false;
        generateRandomColor();
        playSequence(compSequence);
    }

    return true;
}
function resetGame() {
    level = 0;
    compSequence = [];
    userSequence = [];
    gameStarted = false;
    acceptingInput = false;
    levelBtn.innerText = "Level: " + level;
}
function quit() {
    resetGame();
    msg.innerText = "";
}
function gameOver() {
    msg.innerText = "Game Over!";
    resetGame();
}

startBtn.addEventListener("click", start);
colorBtns.forEach((color) => {
        color.addEventListener("click", handleUserClick);
    });
quitBtn.addEventListener("click",quit);