// https://adventofcode.com/2021/day/7

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_7.txt', 'utf8')
  .trimEnd()
  .split(',')
  .map(x => parseInt(x));

INPUT.sort((a, b) => a - b);

(function part_1() {
  const median = INPUT[INPUT.length / 2];
  let min_fuel = 0;
  for (const x of INPUT) {
    min_fuel += Math.abs(median - x);
  }
  assert.equal(min_fuel, 359648);
})();

(function part_2() {
  const average = Math.floor(
    INPUT.reduce((acc, x) => (acc += x)) / INPUT.length,
  );
  let min_fuel = 0;
  for (const x of INPUT) {
    let dist = Math.abs(average - x);
    let cost = (Math.pow(dist, 2) + dist) / 2; // https://en.wikipedia.org/wiki/Summation
    min_fuel += cost;
  }
  assert.equal(min_fuel, 100727924);
})();
