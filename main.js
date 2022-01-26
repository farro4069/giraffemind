window.onscroll = function () { window.scrollTo(0, 0); };
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
const surrender = document.querySelector('.surrender');

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
let currentAttemptIndex = 0;
let currentAttempt = allAttempts[currentAttemptIndex];
let newPeg;
let loaderPosition;
let redScore = 0;
let whiteScore = 0;

// *************************************************** Functions

function scoreAttempt() {

}

function setLoader() {
	for (i=0; i < 4; i++) {
		currentAttempt.children[i].children[0].classList = loaderPegs[i].children[0].classList;
	}
	// ready for next
	if (currentAttemptIndex == allAttempts.length) {
		endGame();
	}
	soreAttempt()
	currentAttemptIndex++; 
	currentAttempt = allAttempts[currentAttemptIndex];
	redoLoader();
}

function endGame() {
	gameOver = true;
}



function dragLeave() {
	return
}


function dropIt(e) {
	loaderPegs[loaderPosition].children[0].classList.replace('blank', `peg-${newPeg}`);
}

function dragOver(e) {
	e.preventDefault();
	if (e.target.dataset.number) {
		loaderPosition = e.target.dataset.number;
	}
}

function dragEnter() {
	return
}

function dragStart(e) {
	newPeg = e.target.dataset.number;
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
	for (i=0; i < (4 - puzzleCodeBase.length); i++) {
		puzzleCodeBase.splice( 0, 0, '0')
	}
	for (i=0; i<4; i++) {
		surrender.children[i].children[0].className = `peg-${puzzleCodeBase[i]}`;
	}
}


// **************************************************** Event listeners


basketPegs.forEach(p => addEventListener('dragstart', dragStart));
basketPegs.forEach(p => addEventListener('dragover', dragOver));
basketPegs.forEach(p => addEventListener('dragenter', dragEnter));
basketPegs.forEach(p => addEventListener('dragleave', dragLeave));
basketPegs.forEach(p => addEventListener('drop', dropIt));

redoButton.addEventListener('click', redoLoader);
logo.addEventListener('click', giveUp);
instruct.addEventListener('click', showInstruct);
closeHints.addEventListener('click', hideInstruct);

playButton.addEventListener('click', setLoader);
window.addEventListener('load', setPuzzle);
