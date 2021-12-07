// https://adventofcode.com/2021/day/7

fn main() {
    let mut input: Vec<usize> = include_str!("day_7.txt")
        .trim_end_matches('\n')
        .split(',')
        .map(|x| x.parse::<usize>().unwrap())
        .collect();

    input.sort();

    // Part 1
    {
        let median = input[input.len() / 2];
        let min_fuel = input
            .iter()
            .map(|x| if *x < median { median - x } else { x - median })
            .sum::<usize>();
        assert_eq!(min_fuel, 359648);
    }

    // Part 2
    {
        let avg = input.iter().sum::<usize>() / input.len();
        let min_fuel = input
            .iter()
            .map(|x| if *x < avg { avg - x } else { x - avg })
            .map(|x| {
                (x.pow(2) + x) / 2 // https://en.wikipedia.org/wiki/Summation
            })
            .sum::<usize>();
        assert_eq!(min_fuel, 100727924);
    }
}
