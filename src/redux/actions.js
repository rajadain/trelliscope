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
