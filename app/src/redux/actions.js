import { push } from 'react-router-redux';

export { push as navigateTo };

export function setCredentials(awsAccessKeyId, awsSecretAccessKey, s3Path) {
    return {
        type: 'SET_CREDENTIALS',
        payload: {
            awsAccessKeyId,
            awsSecretAccessKey,
            s3Path,
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

export function clearLayer(index, title) {
    return {
        type: 'CLEAR_LAYER',
        payload: {
            index,
            title,
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

export function finishFetchLayers(titles) {
    return {
        type: 'FINISH_FETCH_LAYERS',
        payload: {
            fetching: false,
            error: false,
            data: titles.map(n => ({ title: n, active: false })),
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

export function finishQueryLayer(index, title, geojson) {
    return {
        type: 'FINISH_QUERY_LAYER',
        payload: {
            fetching: false,
            error: false,
            index,
            title,
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

export function removeQueryLayer(index, title) {
    return {
        type: 'REMOVE_QUERY_LAYER',
        payload: {
            fetching: false,
            error: false,
            index,
            title,
        },
    };
}

export function finishMapAdjustment() {
    return {
        type: 'FINISH_MAP_ADJUSTMENT',
        payload: {},
    };
}

export function startProgressBar() {
    return {
        type: 'START_PROGRESS_BAR',
        payload: {
            loading: true,
            progress: 0,
        }
    };
}

export function tickProgressBar(multiplier = 1.25) {
    return {
        type: 'TICK_PROGRESS_BAR',
        payload: {
            multiplier
        }
    };
}

export function finishProgressBar() {
    return {
        type: 'FINISH_PROGRESS_BAR',
        payload: {
            loading: false,
            progress: 100,
        }
    };
}
