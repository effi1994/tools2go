import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import productActions from '../api/productActions';
import formatDate from '../utility/formatDate';
import AppButton from '../Components/Button';
function MyProductsRentScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productsRent, setProductsRent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dateNew, setDateNew] = useState(new Date());


  const checkIsDate = (date) => {
    console.log(dateNew);
    console.log(date);
    let d = new Date(date);
    if (dateNew >= d) {
      return true;
    }
    return false;
  };

  /*
    productsRent = [
      {
        imageGetProduct: [{ id, fileName, productId, userId, isBefore }],
        productAction: {
          id,
          dateFromRent,
          dateToRent,
          price,
          product: {
            productId,
            name,
          },
        },
      },
      // ... other rented products
    ];
  */

  const getProductsRent = async () => {
    setLoading(true);
    const result = await productActions.getMyRent();
    setLoading(false);
    if (!result.ok) {
      alert('Could not get the products');
      return;
    } else {
      const productsData = result.data.data;
      console.log(productsData);
      if (!productsData) {
        setProductsRent([]);
        return;
      } else {
        setProductsRent(productsData);
      }
    }
  };

  useEffect(() => {
    getProductsRent();
  }, []);

  const handleUploadImage = (productId) => {
    productsRent.forEach((product) => {
      if (product.productAction.product.productId === productId) {
        product.imageGetProduct.push({ id: 1 + productId, fileName: 'image.jpg', productId, userId: 1, isBefore: true });
      }
    });
  };






  const renderItem = ({ item }) => {
    const { productAction, imageGetProduct } = item;
    const { product } = productAction;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.productName}>{'name : ' + product.name}</Text>
        <Text>From: {formatDate.formatDate(productAction.dateFromRent, '5')}</Text>
        <Text>To: {formatDate.formatDate(productAction.dateToRent, '5')}</Text>
        <Text>Price: {productAction.price}</Text>
        {checkIsDate(productAction.dateFromRent) && imageGetProduct.length ==0 ? (
          <AppButton
            title="Upload Image"
            style={styles.imageButton}
            onPress={() => {
              // Navigate to the "ImageUploadProductRent" screen with the necessary data
              navigation.navigate('ImageUploadProductRent', {
                someKey: item,
                someKey2: navigation,
              });
            }}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productsRent}
        keyExtractor={(item) => item.productAction.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  imageButton: {
    marginTop: 8,
    backgroundColor: '#4630EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default MyProductsRentScreen;
