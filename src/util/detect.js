const horizontalVerticalWin = (board, target) => {

  var win = false;

  var recurse = (x, y, tally) => {
    if (!tally) tally = 0;

    if (board[x][y].owner === target) {
      board[x][y].owner = null;
      tally += 1;
    }

    if (board[x - 1] && board[x - 1][y].owner === target) {
      board[x-1][y].owner = null;
      tally += recurse(x-1, y, tally);
    }

    if (board[x + 1] && board[x + 1][y].owner === target) {
      board[x+1][y].owner = null;
      tally += recurse(x+1, y, tally);
    }

    if (board[x][y - 1].owner === target) {
      board[x][y-1].owner = null;
      tally += recurse(x, y-1, tally);
    }

    if (board[x][y + 1] && board[x][y + 1].owner === target) {
      board[x][y+1].owner = null;
      tally += recurse(x, y+1, tally);
    }

    return tally;
  }

  board.forEach((row, x) => {
    row.forEach((_, y) => {
      if (board[x][y].owner === target) {
        if(recurse(x, y) >= 4) {
          win = true;
        }
      }      
    })
  })

  return win;

}

// major diagonal goes from top-left to bottom-right

const majorDiagonalWin = (board, target) => {
  
  var win = false;

  var recurse = (x, y, tally) => {
    if (!tally) tally = 0;

    if (board[x][y].owner === target) {
      board[x][y].owner = null;
      tally += 1;
    }

    if (board[x+1] && board[x+1][y+1].owner === target) {
      board[x+1][y+1].owner = null;
      tally += recurse(x+1, y+1, tally);
    }

    return tally;
  }

  board.forEach((row, x) => {
    row.forEach((_, y) => {
      if (board[x][y].owner === target) {
        if(recurse(x, y) >= 4) {
          win = true;
        }
      }      
    })
  })

  return win;

}

// minor diagonal goes top-right to bottom-left

const minorDiagonalWin = (board, target) => {
  
  var win = false;

  var recurse = (x, y, tally) => {
    if (!tally) tally = 0;

    if (board[x][y].owner === target) {
      board[x][y].owner = null;
      tally += 1;
    }

    if (board[x+1] && board[x+1][y-1].owner === target) {
      board[x+1][y-1].owner = null;
      tally += recurse(x+1, y-1, tally);
    }

    return tally;
  }

  board.forEach((row, x) => {
    row.forEach((_, y) => {
      if (board[x][y].owner === target) {
        if(recurse(x, y) >= 4) {
          win = true;
        }
      }      
    })
  })

  return win;

}

module.exports = {
  horizontalVerticalWin,
  majorDiagonalWin,
  minorDiagonalWin,
}

// Use to test
var a = [
  [,,,,,,],
  [,1,,,,,],
  [,1,,,,,],
  [,1,,,,,],
  [,1,,,2,,],
  [,,,,,,],
  [1,1,1,2,2,2,2]
]

var b = [
  [2,,,,,,],
  [,2,,,,,],
  [,1,2,,,,],
  [,1,1,2,2,,],
  [,1,,1,2,,],
  [,,,,1,,],
  [1,1,1,2,2,2,2]
]

var c = [
  [2,,,,,,1],
  [,2,,,,1,1],
  [,1,2,,1,,],
  [,1,1,1,,,],
  [,1,,1,2,,],
  [,,,,1,,],
  [1,1,1,2,2,2,2]
]