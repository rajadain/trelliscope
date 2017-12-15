const initial = {
    header: {
        loading: false,
        progress: 0,
    },
    login: {
        awsAccessKeyId: null,
        awsSecretAccessKey: null,
        s3Path: null,
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
        operation: null,
        index: null,
        data: [],
    },
    layerNames: {
        fetching: false,
        error: false,
        data: [],
    },
};

function header(state = initial.header, { type, payload }) {
    switch(type) {
        case 'START_QUERY_LAYER':
        case 'START_FETCH_LAYERS':
            return Object.assign({}, state, {
                loading: true,
                progress: 0,
            });
        case 'ERROR_QUERY_LAYER':
        case 'FINISH_QUERY_LAYER':
        case 'ERROR_FETCH_LAYERS':
        case 'FINISH_FETCH_LAYERS':
            return Object.assign({}, state, {
                loading: false,
                progress: 100,
            });
        case 'TICK_PROGRESS_BAR':
            if (state.loading) {
                return Object.assign({}, state, {
                    progress: state.progress * payload.multiplier
                });
            }

            return state;
        default:
            return state;
    }
}

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
    let data, layer, targetIndex;
    switch(type) {
        case 'START_QUERY_LAYER':
        case 'ERROR_QUERY_LAYER':
            return Object.assign({}, state, payload);
        case 'FINISH_QUERY_LAYER':
            layer = {
                title: payload.title,
                geojson: payload.geojson,
                color: '#E57373',
                hidden: false,
            };

            data = state.data.slice();
            data.splice(data.length, 0, layer);

            return Object.assign({}, state,
                                 { fetching: false,
                                   error: false,
                                   operation: 'ADD',
                                   index: data.length - 1,
                                   data });
        case 'REMOVE_QUERY_LAYER':
            data = state.data.filter((item, index) => {
                if (item.title === payload.title) {
                    targetIndex = index;
                    return false;
                } else {
                    return true;
                }
            });

            return Object.assign({}, state,
                                 { operation: 'REMOVE',
                                   index: targetIndex,
                                   data });
        case 'CLEAR_LAYER':
            data = state.data.filter((item, index) => {
                return index !== payload.index;
            });

            return Object.assign({}, state,
                                 { operation: 'REMOVE',
                                   index: payload.index,
                                   data });
        case 'SET_LAYER_COLOR':
            data = state.data.map((item, index) => {
                if (index === payload.index) {
                    item.color = payload.color;
                }

                return item;
            });

            return Object.assign({}, state,
                                 { operation: 'UPDATE',
                                   index: payload.index,
                                   data });
        case 'TOGGLE_LAYER_VISIBILITY':
            data = state.data.map((item, index) => {
                if (index === payload.index) {
                    item.hidden = !item.hidden;
                }

                return item;
            });

            return Object.assign({}, state,
                                 { operation: 'UPDATE',
                                   index: payload.index,
                                   data });
        case 'FINISH_MAP_ADJUSTMENT':
            return Object.assign({}, state, { operation: null, index: null });
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
                    return { title: item.title, active: true };
                }

                return item;
            });

            return Object.assign({}, state, { data });
        case 'REMOVE_QUERY_LAYER':
            data = state.data.map((item, index) => {
                if (index === payload.index) {
                    return { title: item.title, active: false };
                }

                return item;
            });

            return Object.assign({}, state, { data });
        case 'CLEAR_LAYER':
            data = state.data.map((item, index) => {
                if (item.title === payload.title) {
                    return { title: item.title, active: false };
                }

                return item;
            });

            return Object.assign({}, state, { data });
        default:
            return state;
    }
}

export default { header, login, shape, layers, layerNames };
