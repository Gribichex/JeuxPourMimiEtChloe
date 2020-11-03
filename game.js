var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var gameStarted = false;
var level = 0;
var sisterNames = ["Mimie", "ChloChlo"];
var sisterIndex = -1;

$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;

    if (sisterIndex === -1) {
      sisterIndex = Math.floor(Math.random() * 2);
    } else {
      sisterIndex = 1 - sisterIndex;
    }
    currentSister = sisterNames[sisterIndex];

    $("h1").text("C'est à " + currentSister + " de jouer");
    setTimeout(nextSequence, 2000);
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  playsound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColour);
  gamePattern.push(randomChosenColour);
}

function playsound(colour) {
  var audio = new Audio("/sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length - 1 == currentLevel) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    gameOver();
    startOver();
    userClickedPattern = [];
  }
}

function gameOver() {
  $("body").addClass("game-over");
  playsound("wrong");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text(
    "Tu t'es trompée !!!! 😆😆😆 Appuie sur un touche pour recommencer le jeu"
  );
}

function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
}