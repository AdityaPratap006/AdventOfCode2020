import fs from 'fs';
import path from 'path';

const getInput = async () => {
    const inputText = await fs.promises.readFile(path.join(__dirname, `../../inputs/day13/input.txt`), `utf-8`);
    const simplifiedInput = inputText.split(`\n`).filter(line => line.trim() !== '');
    const earliestTimestamp = parseInt(simplifiedInput[0]);
    const busIdList = simplifiedInput[1].split(`,`).map(text => parseInt(text) || -1);

    return { earliestTimestamp, busIdList };
}

const getMinWaitTime = (earliestTimestamp: number, busIdList: number[]) => {
    let minWaitTime = Infinity;
    let minWaitBusId = -1;
    busIdList.filter(id => id !== -1).forEach(id => {
        const waitTime = id - (earliestTimestamp % id);
        if (waitTime < minWaitTime) {
            minWaitTime = waitTime;
            minWaitBusId = id;
        }
    });

    return { minWaitBusId, minWaitTime };
}

const solutionPart1 = async () => {
    const { earliestTimestamp, busIdList } = await getInput();

    const { minWaitBusId, minWaitTime } = getMinWaitTime(earliestTimestamp, busIdList);

    console.log(`Product: `, minWaitBusId * minWaitTime);
}

const solutionPart2 = async () => {
    const { busIdList } = await getInput();

    const busIdCumOffsetList = busIdList.map((id, offset) => ({ id: BigInt(id), offset: BigInt(offset), })).filter(bus => bus.id !== BigInt(-1));

    let timestamp = BigInt(1);
    let accumulatedProduct = BigInt(1);

    busIdCumOffsetList.forEach(bus => {
        while (true) {
            if ((timestamp + bus.offset) % bus.id === BigInt(0)) {
                break;
            }
            timestamp += accumulatedProduct;
        }

        accumulatedProduct *= BigInt(bus.id)
    });

    console.log(`Result: `, timestamp);
}

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}