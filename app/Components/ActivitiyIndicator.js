import React, { useRef, useEffect } from 'react';

import LottieView from 'lottie-react-native';
import { View,StyleSheet } from 'react-native';

function ActivitiyIndicator({ visible = false }) {
const animation = useRef(null);

if (!visible) return null;
return (
    <View style={styles.overlay}  >
   <LottieView 
       ref={animation}
       autoPlay
       source={require('../assets/animations/loader.json')}
       />
       </View>
);
}

const styles = StyleSheet.create({
    overlay:{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        zIndex: 1,
        opacity: 0.8

    }
})


export default ActivitiyIndicator;