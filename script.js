// IIFE / module pattern for gameboard because we need it only once
const gameboard = (function () {
    let gameboard = Array(9);
    const choices = ['X', '0'];

    const resetBoard = () => {
        gameboard = Array(9).fill('');
    }

    const filledBoard = () => {
        for (i = 0; i < 9; i++) {
            if (!choices.includes(gameboard[i])) {
                return 0;
            }
        }
        return 1;
    }

    const putChoice = (pos, choice) => {
        if (pos === undefined || !(pos >= 0 && pos <= 9)) {
            console.log("Position is not defined.\n");
            return;
        }
        if (!(pos >= 0 && pos <= 8)) {
            console.log("Position not in 0-8 interval");
            return;
        }
        if (!choices.includes(choice)) {
            console.log("Choice not defined. X or 0\n");
            return;
        }
        gameboard[pos] = choice;
    };

    const getChoice = (pos) => gameboard[pos];
    const getAllChoices = () => choices;

    return { resetBoard, filledBoard, putChoice, getChoice, getAllChoices };
})();

function createPlayer() {
    let name;
    let choice;
    let score = 0;

    const incrementScore = () => { score++ };
    const resetScore = () => { score = 0; }
    const getScore = () => score;

    const setName = (givenName) => {
        if (name === undefined)
            name = givenName
    };
    const getName = () => name;

    const setChoice = (givenChoice) => {
        if (choice === undefined)
            choice = givenChoice
    };
    const getChoice = () => choice;

    return {
        setName, getName, setChoice, getChoice,
        incrementScore, getScore, resetScore
    };
}

const gameController = (function (gameboard) {
    let gamemode;
    let gameover;

    const player1 = createPlayer();
    const player2 = createPlayer();

    const getSecondChoice = (firstChoice) => {
        if (firstChoice === 'X') {
            return '0';
        } else if (firstChoice === '0') {
            return 'X';
        } else {
            alert("No choice in function getSecondChoice");
        }
    }

    const createPlayers = (name1, name2, firstChoice) => {
        if (gamemode === 0) {
            name1 = 'User';
            name2 = 'Computer';
        }

        player1.setName(name1);
        player1.setChoice(firstChoice);
        player2.setName(name2);
        player2.setChoice(getSecondChoice(firstChoice));

        console.log(`${player1.getName()} ${player1.getChoice()}`);
        console.log(`${player2.getName()} ${player2.getChoice()}`);
    }

    const compareThreePositions = (a, b, c) => {
        // check compared choices are only X or 0
        if ((!gameboard.getAllChoices().includes(gameboard.getChoice(a))) ||
            (!gameboard.getAllChoices().includes(gameboard.getChoice(b))) ||
            (!gameboard.getAllChoices().includes(gameboard.getChoice(c)))) {
            return 0;
        }
        if (gameboard.getChoice(a) === gameboard.getChoice(b) && (gameboard.getChoice(b) === gameboard.getChoice(c))) {
            return 1;
        }
        return 0;
    }

    const getWinningPlayerByPosition = (position) => {
        let choice = gameboard.getChoice(position);
        if (player1.getChoice() === choice) {
            return player1.getName();
        } else if (player2.getChoice() === choice) {
            return player2.getName();
        } else {
            alert("Error in function getWinningPlayerByPosition");
        }
    }

    const checkResult = () => {
        if (compareThreePositions(0, 1, 2)) {
            console.log(`Game won by 1 ${getWinningPlayerByPosition(2)}`);
            return 2;
        } else if (compareThreePositions(0, 3, 6)) {
            console.log(`Game won by 2 ${getWinningPlayerByPosition(6)}`);
            return 6;
        } else if (compareThreePositions(0, 4, 8)) {
            console.log(`Game won by 3 ${getWinningPlayerByPosition(8)}`);
            return 8;
        } else if (compareThreePositions(1, 4, 7)) {
            console.log(`Game won by 4 ${getWinningPlayerByPosition(7)}`);
            return 7;
        } else if (compareThreePositions(2, 4, 6)) {
            console.log(`Game won by 5 ${getWinningPlayerByPosition(6)}`);
            return 6;
        } else if (compareThreePositions(2, 5, 8)) {
            console.log(`Game won by 6 ${getWinningPlayerByPosition(8)}`);
            return 8;
        } else if (compareThreePositions(3, 4, 5)) {
            console.log(`Game won by 7 ${getWinningPlayerByPosition(5)}`);
            return 5;
        } else if (compareThreePositions(6, 7, 8)) {
            console.log(`Game won by 8 ${getWinningPlayerByPosition(8)}`);
            return 8;
        } else if (gameboard.filledBoard()) {
            console.log("It's a tie");
            return 1;
        } else {
            return 0;
        }
    }


    const getPlayerChoice = (playerNo) => {
        if (playerNo === 1)
            return player1.getChoice();
        else if (playerNo === 2)
            return player2.getChoice();
        else
            alert("Error in getPlayerChoice");
    };

    const setPlayerScore = (name) => {
        if (player1.getName() === name)
            return player1.incrementScore();
        else if (player2.getName() === name)
            return player2.incrementScore();
        else
            alert("Error in setPlayerScore - playerNo not good");
    }

    const resetPlayersScore = () => {
        player1.resetScore();
        player2.resetScore();
    }

    const getPlayerScore = (playerNo) => {
        if (playerNo === 1)
            return player1.getScore();
        else if (playerNo === 2)
            return player2.getScore();
        else
            alert("Error in getPlayerScore - playerNo not good");
    }

    const setGamemode = (gm) => { gamemode = gm; }
    const getGamemode = () => gamemode;

    const setGameover = () => { gameover = 1; }
    const resetGameover = () => { gameover = 0; }
    const getGameover = () => gameover;

    return {
        createPlayers, checkResult, getPlayerChoice, getWinningPlayerByPosition, setPlayerScore,
        resetPlayersScore, getPlayerScore, setGamemode, getGamemode, setGameover, resetGameover, getGameover
    };
})(gameboard);


// this function is responsible of DOM logic
function manageGameboard(gameboard, gameController) {
    const squares = document.querySelectorAll('.square');
    const gamemodeBtn = document.querySelector('.gamemode');
    const onePlayer = document.querySelector('.one-player');
    const twoPlayer = document.querySelector('.two-player');
    const winnerContainer = document.querySelector('.winnerContainer');
    const winnerText = document.querySelector('.winnerText');
    const playerFormContainer = document.querySelector('.playerFormContainer');
    const playerForm = document.querySelector('#playerForm');
    const player1Name = document.querySelector('#player1');
    const player2Name = document.querySelector('#player2');
    const inputContainer = document.querySelectorAll('.inputContainer');
    const addRequired = document.querySelectorAll('.addRequired');
    const score = document.querySelector('.score');
    const scoreText = document.querySelector('.scoreText');
    const actionBtn = document.querySelector('.actionBtn');
    const nextRoundBtn = document.querySelector('.nextRoundBtn');
    const homeBtn = document.querySelector('.homeBtn');

    let positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const updateScore = () => {
        scoreText.textContent = `${gameController.getPlayerScore(1)} - ${gameController.getPlayerScore(2)}`;
    }

    const resetScore = () => {
        gameController.resetPlayersScore();
        updateScore();
    }

    const insertChoiceInSquare = (pos, choice) => {
        pos = parseInt(pos);
        const index = positions.indexOf(pos);
        positions.splice(index, 1);

        gameboard.putChoice(pos, choice);
        console.log(`positions = ${positions}`);
        squares[pos].textContent = gameboard.getChoice(pos);
    };

    const resetGame = () => {
        gameboard.resetBoard();
        positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        for (i = 0; i < 9; i++) {
            squares[i].textContent = gameboard.getChoice(i);
        }
    }

    const nextRound = () => {
        if (gameController.getGameover()) {
            nextRoundBtn.addEventListener('click', () => {
                gameController.resetGameover();
                resetGame();
            });
        }
    }

    //easy method, might change it later :)
    const goHome = () => {
        homeBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    const setUserChoice = (choice) => {
        gameController.createPlayers(player1Name.value, player2Name.value, choice);
    };

    const getPlayerNames = () => {
        playerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            setUserChoice(e.submitter.value);
            playerFormContainer.style.display = 'none';
            score.style.display = 'block';
            actionBtn.style.display = 'block';
            updateScore();
        });
    };

    const getGamemodeSelection = () => {
        onePlayer.addEventListener('click', () => {
            gamemodeBtn.style.display = 'none';
            playerForm.style.display = 'flex';
            //no names needed for one player
            inputContainer.forEach((node) => {
                node.style.display = 'none';
            })
            gameController.setGamemode(0);

        });
        twoPlayer.addEventListener('click', () => {
            gamemodeBtn.style.display = 'none';
            playerForm.style.display = 'flex';
            gameController.setGamemode(1);
            addRequired.forEach((node) => {
                node.required = true;
            })
        });
    }

    const getRandomAvailablePosition = () => {
        pos = Math.floor(Math.random() * positions.length);
        return positions[pos];
    }

    const getWinningText = (winningPosition) => {
        if (winningPosition === 1) {
            winnerText.textContent = 'It\'s a tie';
            winnerContainer.style.display = 'block'
            return;
        }
        const winnerName = gameController.getWinningPlayerByPosition(winningPosition);
        if (gameController.getGamemode() === 0) {
            if (winnerName === 'User') {
                winnerText.textContent = `You won`;
                gameController.setPlayerScore('User');
            } else if (winnerName === 'Computer') {
                winnerText.textContent = `You lost`;
                gameController.setPlayerScore('Computer');
            }
            else
                alert("Error");
        }
        else if (gameController.getGamemode() === 1) {
            const winner = gameController.getWinningPlayerByPosition(winningPosition);
            winnerText.textContent = `Game won by ${winner}`;
            gameController.setPlayerScore(winner);
        }
        winnerContainer.style.display = 'block'
        updateScore();
    }

    const getWinner = () => {
        if ((winningPosition = gameController.checkResult()) !== 0) {
            gameController.setGameover();
            nextRound();
            getWinningText(winningPosition);
            return 1;
        }
        return 0;
    }

    const playRound = () => {
        let sw = 0;

        getGamemodeSelection();
        getPlayerNames();
        goHome();

        squares.forEach((square) => {
            square.addEventListener('click', (e) => {
                if (gameController.getGameover()) {
                    return;
                };

                pos = e.target.dataset.number;
                // if square is filled you can't override it
                if (gameboard.getAllChoices().includes(gameboard.getChoice(pos))) {
                    console.log("ai dat override");
                    return;
                }

                if (gameController.getGamemode() === 1) {
                    if (sw === 0) {
                        insertChoiceInSquare(pos, gameController.getPlayerChoice(1));
                        sw = 1;
                    } else {
                        insertChoiceInSquare(pos, gameController.getPlayerChoice(2));
                        sw = 0;
                    }
                    getWinner();
                } else if (gameController.getGamemode() === 0) {
                    insertChoiceInSquare(pos, gameController.getPlayerChoice(1));
                    if (getWinner()) return;
                    insertChoiceInSquare(getRandomAvailablePosition(), gameController.getPlayerChoice(2));
                    if (getWinner()) return;

                } else {
                    alert("No gamemode");
                }
            });
        });
    }
    return { playRound };
}

mg = new manageGameboard(gameboard, gameController);
mg.playRound();

/* 
DE FACUT:

-pus reset button si home button (sau next round si reset game - mai bine spus)
-fiecare runda incepe cu X

INAINTE DE FINAL COMMIT: 
-redenumit functii care au nevoie pentru a fi mai explicit

ERROR:

-in one player: - sa se verifice prima data pozitiile de X dupa pozitiile de 0
                  sau sa se verifice la fiecare iteratie, nu la fiecare 2
                - cred ca este rezolvat ^
                
                -cand mai e doar un patrat liber si pun X da eroare ?? dintr-o data nu mai da??
                -trebuie verificat !!! ^
*/