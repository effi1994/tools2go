import client from './client';

const login = (email, password) => client.post('/auth/login', { email, password });
//const login = (email, password) => client.post("/auth", { email, password });

const resetPassword = (email) => client.post('/auth/restPassword', { email });
const verification = (email,code) => client.post('/auth/verification', { email,code });
const changePassword = (email,password) => client.post('/auth/changePassword', { email,password });

export default {
       login,
       resetPassword,
       verification,
       changePassword
};