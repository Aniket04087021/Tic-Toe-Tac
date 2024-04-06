const cells = document.querySelectorAll('[data-cell]');
const resetScoreButton = document.getElementById('reset-score-btn'); // Added reset score button
const winnerPopup = document.getElementById('winner-popup');
const winnerText = document.getElementById('winner-text');
const closePopupBtn = document.getElementById('close-popup-btn');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');

let currentPlayer = 'X';
let playerXScore = 0;
let playerOScore = 0;
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to restart the game
function restartGame() {
    winnerPopup.style.display = 'block'; // Show winner popup
    setTimeout(() => { // Delay restart after showing winner popup
        cells.forEach(cell => {
            cell.innerText = '';
        });
        winnerPopup.style.display = 'none'; // Hide winner popup
        currentPlayer = 'X';
        gameActive = true;
    }, 2000); // Delay restart by 2 seconds
}

// Check for winner
function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return cells[a].innerText;
        }
    }
    return null;
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;

    if (cell.innerText || !gameActive) return;

    cell.innerText = currentPlayer;
    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        winnerText.innerText = `${winner} wins!`;
        winnerPopup.style.display = 'block';
        if (winner === 'X') {
            playerXScore++;
        } else {
            playerOScore++;
        }
        updateScoreDisplay();
        restartGame(); // Restart the game after showing winner popup
    } else if ([...cells].every(cell => cell.innerText)) {
        gameActive = false;
        winnerText.innerText = "It's a draw!";
        winnerPopup.style.display = 'block';
        restartGame(); // Restart the game after showing winner popup
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Handle reset score button click
function handleResetScore() {
    playerXScore = 0;
    playerOScore = 0;
    updateScoreDisplay();
}

// Close winner popup
closePopupBtn.addEventListener('click', () => {
    winnerPopup.style.display = 'none';
});

// Update score display
function updateScoreDisplay() {
    playerXScoreDisplay.textContent = `Player X: ${playerXScore}`;
    playerOScoreDisplay.textContent = `Player O: ${playerOScore}`;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetScoreButton.addEventListener('click', handleResetScore); // Added event listener for reset score button
updateScoreDisplay();
