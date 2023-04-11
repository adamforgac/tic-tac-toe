// display module
// display module
// display module
let playerOnePasive = false;

const displayUpdate = (() => {
    const manipuleForm = () => {
        const nameForm = document.querySelector(".name-form");
        nameForm.classList.add("appear");

        const submitButton = document.querySelector(".submit-button");
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            const playerOneInput = document.querySelector(".player1-name input");
            const playerTwoInput = document.querySelector(".player2-name input");
            if((playerOneInput.checkValidity() === false || playerOneInput.reportValidity() === false) || (playerTwoInput.checkValidity() === false || playerTwoInput.reportValidity() === false)) {
                false
            } else {
                nameForm.classList.remove("appear");
                const nameOneValue = playerOneInput.value;
                const nameTwoValue = playerTwoInput.value;
                document.querySelector(".profile1 p").textContent = nameOneValue;
                document.querySelector(".profile2 p").textContent = nameTwoValue;
                document.querySelector(".win-num1").textContent = 0;
                document.querySelector(".win-num2").textContent = 0;
                const huPlayer = Players("X", "active");
                const aiPlayer = Players("O", "pasive");
                huPlayer.playGame(huPlayer, aiPlayer);
                restartStats();
            }
        })
    };

    const playerOneWins = () => {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".win-name").textContent = document.querySelector(".profile2 p").textContent;
        document.querySelector(".mark").textContent = "O";
        document.querySelector(".winning-banner").classList.add("active");

        playerOnePasive = false;
        nextRound();
    }

    const playerTwoWins = () => {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".win-name").textContent = document.querySelector(".profile1 p").textContent;
        document.querySelector(".mark").textContent = "X";
        document.querySelector(".winning-banner").classList.add("active");

        // ADDS POINT TO PLAYER NUMBER 2

        const numStat4 = Number(document.querySelector(".win-num2").textContent);
        const numStatTotal4 = numStat4 + 1;
        document.querySelector(".win-num2").textContent = numStatTotal4;
            
        // ADDS ROUND NUMBER

        const numStat6 = Number(document.querySelector(".score-number").textContent);
        const numStatTotal6 = numStat6 + 1;
        document.querySelector(".score-number").textContent = numStatTotal6;
            
        // ADDS POINT TO SCORE

        const numStat5 = Number(document.querySelector(".number2").textContent);
        const numStatTotal5 = numStat5 + 1;
        document.querySelector(".number2").textContent = numStatTotal5;

        playerOnePasive = false;
        nextRound();
    }

    const tie = () => {
        const numStat6 = Number(document.querySelector(".score-number").textContent);
        const numStatTotal6 = numStat6 + 1;
        document.querySelector(".score-number").textContent = numStatTotal6;

        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".tie-banner").classList.add("active");

        playerOnePasive = false;
        nextRound();
    }

    const nextRound = () => {
        document.querySelector(".next-round button").addEventListener("click", (event) => {
            document.querySelector("body").style.overflow = "visible";
            document.querySelector(".winning-banner").classList.remove("active");
            document.querySelector(".playground").classList.remove("pause");
    
            // CLEARS THE GAMEBOARD

            gameBoard.cleanPlan();
            event.stopImmediatePropagation();
        })

        document.querySelector(".next-round-tie button").addEventListener("click", (event) => {
            document.querySelector("body").style.overflow = "visible";
            document.querySelector(".tie-banner").classList.remove("active");
    
            // CLEARS THE GAMEBOARD

            gameBoard.cleanPlan();
            event.stopImmediatePropagation();
        })

        // ABLE TO CLICK AGAIN
    }

    const restartStats = () => {
        document.querySelector(".number1").textContent = 0;
        document.querySelector(".number2").textContent = 0;
        document.querySelector(".score-number").textContent = 1;
    }

    return {manipuleForm, playerOneWins, playerTwoWins, tie};
})()

displayUpdate.manipuleForm();



// gameBoard module
// gameBoard module
// gameBoard module



const gameBoard = (() => {
    let gamePlan = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const getCell = (num, mark) => {
        if(gamePlan[num] === "X" || gamePlan[num] === "O") {
            false;
        } else {
            gamePlan[num] = mark;

            for(let i = 0; i <= gamePlan.length-1; i++) {
                const playGround = document.querySelector(".playground");
                playGround.querySelector(`[data-attribute="${i}"]`).textContent = gamePlan[i];
            }
        }
    }

    const cleanPlan = () => {
        for(let i = 0; i <= gamePlan.length-1; i++) {
                const allCells = document.querySelectorAll(".cell");

                allCells.forEach(cell => {
                    cell.textContent = "";
                })

                gamePlan[i] = i;
            }
        }
    
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    return {getCell, gamePlan, cleanPlan, winCombos};
})()


// player module




const Players = (mark, activity) => {
    const getMark = () => mark;
    const getActivity = () => activity;
    const playGame = (player1, bot) => {
        let allCells = document.querySelectorAll(".cell");
        let origBoard = gameBoard.gamePlan;
        let huPlayer = player1.getMark();
        let winCombos = gameBoard.winCombos;
        let aiPlayer = bot.getMark();
        const playGround = document.querySelector(".playground");

        allCells.forEach(cell => {
            cell.addEventListener("click", (event) => {
                    const cellNumber = Number(cell.getAttribute("data-attribute"));
                    turnClick(cellNumber);
                })
    
            })            
        
        function turnClick(spot) {
            if (typeof origBoard[spot] == 'number') {
                turn(spot, huPlayer)
                if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
            }
        }


        function turn(spot, player) {
            origBoard[spot] = player;
            playGround.querySelector(`[data-attribute="${spot}"]`).textContent = player;
            let gameWon = checkWin(origBoard, player);
            if(gameWon) {
                gameOver(gameWon);
                const numStat = Number(document.querySelector(".win-num1").textContent);
                const numStatTotal = numStat + 1;
                document.querySelector(".win-num1").textContent = numStatTotal;

                const numStat2 = Number(document.querySelector(".score-number").textContent);
                const numStatTotal2 = numStat2 + 1;
                document.querySelector(".score-number").textContent = numStatTotal2;

                const numStat3 = Number(document.querySelector(".number1").textContent);
                const numStatTotal3 = numStat3 + 1;
                document.querySelector(".number1").textContent = numStatTotal3;
            }
        }

        function checkWin(board, player) {
            let plays = board.reduce((a, e, i) => 
                (e === player) ? a.concat(i) : a, []);
            let gameWon = null;
            for (let [index, win] of winCombos.entries()) {
                if (win.every(elem => plays.indexOf(elem) > -1)) {
                    gameWon = {index: index, player: player};
                    break;
                }
            }
            return gameWon;
        }

        function gameOver(gameWon) {
            for (let index of winCombos[gameWon.index]) {
                if(gameWon.player == huPlayer) {
                    document.querySelector(".playground").classList.add("pause");
                    setTimeout(function() { displayUpdate.playerTwoWins(); }, 100);
                } else if(gameWon.player == aiPlayer) {
                    document.querySelector(".playground").classList.add("pause");
                    setTimeout(function() { displayUpdate.playerOneWins(); }, 100);
                }
            }
        }

        function emptySquares() {
            return origBoard.filter(s => typeof s == 'number');
        }

        function bestSpot() {
            return minimax(origBoard, aiPlayer).index;
        }

        function checkTie() {
            if (emptySquares().length == 0) {
                displayUpdate.tie();
                return true;
        

            }
            return false;
        }

        function minimax(newBoard, player) {
            let availSpots = emptySquares(newBoard);

            if(checkWin(newBoard, huPlayer)) {
                return {score: -10};
            } else if(checkWin(newBoard, aiPlayer)) {
                return {score: 10};
            } else if(availSpots.length === 0) {
                return {score: 0};
            }

            let moves = [];
            for(let i = 0; i < availSpots.length; i++) {
                let move = {};
                move.index = newBoard[availSpots[i]];
                newBoard[availSpots[i]] = player;

                if(player == aiPlayer) {
                    let result = minimax(newBoard, huPlayer);
                    move.score = result.score;
                } else {
                    let result = minimax(newBoard, aiPlayer);
                    move.score = result.score;
                }

                newBoard[availSpots[i]] = move.index;

                moves.push(move);
            }

            let bestMove;
            if(player === aiPlayer) {
                let bestScore = -10000;
                for(let i = 0; i < moves.length; i++) {
                    if(moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            } else {
                let bestScore = 10000;
                for(let i = 0; i < moves.length; i++) {
                    if(moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }

            return moves[bestMove];

        } 
            
    }
    return {playGame, getMark, getActivity, playerOnePasive};
}

