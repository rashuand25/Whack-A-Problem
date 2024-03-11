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

// Generate random image and chooses random tile//
function gamePlay() {
  function randomIndex(array) {
    return Math.floor(Math.random() * array.length);
  };

  //Assuming you want 9 tiles. Did it twice because I want 2 different hats selected at the same time//
  let randomTileIndex1 = Math.floor(Math.random() * 9);
  let randomTileIndex2 = Math.floor(Math.random() * 9);

  //Ensures that 2 images from the different arrays arent able to be on the same hat//
  do {
    randomTileIndex2 = Math.floor(Math.random() * 9);
  } while (randomTileIndex2 === randomTileIndex1);

  //Had to create 2 different tile elements for same reason as above//
  let tile1 = document.getElementById(randomTileIndex1.toString());
  let tile2 = document.getElementById(randomTileIndex2.toString());

  //Clears the image off the hat before another image can appear//
  while (tile1.firstChild) {
    tile1.firstChild.remove();
  };
  while (tile2.firstChild) {
    tile2.firstChild.remove();
  };

  let blessingsImg = blessingsArray[randomIndex(blessingsArray)];
  let problemsImg = problemsArray[randomIndex(problemsArray)];


  tile1.append(blessingsImg);
  tile2.append(problemsImg);

  //ADD AND SUBTRACT TO SCORE based on which array the clicked image is located in//      
  function imgClick(event) {
    const imgSrc = event.target.src;
    event.target.parentNode.remove();

    event.target.removeEventListener('click', imgClick);

    //map here is basically creating a new array that contains the src of the images
    if (blessingsArray.map(e => e.firstChild.src).includes(imgSrc)) {
      score++;
    } else if (problemsArray.map(e => e.firstChild.src).includes(imgSrc)) {
      score--;
    };

    // Update the score
    document.getElementById("score").innerText = 'Score: ' + score;
  }
  blessingsImg.firstChild.addEventListener('click', imgClick);
  problemsImg.firstChild.addEventListener('click', imgClick);
}