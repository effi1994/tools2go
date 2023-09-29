
import React, { useState } from 'react';
import useApi from "../../hooks/useApi";
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../forms';
import authApi from '../../api/auth';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import ActivitiyIndicator from '../ActivitiyIndicator';


const validationSchema3 = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long")
    .test("password-match", "Passwords must match", function (value) {
      return value === this.parent.confirmPassword;
    })
    .label("Password"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .min(4, "Confirm Password must be at least 4 characters long")
    .label("Confirm Password"),
});


function ChangePassword ({ onStepChange,email,navigation }) {
   const changePasswordApi = useApi(authApi.changePassword);
   const [error, setError] = useState();


   const handleChangePassword = async (password) => {
      let Email = email;
      let Password = password.password;
      const result = await changePasswordApi.request(Email, Password);
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          console.log(result);
        }
        return;
      }
      Alert.alert("Password Changed Successfully");
  
      navigation.navigate('Login');
      onStepChange(1);
    };

   

return (
  <>
  <ActivitiyIndicator visible={changePasswordApi.loading} />
   <AppForm
            initialValues={{ password: '', confirmPassword: '' }}
            onSubmit={handleChangePassword}
            validationSchema={validationSchema3}
          >
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
              
            />
            <SubmitButton title="Change Password" />
            <ErrorMessage error={error} visible={error} />

          </AppForm>
          </>

)
   
}



export default ChangePassword ;