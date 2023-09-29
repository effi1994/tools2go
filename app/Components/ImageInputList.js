import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { View, StyleSheet } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
       const scroll = useRef();
       return (
              <View>
                     <ScrollView
                            ref={scroll}
                            horizontal
                            onContentSizeChange={() => scroll.current.scrollToEnd()}
                     >
                            <View style={styles.container}>
                                   {imageUris.map((uri) => (
                                          <View key={uri} style={styles.image}>
                                                 <ImageInput
                                                        imageUri={uri}
                                                        onChangeImage={() => onRemoveImage(uri)}
                                                 />
                                          </View>
                                   ))}
                                   <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
                            </View>
                     </ScrollView>
              </View>
       );
}

const styles = StyleSheet.create({
       container: {
              flexDirection: "row",
       },
       image: {
              marginRight: 10,
       }
});

export default ImageInputList;