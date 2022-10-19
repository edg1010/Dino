// function play() {
//     var score = 0;
//     const container = document.getElementById("container");
//     container.innerHTML = "";
//     const text = document.createElement("h1");
//     text.style.width = "100%";
//     text.style.position = "absolute";
//     text.style.top = "40%";
//     text.style.left = "50%";
//     text.style.transform = "translate(-50%, -50%)";
//     text.style.textAlign = "center";
//     text.innerHTML = "PRESS ANY BUTTON TO START";
//     text.setAttribute("id", "text");
//     container.appendChild(text);

//     const scoreText = document.createElement("h1");
//     // scoreText.style.width = "100%";
//     scoreText.style.position = "absolute";
//     scoreText.style.top = "5%";
//     scoreText.style.left = "95%";
//     scoreText.style.transform = "translate(-100%, -50%)";
//     scoreText.style.textAlign = "center";
//     scoreText.innerHTML = score;
//     scoreText.setAttribute("id", "scoreText");
//     container.appendChild(scoreText);

//     const dino = document.createElement("div");
//     dino.style.width = "50px";
//     dino.style.height = "100px";
//     dino.style.background = "#000";
//     dino.style.position = "absolute";
//     dino.style.top = "600px";
//     dino.style.left = "150px";
//     dino.style.transform = "translate(-50%, -50%)";
//     dino.setAttribute("id", "dino");
//     container.appendChild(dino);

//     const tree = document.createElement("div");
//     tree.style.width = "50px";
//     tree.style.height = "80px";
//     tree.style.background = "black";
//     tree.style.position = "absolute";
//     tree.style.top = "610px";
//     tree.style.left = "1025px";
//     tree.style.transform = "translate(-50%, -50%)";
//     tree.setAttribute("id", "tree");
//     container.appendChild(tree);
// }

var score = 0;
var highScore = 0;
var isPlayedBefore = false;
var isJump = false;
var isStart = false;
var isDead = false;

const container = document.getElementById("container");

const text = document.createElement("h1");
const scoreText = document.createElement("h1");
const highScoreText = document.createElement("h1");
const dino = document.createElement("div");
const tree = document.createElement("div");

playTheGame = () => {
    score = 0;

    text.style.width = "100%";
    text.style.position = "absolute";
    text.style.top = "40%";
    text.style.left = "50%";
    text.style.transform = "translate(-50%, -50%)";
    text.style.textAlign = "center";
    text.innerHTML = "PRESS ANY BUTTON TO START";
    text.setAttribute("id", "text");
    container.appendChild(text);

    // scoreText.style.width = "100%";
    scoreText.style.position = "absolute";
    scoreText.style.top = "5%";
    scoreText.style.left = "95%";
    scoreText.style.transform = "translate(-100%, -50%)";
    scoreText.style.textAlign = "center";
    scoreText.innerHTML = score;
    scoreText.setAttribute("id", "scoreText");
    container.appendChild(scoreText);

    highScoreText.style.position = "absolute";
    highScoreText.style.top = "5%";
    highScoreText.style.left = "5%";
    highScoreText.style.transform = "translate(0, -50%)";
    highScoreText.style.textAlign = "center";
    highScoreText.innerHTML = "High Score: " + highScore;
    highScoreText.setAttribute("id", "highScoreText");
    container.appendChild(highScoreText);

    dino.style.width = "50px";
    dino.style.height = "100px";
    dino.style.background = "#000";
    dino.style.position = "absolute";
    dino.style.top = "600px";
    dino.style.left = "150px";
    dino.style.transform = "translate(-50%, -50%)";
    dino.setAttribute("id", "dino");
    container.appendChild(dino);

    tree.style.width = "50px";
    tree.style.height = "80px";
    tree.style.background = "black";
    tree.style.position = "absolute";
    tree.style.top = "610px";
    tree.style.left = "1025px";
    tree.style.transform = "translate(-50%, -50%)";
    tree.setAttribute("id", "tree");
    container.appendChild(tree);

    isJump = false;
    isStart = false;
    isDead = false;
    isPlayedBefore = false;
};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function up(x) {
    for (let i = 0; i < x; i++) {
        if (isStart) {
            dino.style.top = parseFloat(dino.style.top) - 2.5 + "px";
            await sleep(4);
        }
    }
}

async function down(x) {
    for (let i = 0; i < x; i++) {
        if (isStart) {
            dino.style.top = parseFloat(dino.style.top) + 2.5 + "px";
            await sleep(4);
        }
    }
}

async function start() {
    while (isStart) {
        console.log("tes");
        var dinoTop = parseFloat(dino.style.top);
        var treeTop = parseFloat(tree.style.top);
        var dinoLeft = parseFloat(dino.style.left);
        var treeLeft = parseFloat(tree.style.left);
        var dinoWidth = parseFloat(dino.style.width);
        var treeWidth = parseFloat(tree.style.width);
        var dinoHeight = parseFloat(dino.style.height);
        var treeHeight = parseFloat(tree.style.height);

        if (dinoTop > 600 - treeHeight && treeLeft > 150 - dinoWidth && treeLeft < 150 + dinoWidth) {
            isStart = false;
            isDead = true;
            isJump = false;
        } else {
            if (parseFloat(tree.style.left) < -25) {
                tree.style.left = "1025px";
            } else {
                let move = 2.5 + score / 2000;
                if (move > 8) {
                    move = 8;
                }
                tree.style.left = parseFloat(tree.style.left) - move + "px";
            }
        }
        if (!isDead) {
            score++;
            scoreText.innerHTML = parseInt(score / 5);
            if (highScore <= parseInt(score / 5)) {
                highScore = parseInt(score / 5);
                highScoreText.innerHTML = "High Score: " + highScore;
            }
        } else {
            text.innerHTML = "YOUR SCORE: " + parseInt(score / 5) + "<br>PRESS ANY BUTTON TO RESTART";
        }

        await sleep(4);
    }
}

async function jump() {
    if (!isJump) {
        isJump = true;
        up(60);
        await sleep(350);
        down(60);
        await sleep(300);
        isJump = false;
    }
}

var res = false;

window.addEventListener("keydown", async (e) => {
    if (!isStart) {
        if (isPlayedBefore) {
            playTheGame();
            // isStart = false;
        }
        isStart = true;
        isPlayedBefore = true;
        text.innerHTML = "PRESS SPACE, W, OR &#8593 ARROW TO JUMP";
        start();
    } else {
        if (e.key == " " || e.key == "ArrowUp" || e.key == "w") {
            jump();
        }
    }
});

playTheGame();
