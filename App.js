import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import * as SMS from 'expo-sms';






import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import { Buffer } from 'buffer';
import OfflineNotice from './app/Components/OfflineNotice';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import { navigationRef } from './app/navigation/rootNavigation';
import logger from './app/utility/logger';


global.Buffer = Buffer;
logger.start();







export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);


  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) return;
    setUser(user);
    setIsReady(true);
  }

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    restoreUser().then(() => SplashScreen.hideAsync());
  }, []);





  return (
    // add TranslateNavBar  switch language  
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  tinyLogo: {
    width: 100,
    height: 100,
    top: 100,
    left: 170,
    position: "absolute",
    fontSize: 50
  },
  subText: {
    color: "black",
    fontSize: 20,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    top: 180,
    left: 150,
    position: "absolute",


  }

});
