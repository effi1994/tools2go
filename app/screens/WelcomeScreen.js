import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image,Button } from 'react-native';
import routes from '../navigation/routes';
import AppButton from '../Components/Button';

function WelcomeScreen({ navigation }) {
       return (
              <ImageBackground source={require("../assets/images/background.jpg")}
                     blurRadius={10}
                     style={
                            styles.background
                     }>
                     <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require("../assets/images/logo-red.png")} />
                            <Text style={styles.tagline} >Rent What You Don't Use</Text>

                     </View>
                     <View style={styles.buttonContainer}>

                            <AppButton title="Login" onPress={() => navigation.navigate(routes.LOGIN)}/>
                            <AppButton title="Register" color="secondary" onPress={() => navigation.navigate(routes.REGISTER)} />
                     </View>



              </ImageBackground>
       );
}

const styles = StyleSheet.create({
       background: {
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center"
       },
       logo: {
              width: 100,
              height: 100
              

       },
       logoContainer: {
              position: "absolute",
              top: 70,
              alignItems: "center"
       },

       buttonContainer: {
              padding: 20,
              width: "100%"
       },
       tagline: {
              fontSize: 25,
              fontWeight: "600",
              paddingVertical: 20
       }
});

export default WelcomeScreen;