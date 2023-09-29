import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DropdownPicker = ({ items, selectedItem, onSelectItem, placeholder }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemPress = (item) => {
    onSelectItem(item);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.headerText}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Ionicons
          name={showDropdown ? 'caret-up-outline' : 'caret-down-outline'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {showDropdown && (
        <FlatList
          style={styles.dropdownList}
          data={items}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleItemPress(item)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  headerText: {
    flex: 1,
  },
  dropdownList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default DropdownPicker;
