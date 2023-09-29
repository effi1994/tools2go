import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Screen from '../Components/Screen';
import DateRangePicker from '../Components/DateRangePicker ';
import creditCard from '../api/creditCard';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';
import CreditCardScreen from './CreditCardScreen';
import { useRoute } from '@react-navigation/native';
import productActions from '../api/productActions';
import AppButton from '../Components/Button';
import Checkbox from 'expo-checkbox';

function RantProduct({ navigation }) {
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState(null);
       const [creditCard1, setCreditCard1] = useState(null);
       const [nextStep, setNextStep] = useState(false);
       const [isChecked, setChecked] = useState(false);
       const route = useRoute();
       const [startDate, setStartDate1] = useState(new Date());
       const [endDate, setEndDate1] = useState(new Date());
       const [productId, setProductId] = useState(route.params?.someKey.product.id);
       const [price, setPrice] = useState(route.params?.someKey.product.price);

       const getCreditCard = async () => {
              setLoading(true);
              const result = await creditCard.getCredits();
              setLoading(false);
              console.log(result);
              if (!result.ok) {
                     alert('Could not get the credit card');
                     navigation.navigate('Add credit card');
              } else {
                     if (result.data.data.message == 'you need to add credit card') {
                            alert('you need to add a credit card');
                            setCreditCard1(null);
                            return;
                     }

                     if(result.data.data.message == `CreditCard doesn't exist`){
                            alert('you need to add a credit card');
                            setCreditCard1(null);
                            return;
                     }


                     const cardData = result.data.data;

                     console.log(cardData);
                     if (!cardData) {
                            setCreditCard1(null);
                            return;
                     } else {
                            setCreditCard1(cardData);
                     }
              }
       };

       useEffect(() => {
              getCreditCard();
       }, []);

       const handleSubmit = async () => {
              setLoading(true);
              const result = await productActions.rentProduct(
                     productId,
                     startDate,
                     endDate,
                     price
              );

              setLoading(false);
              if (!result.ok) {
                     alert('Could not rent the product');
                     return;
              } else {
                     alert('Product rented successfully');
                     navigation.navigate('Listings');
              }
       };

       return (
              <>
                     <ActivitiyIndicator visible={loading} />
                     {creditCard1 ? (
                            <Screen style={styles.container}>
                                   {nextStep ? (
                                          <View>
                                                 <Text style={styles.infoText}>Rental Details:</Text>
                                                 <Text>Start Date: {startDate.toLocaleDateString()}</Text>
                                                 <Text>End Date: {endDate.toLocaleDateString()}</Text>
                                                 <Text>Total Price: {price}</Text>

                                              

                                                 <Text style={styles.paragraph}>
                                                        1. If any damage occurs to the product you've purchased, you might be responsible for its repair or compensation, depending on the warranty and return conditions specified at the time of purchase.
                                                 </Text>
                                                 <Text style={styles.paragraph}>
                                                        2. Specific conditions might exist regarding how the product should be used, and failing to follow these conditions could lead to additional requirements or extra charges.
                                                 </Text>
                                                 <Text style={styles.paragraph}>
                                                        3. It's advisable to inspect the product before purchase to ensure it's in proper working condition and meets your needs.
                                                 </Text>
                                                 <Text style={styles.paragraph}>
                                                        4. Delays in returning the product as agreed upon in the purchase terms might result in additional fees.
                                                 </Text>
                                                 <Text style={styles.paragraph}>
                                                        5. In cases where you encounter difficulties or have questions, it's recommended to consult with the store or supplier for further explanation and assistance.
                                                 </Text>

                                                 <View style={styles.checkboxContainer}>
                                                        <Checkbox
                                                               style={styles.checkbox}
                                                               value={isChecked}
                                                               onValueChange={setChecked}
                                                               color="#4630EB"
                                                        />
                                                        <Text style={styles.conditionText}>
                                                               I agree to the following conditions
                                                        </Text>
                                                 </View>

                                                 <AppButton
                                                        title="Rent"
                                                        disabled={!isChecked}
                                                        onPress={handleSubmit}
                                                 />
                                          </View>
                                   ) : (
                                          <DateRangePicker
                                                 setStartDate1={setStartDate1}
                                                 setEndDate1={setEndDate1}
                                                 setPrice={setPrice}
                                                 setNextStep={setNextStep}
                                                 productId={productId}
                                                 price={price}
                                          />
                                   )}
                            </Screen>
                     ) : (
                            <CreditCardScreen
                                   navigation={navigation}
                                   setCreditCard2={setCreditCard1}
                            />
                     )}
              </>
       );
}

const styles = StyleSheet.create({
       container: {
              padding: 10,
       },
       infoText: {
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
       },
       checkboxContainer: {
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
       },
       checkbox: {
              marginRight: 8,
       },
       conditionText: {
              fontSize: 16,
       },
       paragraph: {
              fontSize: 15,
              marginBottom: 10,
       },
});

export default RantProduct;
