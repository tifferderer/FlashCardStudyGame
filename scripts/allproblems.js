/*
Tiffany Ferderer
3/4/2020
allproblems.js
Prints out every problem in the arrays and their matching answer
*/

//cache the lists
let parentNode = document.querySelector('ul#easy');
let parent2Node = document.querySelector('ul#medium');
let parent3Node = document.querySelector('ul#hard');

//call function to add all easy problems
printLevels(parentNode, easyList, easySolve)

//call function to add all medium problems
printLevels(parent2Node, mediumList, mediumSolve);

//call function to add all hard problems
printLevels( parent3Node, difficultList, difficultSolve);

//function to add all problems as a list item
function printLevels( node, list, solve) {
    for(i = 1; i <10; i++) {
        let newElement = document.createElement('li');
        newElement.textContent = list[i] + " = " + solve[i];

        //append element to end of list
        node.appendChild(newElement);
    }
}