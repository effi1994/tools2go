import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import logger from '../utility/logger';

export default useLocation = () => {
       const [location, setLocation] = useState(null);


       const getLocation = async () => {
              try {
                     let result = await Location.requestForegroundPermissionsAsync();
                     if (!result.granted) return;
                     let { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync();
                     setLocation({ latitude, longitude });

              } catch (error) {
                     logger.log(error);
              }
       }


       useEffect(() => {
              getLocation();

       }, []);
       return location;
};



