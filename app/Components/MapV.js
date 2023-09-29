import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

function MapV(props) {
return (
   <View style={styles.container}>
       <MapView
               style={styles.map}
                     initialRegion={{
                     latitude: 32.1868205,
                     longitude: 34.8776181,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                     }}
       />

   </View>
);
}

const styles = StyleSheet.create({
       container: {
         flex: 1,
       },
       map: {
         width: 400,
         height: 400,
       },
     });

export default MapV;