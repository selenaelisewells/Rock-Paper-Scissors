// global variables for game
var player_lives = 10;
var computer_lives = 10;
var choices = ['rock', 'paper', 'scissors'];
var computers_choice;
var players_choice;
var message_area = document.getElementById('game_area');
var clearArea = false;

document.getElementById('playGame').addEventListener("click", runGame);

// game logic
function runGame() {
    if (clearArea) {
        resetArea();
    }

    clearArea = false;

    // initial messaging
    message_area.innerHTML += "***** <br />";
    message_area.innerHTML += "Computer lives 💙: " + computer_lives + "<br />";
    message_area.innerHTML += "Player lives 💚: " + player_lives + "<br />";
    message_area.innerHTML += "Choose your weapon! ✊✋✌<br />";
    message_area.innerHTML += "***** <br />";

    // setting game choices
    var players_choices = document.getElementById('gameOption');
    players_choice = players_choices.options[players_choices.selectedIndex].value;
    computers_choice = choices[Math.floor(Math.random() * choices.length)];

    // displaying choices
    message_area.innerHTML += "***** <br />";
    message_area.innerHTML += 'Computer chose: ' + computers_choice + ' <br />';
    message_area.innerHTML += 'Player chose: ' + players_choice + ' <br />';
    message_area.innerHTML += "***** <br />";

    compareChoices();

    //auto scroll to bottom https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
    message_area.scrollTo(0, message_area.scrollHeight)

    // restart game loop
    checkStatus();
}

//functions
function resetArea() {
    message_area.innerHTML = "";
}

function resetBackground() {
    document.body.style.background = "#fff";
}

function changeBackground(colour) {
    //todo: change body background
    //learn how to change background colour in html
    document.body.style.background = colour;
    setTimeout(resetBackground, 1000);
    console.log("colour has changed to " + colour)
}

function outcomeFeedback(didWin) {
    if (didWin) {
        changeBackground("#8dfb95");
        console.log("You Won!");
    } else {
        changeBackground("#f67676");
        console.log("You're a loser! :P")
    }
}



function compareChoices() {
    // conditionals for actual game logic
    if (players_choice == computers_choice) {
        message_area.innerHTML += 'Tie!🙊No one wins, play again! <br />';
        changeBackground("#ffe38d");
    } else if (players_choice == 'rock') {
        checkComputerWins('paper', 'covers', 'smashes');
    } else if (players_choice == 'paper') {
        checkComputerWins('scissors', 'cuts', 'covers');
    } else if (players_choice == 'scissors') {
        checkComputerWins('rock', 'smashes', 'cuts');
    } else {
        message_area.innerHTML += "Well that's not a valid choice. 😰<br />";
        clearArea = true;
    }
}
// checks whether computer wins against player choice
function checkComputerWins(validateChoice, winMessage, loseMessage) {
    if (computers_choice == validateChoice) {
        message_area.innerHTML += 'You lose!💀 ' + computers_choice + ' ' + winMessage + ' ' + players_choice + '<br />';
        player_lives--;
        outcomeFeedback(false);
    } else {
        message_area.innerHTML += 'You win! 🥳' + players_choice + ' ' + loseMessage + ' ' + computers_choice + '<br />';
        computer_lives--;
        outcomeFeedback(true);
    }
}

//  check status of game
function checkStatus() {
    if (player_lives == 0) {
        showWinloseMessage("lost");
    } else if (computer_lives == 0) {
        showWinloseMessage("won");
    } else {
        message_area.innerHTML += "Select another choice! <br />";
        message_area.innerHTML += "***** <br /><br />";
    }
}

// messaging for winning or losing
function showWinloseMessage(status) {
    message_area.innerHTML += "***** <br />";
    message_area.innerHTML += "Game Over. <br />";
    message_area.innerHTML += "You " + status + "! Would you like to play again? <br />";
    message_area.innerHTML += "***** <br />";
    changeBackground("#f67676");
    changeBackground("#f67676");
    clearArea = true;
    player_lives = 10;
    computer_lives = 10;
}