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

export function startFetchLayers() {
    return {
        type: 'START_FETCH_LAYERS',
        payload: {
            fetching: true,
            error: false,
        },
    };
}

export function finishFetchLayers(data) {
    return {
        type: 'FINISH_FETCH_LAYERS',
        payload: {
            fetching: false,
            error: false,
            data,
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
