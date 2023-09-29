import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

import colors from '../../config/colors';
import AppText from '../Text';
function ListItem({ title, subTitle, subTitle2, image, IconComponent, onPress, renderRightActions, numberIsNotRead }) {

       // numberIsNotRead is for the number of messages that are not read
       // 
       console.log(numberIsNotRead);

       return (
              <GestureHandlerRootView>
                     <Swipeable renderRightActions={renderRightActions}


                     >

                            <TouchableHighlight
                                   underlayColor={colors.light}
                                   onPress={onPress} >
                                   <View style={styles.container}>
                                          {IconComponent}
                                          {image && <Image style={styles.image} source={{ uri: image }} />}
                                          <View style={styles.detailsContainer} >
                                                 <AppText style={styles.title} numberOfLines={1}  >{title}</AppText>
                                                 {subTitle && <AppText style={styles.subTitle} numberOfLines={2} >{subTitle}</AppText>}
                                                 {subTitle2 && <AppText style={styles.subTitle} numberOfLines={2} >{subTitle2}</AppText>}
                                                 {numberIsNotRead && (
                                                        numberIsNotRead !=0 &&
                                                        <View style={styles.numberIsNotRead} >
                                                               <AppText style={{ color: colors.white }} >{numberIsNotRead}</AppText>
                                                        </View>)}
                                          </View>

                                   </View>
                            </TouchableHighlight>
                     </Swipeable>
              </GestureHandlerRootView>

       );
}

const styles = StyleSheet.create({
       container: {
              alignItems: "center",
              flexDirection: "row",
              padding: 15,
              backgroundColor: colors.white

       },
       image: {
              width: 70,
              height: 70,
              borderRadius: 35,
       },
       title: {
              fontWeight: "500",
              color: colors.black

       },
       subTitle: {
              color: colors.medium
       },
       detailsContainer: {
              flex: 1,
              marginLeft: 10,
              justifyContent: "center"

       },
       numberIsNotRead: {
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center"
       }

});



export default ListItem;