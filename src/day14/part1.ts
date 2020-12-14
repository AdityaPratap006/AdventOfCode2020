import { Segment, get32BitString, getDecimalFrom32BitString, reverseString, getInput } from './helpers';

const executeInstruction1 = (mask: string, val: number) => {
    const binaryString = get32BitString(val);
    let reverseBinaryString = reverseString(binaryString);
    const reverseMask = reverseString(mask);

    const maskArray = [...reverseMask];
    const binaryArray = [...reverseBinaryString];

    for (let pos = 0; pos < 36; ++pos) {
        if (maskArray[pos] === 'X') {
            continue;
        }

        const bit = maskArray[pos];

        binaryArray[pos] = bit;
    }


    const actualBinaryString = binaryArray.reverse().join('');
    const maskedVal = getDecimalFrom32BitString(actualBinaryString);

    return maskedVal;
}

const completeInitializationProgram1 = (segments: Segment[]) => {
    const memoryMap = new Map<string, number>();

    segments.forEach(segment => {
        const { mask, instructions } = segment;

        instructions.forEach(instruction => {
            const newVal = executeInstruction1(mask, instruction.val);
            memoryMap.set(instruction.mem, newVal);
        });
    });

    let sum = 0;

    memoryMap.forEach(val => {
        sum += val;
    });

    return sum;
}

export const solutionPart1 = async () => {
    const segments = await getInput();

    const sum = completeInitializationProgram1(segments);
    console.log(`Sum:`, sum);
}
