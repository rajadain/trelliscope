const initial = {
    login: {
        awsAccessKeyId: null,
        awsSecretAccessKey: null,
    },
    main: {
        polygon: null,
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
