// https://adventofcode.com/2021/day/2

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_2.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x => {
    let [direction, amount] = x.split(' ');
    return [direction, parseInt(amount)];
  });

(function part_1() {
  let depth = 0;
  let horizontal = 0;

  for (const [direction, amount] of INPUT) {
    if (direction === 'forward') {
      horizontal += amount;
    } else if (direction === 'up') {
      depth -= amount;
    } else if (direction === 'down') {
      depth += amount;
    }
  }

  console.log('part 1: %s', horizontal * depth);
})();

(function part_2() {
  let aim = 0;
  let depth = 0;
  let horizontal = 0;

  for (const [direction, amount] of INPUT) {
    if (direction === 'forward') {
      horizontal += amount;
      depth += aim * amount;
    } else if (direction === 'up') {
      aim -= amount;
    } else if (direction === 'down') {
      aim += amount;
    }
  }

  console.log('part 2: %s', horizontal * depth);
})();
