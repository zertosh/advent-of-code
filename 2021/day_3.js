// https://adventofcode.com/2021/day/3

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_3.txt', 'utf8')
  .trimEnd()
  .split('\n');

function common_bits(list /*: Array<string> */) /*: string */ {
  let common = '';
  for (let i = 0; i < list[0].length; i++) {
    let magnitude = 0;
    for (let j = 0; j < list.length; j++) {
      magnitude += list[j][i] === '1' ? 1 : -1;
    }
    common += magnitude >= 0 ? '1' : '0';
  }
  return common;
}

(function part_1() {
  let common = common_bits(INPUT);

  // Gamma is just the common bits.
  const gamma = parseInt(common, 2);
  // Epsilon is the complement of gamma.
  const epsilon = gamma ^ (Math.pow(2, common.length) - 1);

  const answer = gamma * epsilon;
  console.log('part 1: %s', answer);

  assert.equal(answer, 2640986);
})();

(function part_2() {
  let oxygen = [...INPUT];
  let co2 = [...INPUT];

  for (let i = 0; i < INPUT[0].length; i++) {
    let common = common_bits(oxygen);
    for (let j = oxygen.length - 1; j >= 0; j--) {
      if (oxygen.length === 1) {
        break;
      }
      if (oxygen[j][i] !== common[i]) {
        oxygen.splice(j, 1);
      }
    }
  }

  for (let i = 0; i < INPUT[0].length; i++) {
    let common = common_bits(co2);
    for (let j = co2.length - 1; j >= 0; j--) {
      if (co2.length === 1) {
        break;
      }
      if (co2[j][i] === common[i]) {
        co2.splice(j, 1);
      }
    }
  }

  oxygen = parseInt(oxygen[0], 2);
  co2 = parseInt(co2[0], 2);

  const answer = oxygen * co2;
  console.log('part 2: %s', answer);

  assert.equal(answer, 6822109);
})();
