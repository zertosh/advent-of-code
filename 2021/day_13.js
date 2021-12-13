// https://adventofcode.com/2021/day/13

const assert = require('assert');

const [DOTS, FOLDS] = require('fs')
  .readFileSync(__dirname + '/day_13.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .reduce(
    (acc, x) => {
      if (x.startsWith('fold')) {
        let [axis, line] = x.replace('fold along ', '').split('=');
        acc[1].push([axis, parseInt(line)]);
      } else if (x.length) {
        acc[0].push(x.split(',').map(x => parseInt(x)));
      }
      return acc;
    },
    [[], []],
  );

function fold(grid, axis, line) {
  const folded = [];

  if (axis === 'x') {
    for (const [x, y] of grid) {
      if (x < line) {
        folded.push([x, y]);
      } else {
        folded.push([line - (x - line), y]);
      }
    }
  } else if (axis === 'y') {
    for (const [x, y] of grid) {
      if (y < line) {
        folded.push([x, y]);
      } else {
        folded.push([x, line - (y - line)]);
      }
    }
  } else {
    throw new Error();
  }

  return folded;
}

(function part_1() {
  const folded = fold(DOTS, FOLDS[0][0], FOLDS[0][1]);

  const folds = new Set(folded.map(([x, y]) => x + ',' + y)).size;
  assert.equal(folds, 765);
})();

(function part_2() {
  let grid = DOTS;
  for (const [axis, line] of FOLDS) {
    grid = fold(grid, axis, line);
  }

  const max_x = Math.max(...grid.map(([x, _]) => x));
  const max_y = Math.max(...grid.map(([_, y]) => y));

  const buf = [];
  for (let y = 0; y <= max_y; y++) {
    for (let x = 0; x <= max_x; x++) {
      buf.push(grid.some(([xx, yy]) => x === xx && y === yy) ? '#' : ' ');
    }
    buf.push('\n');
  }

  // RZKZLPGH
  assert.equal(
    buf.join(''),
    `\
###  #### #  # #### #    ###   ##  #  #
#  #    # # #     # #    #  # #  # #  #
#  #   #  ##     #  #    #  # #    ####
###   #   # #   #   #    ###  # ## #  #
# #  #    # #  #    #    #    #  # #  #
#  # #### #  # #### #### #     ### #  #
`,
  );
})();
