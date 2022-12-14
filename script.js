// _.~"(_.~"(_.~"(_.~"(_.~"( ( - Ultimate Tic-Tac-Toe - ) ) _.~"(_.~"(_.~"(_.~"(_.~"(
// Project by Meir Josef Cohen
// Full project files can be found at : https://github.com/MeirJC/Tic-Tac-Toe---Meir-J-Co
//-------------------- Project Description ------------------
// This is not your grandmothers tic-tac-toe! ¯\_(ツ)_/¯
// this game has 2 modes - Easy Mode and Pro Mode
// - Easy Mode is defined by getting 3 adjacent strikes in any direction (row, col or horizontal - both ways)
// while Hard Mode (which is the default one) is required to get the full line across.
// this gets harder and harder to accomplish while the board gets bigger
//
// Beside Game modes, Score (and tie) counters and changeable board size there's another feature that I hardly saw
// in any of those common tic-tac-toe builds. The player who wins is the player to start in
// the next round...
//
// have fun playing
//
// \m/ (>.<) \m/
//
// Meir J C

//------------------------------------------------------------------------
//==================INITIAL ENVIRONMENT SETUP===============================
//------------------------------------------------------------------------
// grid - grid container that holds the game board
// size - game board dimensions (for both dimension X/Y axis)
// counter - turn counter. changes player by binary selection of counter%2
//------------------------------------------------------------------------
// Board Settings
const messageBox = document.querySelector("#messageBox");
const grid = document.querySelector(".gridContainer");
let size = 3; //initial Board size
let counter = 0; // keep turn count
let gameBoard = setBoard(size); // set the JS game board 2D array
// Player and Player Scores
let playerA = "X"; // player 1 & 2 charters. would switch in case of wining so winner start next game
let playerB = "O";
let XwinCount = 0; // count win for X
let OwinCount = 0; // count win for O
let tieCount = 0; // count ties
const xTotal = document.querySelector("#xCount");
const oTotal = document.querySelector("#oCount");
const tieTotal = document.querySelector(".tieCount");
//tieTotalMobile -on mobile different element is being displayed in different location
const tieTotalMobile = document.querySelector(".tieCountMobile");
// Game Modes
let stopInput = false; // switch to stop input after a win
let easyMode = false; // switch to toggle easy/pro mode (3 to win vs whole board across)
currentStatus(playerA, "start");
//------------------------------------------------------------------------
//==================INITIAL GAME-BOARD INITIALIZATION========================
//------------------------------------------------------------------------

// setting the CSS Grid board dimension by the "size" parameter
grid.setAttribute(
  "style",
  `grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);`
);
//creating every grid item - assigning text content of "", assigning class of "grid-item",
//creating a unique ID, and a unique event listener to EACH of elements
for (let i = 0; i < size ** 2; i++) {
  let element = document.createElement("div");
  element.innerText = "";
  element.setAttribute("id", i);
  element.setAttribute("class", "grid-item");
  grid.append(element);
  element.addEventListener("click", () => {
    // console.log(`hi i am ${i}`);
    if (element.innerText === "") {
      inputXO(i);
    }
  });
}
// set initial css-variable "--grid-size" to 3 - This also changes font size by grid size
document.documentElement.style.setProperty("--grid-size", "3");

// Reset the board to the initial state - gameBoard for the JS array the
// (elementList --> forEach) for the html content
function resetBoard() {
  gameBoard = setBoard(size);

  let elementList = document.querySelectorAll(".grid-item");
  elementList.forEach((element) => (element.innerText = ""));
  counter = 0;
  currentStatus(playerA, "start");
}
// Clear (delete) all grid items - needed when changing size of the board
function deleteAllGridChildren() {
  grid.innerHTML = "";
}
// Generate new grid (after clearing)
function newBoard(size) {
  grid.setAttribute(
    "style",
    `grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr);`
  );
  for (let i = 0; i < size ** 2; i++) {
    let element = document.createElement("div");
    element.innerText = "";
    element.setAttribute("id", i);
    element.setAttribute("class", "grid-item");
    grid.append(element);
    element.addEventListener("click", () => {
      console.log(`hi i am ${i}`);
      if (element.innerText === "") {
        inputXO(i);
      }
    });
  }
}
//------------------------------------------------------------------------
//=======================BUTTONS & ELEMENTS===============================
//------------------------------------------------------------------------
// RESET BUTTON - Reset the game board
const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  resetBoard();
  stopInput = false;
});
// RESET BUTTON MOBILE - Reset the game board
// on mobile different html element is being displayed on different location
const resetButtonMobile = document.querySelector("#reset-mobile");
resetButtonMobile.addEventListener("click", () => {
  resetBoard();
  stopInput = false;
});
// 3 BUTTON - Change grid to 3X3 and created a new grid
const threeButton = document.querySelector("#three");
threeButton.addEventListener("click", () => {
  deleteAllGridChildren();
  size = 3;
  counter = 0;
  newBoard(size);
  stopInput = false;
  gameBoard = setBoard(size);
  document.documentElement.style.setProperty("--grid-size", "3");
});
// 4 BUTTON - Change grid to 4X4 and created a new grid
const fourButton = document.querySelector("#four");
fourButton.addEventListener("click", () => {
  deleteAllGridChildren();
  size = 4;
  counter = 0;
  newBoard(size);
  stopInput = false;
  gameBoard = setBoard(size);
  document.documentElement.style.setProperty("--grid-size", "4");
});
// 5 BUTTON - Change grid to 5X5 and created a new grid
const fiveButton = document.querySelector("#five");
fiveButton.addEventListener("click", () => {
  deleteAllGridChildren();
  size = 5;
  counter = 0;
  newBoard(size);
  stopInput = false;
  gameBoard = setBoard(size);
  document.documentElement.style.setProperty("--grid-size", "5");
});
// 6 BUTTON - Change grid to 6X6 and created a new grid
const sixButton = document.querySelector("#six");
sixButton.addEventListener("click", () => {
  deleteAllGridChildren();
  size = 6;
  counter = 0;
  newBoard(size);
  stopInput = false;
  gameBoard = setBoard(size);
  document.documentElement.style.setProperty("--grid-size", "6");
});
// 7 BUTTON - Change grid to 7X7 and created a new grid
const sevenButton = document.querySelector("#seven");
sevenButton.addEventListener("click", () => {
  deleteAllGridChildren();
  size = 7;
  counter = 0;
  newBoard(size);
  stopInput = false;
  gameBoard = setBoard(size);
  document.documentElement.style.setProperty("--grid-size", "7");
});
//---------------GAME MODES BUTTONS---------------
// EASY MODE - (Need only 3 adjacent to win)
const easyButton = document.querySelector("#easy");
easyButton.addEventListener("click", () => {
  easyMode = true;
  console.log("easy mode on");
  easyButton.style.background = "#a4a4a4";
  proButton.style.background = "#c4c4c4";
});
// PRO MODE - (Need full row to win)
const proButton = document.querySelector("#pro");
proButton.addEventListener("click", () => {
  easyMode = false;
  console.log("pro mode on");
  easyButton.style.background = "#c4c4c4";
  proButton.style.background = "#a4a4a4";
});
//------------------------------------------------------------------------
//=============================TESTS======================================
//------------------------------------------------------------------------
//All the functions to check win status by scenarios (row/column/both diagonal)
//------------------------------------------------------------------------
//Rows
function checkRows(board) {
  for (let i = 0; i < board.length; i++) {
    let test = board.every((num, j, arr) => {
      return arr[i][0] === arr[i][j] && arr[i][0] !== "";
    });
    if (test) {
      return true;
    }
  }
  return false;
}
//Columns
function checkCols(board) {
  for (let i = 0; i < board.length; i++) {
    let test = board.every((num, j, arr) => {
      return arr[0][i] === arr[j][i] && arr[0][i] !== "";
    });
    if (test) {
      return true;
    }
  }
  return false;
}
//Diagonal L to R
function diagonalLR(board) {
  return board.every((num, j, arr) => {
    return arr[0][0] === arr[j][j] && arr[0][0] !== "";
  });
}
//Diagonal R to L
function diagonalRL(board) {
  return board.every((num, j, arr) => {
    return (
      arr[0][arr.length - 1] === arr[j][arr.length - 1 - j] &&
      arr[0][arr.length - 1] !== ""
    );
  });
}
//------------------------------------------------------------------------
//============================ TESTS ONLY 3 ITEMS ========================
//------------------------------------------------------------------------
//All the functions to check win status by scenarios (row/column/both diagonal)
//------------------------------------------------------------------------

// ROWS (ONLY ADJACENT 3)
function checkRows3(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length - 2; j++) {
      if (
        board[i][j] === board[i][j + 1] &&
        board[i][j] === board[i][j + 2] &&
        board[i][j] !== ""
      ) {
        return true;
      }
    }
  }
  return false;
}

// COLS (ONLY ADJACENT 3)
function checkCols3(board) {
  for (let i = 0; i < board.length - 2; i++) {
    for (let j = 0; j < board.length; j++) {
      if (
        board[i][j] === board[i + 1][j] &&
        board[i + 1][j] === board[i + 2][j] &&
        board[i][j] !== ""
      ) {
        return true;
      }
    }
  }
  return false;
}

//Diagonal L to R (ONLY ADJACENT 3)
function diagonalLR3(board) {
  for (let i = 0; i < board.length - 2; i++) {
    for (let j = 0; j < board.length - 2; j++) {
      if (
        board[i][j] === board[i + 1][j + 1] &&
        board[i + 1][j + 1] === board[i + 2][j + 2] &&
        board[i][j] !== ""
      ) {
        console.log(i, j);
        return true;
      }
    }
  }
  return false;
}

//Diagonal R to L (ONLY ADJACENT 3)
function diagonalRL3(board) {
  for (let i = 0; i < board.length - 2; i++) {
    for (let j = 0; j < board.length - 2; j++) {
      if (
        board[i][board.length - 1 - j] === board[i + 1][board.length - 2 - j] &&
        board[i + 1][board.length - 2 - j] ===
          board[i + 2][board.length - 3 - j] &&
        board[i][board.length - 1 - j] !== ""
      ) {
        console.log(i, board.length - 1 - j);
        return true;
      }
    }
  }
  return false;
}

//------------------------------------------------------------------------
//==============================GAMEPLAY==================================
//------------------------------------------------------------------------
// setBoard - creating the game board array
// turnSwitch - switching the player and the output ("X"/"O") by the counter odd/even
// inputXO - inputting the current value ("X"/"O") to the html and the javascript array
//------------------------------------------------------------------------

function setBoard(size) {
  let board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i].push("");
    }
  }

  return board;
}
function turnSwitch(count) {
  counter += 1;
  return count % 2 === 0 ? playerA : playerB;
}

function currentStatus(player, status) {
  if (status === "inProgress") {
    if (player === "X") {
      messageBox.innerHTML = `Its O Turn`;
      messageBox.setAttribute("class", "score glowO");
    } else {
      messageBox.innerHTML = `Its X Turn`;
      messageBox.setAttribute("class", "score glowX");
    }
  }
  if (status === "win") {
    if (player === "X") {
      messageBox.innerHTML = `X Wins!`;
      messageBox.setAttribute("class", "score glowX animate__heartBeat");
    } else {
      messageBox.innerHTML = `O Wins!`;
      messageBox.setAttribute("class", "score glowO animate__heartBeat");
    }
  }
  if (status === "tie") {
    messageBox.innerHTML = `It's A Tie!`;
    messageBox.setAttribute("class", "score glowTie");
  }
  if (status === "start") {
    if (player === "X") {
      messageBox.innerHTML = `Let's go, It's X turn`;
      messageBox.setAttribute("class", "score glowX");
    } else {
      messageBox.innerHTML = `Let's go, It's O turn`;
      messageBox.setAttribute("class", "score glowO ");
    }
  }
}
function inputXO(i) {
  if (stopInput === false) {
    let cell = document.getElementById(`${i}`);
    let player = turnSwitch(counter);
    cell.innerText = player;
    cell.setAttribute("class", `glow${player} grid-item animate__bounceIn`);
    currentStatus(player, "inProgress");
    if (cell.innerText !== "") {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          if (j * size + k === i) {
            gameBoard[j][k] = player;
          }
        }
      }
      if (winStatus(gameBoard)) {
        console.log(`player: ${player}`);
        console.log("WIN!!!");
        stopInput = true;
        if (player === "X") {
          playerA = "X";
          playerB = "O";
          XwinCount++;
          xTotal.innerText = XwinCount;
          currentStatus(player, "win");
        } else {
          playerA = "O";
          playerB = "X";
          OwinCount++;
          oTotal.innerText = OwinCount;
          currentStatus(player, "win");
        }
      } else if (counter === size ** 2) {
        console.log("TIE!!!");
        tieCount++;
        tieTotal.innerText = tieCount;
        tieTotalMobile.innerText = tieCount;
        currentStatus(player, "tie");
      }
    }
  }
}
//------------------------------------------------------------------------
//=======================SENDING TESTS FOR WIN/TIE========================
//------------------------------------------------------------------------
// winStatus - sending the game board to all the tests by Game Mode
//------------------------------------------------------------------------
function winStatus(board) {
  let tests = [checkRows, checkCols, diagonalLR, diagonalRL];
  if (easyMode === true) {
    tests = [checkRows3, checkCols3, diagonalLR3, diagonalRL3];
  }
  let isWin = false;
  for (let i = 0; i < tests.length; i++) {
    if (tests[i](board)) {
      isWin = true;
      break;
    }
  }
  return isWin;
}
//------------------------------------------------------------------------
//========================================================================
//------------------------------------------------------------------------

// If you have done the reading this far, you are awesome :) here's a butterfly for you  Ƹ̵̡Ӝ̵̨̄Ʒ
