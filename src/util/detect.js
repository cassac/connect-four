const detectHorizontalVerticalWin = (board, target) => {
  
  var win = false;

  var recurse = (x, y, tally) => {
    if (!tally) tally = 0;

    if (board[x][y] === target) {
      board[x][y] = undefined;
      tally += 1;
    }

    if (board[x - 1][y] === target) {
      board[x-1][y] = undefined;
      tally += recurse(x-1, y, tally);
    }

    if (board[x + 1] && board[x + 1][y] === target) {
      board[x+1][y] = undefined;
      tally += recurse(x+1, y, tally);
    }

    if (board[x][y - 1] === target) {
      board[x][y-1] = undefined;
      tally += recurse(x, y-1, tally);
    }

    if (board[x][y + 1] === target) {
      board[x][y+1] = undefined;
      tally += recurse(x, y+1, tally);
    }

    return tally;
  }

  board.forEach((row, x) => {
    row.forEach((_, y) => {
      if (board[x][y] === target) {
        if(recurse(x, y) >= 4) {
          win = true;
        }
      }      
    })
  })

  return win;

}

module.exports = {
  detectHorizontalVerticalWin,
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