// https://adventofcode.com/2021/day/8

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_8.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x => {
    // Sort the letters because we're going to compare them later.
    let [left, right] = x
      .split(' | ')
      .map(side => side.split(' ').map(x => x.split('').sort().join('')));
    return [left, right];
  });

/*
    0:      1:      2:      3:      4:
   aaaa    ....    aaaa    aaaa    ....
  b    c  .    c  .    c  .    c  b    c
  b    c  .    c  .    c  .    c  b    c
   ....    ....    dddd    dddd    dddd
  e    f  .    f  e    .  .    f  .    f
  e    f  .    f  e    .  .    f  .    f
   gggg    ....    gggg    gggg    ....

    5:      6:      7:      8:      9:
   aaaa    aaaa    aaaa    aaaa    aaaa
  b    .  b    .  .    c  b    c  b    c
  b    .  b    .  .    c  b    c  b    c
   dddd    dddd    ....    dddd    dddd
  .    f  e    f  .    f  e    f  .    f
  .    f  e    f  .    f  e    f  .    f
   gggg    gggg    ....    gggg    gggg
 */

const DIGITS = [
  /* 0 */ 'abcefg',
  /* 1 */ 'cf',
  /* 2 */ 'acdeg',
  /* 3 */ 'acdfg',
  /* 4 */ 'bcdf',
  /* 5 */ 'abdfg',
  /* 6 */ 'abdefg',
  /* 7 */ 'acf',
  /* 8 */ 'abcdefg',
  /* 9 */ 'abcdfg',
];

const ALL = 'abcdefg';

(function part_1() {
  let sum = 0;
  for (const [, right] of INPUT) {
    for (const val of right) {
      if (
        [
          DIGITS[1].length,
          DIGITS[4].length,
          DIGITS[7].length,
          DIGITS[8].length,
        ].includes(val.length)
      ) {
        sum++;
      }
    }
  }

  assert.equal(sum, 387);
})();

// https://stackoverflow.com/a/37580979
function permute(arr) {
  const permutation = arr.slice();
  const len = permutation.length;
  const result = [permutation.slice()];
  let c = new Array(len).fill(0);
  let i = 1;
  let k;
  let p;

  while (i < len) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

// Create all possible combinations of valid signal patterns.
const PERMUTATIONS = permute(ALL.split('')).map(permutation => {
  let mapping = Object.fromEntries(permutation.map((x, i) => [ALL[i], x]));
  return DIGITS.map(digit =>
    digit
      .split('')
      .map(d => mapping[d])
      .sort()
      .join(''),
  );
});

(function part_2() {
  let total = 0;
  for (const [left, right] of INPUT) {
    // 1. Find the permutation that contains all entries.
    for (const permutation of PERMUTATIONS) {
      if (left.every(x => permutation.includes(x))) {
        // 2. Map backwards the real digits and add then to the total.
        total += parseInt(right.map(x => permutation.indexOf(x)).join(''));
      }
    }
  }

  assert.equal(total, 986034);
})();
