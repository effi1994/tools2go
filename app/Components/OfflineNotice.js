import React from 'react';
import { View, StyleSheet } from 'react-native';
import  Constants  from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';
import colors from '../config/colors';
import Text from './Text';


function OfflineNotice(props) {
       const netInfo = useNetInfo();
       if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
       return (
              <View style={styles.container}>
                     <Text style={styles.text} >Offline Notice</Text>
              </View>
       );
       return null;
}

const styles = StyleSheet.create({
       container: {
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
              height: 100,
              position: "absolute",
              top: Constants.statusBarHeight,
              zIndex: 1,
              width: "100%",
       },
       text:{
              color: colors.white
       }
});

export default OfflineNotice;