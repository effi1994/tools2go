
import React from 'react';
import { View, StyleSheet } from 'react-native';
import  i18n  from '../config/translate';
import { Picker } from '@react-native-picker/picker';
import  translations  from '../config/localizations';

function TranslateNavBar(props) {
   const labelLangs = [
      { text: 'English', value: 'en' },
      { text: 'Hebrew', value: 'he' }
   ];

   const [selectedLanguage, setSelectedLanguage] = React.useState('en');

   const switchLanguage = (lang) => {
      setSelectedLanguage(lang);
       i18n.translations = { [lang]: i18n.translations[lang] };
      i18n.locale = lang;
      
      
      console.log('i18n.locale', i18n.locale);
      
   };




   return (
      <View style={styles.container}>
         <Picker
            selectedValue={selectedLanguage}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => switchLanguage(itemValue)}
         >
            {labelLangs.map((lang, index) => (
               <Picker.Item key={index} label={lang.text} value={lang.value} />
            ))}
         </Picker>
      </View>
      
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});

export default TranslateNavBar;