import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import usersApi from "../api/users";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

import * as Yup from 'yup';

import Screen from '../Components/Screen';
import { AppForm, AppFormField, SubmitButton, ErrorMessage, FormImagePicker } from '../Components/forms';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';

const validationSchema = Yup.object().shape({
   fullName: Yup.string().required().min(4).label("Name"),
   email: Yup.string().required().email().label("Email"),
   password: Yup.string().min(4).label("Password"),
   phone: Yup.string().required().min(4).label("Phone"),
   city: Yup.string().required().min(4).label("City"),
   memberShip: Yup.string().required().min(4).label("MemberShip"),
});


function ProfileScreen(props) {
   const [user, setUser] = useState();
   const auth = useAuth();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState();

   const getUser = async () => {
      setLoading(true);
      const result = await usersApi.getUserProfile();
      if (!result.ok) return alert('Could not get the user');
      setLoading(false);
      setUser(result.data.data);
      console.log(result.data.data);
   };
   useEffect(() => {
      getUser();
   }, []);

   const handleSubmit = async (user1) => {
      console.log(user1);
      user.fullName = user1.fullName;
      user.email = user1.email;
      user.password = user1.password ? user1.password : user.password;
      user.phone = user1.phone;
      user.city = user1.city;

      const result = await usersApi.editUserProfile(user);
      if (!result.ok) {
         if (result.data) setError(result.data.error);
         else {
            setError("An unexpected error occurred.");
            console.log(result);
         }
         return;
      }
      setError(null);
      if (result.ok) {
         alert('User updated successfully.');
         auth.logOut();
      }



   };


   return (
      <>
                     <ActivitiyIndicator visible={loading} />
                     <Screen style={styles.container}>
                            <AppForm
                                   initialValues={{
                                          fullName: user ? user.fullName : '',
                                          email: user ? user.email : '',
                                          password: '',
                                          phone: user ? user.phone : '',
                                          city: user ? user.city : '',
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





                                   <SubmitButton title="Save" />
                            </AppForm>

                     </Screen>
              </>
   );
}

const styles = StyleSheet.create({
   container: {}
});

export default ProfileScreen;