import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import useLocation from '../hooks/useLocation';
import { AppForm, AppFormField, AppFormPicker, SubmitButton } from '../Components/forms';
import Screen from '../Components/Screen';
import CategoryPickerItrm from '../Components/CategoryPickerItrm';
import FormImagePicker from '../Components/forms/FormImagePicker';
import listingsApi from '../api/listings';
import UploadScreen from './UploadScreen';
import useAuth from '../auth/useAuth';
import routes from '../navigation/routes';
import { useRoute } from '@react-navigation/native'; // Import useRoute from @react-navigation/native

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "hiking",
    label: "Hiking Equipment",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "toolbox",
    label: "Home Tools",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "cellphone",
    label: "Electronics",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "flower",
    label: "Gardening Tools",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "camera",
    label: "Cameras",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "laptop",
    label: "Computers",
    value: 6,
  }
];

function LisingEditScreen({ navigation }) {
  const location = useLocation();
  const route = useRoute(); // Get the route object using useRoute
  const someData = route.params?.someKey;
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(''); // Convert price to string
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (someData) {
      setTitle(someData.product.name);
      setPrice(someData.product.price.toString());
      setDescription(someData.product.description);
      setCategory(categories.find((category) => category.value === someData.product.categoryId));
      setImages(someData.images.map((image) => image.url));
      setId(someData.product.id);
    } else {
      // Reset the form when there's no data
      resetForm();
    }
  }, [someData]);

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setCategory(null);
    setImages([]);
    setId(0);
  };

  const handleSubmit = async (listing, { resetForm }) => {
    console.log(location);
    listing.id = id;

    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok && !result.data.message) {
      setUploadVisible(false);
      return alert('Could not save the listing.');
    } else if (!result.ok && result.data.message) {
      setUploadVisible(false);
      if (result.data.message === 'You must add a credit card to your account') {
        navigation.navigate('Add credit card');

        return alert(result.data.message);
      }
     

      return alert(result.data.message);
    }

    resetForm();
    setTitle('');
    setPrice('');
    setDescription('');
    setCategory(null);
    setImages([]);
    setId(0);

    // AMD then navigate the user to the listings screen add the new listing to the listings state
    if (result.ok) {
      navigation.navigate(routes.LISTINGS, { someKey: result.data.data });
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: someData ? title : '',
          price: someData ? price : '',
          description: someData ? description : '',
          category: someData ? category : null,
          images: someData ? images : [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItrm}
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          numberOfLines={3}
          name="description"
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default LisingEditScreen;
