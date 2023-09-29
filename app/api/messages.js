import client from './client';

const endpoint = '/messages';

const getMessages = () => client.get(endpoint+'/my-messages');

const sendMessage = (message, productId) => client.post(endpoint+'/add-message-product', { message, productId });

const sendMessageToUser = (message, userId2) => client.post(endpoint+'/add-message-user', { message, userId2 });

const getUserChats = (userId2) => client.post(endpoint+'/get-user-chats', { userId2 });

const deleteMessage = (messageId) => client.post(endpoint+'/delete-message', { messageId });




export default {
       getMessages,
       getUserChats,
       sendMessage,
       deleteMessage,
       sendMessageToUser
}