import fs from 'fs';
import path from 'path';

export const getInput = async () => {
    const inputText = await fs.promises.readFile(path.join(__dirname, "../../inputs/day7/input.txt"), "utf8");

    return inputText.split('\n').map(rule => rule.split(/ bags contain | bag, | bags, | bags.| bag./).filter(data => data.trim() !== '' && data.trim() !== 'no other'));
}

export const getBagList = (input: string[][]) => {
    const bagsMap: Record<string, boolean> = {};

    input.forEach(rule => {
        const [firstBag, ...otherBags] = rule;

        bagsMap[firstBag] = true;

        otherBags.forEach(bagData => {
            const bag = bagData.split(/\d /)[1];
            bagsMap[bag] = true;
        });
    });

    // console.log(bagsMap);

    return Object.entries(bagsMap).map(entry => entry[0])
}

export const getBagIndex = (bagList: string[], bag: string) => {
    return bagList.findIndex(currentBag => currentBag === bag);
}

export const getBagsGraph = (input: string[][], bagsList: string[]) => {
    const bagsGraph: number[][] = [];

    bagsList.forEach(() => {
        const bagChildren: number[] = [];
        bagsList.forEach(() => {
            bagChildren.push(0);
        });
        bagsGraph.push(bagChildren);
    });

    // console.table(bagsGraph);

    input.forEach(rule => {
        const [firstBag, ...otherBags] = rule;

        const firstBagIndex = getBagIndex(bagsList, firstBag);

        const childrenBagList = bagsGraph[firstBagIndex];

        otherBags.forEach(bagData => {
            const amount = bagData.match(/\d+ /)?.join() || '0';
            const bag = bagData.split(/\d+ /)[1];

            const childBagIndex = getBagIndex(bagsList, bag);

            childrenBagList[childBagIndex] = parseInt(amount);
        });
    });

    // console.table(bagsGraph);
    return bagsGraph;
}