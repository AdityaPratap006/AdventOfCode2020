import { ShipState,Action, getInput, getManhattanDistance } from './helpers';

const moveInDirection = (shipState: ShipState, direction: 'N' | 'S' | 'E' | 'W', val: number): ShipState => {
    const { location } = shipState;

    switch (direction) {
        case 'E': // East
            return {
                ...shipState,
                location: { lat: location.lat + val, long: location.long },
            };
        case 'S': // South
            return {
                ...shipState,
                location: { lat: location.lat, long: location.long - val },
            };
        case 'W': // West
            return {
                ...shipState,
                location: { lat: location.lat - val, long: location.long },
            };
        case 'N': // North
            return {
                ...shipState,
                location: { lat: location.lat, long: location.long + val },
            };
        default:
            return shipState;
    }
}

const moveShipForward = (shipState: ShipState, val: number): ShipState => {
    const { degrees } = shipState;
    switch (degrees) {
        case 90: // East
            return moveInDirection(shipState, 'E', val);
        case 180: // South
            return moveInDirection(shipState, 'S', val);
        case 270: // West
            return moveInDirection(shipState, 'W', val);
        case 0: // North
            return moveInDirection(shipState, 'N', val);
        default:
            return shipState;
    }
}

const steerShip = (shipState: ShipState, towards: 'L' | 'R', degrees: number): ShipState => {

    switch (towards) {
        case 'L':
            return {
                ...shipState,
                degrees: (shipState.degrees - degrees + 360) % 360,
            };
        case 'R':
            return {
                ...shipState,
                degrees: (shipState.degrees + degrees + 360) % 360,
            };
        default:
            return shipState;
    }
}

const completeManeuver = (shipState: ShipState, actions: Action[]): ShipState => {
    let currentShipState = { ...shipState };

    actions.forEach(action => {
        const { type, val } = action;

        switch (type) {
            case 'F':
                {
                    const newShipState = moveShipForward(currentShipState, val);
                    currentShipState = { ...newShipState };
                    break;
                }
            case 'E':
            case 'N':
            case 'W':
            case 'S':
                {
                    const newShipState = moveInDirection(currentShipState, type, val);
                    currentShipState = { ...newShipState };
                    break;
                }
            case 'L':
            case 'R':
                {
                    const newShipState = steerShip(currentShipState, type, val);
                    currentShipState = { ...newShipState };
                    break;
                }
            default:
                break;
        }
    });

    return currentShipState;
}

export const solutionPart1 = async () => {
    const shipState: ShipState = {
        degrees: 90,
        location: {
            lat: 0,
            long: 0,
        },
    };

    const actions = await getInput();
    console.log(`Initial Ship State:`, shipState);
    // console.log(actions);

    const finalShipState = completeManeuver(shipState, actions);
    console.log(`Final Ship State:`, finalShipState);

    const manhattanDistance = getManhattanDistance(finalShipState);
    console.log(`Manhattan distance:`, manhattanDistance);
}