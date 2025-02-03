# Memory Game

## Descrição

Este é um jogo da memória desenvolvido em HTML, CSS e JavaScript. O objetivo do jogo é encontrar todos os pares de cartas no menor tempo possível e com o menor número de tentativas. O jogo possui uma tela de login, contagem de tempo, sistema de pontuação e uma tela de finalização com ranking dos jogadores.

## Funcionalidades

- Tela inicial para entrada do nome do jogador
- Contador de tempo
- Pontuação baseada em tentativas e tempo
- Tela de finalização com lista de jogadores e suas pontuações
- Opção de reiniciar o jogo com um novo jogador ou continuar com o mesmo jogador

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript

## Como Jogar

1. Clone o repositório:
    ```bash
    git clone https://github.com/FelixFreitasjr/memory-game.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd memory-game
    ```

3. Abra o arquivo `index.html` no navegador para começar a jogar.

## Estrutura do Projeto

```plaintext
memory-game/
├── css/
│   ├── end.css
│   ├── game.css
│   ├── login.css
│   └── reset.css
├── img/
│   └── (imagens)
├── js/
│   ├── end.js
│   ├── game.js
│   └── login.js
├── pages/
│   ├── end.html
│   └── game.html
├── index.html
└── README.md
```

## Detalhes dos Arquivos

### HTML
- index.html: Página inicial para entrada do nome do jogador.
- pages/game.html: Página do jogo da memória.
- pages/end.html: Tela de finalização com a lista de jogadores e pontuações.

### CSS

- css/reset.css: Estilos de reset para garantir uma aparência consistente.
- css/login.css: Estilos para a página de login.
- css/game.css: Estilos para a página do jogo.
- css/end.css: Estilos para a tela de finalização.

### JavaScript

- js/login.js: Script para a funcionalidade da página de login.
- js/game.js: Script para a funcionalidade do jogo da memória.
- js/end.js: Script para a funcionalidade da tela de finalização.

## Funcionamento do Jogo

1. Tela Inicial: O jogador insere seu nome e clica em "Play" para iniciar o jogo.
2. Jogo da Memória: O jogador deve encontrar os pares de cartas. O tempo e o número de tentativas são registrados.
3. Tela de Finalização: Ao completar o jogo, a pontuação é calculada e exibida junto com o tempo. O jogador pode escolher reiniciar o jogo com um novo nome ou jogar novamente com o mesmo nome.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/FelixFreitasJr/memory-game/blob/main/LICENSE) para mais detalhes.

## Autor - 
**Felix Freitas Jr** - [FelixFreitasJr](https://github.com/FelixFreitasJr) 

## Página Ativa
Veja o jogo em ação [aqui](https://felixfreitasjr.github.io/memory-game/) 