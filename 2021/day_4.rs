// https://adventofcode.com/2021/day/4

type Draws = Vec<usize>;
type Board = Vec<Vec<(usize, bool)>>;

fn data() -> (Draws, Vec<Board>) {
    let mut lines_it = include_str!("day_4.txt")
        .trim_end_matches('\n')
        .split("\n\n");

    let draws = lines_it
        .next()
        .unwrap()
        .split(',')
        .map(|x| x.parse::<usize>().unwrap())
        .collect::<Draws>();

    let boards = lines_it
        .map(|x| {
            x.split('\n')
                .map(|x| {
                    x.split(' ')
                        .filter(|x| !x.is_empty())
                        .map(|x| (x.parse::<usize>().unwrap(), false))
                        .collect::<Vec<_>>()
                })
                .collect::<Vec<_>>()
        })
        .collect::<Vec<Board>>();

    (draws, boards)
}

fn did_win(board: &Board) -> bool {
    for row in board {
        if row.iter().all(|x| x.1) {
            return true;
        }
    }

    for col_num in 0..board[0].len() {
        if board.iter().all(|row| row[col_num].1) {
            return true;
        }
    }

    return false;
}

fn sum_unmarked(board: &Board) -> usize {
    board
        .iter()
        .flat_map(|row| row)
        .map(|cell| if cell.1 == false { cell.0 } else { 0 })
        .sum()
}

fn main() {
    // Part 1
    {
        let (draws, mut boards) = data();

        'outer: for draw in &draws {
            for board in boards.as_mut_slice() {
                for row in board.as_mut_slice() {
                    for cell in row {
                        if cell.0 == *draw {
                            cell.1 = true;
                        }
                    }
                }
                if did_win(&board) {
                    let answer = *draw * sum_unmarked(board);
                    println!("part 1: {}", answer);
                    assert_eq!(answer, 54275);
                    break 'outer;
                }
            }
        }
    }

    // Part 2
    {
        let (draws, mut boards) = data();
        let mut wins: Vec<(Board, usize)> = Vec::new();

        for draw in &draws {
            for i in (0..boards.len()).rev() {
                for row in boards[i].as_mut_slice() {
                    for cell in row {
                        if cell.0 == *draw {
                            cell.1 = true;
                        }
                    }
                }

                if did_win(&boards[i]) {
                    let board = boards.remove(i);
                    wins.push((board, *draw));
                }
            }
        }

        let (board, draw) = wins.last().unwrap();
        let answer = draw * sum_unmarked(board);
        println!("part 2: {}", answer);
        assert_eq!(answer, 13158);
    }
}
