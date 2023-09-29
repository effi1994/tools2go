import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import colors from '../config/colors';
import AppText from '../Components/Text';
import formatDate from '../utility/formatDate';
import listingsApi from '../api/listings';
import useApi from '../hooks/useApi';
import routes from '../navigation/routes';

function Card({
       title,
       subTitle, imageUrl,
       onPress, thumbnailUrl,
       city, postDate,
       item, userId,
       listings,
       setFilteredListings, navigation }) {
       // if item.user.id === userId then show the delete button and edit button
       // if item.user.id !== userId then show the rent button
       let deleteListingApi = useApi(listingsApi.deleteListing);

       const handleSubmitDelete = async () => {
              try {
                     const result = await deleteListingApi.request(item.product.id);
                     if (!result.ok) return alert('Could not delete the listing.');
                     if (result.ok) {
                            updateListingsDelete(item.product.id);
                            alert('Listing deleted successfully.');

                     }


              } catch (error) {
                     console.error('Error deleting listing:', error);
                     alert('An error occurred while deleting the listing.');
              }
       };

       const updateListingsDelete = (id) => {
              console.log('updateListingsDelete');
              listings.forEach(element => {
                     if (element.product.id === id) {
                            listings.splice(listings.indexOf(element), 1);
                     }

              });
              setFilteredListings(listings);
       };

       return (
              <TouchableWithoutFeedback onPress={onPress}>
                     <View style={styles.card}>
                            <Image
                                   style={styles.image}
                                   preview={{ uri: thumbnailUrl }}
                                   uri={imageUrl}
                                   tint="light"
                            />
                            <View style={styles.detailsContainer}>
                                   <AppText style={styles.title}>{title}</AppText>
                                   <AppText style={styles.city}>{city}</AppText>
                                   <AppText style={styles.postDate}>{formatDate.formatDate(new Date(postDate))}</AppText>
                                   <AppText style={styles.subTitle}>{subTitle}</AppText>

                                   {item.user.id !== userId ? (
                                          <Button title="Rent" onPress={() => navigation.navigate(routes.RANT, { someKey: item})} color={colors.primary} />
                                   ) : (
                                          <View style={styles.editDeleteContainer}>
                                                 <Button title="Edit" onPress={() => navigation.navigate(routes.LISTING_EDIT, { someKey: item})} color={colors.primary} />
                                                 <Button title="Delete" onPress={
                                                        async () =>
                                                               handleSubmitDelete()
                                                 } color={colors.primary} />
                                          </View>
                                   )}

                            </View>
                     </View>
              </TouchableWithoutFeedback>
       );
}

const styles = StyleSheet.create({
       card: {
              backgroundColor: colors.white,
              borderRadius: 15,
              marginBottom: 20,
              overflow: "hidden",
       },
       image: {
              width: "100%",
              height: 200,
       },
       detailsContainer: {
              padding: 20,
       },
       title: {
              marginBottom: 7,
       },
       subTitle: {
              color: colors.secondary,
              fontWeight: "bold",
       },
       city: {
              color: colors.medium,
              fontWeight: "bold",
       },
       postDate: {
              color: colors.medium,
              fontWeight: "bold",
       },
       editDeleteContainer: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
       },
});

export default Card;
