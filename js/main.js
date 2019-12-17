/* Flag that signals if there is a game result displayed. */
let played = false;

/* Assignment of functions to clickable interface. */
document.getElementById("stone").onclick    = () => play("stone", event);
document.getElementById("paper").onclick    = () => play("paper", event);
document.getElementById("scissors").onclick = () => play("scissors", event);

/* Manages a whole game.
 * userPlay - string signaling user's choice
 * event    - user's click event passed as argument for event handling */
const play = (userPlay, event) => {

        //Stops event from bubbling to body event handler (line 66)
    event.stopPropagation();    

        //In case a previous game needs to be cleared
    if (played === true) {      
        clearResults();
        return;
    }

    determineWinner(userPlay, computerPlay());

    played = true;

};

/* Resolves computer's choice.
 * returns string signalling computer's choice. */
const computerPlay = () => {

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

/* Resolves who wins and triggers function to display result.
 * userPlay - string signaling user's choice
 * compPlay - string signaling computer's choice */
const determineWinner = (userPlay, compPlay) => {

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

        //User can click anywhere to clear results and play again
    document.body.addEventListener("click", clearResults);
    
}

/* Displays result when computer wins.
 * userPlay - string signaling user's choice
 * compPlay - string signaling computer's choice */
const computerWins = (userPlay, compPlay) => {

    document.getElementById("chose" + compPlay).innerHTML = "Computer Wins!";
    document.getElementById("chose" + userPlay).innerHTML = "You Lose!";
    document.getElementById(compPlay).classList.add(compPlay + "win");
    document.getElementById(userPlay).classList.add(userPlay + "lose");

};

/* Displays result when user wins.
 * userPlay - string signaling user's choice
 * compPlay - string signaling computer's choice */
const userWins = (userPlay, compPlay) => {

    document.getElementById("chose" + userPlay).innerHTML = "You Win!";
    document.getElementById("chose" + compPlay).innerHTML = "Computer Loses!";
    document.getElementById(userPlay).classList.add(userPlay + "win");
    document.getElementById(compPlay).classList.add(compPlay + "lose");

};

/* Displays result when there is a tie.
 * play - string signaling user's and computer's choice */
const tie = play => {

    document.getElementById("chose" + play).innerHTML = "Tie";
    document.getElementById(play).classList.add(play + "tie");

}

/* Resets the game */
const clearResults = () => {

    document.getElementById("chosestone").innerHTML    = "";
    document.getElementById("chosepaper").innerHTML    = "";
    document.getElementById("chosescissors").innerHTML = "";
    
    document.getElementById("stone").className    = "stone";
    document.getElementById("paper").className    = "paper";
    document.getElementById("scissors").className = "scissors";    

    played = false;

}