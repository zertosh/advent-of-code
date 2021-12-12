// https://adventofcode.com/2021/day/11

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_11.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x => x.split('').map(x => parseInt(x)));

function* adjacent(grid, x, y) {
  for (const [xx, yy] of [
    /* N  */ [x, y + 1],
    /* NE */ [x + 1, y + 1],
    /* E  */ [x + 1, y],
    /* SE */ [x + 1, y - 1],
    /* S  */ [x, y - 1],
    /* SW */ [x - 1, y - 1],
    /* W  */ [x - 1, y],
    /* NW */ [x - 1, y + 1],
  ]) {
    if (yy >= 0 && yy < grid.length && xx >= 0 && xx < grid[y].length) {
      yield [grid[yy][xx], xx, yy];
    }
  }
}

function* walk(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      yield [grid[y][x], x, y];
    }
  }
}

function do_step(grid) {
  // First increase self.
  for (const [, x, y] of walk(grid)) {
    grid[y][x] += 1;
  }

  // Then increase adjacent.
  while (grid.some(row => row.some(el => el > 9))) {
    for (const [el, x, y] of walk(grid)) {
      if (el <= 9) {
        continue;
      }

      grid[y][x] = 0;
      for (const [elel, xx, yy] of adjacent(grid, x, y)) {
        if (elel !== 0) {
          grid[yy][xx] += 1;
        }
      }
    }
  }
}

(function part_1() {
  let grid = JSON.parse(JSON.stringify(INPUT));

  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    do_step(grid);
    for (const [el] of walk(grid)) {
      if (el === 0) {
        flashes++;
      }
    }
  }

  assert.equal(flashes, 1617);
})();

(function part_2() {
  let grid = JSON.parse(JSON.stringify(INPUT));

  let all_flashed_step = 0;
  for (let step = 0; step < 20000; step++) {
    if (grid.every(row => row.every(el => el === 0))) {
      all_flashed_step = step;
      break;
    }
    do_step(grid);
  }

  assert.equal(all_flashed_step, 258);
})();
