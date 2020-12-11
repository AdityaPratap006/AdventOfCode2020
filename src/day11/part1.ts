import { getInput, getAdjacentSeats, Coordinates, compareSeatTables, countOccupiedSeats } from './helpers';

const applyRules = (seatTable: string[][], seatCoords: Coordinates) => {
     const seat = seatTable[seatCoords.x][seatCoords.y];

    const adajacentSeats = getAdjacentSeats(seatTable.length, seatTable[0].length, seatCoords);
    const occupiedSeats = adajacentSeats.filter(adjCoords => {
        const adjSeat = seatTable[adjCoords.x][adjCoords.y];
        return adjSeat === '#';
    });

    let stateChanged = false;
    let newState = seat;
    if (seat === 'L' && occupiedSeats.length === 0) {
        newState = '#';
        stateChanged = true;
        // console.log(occupiedSeats);
        // console.log('seat becomes occupied!', seatCoords);
    } else if (occupiedSeats.length >= 4) {
        newState = 'L';
        stateChanged = true;
        // console.log(occupiedSeats);
        // console.log('seat becomes empty!');
    }

    return { stateChanged, newState };
}

export const solutionPart1 = async () => {
    const seatTable = await getInput();
    // console.table(seatTable);

    let currentStateOfTable = seatTable.map(row => [...row]);
    let prevStateOfTable = seatTable.map(row => [...row]);

    let stabilityAchieved = false;

    while (!stabilityAchieved) {
        prevStateOfTable.forEach((row, x) => {
            row.forEach((seat, y) => {
                if (seat === '.') {
                    return;
                }
    
                const { newState } = applyRules(prevStateOfTable, { x, y });
                currentStateOfTable[x][y] = newState;
            });
        });

        if (compareSeatTables(prevStateOfTable, currentStateOfTable)) {
            stabilityAchieved = true;
        }

        prevStateOfTable = currentStateOfTable.map(row => [...row]);
    
        // console.table(currentStateOfTable);
    }

    // console.log(`--- finally ---`);
    // console.table(currentStateOfTable);

    const occupiedSeats = countOccupiedSeats(currentStateOfTable);
    console.log('Total occupied seats:', occupiedSeats);
}
