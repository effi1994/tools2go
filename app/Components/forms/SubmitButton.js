
import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../Button';

function SubmitButton({ title, onPress,disbaled }) {
       const { handleSubmit } = useFormikContext();
       return (
              <AppButton title={title} onPress={handleSubmit} disbaled={disbaled ? disbaled : false}  />

       );
}

export default SubmitButton;