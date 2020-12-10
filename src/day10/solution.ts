import fs from 'fs';
import path from 'path';

const getInput = async () => {
    const inputText = await fs.promises.readFile(path.join(__dirname, `../../inputs/day10/input.txt`), `utf-8`);
    return inputText.split(`\n`).map(adapter => parseInt(adapter));
}

const getDeviceJoltage = (adapters: number[]) => {
    let max = -Infinity;

    adapters.forEach(rating => {
        if (rating > max) {
            max = rating;
        }
    });

    return max + 3;
}

const getThreeAndOneDifferences = (adapterChain: number[]) => {
    const differences = {
        three: 0,
        one: 0,
    }

    for (let index = 1; index <= adapterChain.length; ++index) {
        const currentAdapter = adapterChain[index];
        const prevAdapter = adapterChain[index - 1];
        const difference = currentAdapter - prevAdapter;

        if (difference === 1) {
            differences.one++;
        }

        if (difference === 3) {
            differences.three++;
        }
    }

    return differences;
}

const getAdapterChain = (adapters: number[]) => {

    const sortedAdapters = [...adapters].sort((a, b) => a - b);

    return sortedAdapters;
}

const solutionPart1 = async () => {
    const adapters = await getInput();
    const deviceJoltage = getDeviceJoltage(adapters);
    const adapterChain = getAdapterChain([0, ...adapters, deviceJoltage]);

    const { three, one } = getThreeAndOneDifferences(adapterChain);

    console.log(`Result: `, three * one);
}

const searchAdapter = (adapters: number[], targetRating: number) => {
    let low = 0, high = adapters.length - 1;

    while (low <= high) {
        const mid = low + Math.round((high - low) / 2);
        const currentRating = adapters[mid];

        if (currentRating < targetRating) {
            low = mid + 1;
        } else if (currentRating > targetRating) {
            high = mid - 1;
        } else {
            return true;
        }
    }

    return false;
}

const waysMap = new Map<number, number>();

const calculateWays = (maxAdapter: number, adapters: number[]): number => {

    if (waysMap.has(maxAdapter)) {
        return waysMap.get(maxAdapter) || 0;
    }

    if (maxAdapter === 1 || maxAdapter === 0) {
        waysMap.set(maxAdapter, 1);
        return 1;
    }

    if (!searchAdapter(adapters, maxAdapter)) {
        waysMap.set(maxAdapter, 0);
        return 0;
    }

    const ways = calculateWays(maxAdapter - 1, adapters) + calculateWays(maxAdapter - 2, adapters) + calculateWays(maxAdapter - 3, adapters);
    waysMap.set(maxAdapter, ways);

    return ways;
}



const solutionPart2 = async () => {
    const adapters = await getInput();

    const maxAdapter = getDeviceJoltage(adapters) - 3;

    const sortedAdapters = getAdapterChain(adapters);

    const totalWays = calculateWays(maxAdapter, sortedAdapters);

    console.log(`Total Ways:`, totalWays);
}

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}