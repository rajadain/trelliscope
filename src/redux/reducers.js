const initial = {
    login: {
        awsAccessKeyId: null,
        awsSecretAccessKey: null,
    },
    main: {
        polygon: {
            title: 'Shape',
            shape: null,      // GeoJSON
            color: '#FFEE58',
            hidden: false,
        },
        layers: [],
    }
};

export function login(state = initial.login, { type, payload }) {
    switch(type) {
        case 'SET_CREDENTIALS':
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

export function main(state = initial.main, { type, payload }) {
    switch(type) {
        default:
            return state;
    }
}
