#!/usr/bin/env python3

# https://adventofcode.com/2021/day/11

# mypy: allow-untyped-defs
# pylint: disable=R

import copy
from pathlib import Path


INPUT = [
    [int(x) for x in line]
    for data in ((Path(__file__).parent / "day_11.txt").read_text(),)
    for line in data.splitlines()
]


def adjacent(grid, x, y):
    for xx, yy in (
        (x, y + 1),  # ------- N
        (x + 1, y + 1),  # --- NE
        (x + 1, y),  # ------- E
        (x + 1, y - 1),  # --- SE
        (x, y - 1),  # ------- S
        (x - 1, y - 1),  # --- SW
        (x - 1, y),  # ------- W
        (x - 1, y + 1),  # --- NW
    ):
        if yy >= 0 and yy < len(grid) and xx >= 0 and xx < len(grid[y]):
            yield (xx, yy)


def walk(grid):
    for y, _ in enumerate(grid):
        for x, _ in enumerate(grid[y]):
            yield grid[y][x], x, y


def do_step(grid):
    for _, x, y in walk(grid):
        grid[y][x] += 1

    while any(el > 9 for el, _, _ in walk(grid)):
        for el, x, y in walk(grid):
            if el <= 9:
                continue

            grid[y][x] = 0
            for xx, yy in adjacent(grid, x, y):
                if grid[yy][xx] != 0:
                    grid[yy][xx] += 1


def part_1():
    grid = copy.deepcopy(INPUT)

    flashes = 0
    for _ in range(0, 100):
        do_step(grid)
        for el, _, _ in walk(grid):
            if el == 0:
                flashes += 1

    print(flashes == 1617, flashes)


part_1()


def part_2():
    grid = copy.deepcopy(INPUT)

    all_flashed_step = 0
    for step in range(0, 20000):
        if all(el == 0 for el, _, _ in walk(grid)):
            all_flashed_step = step
            break
        do_step(grid)

    print(all_flashed_step == 258, all_flashed_step)


part_2()
