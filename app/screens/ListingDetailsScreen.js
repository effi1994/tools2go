
import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, Keyboard,ScrollView } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import AppText from '../Components/Text';
import MultiImageDisplay from '../Components/MultiImageDisplay';


import colors from '../config/colors';
import ListItem from '../Components/lists/ListItem';
import ContactSellerForm from '../Components/ContactSellerFrom';
import MapV from '../Components/MapV';
import { useRoute } from '@react-navigation/native'; // Import useRoute from @react-navigation/native
import useAuth from '../auth/useAuth';

function ListingDetailsScreen() {
       const route = useRoute();
       let someData = route.params?.someKey;
       let someData2 = route.params?.someKey2;
       const listing = someData;
       const navigation = someData2;
       const {  user } = useAuth();
       
       return (
              <ScrollView>
              <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100} >
                    
                            <MultiImageDisplay images={listing.images} />
                            
                     <View>
                            <View style={styles.detailsContainer}>
                                   <AppText style={styles.title} >Name :  {listing.product.name}</AppText>
                                   <AppText style={styles.description} >Description : {listing.product.description}</AppText>
                                   <AppText style={styles.description} >City : {listing.user.city}</AppText>
                                   <AppText style={styles.price} >${listing.product.price}</AppText>
                                   <View style={styles.userContainer}>
                                          <ListItem title={'Name : ' + listing.user.fullName}
                                                 subTitle={'Email : ' + listing.user.email}
                                                 subTitle2={'Phone : ' + listing.user.phone}
                                                 image={''} />
                                   </View>

                            </View>
                            {
                                   listing.user.id !== user.id &&
                                     <ContactSellerForm listing={listing} navigation={navigation}/>
                            }
                          

                     </View>
              </KeyboardAvoidingView>
              </ScrollView>
       );
}

const styles = StyleSheet.create({
       image: {
              width: "100%",
              height: 300
       },
       detailsContainer: {
              padding: 20
       },
       title: {
              fontSize: 24,
              fontWeight: "500"
       },
       description: {
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10
       },


       price: {
              color: colors.secondary,
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 10
       },
       userContainer: {
              marginVertical: 40
       }

})

export default ListingDetailsScreen;