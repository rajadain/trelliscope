const initial = {
    login: {
        awsAccessKeyId: null,
        awsSecretAccessKey: null,
        bucketName: null,
    },
    shape: {
        title: 'Shape',
        geojson: null,
        color: '#FFEE58',
        hidden: false,
        draw: false,
    },
    layers: [],
    layerNames: {
        fetching: false,
        error: false,
        data: [],
    },
};

function login(state = initial.login, { type, payload }) {
    switch(type) {
        case 'SET_CREDENTIALS':
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

function shape(state = initial.shape, { type, payload }) {
    switch(type) {
        case 'CLEAR_SHAPE':
        case 'UPLOAD_SHAPE':
        case 'SET_SHAPE_COLOR':
        case 'START_DRAWING':
        case 'CANCEL_DRAWING':
        case 'FINISH_DRAWING':
            return Object.assign({}, state, payload);
        case 'TOGGLE_SHAPE_VISIBILITY':
            return Object.assign({}, state, { hidden: !state.hidden });
        default:
            return state;
    }
}

function layers(state = initial.layers, { type, payload }) {
    switch(type) {
        default:
            return state;
    }
}

function layerNames(state = initial.layerNames, { type, payload }) {
    switch(type) {
        case 'START_FETCH_LAYERS':
        case 'FINISH_FETCH_LAYERS':
        case 'ERROR_FETCH_LAYERS':
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export default { login, shape, layers, layerNames };
