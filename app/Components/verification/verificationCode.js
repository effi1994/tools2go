

import React, { useState } from 'react';
import * as Yup from 'yup';
import useApi from "../../hooks/useApi";
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../forms';
import authApi from '../../api/auth';
import ActivitiyIndicator from '../ActivitiyIndicator';


const validationSchema = Yup.object().shape({
       verificationCode: Yup.string().required().label("Verification Code"),
});

function VerificationCode({ onStpeChange,email }) {
       const [error, setError] = useState();
       const verificationApi = useApi(authApi.verification);

       const handleVerification = async (verificationCode) => {
              let Code = verificationCode.verificationCode;
              const result = await verificationApi.request(email, Code);
              if (!result.ok) {
                     console.log(result.data);
                     if (result.data) {
                            setError(result.data.message);
                     } else {
                            setError("An unexpected error occurred.");
                            console.log(result);
                     }
                     return;
              }

              onStpeChange(3);
       };


       return (
              <>
              <ActivitiyIndicator visible={verificationApi.loading} />
              <AppForm
                     initialValues={{ verificationCode: '' }}
                     onSubmit={handleVerification}
                     validationSchema={validationSchema}
              >
                     <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="verificationCode"
                            placeholder="Verification Code"
                     />
                     <SubmitButton title="Verify" />
                     <ErrorMessage error={error} visible={error} />
              </AppForm>
              </>
       );
}




export default VerificationCode;