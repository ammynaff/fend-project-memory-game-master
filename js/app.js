//Create a list that holds all of your cards

const symbols = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
];

const cardContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];
let firstClick = true;


function initGame() {
    shuffle(symbols);

    for (let i = 0; i < symbols.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.classList.add("closed");
        card.innerHTML = `<i class = "${symbols[i]}"</i>`;
        cardContainer.appendChild(card);
        click(card);

    }


    function click(card) {

        card.addEventListener("click", function() {
            if (firstClick) {

                startTimer();
                firstClick = false;
            }
            const currentCard = this;
            const previousCard = openedCards[0];

            if (openedCards.length <= 1) {
                card.classList.add("open", "show", "disabled");
                openedCards.push(this);
                compareCards(currentCard, previousCard);
            }
        });
    }



    function compareCards(currentCard, previousCard) {
        if (currentCard.innerHTML === previousCard.innerHTML) {
            currentCard.classList.add("match");
            previousCard.classList.add("match");
            matchedCards.push(currentCard, previousCard);
            openedCards = [];
            isOver();
        } else {
            setTimeout(() => {
                currentCard.classList.remove("open", "show", "disabled");
                previousCard.classList.remove("open", "show", "disabled");
                openedCards.length = 0;
            }, 500);
        }
        countMoves();
    }

    //game is over
    function isOver() {
        if (matchedCards.length === symbols.length) {
            stopTimer();
            showModal();
        }
    }

}

//rate game
const stars = document.querySelectorAll(".stars li i");

function rating() {
    switch (moves) {
        case 8:
            stars[0].classList.remove('fa-star');
            break;
        case 15:
            stars[1].classList.remove('fa-star');
            break;
    }
}

function addStars() {
    stars.forEach(function(star) {
        star.classList.add('fa-star');
    });
}

const restartGame = document.querySelector(".restart");

restartGame.addEventListener("click", function() {
    //reset the game
    initGame();
    reset();
    clearModal();
});

initGame();

function reset() {

    cardContainer.innerHTML = "";

    initGame();

    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    clearInterval(timer);
    firstClick = true;
    minutes.innerText = 0;
    seconds.innerText = 0;
    addStars();
}
//moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;

function countMoves() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}

//timer

let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let timer;
minutes.innerText = 0;
seconds.innerText = 0;
const time = document.querySelector(".time");

function startTimer() {
    timer = setInterval(function() {
        seconds.innerText++;
        if (seconds.innerText == 60) {
            minutes.innerText++;
            seconds.innerText = 0;
        }
    }, 1000);
    return timer;
}

function stopTimer() {
    clearInterval(timer);
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* modal*/

const modal = document.querySelector("#modal");
const playAgain = document.querySelector("#playAgain");

function showModal() {
    modal.style.display = "block";

    const modalMoves = document.querySelector(".modal_moves");
    modalMoves.innerHTML = movesContainer.innerHTML;

    const modalStars = document.querySelector(".modal_stars");
    modalStars.innerHTML = document.querySelector('.stars ').innerHTML;

    clearInterval(timer);

    const modalTime = document.querySelector(".modal_timer");
    modalTime.innerHTML = time.innerHTML;
}

playAgain.addEventListener("click", function() {

    modal.style.display = "none";
    start();
});

function start() {
    initGame();
    reset();
}