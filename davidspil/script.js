//Global values
let points = 0;
let lives = 3;
let seconds = 10;
let level = 1;
const initialState = document.body.innerHTML; //Saving inner HTML of the body for later when reset() is needed
const levelArray = [["points"]];

//Initiates the game
function start() {
  removeId("start_container"); //function that displays none
  timer(); //starts the timer function
}

//Resets the game after lose or win
function reset() {
  //Resetting all of the global values
  points = 0;
  lives = 3;
  seconds = 10;

  //Removing both winner and losing container
  document.querySelector("#winnerContainer").classList.remove("displayFlex");
  document.querySelector("#loserContainer").classList.remove("displayFlex");
  //I am changing all of the HTML of the body back to its original state by calling initialState
  document.body.innerHTML = initialState;

  start(); //Initiates the game
}
//Time logic of the game
function timer() {
  seconds -= 0.1; //Update amount of seconds with same amount as setTimeout
  if (seconds > 0 && lives > 0) {
    //Making sure there is time and lives
    setTimeout(timer, 100); //Running the timer function everytime 100ms passes
    let numberOfSpawns = Math.floor(Math.random() * 3); //Randomly choosing how many elements shall be spawned
    for (let i = 0; i < numberOfSpawns; i++) {
      spawn(); //Running this function numberOfSpawns amount of times in a for loop
    }
  } else {
    if (points > 10 && lives > 0) {
      //Checking if the player has enough points and enough lives to win
      winner(); //Running win function
    } else if (points < 9 || lives <= 0) {
      //Not enough lives or points this is run
      loser(); //Running loser function
    }
  }
}

//This function spawns my good and bad elements randomly into the HTML
function spawn() {
  let goodOrBad = Math.random(); //finding a random value between 0-1
  const spawnDiv = document.getElementById("spawn"); //Creating a constant to hold my html spawn element by ID

  if (goodOrBad > 0.5) {
    //50% chance of a good element
    var good = document.createElement("div"); //Creating the div for the good element
    var goodContainer = document.createElement("div"); //Creating a container for my good div

    spawnDiv.appendChild(goodContainer); //Making spawn a parent of goodContainer
    goodContainer.appendChild(good); //Making goodContainer a parent of good

    good.setAttribute("class", "goodThing"); //Giving a class to good

    good.addEventListener("mousedown", function () {
      //adding this in case i want to run multiple functions
      goodClick(good); //running the function goodClick with good as its variable
      good.removeEventListener("mousedown", this); //Removing the event listener after goodClick is done
    });

    good.style.left = Math.random() * 85 + "%"; //Setting goods position on x-axis randomly within the spawn container
    good.style.animation = "kf_thing 5s linear 1 both"; //Setting its animation
  }

  //This is just the same as above, but for a bad element instead
  else {
    var bad = document.createElement("div");
    var badContainer = document.createElement("div");

    spawnDiv.appendChild(badContainer);
    badContainer.appendChild(bad);

    bad.setAttribute("class", "badThing");

    bad.addEventListener("mousedown", function () {
      badClick(bad);
      bad.removeEventListener("mousedown", this);
    });

    bad.style.left = Math.random() * 85 + "%";
    bad.style.animation = "kf_thing 5s linear 1 both";
  }
}

//Function run when good element is clicked with the good element as its variable
function goodClick(element) {
  //Making sure that the parameter has not been clicked, this is to prevent multiple points on one element
  if (!element.hasAttribute("data-clicked")) {
    points++;
    document.querySelector("#counter").textContent = points;

    element.setAttribute("data-clicked", "true"); //Making sure it cant be clicked twice

    const currentPosition = element.getBoundingClientRect(); //Getting the position of the element on the screen.

    element.style.animationPlayState = "paused"; //Freezing or pausing the animation
    element.style.position = "fixed"; //Setting its position as fixed

    element.style.top = currentPosition.top + "px"; //Setting the correct y-axis position with top
    element.style.left = currentPosition.left + "px"; //Setting the correct x-axis position with left

    element.style.animation = "kf_scale 1s forwards"; //Scaling the element until it disappears

    document.querySelector("#counter").style.marginTop = "12%"; //Setting the correct position for the counter
    //If points are higher than 10, the counter has to move to make space for an extra number
    if (points >= 10) {
      document.querySelector("#logPoints_sprite").style.marginLeft = "8%";
    }
    //Prøv selv og test om i kan få det her til at ske ;)
    else if (points >= 100) {
      document.querySelector("#logPoints_sprite").style.marginLeft = "4%";
    }
  }
}

//Function that is run when bad element is clicked, most of the function is the same as goodClick
function badClick(element) {
  if (!element.hasAttribute("data-clicked")) {
    lives--;

    //Removing a heart everytime lives changes
    if (lives <= 0) {
      document.querySelector("#hjerteOne").style.display = "none";
    } else if (lives === 1) {
      document.querySelector("#hjerteTwo").style.display = "none";
    } else if (lives === 2) {
      document.querySelector("#hjerteThree").style.display = "none";
    }

    element.setAttribute("data-clicked", "true");
    const currentPosition = element.getBoundingClientRect();
    element.style.animationPlayState = "paused";
    element.style.position = "fixed";
    element.style.top = currentPosition.top + "px";
    element.style.left = currentPosition.left + "px";
    element.style.animation = "kf_scale 1s forwards";
  }
}

//Function that sets an id to display none
function removeId(id) {
  document.getElementById(id).style.display = "none";
}

//Function that the displays the end screen if you win
function winner() {
  document.querySelector("#winnerContainer").classList.add("displayFlex");
  document.querySelector("#winnerText").innerHTML =
    "You had a total of " + points + " points!";
}

//Function that displays the end screen if you lose
function loser() {
  document.querySelector("#loserContainer").classList.add("displayFlex");
  document.querySelector("#loserText").innerHTML =
    "You had a total of " + points + " points.. Sadly you need 10";
}
