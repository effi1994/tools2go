import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import CreditCardScreen from './CreditCardScreen';
import Screen from '../Components/Screen';
import creditCard from '../api/creditCard';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';

function MyCreditCardScreen({ navigation }) {
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState(null);
       const [creditCard1, setCreditCard1] = useState(null);
       const [showCard, setShowCard] = useState('');

       const getCreditCard = async () => {
              setLoading(true);
              const result = await creditCard.getCredits();
              setLoading(false);

              if (!result.ok) {
                     setError('Could not get the credit card');
              } else {
                     const cardData = result.data.data;

                     if (!cardData) {
                            // Handle the case where cardData is undefined or null
                            // You can show a message to the user or take other appropriate action
                            return;
                     }

                     const number = cardData.cardNumber;
                     if (!number) {
                            // Handle the case where cardNumber is undefined or null
                            // You can show a message to the user or take other appropriate action
                            return;
                     }

                     const numberString = number.toString();
                     const last4Digits = numberString.slice(-4);
                     setShowCard(last4Digits + '- **** - **** - ****');
                     setCreditCard1(cardData);
              }
       };


       const handleDelete = async () => {
              setLoading(true);
              const result = await creditCard.deleteCredit();
              setLoading(false);

              if (!result.ok) {
                     if (result.data) {
                            setError(result.data.error);
                     } else {
                            setError('An unexpected error occurred.');
                            console.log(result);
                     }
              } else {
                     setError(null);
                     setCreditCard1(null);
                     setShowCard('');
                     Alert.alert('Credit Card deleted successfully.');
              }
       };

       useEffect(() => {
              getCreditCard();
       }, []);

       return (
              <>
                     <ActivitiyIndicator visible={loading} />


                     {
                            !loading && (
                                   <>
                                   {creditCard1 ? (
                                          <Screen style={styles.container}>
                                                 <View>
                                                        <Text style={styles.cardNumberText}>Card Number: {showCard}</Text>
                                                        <TouchableOpacity
                                                               style={styles.deleteButton}
                                                               onPress={handleDelete}
                                                               disabled={loading}
                                                        >
                                                               <Text style={styles.buttonText}>Delete</Text>
                                                        </TouchableOpacity>
                                                 </View>
                                          </Screen>
                                   ) : (
                                          <CreditCardScreen  navigation={navigation}/>
                                   )}
                                   </>

                            ) 
                     }

                    

              </>
       );
}

const styles = StyleSheet.create({
       container: {
              alignItems: 'center',
              justifyContent: 'center',
       },
       cardNumberText: {
              fontSize: 18,
              marginBottom: 20,
       },
       deleteButton: {
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 5,
       },
       buttonText: {
              color: 'white',
              textAlign: 'center',
       },
});

export default MyCreditCardScreen;
