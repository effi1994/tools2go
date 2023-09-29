import client from './client';
import logger from '../utility/logger';
import FormData from 'form-data';
import useAuth from '../auth/useAuth';


const endpoint = '/products';

//const endpoint = "/listings";




const getListings = () => client.get(endpoint + '/get-all-Products');
//const getListings = () => client.get(endpoint);

/*const addListing = async (listing,onUploadProgress) => {
       let data = new FormData();
       data.append('title', listing.title);
       data.append('price', listing.price);
       data.append('categoryId', listing.categoryId);
       data.append('description', listing.description);
       listing.images.forEach((image, index) => {
              data.append('images', {
                     name: `image${index}`,
                     type: 'image/jpeg',
                     uri: image,
              });
       });

       if (listing.location)
       data.append("location", JSON.stringify(listing.location));
     
      
       console.log(data);

     
       try {
               
              return client.post(endpoint + '/add-Product',data,{
                     onUploadProgress: (progress) => {
                            onUploadProgress(progress.loaded / progress.total);
                     }
              });
       } catch (error) {
              if (error instanceof SyntaxError && error.message.includes('Unexpected token - in JSON at position 0')) {
                     logger.log('Error parsing JSON data');
              } else {
                     logger.log('Error uploading data', error);
              }
       }
};*/


export const addListing = (listing, onUploadProgress) => {
       const data = new FormData();
       data.append("title", listing.title);
       data.append("price", listing.price);
       data.append("categoryId", listing.category.value);
       data.append("description", listing.description);
       data.append("id", listing.id ? listing.id : 0);

       listing.images.forEach((image, index) =>
              data.append("images", {
                     name: "image" + index,
                     type: "image/jpeg",
                     uri: image,
              })
       );

       if (listing.location)
              data.append("location", JSON.stringify(listing.location));



       return client.post(endpoint, data, {
              headers: {
                     'accept': 'application/json',
                     'Content-Type': 'multipart/form-data',

              },
              onUploadProgress: (progress) =>
                     onUploadProgress(progress.loaded / progress.total),
       });
};

export const deleteListing = (id) => client.post(endpoint + '/delete-Product', { id: id })







export default {
       getListings,
       addListing,
       deleteListing,
};