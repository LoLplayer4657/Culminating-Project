const wordBank = [
  'apple', 'banana', 'orange', 'grape', 'cherry', 'peach', 'melon', 'kiwi', 'berry', 'mango',
  'dog', 'cat', 'mouse', 'rabbit', 'horse', 'cow', 'sheep', 'goat', 'pig', 'chicken',
  'house', 'car', 'tree', 'flower', 'grass', 'road', 'river', 'mountain', 'valley', 'forest',
  'happy', 'sad', 'angry', 'excited', 'bored', 'tired', 'scared', 'nervous', 'confident', 'calm',
  'run', 'walk', 'jump', 'swim', 'fly', 'drive', 'ride', 'climb', 'crawl', 'dive',
  'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown', 'black', 'white',
  'fast', 'slow', 'hot', 'cold', 'big', 'small', 'tall', 'short', 'old', 'young',
  'yes', 'no', 'maybe', 'always', 'never', 'sometimes', 'often', 'rarely', 'usually', 'occasionally'
];

var userContainer = document.getElementById("user-container");

let wrongKey = false;
let canSpace = false;

let letterCount = 0;
let wrongCount = 0;
let scrollCounter = 0;
var letter = document.getElementById("letter");
var timer = document.getElementById("timer");

var restartButton = document.getElementById("restart");

let timeLeft = 30;

function newGame(){
  text = generateRandomWords(wordBank, 200);
  const wordSplit = text.split(" ");
  for (let i = 0; i < wordSplit.length; i++){
    const wordDiv = document.createElement("div");
    userContainer.appendChild(wordDiv);
    wordDiv.id = "word";
    const word = wordSplit[i];
    for(let j = 0; j < word.length; j++){
      const letterDiv = document.createElement("div");
      letterDiv.id = "letter";
      letterDiv.innerHTML = word.substring(j, j+1);
      wordDiv.appendChild(letterDiv);
    }
  }
}

function generateRandomWords(wordBank, numberOfWords){
  const randomWords = [];
  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWords.push(wordBank[randomIndex]);
    randomWords.push(" ");
  }
  var wordsText = "";
  for(let i = 0; i < randomWords.length;i++){
      wordsText += randomWords[i];
  }
  return wordsText;
}

newGame();
nextLetter();

document.addEventListener("keydown", write);

function nextLetter(){
  lastChild = document.getElementById("word").lastChild;
  if(lastChild.id == "letter-completed"){
    canSpace = true;
  }
  else{
    letter = document.getElementById("letter");
    letter.id = "letter-active";
    letterCount += 1;
  }
}

function write(event){
  const key = event.key;
  var letter = document.getElementById("letter-active");
  if (/^[a-z]$/.test(key) && wrongKey == false && canSpace == false){
    if(key == letter.innerHTML){
      letter.id = "letter-completed";
      nextLetter();
    }
    else if (wrongKey == false){
      wrongKey = true;
      letter.id = "letter-wrong";
      wrongCount += 1;
    }
  }
  else if(event.code == 'Space' && canSpace == true){ 
    canSpace = false;
    document.getElementById("word").id = "word-completed";
    nextLetter();
    scrollText();
  }
  else if(event.code == 'Backspace' && wrongKey == true){
    letter = document.getElementById("letter-wrong")
    letter.id = "letter-active";
    wrongKey = false;
  }
}

function scrollText(){
  scrollCounter +=1;
  if(scrollCounter == 27){
    for(let i = 0;i < 20;i++){
      var currentWord = document.getElementById("word-completed");
      userContainer.removeChild(currentWord);
    }
    scrollCounter = 5;
  }
}



function updateTimer() {
  if(letterCount > 1){
    timer.style.display = "block";
    if (timeLeft > 0) {
      timer.textContent = timeLeft;
      timeLeft--;
    } 
    else {
      timer.textContent = "Time's up!";
      console.log(letterCount);
      console.log(wrongCount);  
      calculateWPM();
      clearInterval(timerInterval);
    }
  }
}

const timerInterval = setInterval(updateTimer, 1000);

function calculateWPM() {
  const words = Math.floor(letterCount/4);
  const wpm = words * 2 ;
  const accuracy = (Math.round((wrongCount/letterCount) * 100) - 100) * - 1;
  document.getElementById('wpm-text').textContent = `WPM: ${wpm}`;
  document.getElementById('accuracy').textContent = accuracy + "%";
}


restartButton.addEventListener("click", function(){
  location.reload();
});
