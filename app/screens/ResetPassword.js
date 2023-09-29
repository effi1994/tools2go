import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Screen from '../Components/Screen';
import EmailValidation from '../Components/verification/emailValidation';
import VerificationCode from '../Components/verification/verificationCode';
import ChangePassword from '../Components/verification/changePassword ';




function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [steps, setSteps] = useState(1);



  return (
    <>
      <Screen style={styles.container}>
        {steps === 1 && (
          <EmailValidation
            onStpeChange={setSteps}
            setEmail={setEmail} />
        )}

        {steps === 2 && (
          <VerificationCode
            onStpeChange={setSteps} 
            email={email}
            />)}

        {
          steps === 3 &&
          (
            <ChangePassword
              onStepChange={setSteps}
              email={email}
              navigation={navigation} />

          )
        }


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

export default ResetPassword;
