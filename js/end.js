const playersList = document.querySelector('.players-list');
const restartButton = document.querySelector('.restart-button');
const playAgainButton = document.querySelector('.play-again-button');

// Recupera a lista de jogadores e pontuações do localStorage
const players = JSON.parse(localStorage.getItem('players')) || [];

// Função de comparação para ordenar jogadores
const comparePlayers = (a, b) => {
    if (a.score !== b.score) {
        return b.score - a.score; // Primeiro critério: maior pontuação
    }
    if (a.timer !== b.timer) {
        return a.timer - b.timer; // Segundo critério: menor tempo
    }
    return a.name.localeCompare(b.name); // Terceiro critério: ordem alfabética do nome
};

// Ordena a lista de jogadores com base nos critérios
players.sort(comparePlayers);

// Popula a tabela de jogadores na tela
players.forEach(player => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${player.name}</td>
        <td>${player.score}</td>
        <td>${player.timer}</td>
    `;
    playersList.appendChild(row);
});

// Adiciona um evento ao botão de reinício para recarregar a página inicial
restartButton.addEventListener('click', () => {
    window.location = '../index.html';
});

// Adiciona um evento ao botão de jogar novamente para recarregar o jogo
playAgainButton.addEventListener('click', () => {
    window.location = '../pages/game.html';
});
