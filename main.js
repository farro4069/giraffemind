const logo = document.querySelector('.logo');
const instruct = document.querySelector('.btn-info');
const modalGiveUp = document.querySelector('.modal__giveup');
const modalHints = document.querySelector('.modal__hints');
const closeGiveUp = document.querySelector('.btn-close__giveup');
const closeHints = document.querySelector('.btn-close__hints');
const basketPegs = document.querySelectorAll('.basket__peg');
const loaderPegs = document.querySelectorAll('.loader-peg__hole');
const playButton = document.querySelector('.btn__play');
const redoButton = document.querySelector('.btn__redo');
const gameBoard = document.querySelector('.game__board');
const attempt01 = document.querySelector('.attempt-01');
const attempt02 = document.querySelector('.attempt-02');
const attempt03 = document.querySelector('.attempt-03');
const attempt04 = document.querySelector('.attempt-04');
const attempt05 = document.querySelector('.attempt-05');
const attempt06 = document.querySelector('.attempt-06');
const attempt07 = document.querySelector('.attempt-07');
const attempt08 = document.querySelector('.attempt-08');
const attempt09 = document.querySelector('.attempt-09');
const attempt10 = document.querySelector('.attempt-10');
const solution = document.querySelector('.solution');
const gameScore = document.querySelector('.game__score');


const allAttempts = [
	attempt01, 
	attempt02, 
	attempt03, 
	attempt04, 
	attempt05, 
	attempt06, 
	attempt07, 
	attempt08, 
	attempt09, 
	attempt10
	];

let gameOver = false;
let currentAttemptIndex = 0;
let currentAttempt = allAttempts[currentAttemptIndex];
let newPeg;
let loaderPosition;
let redScore = 0;
let whiteScore = 0;
let gameScoreLength = gameScore.children.length;

// *************************************************** Functions

function setScorePegs() {
	scoreChildIndex = gameScoreLength - currentAttemptIndex - 1;
	for (i=0; i < redScore; i++) {
		gameScore.children[scoreChildIndex].children[i].children[0].classList.replace('score_blank', 'score_2');
	}
	for (i=redScore; i < (redScore + whiteScore); i++) {
		gameScore.children[scoreChildIndex].children[i].children[0].classList.replace('score_blank', 'score_1');	
	}
}

function scoreAttempt() {
	attemptCheck = [...currentAttempt.children];
	solutionCheck = [...solution.children];
	for (i=3; i >= 0; i--) {
		if (attemptCheck[i].children[0].className == solutionCheck[i].children[0].className) {
			redScore++;
			attemptCheck.splice(i, 1);
			solutionCheck.splice(i, 1);
		}
	}
	for (a = (attemptCheck.length - 1); a >= 0; a--) {
		for (i=(solutionCheck.length - 1); i >= 0; i--) {
			if (attemptCheck[a].children[0].className == solutionCheck[i].children[0].className) {
				attemptCheck.splice(a, 1);
				solutionCheck.splice(i, 1);
				whiteScore++;
				break;
			}
		}
	}
	setScorePegs();
	gameOver = (redScore == 4) ? true: false;
	redScore = 0;
	whiteScore = 0;
	attemptCheck = [];
	solutionCheck = [];
}

function setLoader() {
	if (!gameOver) {
		for (i=0; i < 4; i++) {
			currentAttempt.children[i].children[0].classList = loaderPegs[i].children[0].classList;
		}
		if (currentAttemptIndex == allAttempts.length) {
			endGame();
		}
		scoreAttempt();
		currentAttemptIndex++; 
		currentAttempt = allAttempts[currentAttemptIndex];
		redoLoader();		
	}
}

function endGame() {
	gameOver = true;
}


function dropIt(e) {
	loaderPegs[loaderPosition].children[0].classList.replace('blank', `peg-${newPeg}`);
	gameBoard.classList.remove('playing');

}

function dragOver(e) {
	e.preventDefault();
	if (e.target.dataset.number) {
		loaderPosition = e.target.dataset.number;
	}
}

function dragStart(e) {
	newPeg = e.target.dataset.number;
	gameBoard.classList.add('playing');
}

function touchEnd(e) {
	// console.log(e.target);
	newPeg = e.target.dataset.number || e.target.parentElement.dataset.number;
	console.log(newPeg);
	// Add to next loader position
	for (i=0; i<4; i++){
		console.log(loaderPegs[i].children[0].className);
		if (loaderPegs[i].children[0].className == 'blank') {
			loaderPegs[i].children[0].classList.replace('blank', `peg-${newPeg}`);
			break;
		}
	}
}




function redoLoader() {
	loaderPegs.forEach(p => p.children[0].className = 'blank');
}



// ***************************************** Modal operators

function giveUp() {
	modalGiveUp.style.display = 'block';
	gameOver = true;
}

function showInstruct() {
	modalHints.style.display = 'block';
}

function hideInstruct() {
	modalHints.style.display = 'none';
}

function setPuzzle() {
	puzzleCode = Math.floor(Math.random() * 1296);
	puzzleCodeBase = puzzleCode.toString(6).split('');
	while (puzzleCodeBase.length < 4) {
		puzzleCodeBase.splice( 0, 0, '0');
	}
	for (i=0; i<4; i++) {
		solution.children[i].children[0].className = `peg-${puzzleCodeBase[i]}`;
	}
}


// **************************************************** Event listeners


basketPegs.forEach(p => addEventListener('touchend', touchEnd));


basketPegs.forEach(p => addEventListener('dragstart', dragStart));
basketPegs.forEach(p => addEventListener('dragover', dragOver));
basketPegs.forEach(p => addEventListener('drop', dropIt));

redoButton.addEventListener('click', redoLoader);
logo.addEventListener('click', giveUp);
instruct.addEventListener('click', showInstruct);
closeHints.addEventListener('click', hideInstruct);

playButton.addEventListener('click', setLoader);
window.addEventListener('load', setPuzzle);
