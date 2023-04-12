// display module
// display module
// display module
let playerOnePasive;

const displayUpdate = (() => {
  const manipuleForm = () => {
    const nameForm = document.querySelector('.name-form');
    nameForm.classList.add('appear');

    const submitButton = document.querySelector('.submit-button');
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const playerOneInput = document.querySelector('.player1-name input');
      const playerTwoInput = document.querySelector('.player2-name input');
      if (
        playerOneInput.checkValidity() === false ||
        playerOneInput.reportValidity() === false ||
        playerTwoInput.checkValidity() === false ||
        playerTwoInput.reportValidity() === false
      ) {
        false;
      } else {
        nameForm.classList.remove('appear');
        const nameOneValue = playerOneInput.value;
        const nameTwoValue = playerTwoInput.value;
        document.querySelector('.profile1 p').textContent = nameOneValue;
        document.querySelector('.profile2 p').textContent = nameTwoValue;
        document.querySelector('.win-num1').textContent = 0;
        document.querySelector('.win-num2').textContent = 0;
        const playerOne = Player('X', 'active');
        const playerTwo = Player('O', 'pasive');
        displayController.filterPlayer(playerOne, playerTwo);
        restartStats();
      }
    });
  };

  const playerOneWins = () => {
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.win-name').textContent =
      document.querySelector('.profile1 p').textContent;
    document.querySelector('.mark').textContent = 'X';
    document.querySelector('.winning-banner').classList.add('active');

    // ADDS POINT TO PLAYER NUMBER 1

    const numStat = Number(document.querySelector('.win-num1').textContent);
    const numStatTotal = numStat + 1;
    document.querySelector('.win-num1').textContent = numStatTotal;

    // ADDS ROUND NUMBER

    const numStat2 = Number(
      document.querySelector('.score-number').textContent
    );
    const numStatTotal2 = numStat2 + 1;
    document.querySelector('.score-number').textContent = numStatTotal2;

    // ADDS POINT TO SCORE

    const numStat3 = Number(document.querySelector('.number1').textContent);
    const numStatTotal3 = numStat3 + 1;
    document.querySelector('.number1').textContent = numStatTotal3;

    playerOnePasive = true;
    nextRound();
  };

  const playerTwoWins = () => {
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.win-name').textContent =
      document.querySelector('.profile2 p').textContent;
    document.querySelector('.mark').textContent = 'O';
    document.querySelector('.winning-banner').classList.add('active');

    // ADDS POINT TO PLAYER NUMBER 2

    const numStat4 = Number(document.querySelector('.win-num2').textContent);
    const numStatTotal4 = numStat4 + 1;
    document.querySelector('.win-num2').textContent = numStatTotal4;

    // ADDS ROUND NUMBER

    const numStat6 = Number(
      document.querySelector('.score-number').textContent
    );
    const numStatTotal6 = numStat6 + 1;
    document.querySelector('.score-number').textContent = numStatTotal6;

    // ADDS POINT TO SCORE

    const numStat5 = Number(document.querySelector('.number2').textContent);
    const numStatTotal5 = numStat5 + 1;
    document.querySelector('.number2').textContent = numStatTotal5;

    playerOnePasive = false;
    nextRound();
  };

  const tie = () => {
    const numStat6 = Number(
      document.querySelector('.score-number').textContent
    );
    const numStatTotal6 = numStat6 + 1;
    document.querySelector('.score-number').textContent = numStatTotal6;

    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.tie-banner').classList.add('active');

    playerOnePasive = false;
    nextRound();
  };

  const nextRound = () => {
    document
      .querySelector('.next-round button')
      .addEventListener('click', (event) => {
        document.querySelector('body').style.overflow = 'visible';
        document.querySelector('.winning-banner').classList.remove('active');

        // CLEARS THE GAMEBOARD

        gameBoard.cleanPlan();
        event.stopImmediatePropagation();
        document.querySelector('.playground').classList.remove('pause');
      });

    document
      .querySelector('.next-round-tie button')
      .addEventListener('click', (event) => {
        document.querySelector('body').style.overflow = 'visible';
        document.querySelector('.tie-banner').classList.remove('active');

        // CLEARS THE GAMEBOARD

        gameBoard.cleanPlan();
        event.stopImmediatePropagation();
        document.querySelector('.playground').classList.remove('pause');
      });

    // ABLE TO CLICK AGAIN
  };

  const restartStats = () => {
    document.querySelector('.number1').textContent = 0;
    document.querySelector('.number2').textContent = 0;
    document.querySelector('.score-number').textContent = 1;
  };

  return { manipuleForm, playerOneWins, playerTwoWins, tie };
})();

displayUpdate.manipuleForm();

// gameBoard module
// gameBoard module
// gameBoard module

const gameBoard = (() => {
  const gamePlan = ['', '', '', '', '', '', '', '', ''];
  const getCell = (num, mark) => {
    if (gamePlan[num] === 'X' || gamePlan[num] === 'O') {
      false;
    } else {
      gamePlan[num] = mark;

      for (let i = 0; i <= gamePlan.length - 1; i++) {
        const playGround = document.querySelector('.playground');
        playGround.querySelector(`[data-attribute="${i}"]`).textContent =
          gamePlan[i];
      }
    }
  };

  const cleanPlan = () => {
    for (let i = 0; i <= gamePlan.length - 1; i++) {
      const allCells = document.querySelectorAll('.cell');

      allCells.forEach((cell) => {
        cell.textContent = '';
      });

      gamePlan[i] = '';
    }
  };

  const checkForWin = () => {
    if (
      (gamePlan[0] === 'X' && gamePlan[1] === 'X' && gamePlan[2] === 'X') ||
      (gamePlan[3] === 'X' && gamePlan[4] === 'X' && gamePlan[5] === 'X') ||
      (gamePlan[6] === 'X' && gamePlan[7] === 'X' && gamePlan[8] === 'X') ||
      (gamePlan[0] === 'X' && gamePlan[3] === 'X' && gamePlan[6] === 'X') ||
      (gamePlan[1] === 'X' && gamePlan[4] === 'X' && gamePlan[7] === 'X') ||
      (gamePlan[2] === 'X' && gamePlan[5] === 'X' && gamePlan[8] === 'X') ||
      (gamePlan[0] === 'X' && gamePlan[4] === 'X' && gamePlan[8] === 'X') ||
      (gamePlan[2] === 'X' && gamePlan[4] === 'X' && gamePlan[6] === 'X')
    ) {
      document.querySelector('.playground').classList.add('pause');
      setTimeout(() => {
        displayUpdate.playerOneWins();
      }, 100);
    } else if (
      (gamePlan[0] === 'O' && gamePlan[1] === 'O' && gamePlan[2] === 'O') ||
      (gamePlan[3] === 'O' && gamePlan[4] === 'O' && gamePlan[5] === 'O') ||
      (gamePlan[6] === 'O' && gamePlan[7] === 'O' && gamePlan[8] === 'O') ||
      (gamePlan[0] === 'O' && gamePlan[3] === 'O' && gamePlan[6] === 'O') ||
      (gamePlan[1] === 'O' && gamePlan[4] === 'O' && gamePlan[7] === 'O') ||
      (gamePlan[2] === 'O' && gamePlan[5] === 'O' && gamePlan[8] === 'O') ||
      (gamePlan[0] === 'O' && gamePlan[4] === 'O' && gamePlan[8] === 'O') ||
      (gamePlan[2] === 'O' && gamePlan[4] === 'O' && gamePlan[6] === 'O')
    ) {
      document.querySelector('.playground').classList.add('pause');
      setTimeout(() => {
        displayUpdate.playerTwoWins();
      }, 100);
    } else {
      return false;
    }
  };

  const checkForTie = () => {
    if (gameBoard.gamePlan.indexOf('') === -1) {
      document.querySelector('.playground').classList.add('pause');
      setTimeout(() => {
        displayUpdate.tie();
      }, 100);
    }
  };
  return { getCell, gamePlan, checkForWin, cleanPlan, checkForTie };
})();

// player factory

const Player = (mark, activity) => {
  const getMark = () => mark;
  const getActivity = () => activity;
  const playGame = (player1, player2) => {
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => {
      cell.addEventListener('click', (event) => {
        if (playerOnePasive) {
          const cellNumber = Number(cell.getAttribute('data-attribute'));
          if (
            gameBoard.gamePlan[cellNumber] !== 'X' &&
            gameBoard.gamePlan[cellNumber] !== 'O'
          ) {
            gameBoard.getCell(cellNumber, player2.getMark());
            playerOnePasive = false;
            if (gameBoard.checkForWin() == false) {
              gameBoard.checkForTie();
            }
          } else if (
            gameBoard.gamePlan[cellNumber] === 'X' &&
            gameBoard.gamePlan[cellNumber] === 'O'
          ) {
            false;
          }
        } else {
          const cellNumber = Number(cell.getAttribute('data-attribute'));
          if (
            gameBoard.gamePlan[cellNumber] !== 'X' &&
            gameBoard.gamePlan[cellNumber] !== 'O'
          ) {
            gameBoard.getCell(cellNumber, player1.getMark());
            playerOnePasive = true;
            if (gameBoard.checkForWin() == false) {
              gameBoard.checkForTie();
            }
          }
        }
      });
    });
  };

  return { playGame, getMark, getActivity, playerOnePasive };
};

const displayController = (() => {
  const filterPlayer = (player1, player2) => {
    player1.playGame(player1, player2);
  };

  return { filterPlayer };
})();
