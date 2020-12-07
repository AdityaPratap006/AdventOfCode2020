// import util from 'util';
import { getBagIndex } from './helpers';

interface BagNode {
    amount: number;
    name: string;
    children: BagNode[];
}

const getBagTreeUtil = (bagsGraph: number[][], bagsList: string[], rootNode: BagNode) => {
    
    let nodeQueue: BagNode[] = [rootNode];

    while (nodeQueue.length) {
        let currentNode = nodeQueue.shift() as BagNode;

        currentNode.children.forEach((node) => {
            const bagIndex = getBagIndex(bagsList, node.name);
    
            bagsGraph[bagIndex].forEach((val, index) => {
                if (val > 0) {
                    const bag = bagsList[index];
                    // console.log(`pushing in ${bag}`)
                    node.children.push({
                        name: bag,
                        amount: val,
                        children: [],
                    });
                }
            });

            nodeQueue.push(node);
        });

    }

    return rootNode;
}

const getBagTree = (bagsGraph: number[][], bagsList: string[]) => {
    let shinyGoldBagTree: BagNode = {
        amount: 1,
        name: 'shiny gold',
        children: [],
    };

    const shinyGoldBagIndex = getBagIndex(bagsList, 'shiny gold');
    bagsGraph[shinyGoldBagIndex].forEach((val, index) => {
        if (val > 0) {
            const bag = bagsList[index];
            // console.log(bag, val);
            shinyGoldBagTree.children.push({
                amount: val,
                name: bag,
                children: [],
            });
        }
    });

    let fullTree = getBagTreeUtil(bagsGraph, bagsList, shinyGoldBagTree);
    
    // console.log(util.inspect(fullTree, { depth: 50, colors: true }));
    return fullTree;
}

const calculateTreeSum = (tree: BagNode) => {

    let sum = 0;

    tree.children.forEach(node => {
        const childrenSum = node.amount * calculateTreeSum(node);
        sum += node.amount + childrenSum;
    });

    return sum;
}

export const findCapacityOfShinyGoldBag = (bagsGraph: number[][], bagsList: string[]) => {

    const shinyGoldBagTree = getBagTree(bagsGraph, bagsList);

    const capacity = calculateTreeSum(shinyGoldBagTree);
    console.log(`Total capacity: ${capacity}`);
}
