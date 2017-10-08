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
    layers: {
        fetching: false,
        error: false,
        data: [],
    },
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
    let data, layer;
    switch(type) {
        case 'START_QUERY_LAYER':
        case 'ERROR_QUERY_LAYER':
            return Object.assign({}, state, payload);
        case 'FINISH_QUERY_LAYER':
            layer = {
                title: payload.name,
                geojson: payload.geojson,
                color: '#E57373',
                hidden: false,
            };

            data = state.data.slice();
            data.splice(data.length, 0, layer);

            return Object.assign({}, state,
                                 { fetching: false, error: false, data });
        case 'CLEAR_LAYER':
            data = state.data.filter((item, index) => {
                return index !== payload.index;
            });

            return Object.assign({}, state, { data });
        case 'SET_LAYER_COLOR':
            data = state.data.map((item, index) => {
                if (index === payload.index) {
                    item.color = payload.color;
                }

                return item;
            });

            return Object.assign({}, state, { data });
        case 'TOGGLE_LAYER_VISIBILITY':
            data = state.data.map((item, index) => {
                if (index === payload.index) {
                    item.hidden = !item.hidden;
                }

                return item;
            });

            return Object.assign({}, state, { data });
        default:
            return state;
    }
}

function layerNames(state = initial.layerNames, { type, payload }) {
    let data;
    switch(type) {
        case 'START_FETCH_LAYERS':
        case 'FINISH_FETCH_LAYERS':
        case 'ERROR_FETCH_LAYERS':
            return Object.assign({}, state, payload);
        case 'FINISH_QUERY_LAYER':
            data = state.data.map((item, index) => {
                if (index === payload.index) {
                    return { name: item.name, active: true };
                }

                return item;
            });

            return Object.assign({}, state, { data });
        case 'REMOVE_QUERY_LAYER':
            data = state.data.map((item, index) => {
                if (index === payload.index) {
                    return { name: item.name, active: false };
                }

                return item;
            });

            return Object.assign({}, state, { data });
        default:
            return state;
    }
}

export default { login, shape, layers, layerNames };
