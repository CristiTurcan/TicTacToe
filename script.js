// IIFE / module pattern for gameboard because we need it only once
const gameboard = (function () {
    let gameboard = Array(9).fill('#');
    const choices = ['X', '0'];

    const printBoard = () => {
        for (i = 0; i < 9; i++) {
            console.log(gameboard[i] + gameboard[i + 1] + gameboard[i + 2]);
            i = i + 2;
        }
        console.log("\n");
    }

    const resetBoard = () => {
        gameboard = Array(9).fill('#');
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
        if (!(pos >= 0 && pos <= 9)) {
            console.log("Position not in 0-9 interval");
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

    return { printBoard, resetBoard, filledBoard, putChoice, getChoice, getAllChoices };
})();

function createPlayer(name, choice) {
    const getName = () => name;
    const getChoice = () => choice;

    return { getName, getChoice };
}

//create players
const player1 = createPlayer("cristi", 'X');
const player2 = createPlayer("andrei", '0');

const gameController = (function (player1, player2, gameboard) {
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

    const getWinningPlayer = (choice) => {
        if (player1.getChoice() === choice)
            return player1;
        return player2;
    }

    const checkResult = () => {
        if (compareThreePositions(0, 1, 2)) {
            console.log("Game won by 1" + getWinningPlayer(gameboard.getChoice(0)).getName());
        } else if (compareThreePositions(0, 3, 6)) {
            console.log("Game won by 2" + getWinningPlayer(gameboard.getChoice(0)).getName());
        } else if (compareThreePositions(0, 4, 8)) {
            console.log("Game won by 3" + getWinningPlayer(gameboard.getChoice(0)).getName());
        } else if (compareThreePositions(1, 4, 7)) {
            console.log("Game won by 4" + getWinningPlayer(gameboard.getChoice(1)).getName());
        } else if (compareThreePositions(2, 4, 6)) {
            console.log("Game won by 5" + getWinningPlayer(gameboard.getChoice(2)).getName());
        } else if (compareThreePositions(2, 5, 8)) {
            console.log("Game won by 6" + getWinningPlayer(gameboard.getChoice(2)).getName());
        } else if (compareThreePositions(3, 4, 5)) {
            console.log("Game won by 7" + getWinningPlayer(gameboard.getChoice(3)).getName());
        } else if (compareThreePositions(6, 7, 8)) {
            console.log("Game won by 8" + getWinningPlayer(gameboard.getChoice(6)).getName());
        } else if (gameboard.filledBoard()) {
            console.log("It's a tie");
        }
    }

    return { checkResult };
})(player1, player2, gameboard);

// Test
gameboard.putChoice(0, 'X');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(1, '0');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(2, 'X');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(3, 'X');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(4, '0');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(5, 'X');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(6, '0');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(7, 'X');
gameboard.printBoard();
gameController.checkResult();

gameboard.putChoice(8, '0');
gameboard.printBoard();
gameController.checkResult();