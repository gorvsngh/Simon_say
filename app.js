let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");

let button = document.querySelector("button");
button.addEventListener("click", function() {
    if(started == false) {
        // console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout( function () {
        btn.classList.remove("flash");
    }, 240);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout( function () {
        btn.classList.remove("userflash");
    }, 240);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() *3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log("curr level :", level);

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your score was <b>${level}</b>
        <br> Press start to replay!`;

        if (highScore < level) {
            highScore = level;
            h4.innerText = `High Score:-${highScore}`;
        }
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "rgb(32, 32, 78)";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}