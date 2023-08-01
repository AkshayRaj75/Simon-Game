var userClickedPattern = [];
var gamePattern = [];

var level = 0;

var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// comparing users pattern with automated pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // restarting game
  }
}

function nextSequence() {
  userClickedPattern = []; // empty array ready for the next level.

  level++;
  $("#level-title").text("Level " + level); //increasing level

  var randomNumber = Math.floor(Math.random() * 4); // RANDOM NUMBER
  var randomChosenColour = buttonColours[randomNumber]; // RANDOM COLOR FROM ABOVE BUTTON COLORS ARRAY
  gamePattern.push(randomChosenColour); //PUSHING NEW ELEMENTS TO OUR OLD ARRAY

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // blinking animation to our new array selecteed element

  playSound(randomChosenColour);
}
// playing sound from pre stored audio files
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // sound played
  audio.play();
}
// providing animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0; //resetting variables to start from bottom again and providing initial values of them
  gamePattern = []; //resetting variables to start from bottom again and providing initial values of them
  started = false; //resetting variables to start from bottom again and providing initial values of them
}
