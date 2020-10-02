class BoardManager {
  constructor () {
    this.types = ["stone", "paper", "scissors"];
    this.events = ["start", "hover", "win", "lose", "tie"];
    this.images = this.buildImgElements();
    this.setUpLayers();
    this.load();
    this.setUpClickEvent();
  }

  buildImgElements() {
    const images = {};
    for (const type of this.types) {
      images[type] = {};
      images[type].container = document.getElementById(type);
      for (const event of this.events) {
        const url = `../img/${type}-${event}.png`;
        const image = new Image();
        image.src = url;
        images[type][event] = image;
      }
    }
    return images;
  }

  setUpLayers() {
    for (const type of this.types) {
      this.images[type].start.style.zIndex = 10;
      this.images[type].start.onmouseover = () => {
        this.images[type].hover.style.zIndex = 20;
      }
      this.images[type].hover.onmouseout = () => {
        this.images[type].hover.style.zIndex = 0;
      }
    }
  }

  load() {
    for (const type of this.types) {
      for (const event of this.events) {
        this.images[type].container.appendChild(this.images[type][event]);
      }
    }
  }

  setUpClickEvent() {
    for (const choice of ["stone", "paper", "scissors"]) {
      this.images[choice].hover.onclick = event => {
        event.stopPropagation();
        const result = play(choice);
        this.displayResult(result);
      }
    }
  }

  displayResult(gameResult) {
    switch(gameResult.result) {
      case 'win':
      case 'lose':
        this.images[gameResult.winningChoice].win.style.zIndex = 20;
        this.images[gameResult.losingChoice].lose.style.zIndex = 20;
        break;
      case 'tie':
        this.images[gameResult.tieChoice].tie.style.zIndex = 20;
    }

    this.displayText(gameResult.result);

    this.disableGame();
  }

  displayText(result) {
    const options = {
      win:  { text: 'You win!', color: '#66f1ab' },
      lose: { text: 'You lose!', color: '#f89567' },
      tie:  { text: 'Tie!', color: '#727272' }
    };

    const text = document.getElementById('result');
    text.innerText = options[result].text;
    text.style.color = options[result].color;
    text.style.visibility = 'visible';
    text.style.fontSize = '100px';
    setTimeout(() => {
      document.getElementById('result').style.visibility = 'hidden';
      document.getElementById('result').style.fontSize = '0';
    }, 500);
  }

  disableGame() {
    for (const type of this.types) {
      this.images[type].hover.onclick = undefined;
    }

    document.body.onclick = () => {
      this.restartLayers();
      document.body.onclick = undefined;
      this.setUpClickEvent();
    };
  }

  restartLayers() {
    for (const type of this.types) {
      this.images[type].win.style.zIndex = 0;
      this.images[type].lose.style.zIndex = 0;
      this.images[type].tie.style.zIndex = 0;
    }
  }
}

function play(userChoice) {
  const choices = ["stone", "paper", "scissors"];
  const results = ['tie', 'win', 'lose'];

  userChoice = choices.indexOf(userChoice);
  const computerChoice = Math.floor(Math.random() * 3);
  const numberResult = (3 + userChoice - computerChoice) % 3;
  const result = results[numberResult];

  const outcome = { result };

  switch (result) {
    case "win":
      outcome.winningChoice = choices[userChoice];
      outcome.losingChoice = choices[computerChoice];
      break;
    case "lose":
      outcome.winningChoice = choices[computerChoice];
      outcome.losingChoice = choices[userChoice];
      break;
    case "tie":
      outcome.tieChoice = choices[userChoice];
  }

  return outcome;
}

const boardManager = new BoardManager();
