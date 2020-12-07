import { getBagIndex } from './helpers';

export const findShinyGoldContainers = (bagsGraph: number[][], bagsList: string[]) => {
    const shinyGoldBagIndex = getBagIndex(bagsList, 'shiny gold');
    // console.log('shiny gold index: ', shinyGoldBagIndex);

    let containerBagsMap: Record<string, { firstTime: boolean; }> = {};

    bagsGraph.forEach((list, listIndex) => {
        if (list[shinyGoldBagIndex] > 0) {
            containerBagsMap[bagsList[listIndex]] = { firstTime: true };
        }
    });

    let shouldSearchMore = true;
    while (shouldSearchMore) {
        // console.table(containerBagsMap);

        Object.entries(containerBagsMap).forEach(([bag, { firstTime }]) => {

            if (!firstTime) {
                return;
            }

            containerBagsMap[bag] = { firstTime: false };

            const bagIndex = getBagIndex(bagsList, bag);

            bagsGraph.forEach((list, listIndex) => {
                if (list[bagIndex] > 0) {
                    containerBagsMap[bagsList[listIndex]] = { firstTime: true };
                }
            });
        });

        shouldSearchMore = Object.entries(containerBagsMap).filter(([bag, { firstTime }]) => {
            return firstTime;
        }).length > 0;
    }


    const totalContainers = Object.entries(containerBagsMap).length;
    console.log(`Total containers : ${totalContainers}`);
    return totalContainers;
}