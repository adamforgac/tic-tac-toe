// display module
// display module
// display module


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
                const playerOne = Player("X", "active");
                const playerTwo = Player("O", "pasive");
                displayController.filterPlayer(playerOne, playerTwo);
                restartStats();
            }
        })
    };

    const restartStats = () => {
        document.querySelector(".number1").textContent = 0;
        document.querySelector(".number2").textContent = 0;
        document.querySelector(".score-number").textContent = 1;
    }

    return {manipuleForm};
})()

displayUpdate.manipuleForm();



// gameBoard module
// gameBoard module
// gameBoard module



const gameBoard = (() => {
    let gamePlan = ["", "", "", "", "", "", "", "", ""];
    const getCell = (num, mark) => {
        if(gamePlan[num] === "X" || gamePlan[num] === "O") {
            false;
        } else {
            gamePlan[num] = mark;
            console.log(gamePlan);
            for(let i = 0; i <= gamePlan.length-1; i++) {
                const playGround = document.querySelector(".playground");
                playGround.querySelector(`[data-attribute="${i}"]`).textContent = gamePlan[i];
            }
            checkForWin();
        }
    }

    const checkForWin = () => {
        if(
            (gamePlan[0] === "X" && gamePlan[1] === "X" && gamePlan[2] === "X") ||
            (gamePlan[3] === "X" && gamePlan[4] === "X" && gamePlan[5] === "X") ||
            (gamePlan[6] === "X" && gamePlan[7] === "X" && gamePlan[8] === "X") ||
            (gamePlan[0] === "X" && gamePlan[3] === "X" && gamePlan[6] === "X") ||
            (gamePlan[1] === "X" && gamePlan[4] === "X" && gamePlan[7] === "X") ||
            (gamePlan[2] === "X" && gamePlan[5] === "X" && gamePlan[8] === "X") ||
            (gamePlan[0] === "X" && gamePlan[4] === "X" && gamePlan[8] === "X") ||
            (gamePlan[2] === "X" && gamePlan[4] === "X" && gamePlan[6] === "X")
        ) {
            console.log("win X")
        } else if(
            (gamePlan[0] === "O" && gamePlan[1] === "O" && gamePlan[2] === "O") ||
            (gamePlan[3] === "O" && gamePlan[4] === "O" && gamePlan[5] === "O") ||
            (gamePlan[6] === "O" && gamePlan[7] === "O" && gamePlan[8] === "O") ||
            (gamePlan[0] === "O" && gamePlan[3] === "O" && gamePlan[6] === "O") ||
            (gamePlan[1] === "O" && gamePlan[4] === "O" && gamePlan[7] === "O") ||
            (gamePlan[2] === "O" && gamePlan[5] === "O" && gamePlan[8] === "O") ||
            (gamePlan[0] === "O" && gamePlan[4] === "O" && gamePlan[8] === "O") ||
            (gamePlan[2] === "O" && gamePlan[4] === "O" && gamePlan[6] === "O")
        ) {
            console.log("win O")
        }
    }
    return {getCell, gamePlan};
})()


// player factory


const Player = (mark, activity) => {
    const getMark = () => mark;
    const getActivity = () => activity;

    const playGame = (player1, player2) => {
        const allCells = document.querySelectorAll(".cell");
        let playerOnePasive = false;
        allCells.forEach(cell => {
        cell.addEventListener("click", (event) => {
                if(playerOnePasive) {
                    const cellNumber = Number(cell.getAttribute("data-attribute"));
                    gameBoard.getCell(cellNumber, player2.getMark());
                    playerOnePasive = false;
                } else  {
                    const cellNumber = Number(cell.getAttribute("data-attribute"));
                    gameBoard.getCell(cellNumber, player1.getMark());
                    playerOnePasive = true;
                }
            })
        })  
    }

    return {playGame, getMark, getActivity};
}

const displayController = (() => {
    const filterPlayer = (player1, player2) => {
        player1.playGame(player1, player2);
    }

    return{filterPlayer};
})();






// JEŠTĚ ZKUSIT NASTAVIT NĚJAKOU VAR, KTERÁ SE BUDE MĚNIT NA TRUE A FALSE PODLE TOHO KDO HRAJE A PAK PODLE TOHO BUDE NASTAVENÁ TA PODMÍNKA