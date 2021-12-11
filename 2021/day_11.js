// https://adventofcode.com/2021/day/11

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_11.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x => x.split('').map(x => parseInt(x)));

function adjacent(grid, x, y) {
  return [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
    //
    [x + 1, y + 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x - 1, y - 1],
  ].filter(
    ([xx, yy]) => yy >= 0 && yy < grid.length && xx >= 0 && xx < grid[y].length,
  );
}

function do_step(grid) {
  let flashes = 0;
  const flashed = {};

  // First increase self.
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      grid[y][x] += 1;
    }
  }

  // Then increase adjacent.
  while (grid.some(row => row.some(t => t > 9))) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (x in (flashed[y] || (flashed[y] = {}))) {
          continue;
        }

        if (grid[y][x] > 9) {
          grid[y][x] = 0;
          flashed[y][x] = null;
          flashes++;
          for (const [xx, yy] of adjacent(grid, x, y)) {
            if (!(xx in (flashed[yy] || (flashed[yy] = {})))) {
              grid[yy][xx] += 1;
            }
          }
        }
      }
    }
  }

  return flashes;
}

(function part_1() {
  let grid = JSON.parse(JSON.stringify(INPUT));

  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    flashes += do_step(grid);
  }

  assert.equal(flashes, 1617);
})();

(function part_2() {
  let grid = JSON.parse(JSON.stringify(INPUT));

  let all_flashed_step = 0;
  for (let step = 0; step < 20000; step++) {
    if (grid.every(row => row.every(t => t === 0))) {
      all_flashed_step = step;
      break;
    }
    do_step(grid);
  }

  assert.equal(all_flashed_step, 258);
})();
