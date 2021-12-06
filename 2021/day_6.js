// https://adventofcode.com/2021/day/6

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_6.txt', 'utf8')
  .trimEnd()
  .split(',')
  .map(x => parseInt(x));

function total_fish_at(day) {
  let ages = Array(9).fill(0);
  INPUT.forEach(x => ages[x]++);

  for (let i = 0; i < day; i++) {
    ages[8] = ages.shift();
    ages[6] += ages[8];
  }

  return ages.reduce((acc, x) => acc + x, 0);
}

(function part_1() {
  assert.equal(total_fish_at(80), 352872);
})();

(function part_2() {
  assert.equal(total_fish_at(256), 1604361182149);
})();
