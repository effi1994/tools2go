import client from './client';

const endpoint = '/auth/signup';
const endpoint2 = '/users';

const register = (user) => client.post(endpoint, user);

const getUserProfile = () => client.get(endpoint2 + '/user-profile');

const editUserProfile = (user) => client.post(endpoint2 + '/update-user-profile', user);


export default {
       register,
       getUserProfile,
       editUserProfile
};