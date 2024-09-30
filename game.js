let start = false;
let colors = ["green", "red", "yellow", "blue"];
let level = 1;
let gameMove = [];
let playerMove = [];

$(document).keydown(() => {
  if (!start) {
    restartGame();
  }
});

$(".btn").click(function () {
  var clicked = $(this).attr("id");
  playerMove.push(clicked);
  animateClicked(clicked);
  checkTheLogic(playerMove, gameMove);
});

function animateNext(num) {
  let randomColour = colors[num];
  $("#" + randomColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function animateClicked(element) {
  $("#" + element).addClass("pressed");
  setTimeout(() => {
    $("#" + element).removeClass("pressed");
  }, 100);
}

function checkTheLogic(arg1, arg2) {
  if (arg1[arg1.length - 1] === arg2[arg1.length - 1]) {
    clickedSound(arg1[arg1.length - 1]);
    if (arg1.length === arg2.length) {
      nextSequence(arg2);
    }
  } else {
    gameOver();
  }
}

function restartGame() {
  start = true;
  gameMove = [];
  playerMove = [];
  level = 1;
  $("#level-title").text("Level " + level);
  let randomNum = Math.floor(Math.random() * 4);
  clickedSound(colors[randomNum]);
  animateNext(randomNum);
  gameMove.push(colors[randomNum]);
}

function clickedSound(colour) {
  let audio = new Audio("./sounds/" + colour + ".mp3");
  audio.play();
}

function nextSequence(arg2) {
  let randomNum = Math.floor(Math.random() * 4);
  setTimeout(() => {
    clickedSound(colors[randomNum]);
    animateNext(randomNum);
    $("#level-title").text("Level " + ++level);
  }, 1000);
  arg2.push(colors[randomNum]);
  playerMove = [];
}

function gameOver() {
  clickedSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  start = false;
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
}
