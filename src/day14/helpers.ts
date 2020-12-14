import fs from 'fs';
import path from 'path';
// import util from 'util';

export interface Instruction {
    mem: string;
    val: number;
}

export interface Segment {
    mask: string;
    instructions: Instruction[];
}

export const getInput = async (): Promise<Segment[]> => {
    const inputText = await fs.promises.readFile(path.join(__dirname, `../../inputs/day14/input.txt`), `utf-8`);

    return inputText
        .split(`\nmask = `)
        .map(segment => segment
            .split(/mask = |\n/)
            .filter(line => line.trim() !== '')
        ).map(segment => ({
            mask: segment[0],
            instructions: segment.slice(1).map(inst => {
                const arr = inst.split(/mem\[|\] = /);
                return {
                    mem: arr[1],
                    val: parseInt(arr[2]),
                };
            })
        }));
}

export const reverseString = (str: string) => {
    return str.split('').reverse().join('');
}

export const get32BitString = (val: number) => {
    let binaryVal = '';

    let tempVal = val;
    while (tempVal > 0) {
        const bit = tempVal & 1;
        binaryVal = (bit + binaryVal);
        tempVal = tempVal >> 1;
    }

    const totalBits = binaryVal.length;
    for (let i = 0; i < 36 - totalBits; ++i) {
        binaryVal = '0' + binaryVal;
    }

    return binaryVal;
}

export const getDecimalFrom32BitString = (binary: string) => {
    let val = 0;
    const reverseBinaryString = reverseString(binary);

    for (let power = 0; power < 36; ++power) {
        const bit = parseInt(reverseBinaryString[power])
        val += (bit * Math.pow(2, power));
    }

    return val;
}