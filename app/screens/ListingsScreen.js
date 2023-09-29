import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../Components/Button';
import routes from '../navigation/routes';
import Screen from '../Components/Screen';
import Card from '../Components/Card';
import colors from '../config/colors';
import listingsApi from '../api/listings';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';
import useApi from '../hooks/useApi';
import DropdownPicker from '../Components/DropdownPicker';
import { useRoute } from '@react-navigation/native';
import useAuth from '../auth/useAuth';

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "all-inclusive",
    label: "All",
    value: 0,
  },
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
  },
];

const myListing = [
  {
    backgroundColor: "#fc5c65",
    icon: "all-inclusive",
    label: "All and search by name",
    value: 0,
  },
  {
    backgroundColor: "#fc5c65",
    icon: "my-listings",
    label: "My Listings by name",
    value: 1,
  },
  {
    backgroundColor: "#fc5c65",
    icon: "city",
    label: "City by city",
    value: 2,
  },
  {
    backgroundColor: "#fc5c65",
    icon: "price",
    label: "Price by price",
    value: 3,
  },
];

export function ListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings,
  );

  const route = useRoute();
  let someData = route.params?.someKey;
  let someData2 = route.params?.someKey2;
  const { user } = useAuth();

  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [categoriesList, setCategoriesList] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Initialize with the first category
  const [citiesList, setCitiesList] = useState(myListing);
  const [selectedCity, setSelectedCity] = useState(myListing[0]); // Initialize with the first city

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput) {
      setSearchQuery('');
      setFilteredListings(listings);
    }
  };

  const resetAllFilters = () => {
    setSelectedCategory(categories[0]);
    setSelectedCity(myListing[0]);
    setSearchQuery('');
  }

  useEffect(() => {
    loadListings();
    setCategoriesList(categories);
  }, []);

  useEffect(() => {
    if (someData === undefined && listings) {
      filterListings();
    }
  }, [listings, searchQuery, someData, someData2, selectedCategory, selectedCity]);

  const search = (text) => {
    setSearchQuery(text);
    filterListings();
  };

  const filterListings = () => {
    let filteredData = [...listings];
  
    // Filter by category
    if (selectedCategory.value !== 0) {
      filteredData = filteredData.filter(
        (item) => item.product.categoryId === selectedCategory.value
      );
    }
  
    // Filter by search query
    if (searchQuery) {
      filteredData = filteredData.filter(
        (item) => item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // Filter by city
    if (selectedCity.value === 1) {
      filteredData = filteredData.filter(
        (item) => item.user.id === user.id
      );
    } else if (selectedCity.value === 2) {
      if (searchQuery !== '') {
        filteredData = [...listings]
        filteredData = filteredData.filter(
          (item) => item.user.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    } else if (selectedCity.value === 3) {
      if (searchQuery !== '') {
        // Ensure that the price is a string before applying toLowerCase()
        filteredData = [...listings]
        filteredData = filteredData.filter(
          (item) => item.product.price.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }
  
    setFilteredListings(filteredData);
  };
  

  const handleRefresh = () => {
    setRefreshing(true);
    resetAllFilters();
    loadListings()
      .then(() => {
        
        setRefreshing(false);
        setFilteredListings(listings);
      })
      .catch((error) => {
        console.error('Error refreshing data: ', error);
        setRefreshing(false);
      });
  };

  return (
    <>
      <ActivitiyIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <Text>Couldn't retrieve the listings.</Text>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}

        <TouchableOpacity onPress={toggleSearchInput} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>

        {listings.length === 0 && (
          <Text style={{ alignSelf: 'center' }}>No listings found.</Text>
        )}

        {showSearchInput && (
          <DropdownPicker
            items={categoriesList}
            selectedItem={selectedCategory}
            onSelectItem={(item) => {
              setSelectedCategory(item);
              filterListings();
            }}
            placeholder="Select Category"
          />
        )}

        {showSearchInput && (
          <DropdownPicker
            items={citiesList}
            selectedItem={selectedCity}
            onSelectItem={(item) => {
              setSelectedCity(item);
              filterListings();
            }}
            placeholder="Select All or My Listings"
          />
        )}

        {showSearchInput && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={search}
            value={searchQuery}
          />
        )}

        <FlatList
          data={filteredListings}
          keyExtractor={(listing) => listing.product.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={'name : ' + item.product.name}
              subTitle={'$' + item.product.price}
              imageUrl={item.images[0].url}
              postDate={item.product.postDate}
              city={'city : ' + item.user.city}
              onPress={() =>
                navigation.navigate(routes.LISTING_DETAILS, {
                  someKey: item,
                  someKey2: navigation,
                })
              }
              thumbnailUrl={item.images[0].thumbnailUrl}
              item={item}
              userId={user.id}
              listings={listings}
              setFilteredListings={setFilteredListings}
              navigation={navigation}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    position: 'absolute',
    top: 2,
    right: 10,
    zIndex: 1,
  },
});

export default ListingsScreen;
