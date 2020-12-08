import fs from 'fs';
import path from 'path';
// import util from 'util';

interface Instruction {
    op: string;
    arg: number;
}

const getInput = async (): Promise<Instruction[]> => {
    const inputText = await fs.promises.readFile(path.join(__dirname, '../../inputs/day8/input.txt'), 'utf-8');
    return inputText.split('\n').map(instruction => instruction.split(' ')).map(([op, arg]) => {
        return { op, arg: parseInt(arg) };
    });
}

const processInstructions = (instructions: Instruction[]) => {
    // console.log(instructions);

    let accumulator = 0;
    let line = 0
    let lastLine = -1;
    const lineSet = new Set<number>();
    let didRepeat = false;
    while (line < instructions.length) {

        if (lineSet.has(line)) {
            didRepeat = true;
            break;
        }

        lineSet.add(line);

        const currentInstruction = instructions[line];
        // console.log(`line: ${line}, acc: ${accumulator}, inst: ${util.inspect(currentInstruction, { depth: 10, colors: true })}`);
        switch (currentInstruction.op) {
            case 'acc':
                accumulator += currentInstruction.arg;
                lastLine = line;
                ++line;
                break;
            case 'jmp':
                lastLine = line;
                line += currentInstruction.arg;
                break;
            case 'nop':
            default:
                lastLine = line;
                ++line;
                break;
        }
    }

    // console.log(`Finally!`);
    // console.log(`line: ${line}, acc: ${accumulator}, inst: ${util.inspect(instructions[line], { depth: 10, colors: true })}`);
    return { didRepeat, accumulator, lastLineBeforeRepeat: lastLine, lastInstruction: instructions[lastLine] };
}

const solutionPart1 = async () => {
    const instructions = await getInput();

    const { accumulator } =  processInstructions(instructions);

    console.log(`Accumulator: ${accumulator}`);
}

const repairInstructions = (instructions: Instruction[]) => {
    // console.log(instructions);

    const filteredInstructions = instructions.filter(inst => inst.op === 'nop' || (inst.op === 'jmp' && inst.arg < 0));

    // console.log(filteredInstructions);

    let repairedAccumulator = 0;

    filteredInstructions.every(filteredInstruction => {
        
        const { didRepeat, accumulator } = processInstructions(instructions.map(inst => {
            if (inst.op === filteredInstruction.op) {
                if (inst.op === 'nop') {
                    return { op: 'jmp', arg: inst.arg }
                } else if (inst.op === 'jmp' && inst.arg === filteredInstruction.arg) {
                    return { op: 'nop', arg: inst.arg }
                }
            }

            return inst;
        }));

        // console.log(didRepeat, accumulator, lastInstruction, lastLineBeforeRepeat);
        repairedAccumulator = accumulator;
        return didRepeat;
    });

    console.log(`Repaired Accumulator: ${repairedAccumulator}`);
}


const solutionPart2 = async () => {
    const instructions = await getInput();

    repairInstructions(instructions);
}

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}