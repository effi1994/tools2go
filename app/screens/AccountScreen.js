import React from 'react';
import ListItem from '../Components/lists/ListItem';
import Screen from '../Components/Screen';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import Icon from '../Components/Icon';
import ListItemSeparator from '../Components/lists/ListItemSeparator';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';

const menuItems = [
       {
              title: "My Messages",
              icon: {
                     name: "email",
                     backgroundColor: colors.secondary
              },
              targetScreen: routes.MESSAGES
       },
       {
              title: "My Credit Card",
              icon: {
                     name: "credit-card",
                     backgroundColor: colors.third
              },
              targetScreen: routes.MY_CREDIT_CARD

       },
       {
              title: "My Products Rent",
              icon: {
                     name: "cart",
                     backgroundColor: colors.primary
              },
              targetScreen: routes.MY_PRODUCTS_RENT

       },
      

]

function AccountScreen({ navigation }) {
       const { logOut, user } = useAuth();



       return (
              <Screen style={styles.screen}>
                     <View style={styles.container}>

                            <ListItem
                                   title={'My Profile'}
                                   IconComponent={
                                          <Icon
                                                 name={"account"} backgroundColor={colors.third} />
                                   }
                                   
                                   onPress={() =>  navigation.navigate(routes.PROFILE, { someKey: user.id })}

                            />
                     </View>
                     <View style={styles.container}>
                            <FlatList
                                   data={menuItems}
                                   keyExtractor={menuItem => menuItem.title}
                                   ItemSeparatorComponent={ListItemSeparator}
                                   renderItem={({ item }) =>
                                          <ListItem
                                                 title={item.title}
                                                 IconComponent={
                                                        <Icon
                                                               name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
                                                 }


                                                 onPress={() =>
                                                        item.targetScreen === routes.LISTINGS ?
                                                               navigation.navigate(item.targetScreen, { someKey2: user.id }) :
                                                               navigation.navigate(item.targetScreen)
                                                 }
                                          />
                                   }
                            />
                     </View>
                     <ListItem
                            title="Log Out"
                            IconComponent={
                                   <Icon name="logout" backgroundColor="#ffe66d" />}
                            onPress={() => logOut()}
                     />



              </Screen>
       );
}

const styles = StyleSheet.create({
       container: {
              marginVertical: 20,
       },
       screen: {
              backgroundColor: colors.light
       }
});

export default AccountScreen;