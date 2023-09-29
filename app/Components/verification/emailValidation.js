
import React, { useState } from 'react';
import * as Yup from 'yup';
import useApi from "../../hooks/useApi";
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../forms';
import authApi from '../../api/auth';

import {  StyleSheet } from 'react-native';
import ActivitiyIndicator from '../ActivitiyIndicator';
const validationSchema = Yup.object().shape({
       email: Yup.string().required().email().label("Email"),
});

function EmailValidation({ onStpeChange, setEmail }) {
       const [error, setError] = useState();
       const resetPasswordApi = useApi(authApi.resetPassword);

       const handleResetPassword = async (email) => {
              let Email = email.email;
              const result = await resetPasswordApi.request(Email);
              if (!result.ok) {
                     if (result.data) {
                            setError(result.data.message);
                     } else {
                            setError("An unexpected error occurred.");
                            console.log(result);
                     }
                     return;
              }
              setEmail(Email);
              onStpeChange(2);
       };


       return (
              <>
              <ActivitiyIndicator visible={resetPasswordApi.loading} />
              <AppForm
                     initialValues={{ email: '' }}
                     onSubmit={handleResetPassword}
                     validationSchema={validationSchema}
              >
                    
                     <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email"
                     />
                     <SubmitButton title="Reset Password" />
                     <ErrorMessage error={error} visible={error} />
              </AppForm>
              </>
       );
}

const styles = StyleSheet.create({
       container: {}
});

export default EmailValidation;