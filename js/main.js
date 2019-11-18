//Images to be clicked by the user
const stone    = document.getElementById("stone");
const paper    = document.getElementById("paper");
const scissors = document.getElementById("scissors");

//Functions triggered by clicking the images
stone.onclick    = function() { play("stone", event) };
paper.onclick    = function() { play("paper", event) };
scissors.onclick = function() { play("scissors", event) };

let played = false;        //Flag that signals if there is a game result displayed

const play = (userPlay, event) => {
    //Determines what happens when user clicks on an image

    event.stopPropagation();
    if (played === true) {      //In case click to clear results is pressed on image
        clearResults();
        return;
    }
    played = true;
    determineWinner(userPlay, computerPlay());
};

const computerPlay = () => {
    //Resolves computer's choice

    let play = Math.floor(Math.random() * 3);
    switch(play) {
        case 0:
            return "stone";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

const determineWinner = (userPlay, compPlay) => {
    //Resolves who wins

    switch(userPlay + compPlay) {
        case "scissorsstone":
        case "paperscissors":
        case "stonepaper":
            computerWins(userPlay, compPlay);
            break;
        case "stonescissors":
        case "scissorspaper":
        case "paperstone":
            userWins(userPlay, compPlay);
            break;
        default:
            tie(userPlay);
    }

    document.body.addEventListener("click", clearResults);      //Click to clear results
}

const computerWins = (userPlay, compPlay) => {
    //Resolves what happens if computer wins

    document.getElementById("chose" + compPlay).innerHTML = "Computer Wins!";
    document.getElementById("chose" + userPlay).innerHTML = "You Lose!";
    document.getElementById(compPlay).classList.add(compPlay + "win");
    document.getElementById(userPlay).classList.add(userPlay + "lose");
};

const userWins = (userPlay, compPlay) => {
    //Resolves what happens if user wins

    document.getElementById("chose" + userPlay).innerHTML = "You Win!";
    document.getElementById("chose" + compPlay).innerHTML = "Computer Loses!";
    document.getElementById(userPlay).classList.add(userPlay + "win");
    document.getElementById(compPlay).classList.add(compPlay + "lose");
};

const tie = play => {
    //Resolves what happens if there is a tie

    document.getElementById("chose" + play).innerHTML = "Tie";
    document.getElementById(play).classList.add(play + "tie");
}

const clearResults = () => {
    //Resets the game

    document.getElementById("chosestone").innerHTML    = "";
    document.getElementById("chosepaper").innerHTML    = "";
    document.getElementById("chosescissors").innerHTML = "";
    
    document.getElementById("stone").className    = "stone";
    document.getElementById("paper").className    = "paper";
    document.getElementById("scissors").className = "scissors";    

    played = false;
}