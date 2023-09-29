import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { AppForm, AppFormField, AppFormPicker, SubmitButton } from '../Components/forms';
import Screen from '../Components/Screen';
import FormImagePicker from '../Components/forms/FormImagePicker';
import productActions from '../api/productActions';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';
import { useRoute } from '@react-navigation/native'; // Import useRoute from @react-navigation/native

const validationSchema = Yup.object().shape({
       images: Yup.array().min(1, "Please select at least one image."),
});



function ImageProductUpdate() {
       const route = useRoute();
       let someData = route.params?.someKey;
       let someData2 = route.params?.someKey2;
       const [error, setError] = useState();
       const [loading, setLoading] = useState(false);
       const [images, setImages] = useState(someData ? someData.imageGetProduct.map((image) => image.url) : []);
       const [productId, setProductId] = useState(someData ? someData.productAction.product.productId : null);
       const [actionId , setActionId] = useState(someData ? someData.productAction.id : null);
       

       const handleSubmit = async (imageGetProduct) => {
              console.log(imageGetProduct);
              imageGetProduct.isBefore = true;
              imageGetProduct.productId = productId;
              imageGetProduct.actionId = actionId;
              setLoading(true);
              const result = await productActions.addImg(imageGetProduct);
              setLoading(false);
              if (!result.ok) {
                     alert('nn save image');
                     return;
              }
              let image = result.data.data;
              if(image){
                     someData2.navigate('Account');
                     alert('save image');
                     

              }



             
       };

       return (
              <>
                     <ActivitiyIndicator visible={loading} />
              <Screen style={styles.container}>
                     <AppForm
                            initialValues={{
                                   images: someData ? images : []
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                     >
                            <FormImagePicker name="images" number={1} />
                            <SubmitButton title="Save" />
                     </AppForm>
              </Screen>
              </>
       );
}

const styles = StyleSheet.create({
       container: {
              padding: 10,
       },
});

export default ImageProductUpdate;