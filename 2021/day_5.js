// https://adventofcode.com/2021/day/5

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_5.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x =>
    x
      .replace(' -> ', ',')
      .split(',')
      .map(x => parseInt(x)),
  );

function dbg(val) /* eslint-disable-line */ {
  console.log(require('util').inspect(val, {depth: null}));
  return val;
}

(function part_1() {
  let grid = [];

  for (const [x1, y1, x2, y2] of INPUT) {
    if (x1 === x2 || y1 === y2) {
      for (let xx = x1; x1 < x2 ? xx <= x2 : xx >= x2; x1 < x2 ? xx++ : xx--) {
        grid[xx] = grid[xx] || [];
        for (
          let yy = y1;
          y1 < y2 ? yy <= y2 : yy >= y2;
          y1 < y2 ? yy++ : yy--
        ) {
          grid[xx][yy] = (grid[xx][yy] || 0) + 1;
        }
      }
    }
  }

  let sum = 0;
  for (let xx = 0; xx < grid.length; xx++) {
    if (grid[xx]) {
      for (let yy = 0; yy < grid[xx].length; yy++) {
        if (grid[xx][yy] > 1) {
          sum++;
        }
      }
    }
  }

  const answer = sum;
  console.log('part 1: %s', answer);
  assert.equal(answer, 5585);
})();

(function part_2() {
  let grid = [];

  for (const [x1, y1, x2, y2] of INPUT) {
    if (x1 === x2 || y1 === y2) {
      for (let xx = x1; x1 < x2 ? xx <= x2 : xx >= x2; x1 < x2 ? xx++ : xx--) {
        grid[xx] = grid[xx] || [];
        for (
          let yy = y1;
          y1 < y2 ? yy <= y2 : yy >= y2;
          y1 < y2 ? yy++ : yy--
        ) {
          grid[xx][yy] = (grid[xx][yy] || 0) + 1;
        }
      }
    } else {
      for (
        let xx = x1, yy = y1;
        (x1 < x2 ? xx <= x2 : xx >= x2) && (y1 < y2 ? yy <= y2 : yy >= y2);
        x1 < x2 ? xx++ : xx--, y1 < y2 ? yy++ : yy--
      ) {
        grid[xx] = grid[xx] || [];
        grid[xx][yy] = (grid[xx][yy] || 0) + 1;
      }
    }
  }

  let sum = 0;
  for (let xx = 0; xx < grid.length; xx++) {
    if (grid[xx]) {
      for (let yy = 0; yy < grid[xx].length; yy++) {
        if (grid[xx][yy] > 1) {
          sum++;
        }
      }
    }
  }

  const answer = sum;
  console.log('part 2: %s', answer);
  assert.equal(answer, 17193);
})();
