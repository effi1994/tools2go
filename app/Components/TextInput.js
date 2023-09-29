import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

function AppTextInput({ icon, width = '100%', secureTextEntry, ...otherProps }) {
  const [passwordVisible, setPasswordVisible] = useState(!secureTextEntry);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={[styles.container, { width }]}>
      {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        secureTextEntry={secureTextEntry && !passwordVisible}
        {...otherProps}
      />
      {secureTextEntry && (
        <MaterialCommunityIcons
          name={passwordVisible ? 'eye-off' : 'eye'}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.iconEye}
          onPress={handleTogglePasswordVisibility}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconEye:{
       position: 'absolute',
       top: 20,
       right: 10,

  }

});

export default AppTextInput;
