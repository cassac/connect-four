const createBoard = () => {
  let board = [];
  for (var i = 0; i < 7; i++) {
    let row = []
    for (var j = 0; j < 6; j++) {
      let idx = String(i).concat(String(j));
      row.push({id: idx, owner: null});
    }
    board.push(row);
    row = [];
  }
  return board;
}

export default createBoard;