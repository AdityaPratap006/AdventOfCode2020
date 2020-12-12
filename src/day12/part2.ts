import { ShipState, Action, getInput, getManhattanDistance, Location } from './helpers';

const moveWaypoint = (waypoint: ShipState, direction: 'N' | 'S' | 'E' | 'W', val: number): ShipState => {
    switch (direction) {
        case 'E':
            return {
                ...waypoint,
                location: {
                    lat: waypoint.location.lat + val,
                    long: waypoint.location.long,
                }
            };
        case 'N':
            return {
                ...waypoint,
                location: {
                    lat: waypoint.location.lat,
                    long: waypoint.location.long + val,
                }
            };
        case 'S':
            return {
                ...waypoint,
                location: {
                    lat: waypoint.location.lat,
                    long: waypoint.location.long - val,
                }
            };
        case 'W':
            return {
                ...waypoint,
                location: {
                    lat: waypoint.location.lat - val,
                    long: waypoint.location.long,
                }
            };
        default:
            return waypoint;
    }
}

// const getDirection = (degrees: number): 'E' | 'W' | 'N' | 'S' => {
//     switch (degrees) {
//         case 90:
//             return 'E';
//         case 180:
//             return 'S';
//         case 270:
//             return 'W';
//         case 0:
//             return 'N';
//         default:
//             return 'E';
//     }
// }

const rotateWaypoint = (waypoint: ShipState, degrees: number, rotation: -1 | 1) => {

    const finalDegrees = (waypoint.degrees + (degrees * rotation) + 360) % 360

    switch (degrees) {
        case 90:
            return {
                degrees: finalDegrees,
                location: {
                    lat: rotation * waypoint.location.long,
                    long: -1 * rotation * waypoint.location.lat,
                }
            };
        case 180:
            return {
                degrees: finalDegrees,
                location: {
                    lat: -waypoint.location.lat,
                    long: -waypoint.location.long,
                }
            }
        case 270:
            return {
                degrees: finalDegrees,
                location: {
                    lat: -1 * rotation * waypoint.location.long,
                    long: rotation * waypoint.location.lat,
                }
            };
        case 0:
        default:
            return waypoint;
    }
}

const steerWaypoint = (waypoint: ShipState, towards: 'L' | 'R', degrees: number): ShipState => {

    switch (towards) {
        case 'L':
            return rotateWaypoint(waypoint, degrees, -1);
        case 'R':
            return rotateWaypoint(waypoint, degrees, 1);
        default:
            return waypoint;
    }
}

const moveForward = (shipState: ShipState, waypoint: ShipState, val: number): ShipState => {
    return {
        ...shipState,
        location: {
            lat: shipState.location.lat + (waypoint.location.lat * val),
            long: shipState.location.long + (waypoint.location.long * val),
        }
    };
}

const completeManeuver = (shipState: ShipState, waypoint: ShipState, actions: Action[]): {
    shipState: ShipState;
    waypoint: ShipState;
} => {
    let currentShipState = { ...shipState };
    let currentWaypoint = { ...waypoint };

    actions.forEach(action => {
        const { type, val } = action;
        switch (type) {
            case 'F':
                {
                    const newShipState = moveForward(currentShipState, currentWaypoint, val);
                    currentShipState = { ...newShipState };
                    break;
                }
            case 'E':
            case 'N':
            case 'W':
            case 'S':
                {
                    const newWaypoint = moveWaypoint(currentWaypoint, type, val);
                    currentWaypoint = { ...newWaypoint };
                    break;
                }
            case 'L':
            case 'R':
                {
                    const newWaypoint = steerWaypoint(currentWaypoint, type, val);
                    currentWaypoint = { ...newWaypoint };
                    break;
                }
            default:
                break;
        }
    });

    return {
        shipState: currentShipState,
        waypoint: currentWaypoint,
    }
}

export const solutionPart2 = async () => {
    const initialShipState: ShipState = {
        degrees: 90,
        location: {
            lat: 0,
            long: 0,
        },
    };

    const initalWaypoint: ShipState = {
        degrees: 90,
        location: {
            lat: 10,
            long: 1,
        },
    };

    console.log(`Initial Ship State:`, initialShipState);
    console.log(`Initial Waypoint:`, initalWaypoint);

    const actions = await getInput();

    const { shipState : finalShipState, waypoint: finalWaypoint } = completeManeuver(initialShipState, initalWaypoint, actions);
    console.log(`Final Ship State:`, finalShipState);
    console.log(`Final Waypoint:`, finalWaypoint);

    const manhattanDistance = getManhattanDistance(finalShipState);
    console.log(`Manhattan distance:`, manhattanDistance);
}