// https://adventofcode.com/2021/day/7

fn calc_median_unsorted(values: &[usize]) -> usize {
    let mut sorted = values.to_vec();
    sorted.sort_unstable();

    let mid = sorted.len() / 2;
    if values.len() % 2 != 0 {
        sorted[mid]
    } else {
        (sorted[mid - 1] + sorted[mid]) / 2
    }
}

fn calc_mean(values: &[usize]) -> usize {
    values.iter().sum::<usize>() / values.len()
}

fn main() {
    let input: Vec<usize> = include_str!("day_7.txt")
        .trim_end_matches('\n')
        .split(',')
        .map(|x| x.parse::<usize>().unwrap())
        .collect();

    // Part 1
    {
        let median = calc_median_unsorted(&input);
        let min_fuel = input
            .iter()
            .map(|x| if *x < median { median - x } else { x - median })
            .sum::<usize>();
        assert_eq!(min_fuel, 359648);
    }

    // Part 2
    {
        let mean = calc_mean(&input);
        let min_fuel = input
            .iter()
            .map(|x| {
                let dist = if *x < mean { mean - x } else { x - mean };
                (dist * (dist + 1)) / 2 // https://en.wikipedia.org/wiki/Summation
            })
            .sum::<usize>();
        assert_eq!(min_fuel, 100727924);
    }
}
