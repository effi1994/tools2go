
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../Components/Screen';
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { AppForm, AppFormField, SubmitButton, ErrorMessage, FormImagePicker } from '../Components/forms';
import useApi from "../hooks/useApi";
import ActivitiyIndicator from '../Components/ActivitiyIndicator';
import { SignupUser, Status } from '../interfaces/user';
import ImageInput from '../Components/ImageInput';


/*
       id: number;
       fullName: string;
       email: string;
       password: string;
       phone: string;
       city: string;
       expoToken?: string;
       imageProfile?: string;
       isAdmin?: boolean;
       isOnline?: boolean;
       memberShip: string;

*/


const validationSchema = Yup.object().shape({
       fullName: Yup.string().required().min(4).label("Name"),
       email: Yup.string().required().email().label("Email"),
       password: Yup.string().required().min(5).label("Password"),
       phone: Yup.string().required().min(4).label("Phone"),
       city: Yup.string().required().min(4).label("City"),
       memberShip: Yup.string().required().min(4).label("MemberShip"),
});

function RegisterScreen(props) {
       const registerApi = useApi(usersApi.register);
       const loginApi = useApi(authApi.login);
       const auth = useAuth();
       const [error, setError] = useState();

       const handleSubmit = async (user) => {
              const result = await registerApi.request(user);

              if (!result.ok) {
                     if (result.data) setError(result.data.error);
                     else {
                            setError("An unexpected error occurred.");
                            console.log(result);
                     }
                     return;
              }
               console.log(result);

              const { data: token } = await loginApi.request(
                     user.email,
                     user.password
              );
              console.log(token);

              auth.logIn(token.data.token);
       };

       const addImageProfile = (imageUri) => {
              console.log(imageUri);
       };


       return (
              <>
                     <ActivitiyIndicator visible={registerApi.loading || loginApi.loading} />
                     <Screen style={styles.container}>
                            <AppForm
                                   initialValues={{
                                          fullName: '',
                                          email: '',
                                          password: '',
                                          phone: '',
                                          city: '',
                                          memberShip: 'BASIC',
                                          imageProfile: '',
                                   }}
                                   onSubmit={handleSubmit}
                                   validationSchema={validationSchema}
                            >
                                   <ErrorMessage error={error} visible={error} />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="account"
                                          name="fullName"
                                          placeholder="Full Name"
                                   />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="email"
                                          keyboardType="email-address"
                                          name="email"
                                          placeholder="Email"
                                          textContentType="emailAddress"
                                   />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="lock"
                                          name="password"
                                          placeholder="Password"
                                          secureTextEntry
                                          textContentType="password"
                                   />
                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="phone"
                                          name="phone"
                                          placeholder="Phone"
                                          textContentType="telephoneNumber"
                                   />

                                   <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="city"
                                          name="city"
                                          placeholder="City"
                                          textContentType="addressCity"
                                   />





                                   <SubmitButton title="Register" />
                            </AppForm>

                     </Screen>
              </>
       );
}

const styles = StyleSheet.create({
       container: {
              padding: 10,
       },
       logo: {
              width: 80,
              height: 80,
              alignSelf: 'center',
              marginTop: 50,
              marginBottom: 20,
       },
});

export default RegisterScreen;

/*
 ***** need to do this*****
         <AppFormField
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          icon="account-group"
                                          name="memberShip"
                                          placeholder="MemberShip"
                                          textContentType="organizationName"
                                   />

 */