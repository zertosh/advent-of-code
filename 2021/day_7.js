// https://adventofcode.com/2021/day/7

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_7.txt', 'utf8')
  .trimEnd()
  .split(',')
  .map(x => parseInt(x));

function calc_median_unsorted(values) {
  const arr = values.slice().sort((a, b) => a - b);
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}

function calc_mean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; sum += arr[i++]) {}
  return sum / arr.length;
}

(function part_1() {
  const median = Math.floor(calc_median_unsorted(INPUT));
  let min_fuel = 0;
  for (const x of INPUT) {
    const dist = x < median ? median - x : x - median;
    min_fuel += dist;
  }
  assert.equal(min_fuel, 359648);
})();

(function part_2() {
  const mean = Math.floor(calc_mean(INPUT));
  let min_fuel = 0;
  for (const x of INPUT) {
    const dist = x < mean ? mean - x : x - mean;
    const cost = (dist * (dist + 1)) / 2; // https://en.wikipedia.org/wiki/Summation
    min_fuel += cost;
  }
  assert.equal(min_fuel, 100727924);
})();
