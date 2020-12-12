import fs from 'fs';
import path from 'path';

export interface Action {
    type: 'E' | 'N' | 'S' | 'W' | 'L' | 'R' | 'F';
    val: number;
}

export interface Location {
    lat: number;
    long: number;
}

export interface ShipState {
    degrees: number;
    location: Location;
}

export const getInput = async (): Promise<Action[]> => {
    const inputText = await fs.promises.readFile(path.join(__dirname, `../../inputs/day12/input.txt`), `utf-8`);
    return inputText.split(`\n`)
        .filter(line => line.trim() !== '')
        .map(line => line.split(`\r`)[0])
        .map(line => ({
            type: <Action['type']>line.slice(0, 1),
            val: parseInt(line.slice(1)),
        }));
}

export const getManhattanDistance = (shipState: ShipState) => {
    const { location: { lat, long } } = shipState;
    return Math.abs(lat) + Math.abs(long);
}