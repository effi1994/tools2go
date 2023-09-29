import client from './client';
import FormData from 'form-data';

const endpoint = '/productActions';
const endpoint2 ='/imageGetProduct'

const getMyRent = () => client.get(endpoint+'/my-rent');

const checkIsAvailable = (productId,dateFromRent,dateToRent) => client.post(endpoint + '/check-is-available-product', { productId,dateFromRent,dateToRent });

const rentProduct = (productId,dateFromRent,dateToRent,price) => client.post(endpoint + '/rent-product', { productId,dateFromRent,dateToRent,price });

const addImg = (imageGetProduct) => {
       const data = new FormData();
       data.append("productId", imageGetProduct.productId);
       data.append("isBefore", imageGetProduct.isBefore);
       data.append("actionId", imageGetProduct.actionId);
       data.append("id", 0);


       imageGetProduct.images.forEach((image, index) =>
              data.append("images", {
                     name: "image" + index,
                     type: "image/jpeg",
                     uri: image,
              })
       );

       console.log(data);

       return client.post(endpoint2, data, {
              headers: {
                     'accept': 'application/json',
                     'Content-Type': 'multipart/form-data',

              }
       });
    

       
};



export default {
       getMyRent,
       checkIsAvailable,
       rentProduct,
       addImg
}