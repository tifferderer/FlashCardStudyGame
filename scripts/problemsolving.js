/*
Tiffany Ferderer
3/2/2020
problemsolving.js
*/

//cache names to each element
const problem = document.querySelector("div#problem");
let scoreCard = document.querySelector("h2");
let levelMode = document.querySelector("p");
let image = document.querySelector("img");

const answerList = document.getElementsByTagName("li");

//use a loop to add event listeners
for (let li of answerList) {
    li.addEventListener("mouseout", removeBorder);
    li.addEventListener("mouseover", addBorder);
    li.addEventListener("click", scoreCounter);
}

//grab arrays from other script
let currentList = easyList;
let currentAnswers = easySolve;

//create variables
let score = 0;
let level = "Easy";

//start the first math problem
let randomIndex= randomProblem();
displayProblem(randomIndex);
let correct = displayPossibilities(randomIndex);

// function to get a random number
function randomProblem() {

    let random = Math.floor(Math.random() * 10);

    console.log(random);
    //return the random number(index) used to access a problem in 
    // the array of math problems
    return random;
}

//display the problem
function displayProblem(index) {

    let randomTag = currentList[index];
        console.log(randomTag);

        problem.textContent = randomTag;
}

//Mouse event functions for the border
function removeBorder(e) {
    e.target.className = 'noborder';
}

function addBorder(e) {
    e.target.className = 'border';
}

//function to display random answers along with the right one
function displayPossibilities(withAnswer) {

    // Two choices will need to be random numbers
    let randomOne = Math.floor(Math.random() * 10);
    let randomTwo = Math.floor(Math.random() * 20);

    //One choice needs to be the correct answer
    let answer = currentAnswers[withAnswer];

    //Make sure there are no duplicates
    while(randomOne == answer || randomOne == randomTwo) {
        randomOne--;
    }
    while (randomTwo == answer || randomTwo == randomOne) {
        randomTwo--;
    }

    //create an array of the choices and sort (hide the correct answer)
    let possibilities = [randomOne, randomTwo, answer];
    possibilities.sort();
    console.log(possibilities);

    //place the choice answers in the li's
    let flow = 0;
    for (let li of answerList) {
        li.textContent = possibilities[flow];
        console.log("li: " + possibilities[flow]);
        flow++;
    }

    return answer;
}

//function to count score when a correct/incorrect answer is clicked
function scoreCounter(e) { 
    console.log(e.target)
    if(e.target.textContent == correct) {
        score++;
    
        let newRandom = randomProblem();

        //Make sure there is a new problem every time
        while(randomIndex == newRandom) {
            newRandom = randomProblem();
        }

        //once there is a new index number, set it to the index
        randomIndex = newRandom;

        //display new problem with choices
        displayProblem(randomIndex);
        correct = displayPossibilities(randomIndex);
    }
    else {
        score--;
    }

    if (score < 0) {
        score = 0;
    }

    scoreCard.textContent = "Score: " + score;
    levelMode.textContent = "Level: " + level;

    levelCounter();
}

//function to set the difficulty level depending on score
function levelCounter() {

    //if the score is 18, game won
    if (score === 18) {
        problem.textContent = "You know your stuff!";
        image.src="images/aplus.png";
        image.alt = "A+";
        document.querySelector("ul").replaceWith("");
    }
    
    //if the score is higher or equal to 12, difficult level
    if(score >= 12) {
        convertLevel(difficultList, difficultSolve, "Difficult");
    }
   
    //if the score is higher than 6, medium level
    else if(score > 6) {
        convertLevel(mediumList, mediumSolve, "Medium");
    }
    else {
       convertLevel(easyList, easySolve, "Easy");
    }
}

//function to change which array you are accessing
function convertLevel(answerList, answerSolve, difficulty) {
    currentList = answerList;
    currentAnswers = answerSolve;
    level = difficulty;
}

    

