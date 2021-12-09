// https://adventofcode.com/2021/day/9

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_9.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x => x.split('').map(x => parseInt(x)));

function neighbors(grid, x, y) {
  return [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
  ].filter(
    ([xx, yy]) => yy >= 0 && yy < grid.length && xx >= 0 && xx < grid[y].length,
  );
}

const LOWS = [];
for (let y = 0; y < INPUT.length; y++) {
  for (let x = 0; x < INPUT[y].length; x++) {
    if (
      neighbors(INPUT, x, y).every(([xx, yy]) => INPUT[y][x] < INPUT[yy][xx])
    ) {
      LOWS.push([x, y]);
    }
  }
}

(function part_1() {
  let risk = LOWS.reduce((acc, [x, y]) => acc + INPUT[y][x] + 1, 0);
  assert.equal(risk, 462);
})();

(function part_2() {
  let sizes = [];

  for (const point of LOWS) {
    let size = 0;

    const visited = {};
    const queue = [point];
    while (queue.length) {
      const [x, y] = queue.pop();
      if (!(x in (visited[y] || (visited[y] = {})))) {
        visited[y][x] = null;
        size += 1;
        for (const [xx, yy] of neighbors(INPUT, x, y)) {
          if (INPUT[yy][xx] !== 9) {
            queue.push([xx, yy]);
          }
        }
      }
    }

    sizes.push(size);
  }

  sizes.sort((a, b) => b - a);
  const top_3 = sizes.slice(0, 3).reduce((a, b) => a * b, 1);
  assert.equal(top_3, 1397760);
})();
