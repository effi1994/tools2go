
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function AppButton({ title, onPress, color = "primary",disabled = false }) {
       
       return (
              <TouchableOpacity disabled={disabled} style={[disabled ? styles.disabled : styles.button
                     , { backgroundColor: disabled ? colors.disabled : colors[color]
                     
                     }]} onPress={onPress}>
                     <Text style={styles.text}>{title}</Text>
              </TouchableOpacity>
       );
}

const styles = StyleSheet.create({
       button: {
              backgroundColor: colors.primary,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              width: "100%",
              marginVertical: 10

       },
       text: {
              color: colors.white,
              fontSize: 18,
              textTransform: "uppercase",
              fontWeight: "bold"

       },
       disabled: {
              backgroundColor: colors.disabled,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              width: "100%",
              marginVertical: 10
       }


})

export default AppButton;