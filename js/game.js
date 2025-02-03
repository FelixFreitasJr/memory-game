const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';
let attempts = 0;
let totalPoints = 1000; // Pontuação inicial
let bonusPoints = 0;
let startTime;

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        calculateTimeBonus();
        let finalScore = calculatePoints();
        
        // Salva a pontuação do jogador no localStorage
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const timeElapsed = timer.innerHTML;
        players.push({ name: spanPlayer.innerHTML, score: finalScore, timer: timeElapsed });
        localStorage.setItem('players', JSON.stringify(players));

        // Redireciona para a tela de finalização
        window.location = '../pages/end.html';
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }
    attempts++;
    updateScore();
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () => {
    startTime = Date.now();
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

const calculatePoints = () => {
    totalPoints -= attempts * 10;
    totalPoints += bonusPoints;
    return totalPoints;
}

const calculateTimeBonus = () => {
    let timeElapsed = (Date.now() - startTime) / 1000; // Tempo em segundos
    if (timeElapsed <= 60) {
        bonusPoints = 500;
    } else if (timeElapsed <= 120) {
        bonusPoints = 300;
    } else {
        bonusPoints = 100;
    }
}

const updateScore = () => {
    let currentScore = totalPoints - attempts * 10;
    score.innerHTML = `Pontuação: ${currentScore}`;
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player') || "Jogador";
    startTimer();
    loadGame();
    score.innerHTML = `Pontuação: ${totalPoints}`;
}
