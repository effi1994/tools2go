import React,{useEffect} from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import logger from '../utility/logger';

import colors from '../config/colors';

function ImageInput({ imageUri, onChangeImage }) {

       useEffect(() => {
              requsetPermissions();
       }, []);


       const requsetPermissions = async () => {
              // const result  =  await Permissions.askAsync(Permissions.CAMERA,Permissions.LOCATION_FOREGROUND);
               //console.log(result);
              // if (!result.granted) alert("You need to enable permission to access the library");
               const {granted} = await ImagePicker.requestCameraPermissionsAsync();
               if (!granted) alert("You need to enable permission to access the library");
             };


       const handlePerss = () => {
              if (!imageUri) selectImage();
              else
                     Alert.alert("Delete", "Are you sure you want to delete this image?", [
                            { text: "Yes", onPress: () => onChangeImage(null) },
                            { text: "No" },
                     ]);
       }

       const selectImage = async () => {
              try {
                     const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 0.5,

                     });
                     if (!result.canceled) {
                            const selectedAsset = result.assets[0];
                            onChangeImage(selectedAsset.uri);
                     }
              } catch (error) {
                     logger.log("Error reading an image", error);
              }

       }


       return (
              <TouchableWithoutFeedback onPress={handlePerss} >
                     <View style={styles.container}>
                            {
                                   imageUri ? (<Image source={{ uri: imageUri }} style={styles.image} />) :
                                          (<MaterialCommunityIcons name="camera" size={40} color={colors.medium} />)
                            }


                     </View>
              </TouchableWithoutFeedback>
       );
}

const styles = StyleSheet.create({
       container: {
              alignItems: "center",
              backgroundColor: colors.light,
              borderRadius: 15,
              height: 100,
              justifyContent: "center",
              width: 100,
              overflow: "hidden",

       },
       image: {
              width: "100%",
              height: "100%",

       }
});

export default ImageInput;