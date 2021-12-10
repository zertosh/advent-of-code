// https://adventofcode.com/2021/day/10

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_10.txt', 'utf8')
  .trimEnd()
  .split('\n');

const OPEN_CLOSE = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

(function part_1() {
  let corrupts = 0;

  for (const line of INPUT) {
    let needed = [];
    for (const c of line) {
      if (OPEN_CLOSE[c]) {
        needed.push(OPEN_CLOSE[c]);
      } else {
        let expected = needed.pop();
        if (expected !== c) {
          corrupts += {')': 3, ']': 57, '}': 1197, '>': 25137}[c];
        }
      }
    }
  }

  assert.equal(corrupts, 392367);
})();

(function part_2() {
  let scores = [];

  outer: for (const line of INPUT) {
    let needed = [];

    for (const c of line) {
      if (OPEN_CLOSE[c]) {
        needed.push(OPEN_CLOSE[c]);
      } else {
        let expected = needed.pop();
        if (expected !== c) {
          continue outer;
        }
      }
    }

    let score = needed.reduceRight((acc, c) => {
      return acc * 5 + {')': 1, ']': 2, '}': 3, '>': 4}[c];
    }, 0);

    scores.push(score);
  }

  scores.sort((a, b) => b - a);
  let score = scores[Math.floor(scores.length / 2)];
  assert.equal(score, 2192104158);
})();
