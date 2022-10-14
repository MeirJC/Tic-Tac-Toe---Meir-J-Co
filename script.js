// TO-DO is marked with !#! - UPDATES will be marked with @!@
// !#! game will end in a tie when counter = size*size @!@ DONE added to the inputXO function to be checked after each input
// !#! when setboard called again game board reset but doesnt update display @!@ DONE with the resetBoard funtion
// !#! Reset button @!@ DONE Added and tested
// !#! display winner
// !#! display tie @!@ DONE
// !#! give multiple board size option selector/ buttons @!@ DONE

//------------------------------------------------------------------------
//==================INITAL ENVIORMENT SETUP===============================
//------------------------------------------------------------------------
// grid - grid container that holds the game board
// size - game board dimensions (for both dimension X/Y axis)
// counter - turn counter. changes player by binary seletion of counter%2
//------------------------------------------------------------------------
const grid = document.querySelector(".gridContainer");
let size = 3; //initial Board size
let counter = 0; // keep turn count
let gameBoard = setBoard(size); // set the JS game board 2D array
let playerA = "X"; // player 1 & 2 charaters. would switch in case of wining so winner start next game
let playerB = "O";
let XwinCount = 0; // count win for X
let OwinCount = 0; // count win for O
let tieCount = 0; // count ties
let stopInput = false; // switch to stop input after a win
let easyMode = false; // switch to toggle easy/pro mode (3 to win vs whole board across)
// ------------ SCORE KEEP
const xTotal = document.querySelector("#xCount");
const oTotal = document.querySelector("#oCount");
const tieTotal = document.querySelector("#tieCount");
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
  element.addEventListener("click", (e) => {
    console.log(`hi i am ${i}`);
    if (element.innerText === "") {
      inputXO(i);
    }
  });
}
// Reset the board to the initial state - gameBoard for the JS array the the
// (elementList --> forEach) for the html content
function resetBoard() {
  gameBoard = setBoard(size);
  let elementList = document.querySelectorAll(".grid-item");
  elementList.forEach((element) => (element.innerText = ""));
  counter = 0;
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
    element.addEventListener("click", (e) => {
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
// 3 BUTTON - Change grid to 3X3 and created a new grid
const threeButton = document.querySelector("#three");

threeButton.addEventListener("click", () => {
  deleteAllGridChildren();
  size = 3;
  counter = 0;
  newBoard(size);
  stopInput = false;
  gameBoard = setBoard(size);
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
});
// EASY MODE - (Need only 3 adjecent to win)
const easyButton = document.querySelector("#easy");
easyButton.addEventListener("click", () => {
  easyMode = true;
  console.log("easy mode on");
});
// PRO MODE - (Need full row to win)
const proButton = document.querySelector("#pro");
proButton.addEventListener("click", () => {
  easyMode = false;
  console.log("pro mode on");
});
//------------------------------------------------------------------------

//------------------------------------------------------------------------
//=============================TESTS======================================
//------------------------------------------------------------------------
//All the funcions to check win status by scenarios (row/column/both diagonal)
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
  let test = board.every((num, j, arr) => {
    return arr[0][0] === arr[j][j] && arr[0][0] !== "";
  });
  if (test) {
    return true;
  }
  return false;
}
//Diagonal R to L
function diagonalRL(board) {
  let test = board.every((num, j, arr) => {
    return (
      arr[0][arr.length - 1] === arr[j][arr.length - 1 - j] &&
      arr[0][arr.length - 1] !== ""
    );
  });
  if (test) {
    return true;
  }
  return false;
}

//------------------------------------------------------------------------
//=============================TESTS ONLY 3 ++++==========================
//------------------------------------------------------------------------
//All the funcions to check win status by scenarios (row/column/both diagonal)
//------------------------------------------------------------------------

// ROWS (ONLY ADJECENT 3)
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

// COLS (ONLY ADJECENT 3)
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

//Diagonal L to R (ONLY ADJECENT 3)
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

//Diagonal R to L (ONLY ADJECENT 3)
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
// inputXO - inputing the current value ("X"/"O") to the html and the javascript array
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

function inputXO(i) {
  if (stopInput === false) {
    let cell = document.getElementById(`${i}`);
    let player = turnSwitch(counter);
    cell.innerText = player;
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
        } else {
          playerA = "O";
          playerB = "X";
          OwinCount++;
          oTotal.innerText = OwinCount;
        }
      } else if (counter === size ** 2) {
        console.log("TIE!!!");
        tieCount++;
        tieTotal.innerText = tieCount;
      }
    }
  }
}
//------------------------------------------------------------------------
//==============================GAMEPLAY==================================
//------------------------------------------------------------------------
// winStatus - sending the gamrboard to all the tests

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
