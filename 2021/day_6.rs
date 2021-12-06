// https://adventofcode.com/2021/day/6

fn total_fish_at(input: &[usize], day: usize) -> usize {
    let mut ages: [usize; 9] = [0; 9];
    for age in input {
        ages[*age] += 1;
    }

    for _ in 0..day {
        ages.rotate_left(1);
        ages[6] += ages[8];
    }

    ages.iter().sum()
}

fn main() {
    let input: Vec<usize> = include_str!("day_6.txt")
        .trim_end_matches('\n')
        .split(',')
        .map(|x| x.parse::<usize>().unwrap())
        .collect();

    // Part 1
    assert_eq!(total_fish_at(&input, 80), 352872);

    // Part 2
    assert_eq!(total_fish_at(&input, 256), 1604361182149);
}
