import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from '../Components/lists/ListItem';
import Screen from '../Components/Screen';
import ListItemSeparator from '../Components/lists/ListItemSeparator';
import ListItemDeleteAction from '../Components/lists/ListItemDeleteAction';
import messages from '../api/messages';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';

function MessagesScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages12, setMessages12] = useState([]);
  const { user } = useAuth();


  const loadMessages = async () => {
    setLoading(true);
    const response = await messages.getMessages();
    if (!response.ok) return setError(true);
    setError(false);
    setLoading(false);
    console.log(response.data.data);
    setMessages12(response.data.data);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  const updateNumberIsNotRead = (item) => {
    const updatedMessages = messages12.map((message) =>
      message.id === item.id ? { ...message, numberIsNotRead: '0' } : message
    );
    setMessages12(updatedMessages);
    navigation.navigate(routes.USER_CHATS, item.id);
    setRefreshing(true); // Use setRefreshing to update the state
  }

  return (
    <>
      <ActivitiyIndicator visible={loading} />
      <Screen>
        <FlatList
          data={messages12}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subTitle={user.id === item.id  ? " MY Message" : "Message"}
              onPress={() => updateNumberIsNotRead(item)}
              numberIsNotRead={item.numberIsNotRead}
            />
          )}
          ItemSeparatorComponent={() => <ListItemSeparator />}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(false)} 
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
