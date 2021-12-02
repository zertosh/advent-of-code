// https://adventofcode.com/2021/day/1

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_1.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x => parseInt(x));

(function part_1() {
  let inc = 0;

  for (let i = 1; i < INPUT.length; i++) {
    if (INPUT[i] > INPUT[i - 1]) {
      inc++;
    }
  }

  console.log('part 1: %s', inc);
})();

(function part_2() {
  let inc = 0;

  for (let i = 3; i < INPUT.length; i++) {
    if (INPUT[i] > INPUT[i - 3]) {
      inc++;
    }
  }

  console.log('part 2: %s', inc);
})();
