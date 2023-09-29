import {useEffect,useRef} from 'react';
import {useState} from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import expoPushTokensApi from '../api/expoPushTokens';
import navigate from '../navigation/rootNavigation';
import logger from '../utility/logger';

Notifications.setNotificationHandler({
       handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
       }),
});



export default useNavigations =(notificationAddListener) =>{
       const [expoPushToken, setExpoPushToken] = useState('');
       const [notification, setNotification] = useState(false);
       const notificationListener = useRef();
       const responseListener = useRef();

       useEffect(() => {
              registerForPushNotifications();

              if(notificationAddListener){
                     notificationListener.current = Notifications.addNotificationReceivedListener(notificationAddListener => {
                            setNotification(notificationAddListener);
                          });
                       
                          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                            navigate.navigate(notificationAddListener);
                            
                          });


              }

              return () => {
                     Notifications.removeNotificationSubscription(notificationListener.current);
                     Notifications.removeNotificationSubscription(responseListener.current);
                   };
             
                  

       }, []);

       const registerForPushNotifications = async () => {
              try {
                     const token = await registerForPushNotificationsAsync();
                     setExpoPushToken(token);
                     expoPushTokensApi.register(token);
              } catch (error) {
                     logger.log('Error getting a push token', error);
              }
       }

}





async function registerForPushNotificationsAsync() {
       let token;
     
       if (Platform.OS === 'android') {
         await Notifications.setNotificationChannelAsync('default', {
           name: 'default',
           importance: Notifications.AndroidImportance.MAX,
           vibrationPattern: [0, 250, 250, 250],
           lightColor: '#FF231F7C',
         });
       }
     
       if (Device.isDevice) {
         const { status: existingStatus } = await Notifications.getPermissionsAsync();
         let finalStatus = existingStatus;
         if (existingStatus !== 'granted') {
           const { status } = await Notifications.requestPermissionsAsync();
           finalStatus = status;
         }
         if (finalStatus !== 'granted') {
           alert('Failed to get push token for push notification!');
           return;
         }
         token = (await Notifications.getExpoPushTokenAsync()).data;
         
       } else {
         alert('Must use physical device for Push Notifications');
       }
     
       return token;
}