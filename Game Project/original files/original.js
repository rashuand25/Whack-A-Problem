window.onload = function () {
  startGame();
  
}

//Creates the game board
function startGame() {
  for (let i = 0; i < 9; i++) {
      let tile = document.createElement("div");
      tile.id = i.toString();
      document.getElementById('board').appendChild(tile);
  }
  
}

//Game timer & time messages//
function timer() {
  let count = 60;
  const timer = setInterval(function () {
    document.getElementById('countDown').innerHTML = '00:' + count;
    count--;

    if (count === 29) {
      let msg = 'Time is almost up!!!';
      document.getElementById("time-msg").innerText = msg;
      document.getElementById("time-msg1").innerText = msg;
      setTimeout(function () {
        document.getElementById("time-msg").innerText = '';
      }, 3000);
      setTimeout(function () {
          document.getElementById("time-msg1").innerText = '';
        }, 3000);
    }
    else if (count === 0) {
      clearInterval(timer);
      let msg2 = "Time's up!!!"
      document.getElementById('time-msg').innerText = msg2;
      document.getElementById("time-msg1").innerText = msg2;
    }
  }, 1000
  );
  intervalId = setInterval(me, 3000);
}

//had to put the score variable here OUTSIDE of the below scorer function. Would not work inside the function because of scope//
let score = 1;

// Generate random image and chooses random tile//
const problems = [
  'images/angryex.jpg', 
  'images/badcredit.jpg', 
  'images/badkids.jpg', 
  'images/boss.jpg', 
  'images/carinsurance.png', 
  'images/carnote.jpg', 
  'images/carproblems.jpg', 
  'images/daycare.png', 
  'images/fakefriends.jpg', 
  'images/gasbill.jpg', 
  'images/lightbill.jpg', 
  'images/medicalbill.jpg', 
  'images/phonebill.png', 
  'images/rentbill.jpg', 
  'images/studentloan.jpg'
];

const goodLuck = ['images/obama2.jpg']

function me() {
 
  let randomImageIndex = Math.floor(Math.random() * problems.length);
  let randomTileIndex = Math.floor(Math.random() * 9); // Assuming you have 9 tiles
  let tile = document.getElementById(randomTileIndex.toString());

  //Prevents more than one image appearing on the the hat at the same time
  while (tile.firstChild) {
    tile.firstChild.remove();
  }

  // Create a new img element
  let imgElement = document.createElement('img');
  imgElement.src = problems[randomImageIndex];
  imgElement.style.width = '70px'; 
  imgElement.style.position = 'relative';
  imgElement.style.marginLeft = '40px'

   // Append the img element to the tile
   tile.appendChild(imgElement);

  //add or subtract to score//
function scorer() {
  // imgElement.onclick = function() {
  //   this.remove();
    if (goodLuck) {      
      document.getElementById("score").innerText = 'Score: ' + score;
      score ++
      console.log(score);    
    } 
    else if (problems) {
      document.getElementById("score").innerHTML = 'Score: ' + score;
      score -=1
      console.log(score);      
    }    
};
} 
scorer()
}