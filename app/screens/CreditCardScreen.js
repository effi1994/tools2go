import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Components/Screen';
import { AppForm, AppFormField, SubmitButton, ErrorMessage, FormImagePicker } from '../Components/forms';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';
import creditCard from '../api/creditCard';





const validationSchema = Yup.object().shape({
       numberCard: Yup.string().required().min(16).label("Number Card"),
       expiryDate: Yup.string()
              .required("Expiry Date is required")
              .min(5, "Expiry Date must be at least 5 characters")
              .matches()
              .test("is-valid-expiry", "Expiry Date is not valid", function (value) {
                     if (!value) return false;
                     const currentDate = new Date();
                     const currentYearLastTwoDigits = currentDate.getFullYear().toString().substr(-2);
                     if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value)) return this.createError({ message: "Invalid Expiry Date format (mm/yy)" });

                     const [month, year] = value.split('/').map(Number);
                     if (month > 12) return this.createError({ message: "month is not valid" });
                     if (year == currentYearLastTwoDigits && month < currentDate.getMonth() + 1) return this.createError({ message: "month is expired" });
                     if (year < currentYearLastTwoDigits) return this.createError({ message: "year is expired" });





                     return true;
              })
              .label("Expiry Date"),
       cvc: Yup.number().required().min(3).label("CVC"),
       personId: Yup.number().required().min(9).label("Person Id"),


});

function CreditCardScreen({ navigation, setCreditCard2 }) {
       const [error, setError] = useState();
       const [loading, setLoading] = useState(false);
       const [dateNew, setDateNew] = useState(new Date());

       const handleSubmit = async (creditCard1) => {
              setLoading(true);
              const result = await creditCard.addCredit(creditCard1);
              console.log(result);
              setLoading(false);

              if (!result.ok) {

                     if (result.data.message) setError(result.data.message);

                     if (result.data) setError(result.data.error);
                     else {
                            setError("An unexpected error occurred.");
                            console.log(result);
                     }

                     return;

              }


              setError(null);
              if (result.ok) {
                     alert('Credit Card added successfully.');
                     if (setCreditCard2)
                            setCreditCard2(true);

                     if (!setCreditCard2)
                            navigation.goBack();
              }

       };


















       return (
              <>
                     <ActivitiyIndicator visible={loading} />
                     <Screen style={styles.container}>
                            <AppForm
                                   initialValues={{
                                          numberCard: "",
                                          expiryDate: "",
                                          cvc: "",
                                          personId: "",

                                   }}
                                   onSubmit={handleSubmit}
                                   validationSchema={validationSchema}
                            >
                                   <ErrorMessage error={error} visible={error} />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="credit-card"
                                          keyboardType="number-pad"
                                          name="numberCard"
                                          placeholder="Number Card"
                                          textContentType="numberCard"
                                          maxLength={16}
                                   />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="calendar"
                                          keyboardType="text"
                                          name="expiryDate"
                                          placeholder="Expiry Date like 05/21"
                                          textContentType="expiryDate"
                                          maxLength={5}
                                   />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="lock"
                                          keyboardType="number-pad"
                                          name="cvc"
                                          placeholder="CVC"
                                          textContentType="cvc"
                                          maxLength={3}
                                   />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="id-card"
                                          keyboardType="number-pad"
                                          name="personId"
                                          placeholder="Person Id"
                                          textContentType="personId"
                                          maxLength={9}
                                   />
                                   <SubmitButton title="Save" />
                            </AppForm>

                     </Screen>
              </>


       );
}

const styles = StyleSheet.create({
       container: {}
});

export default CreditCardScreen;