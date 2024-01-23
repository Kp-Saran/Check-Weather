let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "S";
let gameOver = false;

document.addEventListener("DOMContentLoaded", setupGame);

function setupGame() {
    createBoard();
}

function createBoard() {
    const boardElement = document.getElementById("board");

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", () => cellClick(i));
        boardElement.appendChild(cell);
    }
}

function cellClick(index) {
    if (!gameOver && board[index] === "") {
        board[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
    }
}

function renderBoard() {
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < 9; i++) {
        cells[i].textContent = board[i];
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === "S" ? "O" : "S";
}

function checkWinner() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            document.getElementById("result").textContent = `${currentPlayer === "S" ? "O" : "S"} wins!`;
            return;
        }
    }

    if (!board.includes("") && !gameOver) {
        gameOver = true;
        document.getElementById("result").textContent = "It's a tie!";
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "S";
    gameOver = false;
    document.getElementById("result").textContent = "";
    renderBoard();
}
