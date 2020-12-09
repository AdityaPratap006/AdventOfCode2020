import fs from 'fs';
import path from 'path';

const getInput = async () => {
    const inputText = await fs.promises.readFile(path.join(__dirname, `../../inputs/day9/input.txt`), `utf-8`);

    return inputText.split(`\n`).map(num => parseInt(num));
}

const checkSumPair = (array: number[], targetSum: number) => {
    const sortedArray = [...array].sort((a, b) => a - b);
    // console.log(sortedArray);
    let first = 0, last = sortedArray.length - 1;
    while (first < last) {
        const sum = sortedArray[first] + sortedArray[last];
        if (sum < targetSum) {
            ++first;
        } else if (sum > targetSum) {
            --last;
        } else {
            return true;
        }
    }

    return false;
}

const findTheCorruptNumber = (input: number[], windowSize: number) => {

    let firstCorruptNumber = -Infinity;
    const preamble = input.slice(0, windowSize);

    input.slice(windowSize).every(val => {
        const isValidNum = checkSumPair(preamble, val);

        preamble.shift();
        preamble.push(val);

        if (!isValidNum) {
            firstCorruptNumber = val;
        }

        return isValidNum;
    });

    return firstCorruptNumber;
}

const solutionPart1 = async () => {
    const input = await getInput();

    const firstCorruptNumber = findTheCorruptNumber(input, 25);
    console.log(`First Corrupt Number:`, firstCorruptNumber);
}

const findSumRange = (array: number[], targetSum: number) => {
    let start = 0, end = 1;
    let currentSum = array[start];
    const range: number[] = [array[start]];

    while (end < array.length && currentSum !== targetSum) {
        // console.log(currentSum);
        // console.log(`start: ${array[start]}, current End: ${array[end]}`);
        // console.log(range);

        if (currentSum < targetSum) {
            range.push(array[end]);
            currentSum += array[end];
            ++end;
        } else if (currentSum > targetSum) {
            // console.log(`--- new range ---`);
            // console.log()
            range.shift();
            currentSum -= array[start];
            ++start;
        }
    };

    return range;
}

const findMinMaxInRange = (range: number[]) => {
    let min = Infinity;
    let max = -Infinity;

    range.forEach(val => {
        if (val > max) {
            max = val;
        }

        if (val < min) {
            min = val;
        }
    });

    return { min, max };
}

const solutionPart2 = async () => {
    const input = await getInput();

    const firstCorruptNumber = findTheCorruptNumber(input, 25);

    const range = findSumRange(input, firstCorruptNumber);
    console.log(`Target Range:`, range);

    const { max, min } = findMinMaxInRange(range);

    console.log(`Encryption Weakness:`, min + max);
}

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}