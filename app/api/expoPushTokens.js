import client from './client';

const register = (pushToken) => client.post('auth/setExpoToken', { token: pushToken });

export default {
       register,
};