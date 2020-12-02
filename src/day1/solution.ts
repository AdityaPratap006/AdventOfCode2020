import readline from 'readline';
import fs from 'fs';
import path from 'path';

const inputFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../../inputs/day1/input.txt")),
    output: process.stdout,
    terminal: false,
});

export const solution = () => {

    const array: number[] = [];
    const map = new Map<number, boolean>();

    inputFile.on('line', (line) => {
        // console.log(line);
        array.push(parseInt(line.trim()));
    });

    const solutionPart1 = () => {
        console.log("--solution: part1--");
        
        array.forEach(num => {
            map.set(num, true);
            if (map.has(2020 - num)) {
                console.log(num * (2020 - num));
            }
        });
    }

    const solutionPart2 = () => {
        console.log("--solution: part2--");

        array.sort((a,b) => a - b);

        const answer = {
            num1: 0,
            num2: 0,
            num3: 0,
        }

        let foundTriplet = false;
        for (let ptr1 = 0; ptr1 < array.length; ++ptr1) {

            if (foundTriplet) {
                break;
            }

            const num1 = array[ptr1];
            
            let ptr2 = ptr1 + 1;
            let ptr3 = array.length - 1;

            while (ptr2 < ptr3) {
                const num2 = array[ptr2];
                const num3 = array[ptr3];
                const sum = num2 + num3;
                if (sum > 2020 - num1) {
                    ptr3--;
                } else if (sum < 2020 - num1) {
                    ptr2++;
                } else {
                    answer.num1 = num1;
                    answer.num2 = num2;
                    answer.num3 = num3;
                    foundTriplet = true;
                    break;
                }
            }
        }

        console.log(answer, answer.num1 * answer.num2 * answer.num3);
    }

    inputFile.on('close', () => {
        solutionPart1();
        solutionPart2();
    });
    
}

