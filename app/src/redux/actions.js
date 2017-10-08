import { push } from 'react-router-redux';

export { push as navigateTo };

export function setCredentials(awsAccessKeyId, awsSecretAccessKey, bucketName) {
    return {
        type: 'SET_CREDENTIALS',
        payload: {
            awsAccessKeyId,
            awsSecretAccessKey,
            bucketName,
        },
    };
}

export function startDrawing() {
    return {
        type: 'START_DRAWING',
        payload: {
            geojson: null,
            hidden: false,
            draw: true,
        }
    }
}

export function cancelDrawing() {
    return {
        type: 'CANCEL_DRAWING',
        payload: {
            title: 'Shape',
            draw: false,
        }
    }
}

export function finishDrawing(geojson) {
    return {
        type: 'FINISH_DRAWING',
        payload: {
            title: 'Drawn Shape',
            geojson,
            draw: false,
        }
    }
}

export function uploadShape(title, geojson) {
    return {
        type: 'UPLOAD_SHAPE',
        payload: {
            title,
            geojson,
        },
    };
}

export function clearShape() {
    return {
        type: 'CLEAR_SHAPE',
        payload: {
            title: 'Shape',
            geojson: null,
        },
    };
}

export function toggleShapeVisibility() {
    return {
        type: 'TOGGLE_SHAPE_VISIBILITY',
        payload: {},
    };
}

export function setShapeColor(color) {
    return {
        type: 'SET_SHAPE_COLOR',
        payload: {
            color,
        },
    };
}

export function clearLayer(index) {
    return {
        type: 'CLEAR_LAYER',
        payload: {
            index,
        },
    };
}

export function toggleLayerVisibility(index) {
    return {
        type: 'TOGGLE_LAYER_VISIBILITY',
        payload: {
            index,
        },
    };
}

export function setLayerColor(color, index) {
    return {
        type: 'SET_LAYER_COLOR',
        payload: {
            color,
            index,
        },
    };
}

export function startFetchLayers() {
    return {
        type: 'START_FETCH_LAYERS',
        payload: {
            fetching: true,
            error: false,
        },
    };
}

export function finishFetchLayers(names) {
    return {
        type: 'FINISH_FETCH_LAYERS',
        payload: {
            fetching: false,
            error: false,
            data: names.map(n => ({ name: n, active: false })),
        },
    };
}

export function errorFetchLayers() {
    return {
        type: 'ERROR_FETCH_LAYERS',
        payload: {
            fetching: false,
            error: true,
        },
    };
}

export function startQueryLayer(index) {
    return {
        type: 'START_QUERY_LAYER',
        payload: {
            fetching: true,
            error: false,
            index,
        },
    };
}

export function finishQueryLayer(index, name, geojson) {
    return {
        type: 'FINISH_QUERY_LAYER',
        payload: {
            fetching: false,
            error: false,
            index,
            name,
            geojson
        },
    };
}

export function errorQueryLayer(index) {
    return {
        type: 'ERROR_QUERY_LAYER',
        payload: {
            fetching: false,
            error: true,
            index,
        },
    };
}

export function finishMapAdjustment() {
    return {
        type: 'FINISH_MAP_ADJUSTMENT',
        payload: {},
    };
}
