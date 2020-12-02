import readline from 'readline';
import fs from 'fs';
import path from 'path';

const inputFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../../inputs/day2/input.txt")),
    output: process.stdout,
    terminal: false,
});

export const solution = () => {
    const inputs: string[] = [];

    inputFile.on('line', (line) => {
        // console.log(line);
        inputs.push(line);
    });

    const solutionPart1 = () => {
        console.log("--solution: part1--");

        let validPasswordCount = 0;

        inputs.forEach(inputString => {
            const input = inputString.split(/-|:| /);
            const min = parseInt(input[0]);
            const max = parseInt(input[1]);
            const char = input[2];
            const password = input[4];

            // console.log(min, max, char, password);

            let countOfCharInPassword = password.split('').reduce((count, currentChar) => {
                return currentChar === char ? count + 1 : count;
            }, 0);
            // console.log(`count of ${char} in ${password} = ${countOfCharInPassword}`);

            if (countOfCharInPassword >= min && countOfCharInPassword <= max) {
                validPasswordCount++;
            }

        });

        console.log("valid password count: ", validPasswordCount);
    }

    const solutionPart2 = () => {
        console.log("--solution: part2--");

        let validPasswordCount = 0;

        inputs.forEach(inputString => {
            const input = inputString.split(/-|:| /);
            const pos1 = parseInt(input[0]);
            const pos2 = parseInt(input[1]);
            const char = input[2];
            const password = input[4];

            let score = 0;
            if (password[pos1 - 1] === char) {
                score++;
            }
            if (password[pos2 - 1] === char) {
                score++;
            }

            if (score === 1) {
                validPasswordCount++;
            }
        });

        console.log("valid password count: ", validPasswordCount);
    }

    inputFile.on('close', () => {
        solutionPart1();
        solutionPart2();
    });
    
}

