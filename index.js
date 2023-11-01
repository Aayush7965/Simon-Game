const colorsArray = ["red", "green", "yellow", "blue"];
let gameArray = [];
let userArray = [];

let isStarted = false;
let level = 0;

$(document).on("keydown", () => {
    if (!isStarted) {
        nextSequence();
        isStarted = true;
        $("#mainHeading").text("");
        $("#levelHeading").text("0");
    }
})

$(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    console.log(userChosenColor);
    userArray.push(userChosenColor);

    playAudio(userChosenColor);
    addShadow(userChosenColor);

    gameLogic(userArray.length-1);
})


function nextSequence() {
    userArray = [];
    
    const randomNumber = Math.round(Math.random() * 3);
    let randomColor = colorsArray[randomNumber] // red green blue yellow
    gameArray.push(randomColor);
    addShadow(randomColor)
    playAudio(randomColor);
    
}


function gameLogic(currentLevel) {
    if (gameArray[currentLevel] === userArray[currentLevel]) {
        if (userArray.length === gameArray.length) {
            level ++;
            $("#levelHeading").text(level);
            setTimeout(() => {  
                nextSequence();
            }, 1000)
        }
    } else {
        playAudio("wrong")
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gameArray = [];
    isStarted = false;
    $("#mainHeading").text("Game Over! Press any key to Restart!");
}


function playAudio(name) {

    const sounds = {
    greenBox: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    redBox: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    blueBox: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    yellowBox: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    wrongAudio: new Audio("https://cdn.freesound.org/previews/500/500675_10846860-lq.mp3")
    };

    switch (name) {
        case "red":
            sounds.redBox.play();
            break;
        case "blue":
            sounds.blueBox.play();
            break;
        case "yellow":
            sounds.yellowBox.play();
            break;
        case "green":
            sounds.greenBox.play();
            break;
        case "wrong":
            sounds.wrongAudio.play();
            break;
        default:
            console.log("Error in switch statement");
            break;
    }
}

function addShadow(color) {
    $("#"+color).addClass(color + "Shadow");
    setTimeout(() => {
        $("#"+color).removeClass(color + "Shadow");
    }, 200);
}