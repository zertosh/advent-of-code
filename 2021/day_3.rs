// https://adventofcode.com/2021/day/3

fn common_bits(list: &[&str]) -> String {
    let mut common = String::new();
    for i in 0..list[0].len() {
        let mut magnitude = 0;
        for item in list {
            magnitude += if item.as_bytes()[i] == b'1' { 1 } else { -1 };
        }
        common.push(if magnitude >= 0 { '1' } else { '0' });
    }
    common
}

fn main() {
    let input: Vec<&str> = include_str!("day_3.txt")
        .trim_end_matches('\n')
        .split('\n')
        .collect();

    // Part 1
    {
        let common = common_bits(&input);

        let gamma = usize::from_str_radix(&common, 2).unwrap();
        let epsilon = common
            .chars()
            .map(|x| if x == '1' { '0' } else { '1' })
            .collect::<String>();
        let epsilon = usize::from_str_radix(&epsilon, 2).unwrap();

        let answer = gamma * epsilon;

        println!("part 1: {}", answer);
        assert_eq!(answer, 2640986);
    }

    // Part 2
    {
        let mut oxygen = input.clone();
        for i in 0..input[0].len() {
            let common = common_bits(&oxygen);
            for j in (0..oxygen.len()).rev() {
                if oxygen.len() == 1 {
                    break;
                }
                if oxygen[j].as_bytes()[i] != common.as_bytes()[i] {
                    oxygen.remove(j);
                }
            }
        }

        let mut co2 = input.clone();
        for i in 0..input[0].len() {
            let common = common_bits(&co2);
            for j in (0..co2.len()).rev() {
                if co2.len() == 1 {
                    break;
                }
                if co2[j].as_bytes()[i] == common.as_bytes()[i] {
                    co2.remove(j);
                }
            }
        }

        let oxygen = usize::from_str_radix(oxygen[0], 2).unwrap();
        let co2 = usize::from_str_radix(co2[0], 2).unwrap();

        let answer = oxygen * co2;

        println!("part 2: {}", answer);
        assert_eq!(answer, 6822109);
    }
}
