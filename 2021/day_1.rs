// https://adventofcode.com/2021/day/1

fn main() {
    let input: Vec<usize> = include_str!("day_1.txt")
        .trim_end_matches('\n')
        .split('\n')
        .map(|x| x.parse::<usize>().unwrap())
        .collect();

    let part_1 = input
        .windows(2)
        .map(|x| if x[1] > x[0] { 1 } else { 0 })
        .sum::<usize>();

    println!("part 1: {:?}", part_1);

    let part_2 = input
        .windows(4)
        .map(|x| if x[3] > x[0] { 1 } else { 0 })
        .sum::<usize>();

    println!("part 2: {:?}", part_2);
}
