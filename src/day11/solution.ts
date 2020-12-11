import { solutionPart1 } from './part1';
import { solutionPart2 } from './part2';
// import { test } from './test';

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();

    // console.log(`--- testing: ---`);
    // await test();
}