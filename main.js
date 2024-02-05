function createBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    let idIndex = 1;

    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let column = 0; column < columns; column++) {
            const currentCell = createCell();
            currentCell.setID(idIndex);
            board[row].push(currentCell);
            idIndex++;
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardToPrint = [];

        for (let row of board) {
            const rowToPrint = [];
            for (let cell of row) {
                rowToPrint.push(cell.getValue());
            }
            boardToPrint.push(rowToPrint);
        }

        console.log(boardToPrint);
    }

    const dropToken = (cell, token) => {
        board.forEach(
            row => row.forEach(
                column => {
                    if (column.getID() === cell && column.getValue() === 0) {
                        column.setValue(token);
                    }
                }))
    }

    const checkForWinner = (player) => {
        // Horizontal Check
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 1; column++) {
                if (
                    board[row][column].getValue() === player.token &&
                    board[row][column + 1].getValue() === player.token &&
                    board[row][column + 2].getValue() === player.token) {
                    return true;
                }
            }
        }
        // Vertical Check
        for (let row = 0; row < 1; row++) {
            for (let column = 0; column < 3; column++) {
                if (
                    board[row][column].getValue() === player.token &&
                    board[row + 1][column].getValue() === player.token &&
                    board[row + 2][column].getValue() === player.token) {
                    return true;
                }
            }
        }
        // Diagonal Check: Top-Left to Right-Bottom
        for (let row = 0; row < 1; row++) {
            for (let column = 0; column < 1; column++) {
                if (
                    board[row][column].getValue() === player.token &&
                    board[row + 1][column + 1].getValue() === player.token &&
                    board[row + 2][column + 2].getValue() === player.token) {
                    return true;
                }
            }
        }
        // Diagonal Check: Top-Left to Right-Bottom
        for (let row = 2; row < 3; row++) {
            for (let column = 0; column < 1; column++) {
                if (
                    board[row][column].getValue() === player.token &&
                    board[row - 1][column + 1].getValue() === player.token &&
                    board[row - 2][column + 2].getValue() === player.token) {
                    return true;
                }
            }
        }

        return false;
    }

    return { getBoard, printBoard, dropToken, checkForWinner };
}

function createCell() {
    let value = 0;
    let id;

    const getValue = () => value

    const setValue = (token) => value = token;

    const setID = (cellID) => id = cellID;

    const getID = () => id;

    return { getValue, setValue, setID, getID };
}

function gameController(
    playerOne = 'Player One',
    playerTwo = 'Player Two'
) {
    const board = createBoard();

    const players = [
        {
            name: playerOne,
            token: 1
        },
        {
            name: playerTwo,
            token: 2
        },
    ]

    let activePlayer = players[0]

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const playRound = (cell) => {
        console.log(`${activePlayer.name} is dropping a token...`);

        board.dropToken(cell, activePlayer.token);

        const isWinner = board.checkForWinner(activePlayer);

        if (isWinner) {
            board.printBoard();
            console.log(`${activePlayer.name} Wins!`);
        } else {
            switchActivePlayer();
            setRound();
        }
    }

    const setRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`);
    }

    setRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard };
}

const game = gameController();
game.playRound(1);
game.playRound(2);
game.playRound(5);
game.playRound(3);
game.playRound(9);
game.playRound(4);
