import fs from 'fs';
import path from 'path';

const getInput = async () => {
    const input = await fs.promises.readFile(path.join(__dirname, "../../inputs/day6/input.txt"), "utf8");

    return input.split('\r\n\r\n').map(group => group.split('\r\n'));
}


const solutionPart1 = async () => {
    const input = await getInput();
    // console.log(input.slice(0, 10), input.length);

    let yesCount = 0;

    input.forEach(group => {
        const set = new Set<string>();
        group.forEach(answers => {
            answers.split('').forEach(answer => {
                set.add(answer);
            });
        });
        // console.log(`group count: ${set.size}`);
        yesCount += set.size;
    });

    console.log(`Total yes count : ${yesCount}`);
    return yesCount;
}

const solutionPart2 = async () => {
    const input = await getInput();
    // console.log(input.slice(0, 10), input.length);

    let yesCount = 0;

    input.forEach(group => {
        const aplhabetMap: number[][] = [];
        group.forEach(answers => {
            const sortedAnwsers = answers.split('').sort().join('');
            // console.log(sortedAnwsers);
            const alphabets = new Array(26).fill(0);
            
            sortedAnwsers.split('').forEach(answer => {
                alphabets[answer.charCodeAt(0) - 'a'.charCodeAt(0)]++;
            });

            aplhabetMap.push(alphabets);
        });
        // console.log(aplhabetMap);

        const aplhabetFreq = new Array(26).fill(0);
        aplhabetMap.forEach(aplhabets => {
            aplhabets.forEach((aplhabet, index) => {
                if (aplhabet) {
                    aplhabetFreq[index] += aplhabet;
                }
            });
        });

        const commonLettersCount = aplhabetFreq.filter(freq => freq === group.length).length;
        yesCount += commonLettersCount;
        // console.log(commonLettersCount);
        // console.log(`\n`);
    });

    console.log(`Total yes count : ${yesCount}`);
    return yesCount;
}

export const solution = async () => {
    console.log(`--- par: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}