// let arrtest = [1,1,1]
//
// let test = arrtest.every((num,i,arr)=>{
//   return arr[0] ===arr[i];
// })
//
// console.log(test)
//
//
//   console.log(test2)
// }
//Columns
// for (let i = 0; i < arrTest2.length; i++) {
//   let test2 = arrTest2.every((num,j,arr)=>{
//     return arr[0][i] ===arr[j][i];
//   })
//   console.log(test2)
// }
//------------------------------------------------------------------------
//=============================TESTS======================================
//------------------------------------------------------------------------
//Rows
function checkRows(board) {
  for (let i = 0; i < board.length; i++) {
    let test = board.every((num, j, arr) => {
      return arr[i][0] === arr[i][j];
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
      return arr[0][i] === arr[j][i];
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
    return arr[0][0] === arr[j][j];
  });
  if (test) {
    return true;
  }
  return false;
}

//Diagonal R to L
function diagonalRL(board) {
  let test = board.every((num, j, arr) => {
    return arr[0][arr.length - 1] === arr[j][arr.length - 1 - j];
  });
  if (test) {
    return true;
  }
  return false;
}
//------------------------------------------------------------------------
//==============================GAMEPLAY==================================
//------------------------------------------------------------------------
function setBoard(size) {
  let board = [];
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let j = 0; j < size; j++) {
      board[i].push(" ");
    }
  }
  return board;
}
//------------------------------------------------------------------------
//==============================GAMEPLAY==================================
//------------------------------------------------------------------------
function winStatus(board) {
  const tests = [checkRows, checkCols, diagonalLR, diagonalRL];
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
//=============================IN PROGRESS================================
//------------------------------------------------------------------------

let arrTest1 = [
  [1, 1, 1],
  [1, 6, 3],
  [8, 7, 5],
];
let arrTest2 = [
  [0, 1, 8],
  [1, 1, 3],
  [8, 1, 5],
];
let arrTest3 = [
  [1, 2, 8],
  [1, 1, 3],
  [8, 7, 1],
];
let arrTest4 = [
  [3, 2, 1],
  [1, 1, 3],
  [1, 7, 9],
];
let arrTest5 = [
  [3, 2, 1],
  [1, 0, 3],
  [8, 7, 9],
];
let arrTest44 = [
  [1, 2, 1, 1],
  [0, 0, 0, 1],
  [5, 1, 5, 1],
  [1, 1, 1, 1],
];

// console.log(winStatus(arrTest1));
// console.log(winStatus(arrTest2));
// console.log(winStatus(arrTest3));
// console.log(winStatus(arrTest4));
// console.log(winStatus(arrTest5));
// console.log(winStatus(arrTest44));
// console.log(setBoard(3));
