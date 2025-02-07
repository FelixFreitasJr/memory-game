const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const pauseButton = document.querySelector('.pause-btn');
const score = document.querySelector('.score');

const charactersByLevel = {
    1: ['beth', 'jerry', 'jessica', 'morty', 'pessoa-passaro', 'pickle-rick', 'rick', 'summer', 'meeseeks', 'scroopy'], // rick and morry
    2: ['amy', 'bender', 'conrad', 'dottor', 'fry', 'leela', 'mamma', 'mordicchio', 'professor', 'zapp'], // futurama
    3: ['abraham', 'bart', 'homer', 'lisa', 'maggie', 'marge', 'milhouse', 'mona', 'patty', 'selma'], // os simpsons
    4: ['brian', 'Chris', 'joe', 'lois', 'Meg', 'Peter', 'quagmire', 'stewie', 'John', 'mike'], // family guy
    5: ['Roger', 'Francine', 'Stan', 'Steve', 'Hayley', 'Klaus', 'Roger2', 'Roger3', 'Roger4', 'Roger5'] // american dad
};

const timePerLevel = 30; // 30 segundos por nível adicional
let totalTime = 160; // 2 minutos de tempo inicial

for (let i = 1; i <= Object.keys(charactersByLevel).length; i++) {
    totalTime += timePerLevel; // Adiciona 30 segundos para cada nível
}

let intervalId;
let isPaused = false;

let currentLevel = 1;
let firstCard = '';
let secondCard = '';
let attempts = 0;
let totalPoints = 0;

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const calculateFinalPoints = () => {
    let finalScore = totalPoints;
    for (let i = 1; i <= Object.keys(charactersByLevel).length; i++) {
        finalScore += 10 * i; // Ajuste essa lógica conforme necessário
    }
    return finalScore;
}

const savePlayer = (name, score, time) => {
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.push({ name, score, time });
    localStorage.setItem('players', JSON.stringify(players));
}

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === charactersByLevel[currentLevel].length * 2) {
        // Verificar se há próximo nível
        if (charactersByLevel[currentLevel + 1]) {
            currentLevel++;
            loadGame(currentLevel);
            updateBackground(currentLevel);
        } else {
            // Calcular a pontuação final e salvar
            const finalPoints = calculateFinalPoints();
            savePlayer(spanPlayer.innerHTML, finalPoints, timer.innerHTML);

            // Jogo finalizado com sucesso
            window.location = '../pages/end.html';
        }
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
        totalPoints += 10 * currentLevel; // Pontos por acerto baseado no nível
        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
        totalPoints -= 5; // Penalidade por erro
    }
    attempts++;
    updateScore();
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card') || isPaused) return;

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const createCard = (character, level) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/lv${level}/${character}.png')`;
    back.style.backgroundImage = `url('../img/lv${level}/back.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = (level = 1) => {
    const characters = charactersByLevel[level] || [];
    if (characters.length === 0) {
        console.error(`Nenhum personagem definido para o nível ${level}`);
        return;
    }
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    grid.innerHTML = ''; // Limpar a grade anterior

    shuffledArray.forEach((character) => {
        const card = createCard(character, level);
        grid.appendChild(card);
    });
}

const updateBackground = (level) => {
    document.body.style.backgroundImage = `url('../img/lv${level}/bg.jpg')`;
}

const startTimer = () => {
    intervalId = setInterval(() => {
        if (!isPaused) {
            totalTime--;
            const minutes = Math.floor(totalTime / 60);
            const seconds = totalTime % 60;
            timer.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (totalTime <= 0) {
                clearInterval(intervalId);
                alert('Tempo esgotado! Fim de jogo.');
                
                // Salva os dados do jogador antes de redirecionar
                const finalPoints = calculateFinalPoints();
                savePlayer(spanPlayer.innerHTML, finalPoints, timer.innerHTML);
                
                window.location = '../pages/end.html';
            }
        }
    }, 1000);
}

const calculatePoints = () => {
    totalPoints += totalTime * currentLevel; // Adicionar bônus baseado no tempo restante e nível
}

const updateScore = () => {
    score.innerHTML = `Pontuação: ${totalPoints}`;
}

const togglePause = () => {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(intervalId);
        setTimeout(() => {
            alert('Jogo pausado! Clique em "OK" para retomar.');
            isPaused = false;
            startTimer(); // Reiniciar o timer
        }, 100);
    }
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player') || "Jogador";
    loadGame(currentLevel);
    updateBackground(currentLevel);
    startTimer();
    updateScore();
}

pauseButton.addEventListener('click', togglePause);
