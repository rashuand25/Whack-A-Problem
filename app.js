document.getElementById('startAnimation').addEventListener('click', function () {
  document.getElementById('bg-image1').classList.add('animate');
  document.getElementById('bg-image2').classList.add('animate');
  document.getElementById('hidden').style.display = 'block'
  this.style.display = 'none'; // This will hide the button
  document.getElementById('introTxt').style.display = 'none';
  ;
});

// let name = prompt('Hi what is your name?').toUpperCase();
// let introTxt = document.getElementById('introTxt');
// introTxt.innerHTML = 'Hello ' + name + '!!! ' + introTxt.innerHTML;


window.onload = function () {
  setupBoard();
}

//Start of a new Game//
function setupBoard() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    document.getElementById('board').appendChild(tile);
  };
};

function timer() {
  let count = 30;
  const timer = setInterval(function () {
    //convert seconds to minutes and seconds
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    // PadStart is used to fill a string with additional characters. In this case I wanted the seconds to have
    // atleast 2 characters so it filled it with zeroes    
    const wholeTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById('countDown').innerHTML = wholeTime;
    count--;

    if (count === 14) {
      let msg = 'Time is almost up!!!';
      document.getElementById("time-msg1").innerText = msg;
      document.getElementById("time-msg2").innerText = msg;
      setTimeout(function () {
        document.getElementById("time-msg1").innerText = '';
        document.getElementById("time-msg2").innerText = '';
      }, 3000);
    } else if (count === -1) {
      clearInterval(timer);
      let msg2 = "Game Over!!!"
      document.getElementById('time-msg1').innerText = msg2;
      document.getElementById("time-msg2").innerText = msg2;
      document.getElementById('countDown').style.display = 'none'
      document.getElementById('playAgain').style.display = 'block'
      clearInterval(runGame);
    }
  }, 1000);
  runGame = setInterval(gamePlay, 2000);
}

//Creates an img and caption pair
function createImageAndCaption(src, captionText, color) {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'images';

  const caption = document.createElement('p');
  caption.textContent = captionText;
  caption.className = 'captions';
  caption.style.color = color;
  caption.style.textShadow = '2px 2px 2px purple, 2px 2px 2px purple, 2px 2px 2px purple, 2px 2px 2px purple'

  const imgContainer = document.createElement('div');
  imgContainer.appendChild(img);
  imgContainer.appendChild(caption);

  return imgContainer;
}

const blessingsArray = [
  createImageAndCaption('images/good/bonus.png', 'Bonus 🤑', 'white'),
  createImageAndCaption('images/good/dayOff.png', 'A day off 🤪', 'white'),
  createImageAndCaption('images/good/lottery.jpg', 'Lottery!!! 🤑', 'white'),
  createImageAndCaption('images/good/newcar.jpeg', 'New Car 😍', 'white'),
  createImageAndCaption('images/good/payday.jpeg', 'Payday 💰', 'white'),
  createImageAndCaption('images/good/promotion.jpeg', 'Promotion 🥳', 'white'),
  createImageAndCaption('images/good/shopping.jpeg', 'Shopping spree🤩', 'white'),
  createImageAndCaption('images/good/spa.jpeg', 'Spa day 🥰', 'white'),
  createImageAndCaption('images/good/taxrefund.jpeg', 'Refund Check 💸', 'white'),
  createImageAndCaption('images/good/vacation.jpeg', 'Vacation 😍', 'white')
]

const problemsArray = [
  createImageAndCaption('images/bad/angryex.jpg', 'Angry Ex ☠️', 'red'),
  createImageAndCaption('images/bad/badkids.jpg', 'Bad kids 🤬', 'red'),
  createImageAndCaption('images/bad/boss.jpg', 'Mean boss 👺', 'red'),
  createImageAndCaption('images/bad/carnote.jpg', 'Car note 😱', 'red'),
  createImageAndCaption('images/bad/carproblems.jpg', 'Car problems 😡', 'red'),
  createImageAndCaption('images/bad/fakefriends.jpg', 'Frenemies😈', 'red'),
  createImageAndCaption('images/bad/lightbill.jpg', 'Light Bill 😱', 'red'),
  createImageAndCaption('images/bad/Medicalbill.jpg', 'Medical Bills 😲', 'red'),
  createImageAndCaption('images/bad/rentbill.jpg', 'Rent Due 😩', 'red'),
  createImageAndCaption('images/bad/studentloan.jpg', 'Student loan 😭', 'red'),
]

//Had to put the score variable here OUTSIDE of the below function. Would not work inside the function I guess because of scope//
let score = 0;

// Array Randomizer//
function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

//Random Tile//
function getRandomTileIndex() {
  return Math.floor(Math.random() * 9);
}

function clearTile(tile) {
  while (tile.firstChild) {
    tile.firstChild.remove();
  }
}

function replaceChildWithClone(node) {
  let oldNode = node.firstChild;
  let newNode = oldNode.cloneNode(true);
  oldNode.parentNode.replaceChild(newNode, oldNode);
  return newNode;
}

function imgClick(event) {
  const imgSrc = event.target.src;
  event.target.parentNode.remove();

  event.target.removeEventListener('click', imgClick);

  if (blessingsArray.map(e => e.firstChild.src).includes(imgSrc)) {
    score++;
  } else if (problemsArray.map(e => e.firstChild.src).includes(imgSrc)) {
    score--;
  };

  document.getElementById("score").innerText = 'Score: ' + score;
}

//Controls game speed//
let interval = 2000;
let decreaseRate = 75;
let minInterval = 500;
let runGame;

function gamePlay() {
  let randomTileIndex1 = getRandomTileIndex();
  let randomTileIndex2 = getRandomTileIndex();

  let tile1 = document.getElementById(randomTileIndex1.toString());
  let tile2 = document.getElementById(randomTileIndex2.toString());

  do {
    randomTileIndex2 = getRandomTileIndex();
  } while (randomTileIndex2 === randomTileIndex1);

  clearTile(tile1);
  clearTile(tile2);

  let blessingsImg = blessingsArray[randomIndex(blessingsArray)];
  let problemsImg = problemsArray[randomIndex(problemsArray)];

  tile1.append(blessingsImg);
  tile2.append(problemsImg);

  let newBlessing = replaceChildWithClone(blessingsImg);
  let newProblem = replaceChildWithClone(problemsImg);

  newBlessing.addEventListener('click', imgClick);
  newProblem.addEventListener('click', imgClick);

  interval = Math.max(minInterval, interval - decreaseRate);
  clearInterval(runGame);
  runGame = setInterval(gamePlay, interval);
}

function playAgain() {
  // Reset the score
  score = 0;
  document.getElementById("score").innerText = 'Score: ' + score;

  // Clear the game board
  for (let i = 0; i < 9; i++) {
    clearTile(document.getElementById(i.toString()));
  }

  // Hide the 'playAgain' button and show the 'startAnimation' button
  document.getElementById('playAgain').style.display = 'none';
  document.getElementById('countDown').style.display = 'block';

  // Reset the timer
  clearInterval(timer);
  document.getElementById('countDown').innerHTML = '30:00';

  // Reset the game state
  clearInterval(runGame);
}

document.getElementById('playAgain').addEventListener('click', playAgain);



