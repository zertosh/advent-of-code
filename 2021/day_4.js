// https://adventofcode.com/2021/day/4

const assert = require('assert');

const [DRAWS, BOARDS] = (() => {
  let LINES = require('fs')
    .readFileSync(__dirname + '/day_4.txt', 'utf8')
    .trimEnd()
    .split('\n\n');

  let DRAWS = LINES.shift()
    .split(',')
    .map(x => parseInt(x));

  const BOARDS = LINES.map(x =>
    x.split('\n').map(x =>
      x
        .split(' ')
        .filter(x => x.length > 0)
        .map(x => [parseInt(x), false]),
    ),
  );

  return [DRAWS, BOARDS];
})();

function did_win(board) {
  // Rows.
  for (let i = 0; i < board.length; i++) {
    if (board[i].every(cell => cell[1])) {
      return true;
    }
  }

  // Columns.
  for (let i = 0; i < board[0].length; i++) {
    if (board.every(row => row[i][1])) {
      return true;
    }
  }

  return false;
}

function sum_unmarked(board) {
  let sum = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell[1] === false) {
        sum += cell[0];
      }
    }
  }
  return sum;
}

(function part_1() {
  for (const draw of DRAWS) {
    for (const board of BOARDS) {
      for (const row of board) {
        for (const cell of row) {
          if (cell[0] == draw) {
            cell[1] = true;
          }
        }
      }
      if (did_win(board)) {
        const answer = sum_unmarked(board) * draw;
        console.log('part 1: %s', answer);
        assert.equal(answer, 54275);
        return;
      }
    }
  }
})();

(function part_2() {
  const wins = [];

  for (const draw of DRAWS) {
    for (let i = BOARDS.length - 1; i >= 0; i--) {
      let board = BOARDS[i];

      for (const row of board) {
        for (const cell of row) {
          if (cell[0] == draw) {
            cell[1] = true;
          }
        }
      }

      if (did_win(board)) {
        wins.push([board, draw]);
        BOARDS.splice(i, 1);
      }
    }
  }

  let last_win = wins[wins.length - 1];

  const answer = sum_unmarked(last_win[0]) * last_win[1];
  console.log('part 2: %s', answer);
  assert.equal(answer, 13158);
})();
