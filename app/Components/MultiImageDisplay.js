import React from 'react';
import { ScrollView, Image, View, StyleSheet } from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200, // Set your desired image width
    height: 200, // Set your desired image height
    marginHorizontal: 10, // Adjust margin as needed
  },
});

function MultiImageDisplay({images}) {
  return (
    <ScrollView horizontal style={styles.container}>
      {images.map((image, index) => (
        <View key={index}>
          <Image
            style={styles.image}
            tint="light"
            preview={{ uri: image.thumbnailUrl }}
            source={{ uri: image.url }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

export default MultiImageDisplay;
