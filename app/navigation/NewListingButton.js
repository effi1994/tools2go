import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function NewListingButton({onPress}) {
return (
    <TouchableOpacity  onPress={onPress}>
   <View style={styles.container}>
       <MaterialCommunityIcons name="plus-circle" color={colors.white} size={40} />
   </View>
   </TouchableOpacity>   
);
}

const styles = StyleSheet.create({
container: {
       alignItems:'center',
       backgroundColor:colors.primary,
       borderColor:colors.white,
       bottom:20,
       borderRadius:40,
       borderWidth:10,
       width:80,
       justifyContent:'center',
       height:80,
}
});

export default NewListingButton;