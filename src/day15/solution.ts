const getStartingNumbers = () => [1, 17, 0, 10, 18, 11, 6];

interface Occurrence {
    recent: number;
    prevRecent?: number;
}

class Cache {
    private _map: Map<number, Occurrence>;

    constructor() {
        this._map = new Map<number, Occurrence>();
    }

    get map() {
        return this._map;
    }

    insert(val: number, turn: number) {
        const occurrence = this._map.get(val);

        if (occurrence) {
            const prev = occurrence.recent;

            this._map.set(val, {
                recent: turn,
                prevRecent: prev,
            });

        } else {
            this._map.set(val, {
                recent: turn,
            });
        }
    }

    getTurnDifference(val: number) {
        const occurrence = this._map.get(val);

        if (!occurrence) {
            return -1;
        }

        if (!occurrence.prevRecent) {
            return 0;
        }

        return occurrence.recent - occurrence.prevRecent;
    }
}

const getValueAtTurn = (finalTurnNumber: number) => {
    const startingNumbers = getStartingNumbers();

    const turns = new Array(finalTurnNumber + 1).fill(0);

    startingNumbers.forEach((num, idx) => {
        turns[idx + 1] = num;
    });

    const cache = new Cache();

    turns.forEach((val, turnNumber) => {
        if (turnNumber === 0) {
            return;
        }

        if (turnNumber <= startingNumbers.length) {
            cache.insert(val, turnNumber);
            return;
        }

        const lastVal = turns[turnNumber - 1];
        const currentVal = cache.getTurnDifference(lastVal);
        cache.insert(currentVal, turnNumber);
        turns[turnNumber] = currentVal;
    });

    //  turns.forEach((val, turnNumber) => {
    //      console.log({ turn: turnNumber, val: val });
    //  });

    console.log(`Turn ${finalTurnNumber}:`, turns[finalTurnNumber]);
}

const solutionPart1 = () => {
    getValueAtTurn(2020);
}

const solutionPart2 = () => {
    getValueAtTurn(30_000_000);
}

export const solution = () => {
    console.log(`--- part: 1 ---`);
    solutionPart1();

    console.log(`--- part: 2 ---`);
    solutionPart2();
}