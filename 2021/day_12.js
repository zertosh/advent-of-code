// https://adventofcode.com/2021/day/12

const assert = require('assert');

const INPUT = require('fs')
  .readFileSync(__dirname + '/day_12.txt', 'utf8')
  .trimEnd()
  .split('\n')
  .map(x => x.split('-'))
  .reduce((acc, [a, b]) => {
    (acc[a] || (acc[a] = [])).push(b);
    (acc[b] || (acc[b] = [])).push(a);
    return acc;
  }, {});

const SMALL = new Set(Object.keys(INPUT).filter(x => x.toLowerCase() === x));

(function part_1() {
  let paths = 0;

  let queue = [['start', new Set(['start'])]];
  while (queue.length) {
    const [node, smalls] = queue.pop();
    if (node === 'end') {
      paths++;
    } else {
      for (const edge of INPUT[node]) {
        if (!smalls.has(edge)) {
          const new_smalls = SMALL.has(edge)
            ? new Set(smalls).add(edge)
            : smalls;
          queue.push([edge, new_smalls]);
        }
      }
    }
  }

  assert.equal(paths, 5076);
})();

(function part_2() {
  let paths = 0;

  let queue = [['start', new Set(['start']), false]];
  while (queue.length) {
    const [node, smalls, twice] = queue.pop();
    if (node === 'end') {
      paths++;
    } else {
      for (const edge of INPUT[node]) {
        if (!smalls.has(edge)) {
          const new_smalls = SMALL.has(edge)
            ? new Set(smalls).add(edge)
            : smalls;
          queue.push([edge, new_smalls, twice]);
        } else if (!twice && edge !== 'start') {
          queue.push([edge, smalls, true]);
        }
      }
    }
  }

  assert.equal(paths, 145643);
})();
