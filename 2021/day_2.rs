// https://adventofcode.com/2021/day/2

fn main() {
    let input: Vec<(&'static str, usize)> = include_str!("day_2.txt")
        .trim_end_matches('\n')
        .split('\n')
        .map(|x| {
            let (direction, amount) = x.split_once(' ').unwrap();
            (direction, amount.parse::<usize>().unwrap())
        })
        .collect();

    // Part 1
    {
        let mut depth = 0;
        let mut horizontal = 0;

        for (direction, amount) in &input {
            match *direction {
                "forward" => horizontal += amount,
                "up" => depth -= amount,
                "down" => depth += amount,
                _ => unreachable!(),
            };
        }

        println!("part 1: {}", horizontal * depth);
    }

    // Part 2
    {
        let mut aim = 0;
        let mut depth = 0;
        let mut horizontal = 0;

        for (direction, amount) in &input {
            match *direction {
                "forward" => {
                    horizontal += amount;
                    depth += aim * amount;
                }
                "up" => aim -= amount,
                "down" => aim += amount,
                _ => unreachable!(),
            };
        }

        println!("part 2: {}", horizontal * depth);
    }
}
