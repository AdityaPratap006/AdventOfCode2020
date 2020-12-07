import { getInput, getBagList, getBagsGraph, getBagIndex } from './helpers';
import { findShinyGoldContainers } from './part1';
import { findCapacityOfShinyGoldBag } from './part2';

const solutionPart1 = async () => {
    const input = await getInput();

    const bagsList = getBagList(input);

    const bagsGraph = getBagsGraph(input, bagsList);

    findShinyGoldContainers(bagsGraph, bagsList);
}


const solutionPart2 = async () => {
    const input = await getInput();

    const bagsList = getBagList(input);

    const bagsGraph = getBagsGraph(input, bagsList);

    findCapacityOfShinyGoldBag(bagsGraph, bagsList);
}

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}