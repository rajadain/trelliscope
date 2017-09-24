import { push } from 'react-router-redux';

export { push as navigateTo };

export function setCredentials(awsAccessKeyId, awsSecretAccessKey) {
    return {
        type: 'SET_CREDENTIALS',
        payload: {
            awsAccessKeyId,
            awsSecretAccessKey,
        },
    };
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
