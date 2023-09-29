import React, { useState } from 'react';
import { useFormikContext } from 'formik';

import ImageInputList from './../ImageInputList';
import ErrorMessage from './ErrorMessage';

function FormImagePicker({ name, number }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];
  const [errM, setErrM] = useState("");

  const [showError, setShowError] = useState(false);

  const handleAdd = uri => {
    if (!number) {
      if (imageUris.length < 3) {
        setFieldValue(name, [...imageUris, uri]);
      } else {
        setErrM("You can only add 3 images");
        setShowError(true);
      }
    } else {
      if (imageUris.length < number) {
        setFieldValue(name, [...imageUris, uri]);
      } else {
        setErrM(`You can only add ${number} images`);
        setShowError(true);
      }
    }

  };

  const handleRemove = uri => {
    setFieldValue(name, imageUris.filter(imageUri => imageUri !== uri));
    // Hide the error message when an image is removed
    setShowError(false);
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      {showError && <ErrorMessage error={errM} visible={true} />}
      {/* Other error handling logic for the 'name' field can be added here if needed */}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
