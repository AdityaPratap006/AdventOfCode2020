import fs from 'fs';
import path from 'path';

export const getInput = async () => {
    const inputText = await fs.promises.readFile(path.join(__dirname, `../../inputs/day11/input.txt`), `utf-8`);
    return inputText.split(`\n`)
        .filter(text => text.trim() !== '')
        .map(text => text.split('').filter(char => char !== '\r'));
}

export interface Coordinates {
    x: number;
    y: number;
}

enum SeatRegion {
    TopLeft = 'TL',
    TopRight = 'TR',
    BottomLeft = 'BL',
    BottomRight = 'BR',
    Top = 'T',
    Left = 'L',
    Bottom = 'B',
    Right = 'R',
    Inside = 'I',
}

const getSeatRegion = (length: number, width: number, seatCoords: Coordinates): SeatRegion => {
    const { x, y } = seatCoords;

    if (x === 0) {
        if (y === 0) {
            return SeatRegion.TopLeft;
        }

        if (y === width - 1) {
            return SeatRegion.TopRight;
        }

        return SeatRegion.Top;
    }

    if (x === length - 1) {
        if (y === 0) {
            return SeatRegion.BottomLeft;
        }

        if (y === width - 1) {
            return SeatRegion.BottomRight;
        }

        return SeatRegion.Bottom;
    }

    if (y === 0) {
        return SeatRegion.Left;
    }

    if (y === width - 1) {
        return SeatRegion.Right;
    }

    return SeatRegion.Inside;
}

export const getAdjacentSeats = (length: number, width: number, seatCoords: Coordinates): Coordinates[] => {
    const { x, y } = seatCoords;
    const region = getSeatRegion(length, width, seatCoords);

    switch (region) {
        case SeatRegion.TopLeft:
            return [
                { x: x, y: y + 1 },
                { x: x + 1, y: y + 1 },
                { x: x + 1, y: y },
            ];
        case SeatRegion.TopRight:
            return [
                { x: x, y: y - 1 },
                { x: x + 1, y: y - 1 },
                { x: x + 1, y: y },
            ];
        case SeatRegion.Top:
            return [
                { x: x, y: y - 1 },
                { x: x + 1, y: y - 1 },
                { x: x + 1, y: y },
                { x: x + 1, y: y + 1 },
                { x: x, y: y + 1 },
            ];
        case SeatRegion.BottomLeft:
            return [
                { x: x, y: y + 1 },
                { x: x - 1, y: y + 1 },
                { x: x - 1, y: y },
            ];
        case SeatRegion.BottomRight:
            return [
                { x: x, y: y - 1 },
                { x: x - 1, y: y - 1 },
                { x: x - 1, y: y },
            ];
        case SeatRegion.Bottom:
            return [
                { x: x, y: y - 1 },
                { x: x - 1, y: y - 1 },
                { x: x - 1, y: y },
                { x: x - 1, y: y + 1 },
                { x: x, y: y + 1 },
            ];
        case SeatRegion.Left:
            return [
                { x: x - 1, y: y },
                { x: x - 1, y: y + 1 },
                { x: x, y: y + 1 },
                { x: x + 1, y: y + 1 },
                { x: x + 1, y: y },
            ];
        case SeatRegion.Right:
            return [
                { x: x - 1, y: y },
                { x: x - 1, y: y - 1 },
                { x: x, y: y - 1 },
                { x: x + 1, y: y - 1 },
                { x: x + 1, y: y },
            ];
        case SeatRegion.Inside:
        default:
            return [
                { x: x - 1, y: y - 1 },
                { x: x - 1, y: y },
                { x: x - 1, y: y + 1 },
                { x: x, y: y - 1 },
                { x: x + 1, y: y - 1 },
                { x: x + 1, y: y },
                { x: x + 1, y: y + 1 },
                { x: x, y: y + 1 },
            ];
    }
}

export const getOccupiedSeatsInAllDirections = (seatTable: string[][], seatCoords: Coordinates): Coordinates[] => {
    const occupiedSeats: Coordinates[] = [];
    // get in left direction
    for (let y = seatCoords.y - 1; y >= 0; --y) {
        if (seatTable[seatCoords.x][y] === 'L') {
            break;
        }

        if (seatTable[seatCoords.x][y] === '#') {
            occupiedSeats.push({ x: seatCoords.x, y: y });
            break;
        }
    }

    // get in right direction
    for (let y = seatCoords.y + 1; y < seatTable[0].length; ++y) {
        if (seatTable[seatCoords.x][y] === 'L') {
            break;
        }

        if (seatTable[seatCoords.x][y] === '#') {
            occupiedSeats.push({ x: seatCoords.x, y: y });
            break;
        }
    }

    // get in top direction
    for (let x = seatCoords.x - 1; x >= 0; --x) {
        if (seatTable[x][seatCoords.y] === 'L') {
            break;
        }

        if (seatTable[x][seatCoords.y] === '#') {
            occupiedSeats.push({ x: x, y: seatCoords.y });
            break;
        }
    }

    // get in bottom direction
    for (let x = seatCoords.x + 1; x < seatTable.length; ++x) {
        if (seatTable[x][seatCoords.y] === 'L') {
            break;
        }

        if (seatTable[x][seatCoords.y] === '#') {
            occupiedSeats.push({ x: x, y: seatCoords.y });
            break;
        }
    }

    // get in top left direction
    for (let x = seatCoords.x - 1, y = seatCoords.y - 1; x >= 0 && y >= 0; --x, --y) {
        if (seatTable[x][y] === 'L') {
            break;
        }

        if (seatTable[x][y] === '#') {
            occupiedSeats.push({ x: x, y: y });
            break;
        }
    }

    // get in top right direction
    for (let x = seatCoords.x - 1, y = seatCoords.y + 1; x >= 0 && y < seatTable[0].length; --x, ++y) {
        if (seatTable[x][y] === 'L') {
            break;
        }

        if (seatTable[x][y] === '#') {
            occupiedSeats.push({ x: x, y: y });
            break;
        }
    }

    // get in bottom left direction
    for (let x = seatCoords.x + 1, y = seatCoords.y - 1; x < seatTable.length && y >= 0; ++x, --y) {
        if (seatTable[x][y] === 'L') {
            break;
        }
        
        if (seatTable[x][y] === '#') {
            occupiedSeats.push({ x: x, y: y });
            break;
        }
    }

    // get in bottom right direction
    for (let x = seatCoords.x + 1, y = seatCoords.y + 1; x < seatTable.length && y < seatTable[0].length; ++x, ++y) {
        if (seatTable[x][y] === 'L') {
            break;
        }
        
        if (seatTable[x][y] === '#') {
            occupiedSeats.push({ x: x, y: y });
            break;
        }
    }

    return occupiedSeats;
}


export const compareSeatTables = (prev: string[][], current: string[][]) => {
    for (let x = 0; x < current.length; ++x) {
        for (let y = 0; y < current[x].length; ++y) {
            if (prev[x][y] !== current[x][y]) {
                return false;
            }
        }
    }

    return true;
} 

export const countOccupiedSeats = (seatTable: string[][]) => {
    let count = 0;

    seatTable.forEach(row => {
        row.forEach(seat => {
            if (seat === '#') {
                ++count;
            }
        })
    });

    return count;
}