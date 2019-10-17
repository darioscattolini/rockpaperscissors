function computerPlay() {
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

let played = false;

function clearResults() {
    document.getElementById("chosestone").innerHTML = "";
    document.getElementById("chosepaper").innerHTML = "";
    document.getElementById("chosescissors").innerHTML = "";
    document.getElementById("stone").className = "stone";
    document.getElementById("paper").className = "paper";
    document.getElementById("scissors").className = "scissors";    

    played = false;
}

function determineWinner(computerPlay, userPlay) {
    let youlose = document.createTextNode("You Lose!");
    let youwin = document.createTextNode("You Win!");
    let computerlose = document.createTextNode("Computer Loses");
    let computerwins = document.createTextNode("Computer Wins");
    let tie = document.createTextNode("Tie");

    if (computerPlay == "stone" && userPlay == "scissors") {
        document.getElementById("chosescissors").append(youlose);
        document.getElementById("chosestone").append(computerwins);
        document.getElementById("stone").classList.add("stonewin");
        document.getElementById("scissors").classList.add("scissorslose");
    }
    if (computerPlay == "scissors" && userPlay == "paper") {
        document.getElementById("chosepaper").append(youlose);
        document.getElementById("chosescissors").append(computerwins);
        document.getElementById("scissors").classList.add("scissorswin");
        document.getElementById("paper").classList.add("paperlose");
    }
    if (computerPlay == "paper" && userPlay == "stone") {
        document.getElementById("chosestone").append(youlose);
        document.getElementById("chosepaper").append(computerwins);
        document.getElementById("paper").classList.add("paperwin");
        document.getElementById("stone").classList.add("stonelose");
    }
    if (userPlay == "stone" && computerPlay == "scissors") {
        document.getElementById("chosescissors").append(computerlose);
        document.getElementById("chosestone").append(youwin);
        document.getElementById("stone").classList.add("stonewin");
        document.getElementById("scissors").classList.add("scissorslose");
    }
    if (userPlay == "scissors" && computerPlay == "paper") {
        document.getElementById("chosepaper").append(computerlose);
        document.getElementById("chosescissors").append(youwin);
        document.getElementById("scissors").classList.add("scissorswin");
        document.getElementById("paper").classList.add("paperlose");
    }
    if (userPlay == "paper" && computerPlay == "stone") {
        document.getElementById("chosestone").append(computerlose);
        document.getElementById("chosepaper").append(youwin);
        document.getElementById("paper").classList.add("paperwin");
        document.getElementById("stone").classList.add("stonelose");
    }
    if (userPlay == "stone" && computerPlay == "stone") {
        document.getElementById("chosestone").append(tie);
        document.getElementById("stone").classList.add("stonetie");
    }
    if (userPlay == "scissors" && computerPlay == "scissors") {
        document.getElementById("chosescissors").append(tie);
        document.getElementById("scissors").classList.add("scissorstie");
    }
    if (userPlay == "paper" && computerPlay == "paper") {
        document.getElementById("chosepaper").append(tie);
        document.getElementById("paper").classList.add("papertie");
    }

    played = true;

    document.body.addEventListener("click", clearResults);          //REPASAR
}

function userPlaysStone(event) {
    event.stopPropagation();
    if (played === true) {
        clearResults();
        return;
    }
    let userPlay = "stone";
    let compPlay = computerPlay();
    determineWinner(compPlay, userPlay);
}

function userPlaysPaper(event) {
    event.stopPropagation();                        ///REPASAR
    if (played === true) {
        clearResults();
        return;
    }
    let userPlay = "paper";
    let compPlay = computerPlay();
    determineWinner(compPlay, userPlay);
}

function userPlaysScissors(event) {
    event.stopPropagation();
    if (played === true) {
        clearResults();
        return;
    }
    let userPlay = "scissors";
    let compPlay = computerPlay();
    determineWinner(compPlay, userPlay);
}

let stone = document.getElementById("stone");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

stone.onclick = userPlaysStone;
paper.onclick = userPlaysPaper;
scissors.onclick = userPlaysScissors;