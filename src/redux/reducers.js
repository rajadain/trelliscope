const initial = {
    login: {
        awsAccessKeyId: null,
        awsSecretAccessKey: null,
    },
    shape: {
        title: 'Shape',
        geojson: null,
        color: '#FFEE58',
        hidden: false,
    },
    layers: [],
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

export default { login, shape, layers };
