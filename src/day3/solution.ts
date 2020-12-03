import readline from 'readline';
import fs from 'fs';
import path from 'path';

const inputFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "../../inputs/day3/input.txt")),
    output: process.stdout,
    terminal: false,
});

export const solution = () => {
    const inputs: string[] = [];

    inputFile.on('line', (line) => {
        // console.log(line);
        inputs.push(line);
    });

    const solutionPart1 = (slopeX: number, slopeY: number) => {


        // console.log(inputs);

        let treeCount: number = 0;
        const width: number = inputs[0].length;
        const height: number = inputs.length;

        let x: number = 0;
        let y: number = 0;

        while (y < height) {
            if (inputs[y][x] === '#') {
                ++treeCount;
            }

            x = (x + slopeX) % width;
            y += slopeY;
        }

        console.log(`Tree Count: ${treeCount}`);
        return treeCount;
    }

    interface Slope {
        x: number;
        y: number;
    }

    const solutionPart2 = () => {
        const slopes: Slope[] = [
            { x: 1, y: 1 },
            { x: 3, y: 1 },
            { x: 5, y: 1 },
            { x: 7, y: 1 },
            { x: 1, y: 2 },
        ];

        let treeCountProduct: number = 1;
        slopes.forEach((slope) => {
            const treeCount = solutionPart1(slope.x, slope.y);
            treeCountProduct *= treeCount;
        });

        console.log(`Tree Count Product: ${treeCountProduct}`);
        return treeCountProduct;
    }

    inputFile.on('close', () => {
        console.log("--solution: part1--");
        solutionPart1(3, 1);

        console.log("--solution: part2--");
        solutionPart2();
    });
}