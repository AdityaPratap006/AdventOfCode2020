import fs from 'fs';
import path from 'path';
import { getOccupiedSeatsInAllDirections } from './helpers';

const getInput = async () => {
    const inputText = await fs.promises.readFile(path.join(__dirname, `../../inputs/day11/testInput1.txt`), `utf-8`);
    return inputText.split(`\n`)
        .filter(text => text.trim() !== '')
        .map(text => text.split('').filter(char => char !== '\r'));
}


export const test = async () => {
    const seatTable = await getInput();
    console.table(seatTable);


    seatTable.forEach((row, x) => {
        row.forEach((seat, y) => {
            if (seat === '.') {
                return;
            }

            const occupiedSeats = getOccupiedSeatsInAllDirections(seatTable, { x, y });
            console.log(occupiedSeats, { x, y });
        });
    });
}


