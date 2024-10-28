let Game_Sequence = [];
let User_sequence = [];
let level = 0;
let gameStarted = false;
let highScore = 0;
const colors = ["red", "yellow", "purple", "green"];
const levelDisplay = document.querySelector("h2");
const highScoreDisplay = document.querySelector("h3");

// Start game on keypress
document.addEventListener("keypress", () => {
    if (!gameStarted) {
        gameStarted = true;
        level = 0;
        Game_Sequence = [];
        levelUp();
    }
});

// Advance game level and show sequence
function levelUp() {
    User_sequence = [];
    level++;
    levelDisplay.innerText = `Level ${level}`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    Game_Sequence.push(randomColor);
    flashSequence();
}

// Display each color flash in sequence
function flashSequence() {
    let delay = 0;
    Game_Sequence.forEach(color => {
        const button = document.getElementById(color);
        setTimeout(() => flash(button), delay);
        delay += 500;
    });
}

// Flash button effect
function flash(button) {
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 200);
}

// Handle user button click
function handleUserInput() {
    const userColor = this.id;
    User_sequence.push(userColor);
    userFlash(this);
    checkUserInput(User_sequence.length - 1);
}

// Check user input against game sequence
function checkUserInput(index) {
    if (User_sequence[index] === Game_Sequence[index]) {
        if (User_sequence.length === Game_Sequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        endGame();
    }
}

// User feedback flash
function userFlash(button) {
    button.classList.add("userflash");
    setTimeout(() => button.classList.remove("userflash"), 150);
}

// End game, reset variables, and update high score
function endGame() {
    levelDisplay.innerHTML = `Game Over! Your Score: ${level}. Press any key to restart`;
    if (level > highScore) {
        highScore = level;
        highScoreDisplay.innerText = `Highest Score: ${highScore}`;
    }
    gameStarted = false;
    Game_Sequence = [];
    User_sequence = [];
    level = 0;

    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "white", 200);
}

// Attach event listeners to color buttons
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", handleUserInput);
});
