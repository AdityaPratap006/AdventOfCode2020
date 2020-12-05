import fs from 'fs';
import path from 'path';

const getInput = async () => {
    const input = await fs.promises.readFile(path.join(__dirname, "../../inputs/day5/input.txt"), "utf8");

    return input.split("\n");
}

const getMiddle = (low: number, high: number) => {
    return Math.floor((high + low) / 2);
}

const getRowNumber = (rowCode: string) => {
    let low = 0, high = 127;
    let mid = getMiddle(low, high);

    rowCode.split('').forEach(dir => {
        if (low <= high) {

            if (dir === 'F') {
                high = mid;
            } else if (dir === 'B') {
                low = mid + 1;
            }

            mid = getMiddle(low, high);
            // console.log(`current row: ${mid} - [${low}, ${high}]`);
        }
    });

    return mid;
}

const getColNumber = (colCode: string) => {
    let low = 0, high = 7;
    let mid = getMiddle(low, high);

    colCode.split('').forEach(dir => {
        if (low <= high) {

            if (dir === 'L') {
                high = mid;
            } else if (dir === 'R') {
                low = mid + 1;
            }

            mid = getMiddle(low, high);
            // console.log(`current col: ${mid} - [${low}, ${high}]`);
        }
    });

    return mid;
}

const getSeatId = (seatCode: string) => {
    const rowCode = seatCode.slice(0, 7);
    const colCode = seatCode.slice(7, 10);

    const rowNum = getRowNumber(rowCode);
    const colNum = getColNumber(colCode);

    // console.log(`row num: ${rowNum}`);
    // console.log(`col num: ${colNum}`);

    const seatId = rowNum * 8 + colNum;
    // console.log(`Seat Id: ${seatId}`);
    return seatId;
}

const solutionPart1 = async () => {
    const input = await getInput();
    let maxId = 0;
    input.forEach(code => {
        const seatId = getSeatId(code);

        if (seatId > maxId) {
            maxId = seatId;
        }
    });

    console.log(`max seat id: ${maxId}`);
    return maxId;
}

const findMissingSeatId = (seatIdList: number[]) => {
    let pos = 1;

    while (pos <= seatIdList.length - 1) {
        const currentSeatId = seatIdList[pos];
        const prevSeatId = seatIdList[pos - 1];
        if (currentSeatId - prevSeatId > 1) {
            return currentSeatId - 1;
        }

        ++pos;
    }

    return -1;
}

const solutionPart2 = async () => {
    const input = await getInput();

    const seatIdList = input.map(code => getSeatId(code));

    seatIdList.sort((a, b) => a - b);

    // console.log(seatIdList, seatIdList.length);

    const missingSeatId = findMissingSeatId(seatIdList);

    console.log(`missing seat id: ${missingSeatId}`);
}

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}