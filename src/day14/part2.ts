import { getInput, get32BitString, getDecimalFrom32BitString, reverseString, Segment } from './helpers';

const generateAllCombinations = (binaryString: string, pos: number, combinations: string[]): string[] => {
    if (pos === 36) {
        // console.log(binaryString);
        return [...combinations, binaryString];
    }

    if (binaryString[pos] !== 'X') {
        const subCombination = generateAllCombinations(binaryString, pos + 1, combinations);
        return [...combinations, ...subCombination];
    } else {
        const string1 = binaryString.slice(0, pos) + '0' + binaryString.slice(pos + 1);
        const string2 = binaryString.slice(0, pos) + '1' + binaryString.slice(pos + 1);

        const subCombination1 = generateAllCombinations(string1, pos + 1, combinations);
        const subCombination2 = generateAllCombinations(string2, pos + 1, combinations);
        return [...combinations, ...subCombination1, ...subCombination2];
    }

}

const getMemoryLocations = (binaryString: string): string[] => {
    const combinations = generateAllCombinations(binaryString, 0, []);

    return combinations.map(binary => `${getDecimalFrom32BitString(binary)}`);
}

const executeInstruction2 = (mask: string, mem: string) => {
    const memoryVal = parseInt(mem);

    const binaryString = get32BitString(memoryVal);
    let reverseBinaryString = reverseString(binaryString);
    const reverseMask = reverseString(mask);

    const maskArray = [...reverseMask];
    const binaryArray = [...reverseBinaryString];

    for (let pos = 0; pos < 36; ++pos) {
        if (maskArray[pos] === '0') {
            continue;
        }

        const bit = maskArray[pos];

        binaryArray[pos] = bit;
    }

    const actualBinaryString = binaryArray.reverse().join('');
    // console.log(actualBinaryString);

    const memories = getMemoryLocations(actualBinaryString);

    return memories;
}

const completeInitializationProgram2 = (segments: Segment[]) => {
    const memoryMap = new Map<string, number>();

    segments.forEach(segment => {
        const { mask, instructions } = segment;

        instructions.forEach(instruction => {
            const memories = executeInstruction2(mask, instruction.mem);

            memories.forEach(memory => {
                memoryMap.set(memory, instruction.val);
            });
        });
    });

    let sum = 0;

    memoryMap.forEach(val => {
        sum += val;
    });

    return sum;
}

export const solutionPart2 = async () => {
    const segments = await getInput();

    const sum = completeInitializationProgram2(segments);
    console.log(`Sum:`, sum);
}