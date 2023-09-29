import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, TextInput, Button, Text } from 'react-native';
import Screen from '../Components/Screen';
import ActivitiyIndicator from '../Components/ActivitiyIndicator';
import messages from '../api/messages';
import { useRoute } from '@react-navigation/native';
import useAuth from '../auth/useAuth';
import formatDate from '../utility/formatDate';

function UserChatScreen({ route }) {
  const [messages1, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendMessages, setSendMessages] = useState('');
  const [userId2, setUserId2] = useState(route.params);
  const { user } = useAuth();

  const loadMessages = async () => {
    setLoading(true);
    console.log("userId2", userId2);
    const response = await messages.getUserChats(userId2);
    if (!response.ok) return setError(true);
    setError(false);
    setLoading(false);
    setMessages(response.data.data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = async () => {
    const response = await messages.sendMessageToUser(sendMessages, userId2);
    if (!response.ok) return setError(true);
    setError(false);

    // Update the state with the new message
    setMessages([...messages1, response.data.data]);
    setSendMessages('');
  };

  return (
    <>
      <ActivitiyIndicator visible={loading} />
      <Screen style={styles.container}>
        {/* Message List */}
        <FlatList
          data={messages1}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                {
                  alignSelf: item.fromUser.id === user.id ? 'flex-end' : 'flex-start',
                  backgroundColor: item.fromUser.id === user.id ? '#DCF8C6' : '#E5E5EA',
                },
              ]}
            >
              <Text style={styles.senderName}>{item.fromUser.id === user.id ? 'Me' : item.fromUser.name}</Text>
              <Text style={styles.messageTimestamp}>{formatDate.formatDate(item.dateTime)}</Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          )}
          refreshing={refreshing}
          onRefresh={loadMessages}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={sendMessages}
            onChangeText={(text) => setSendMessages(text)}
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    zIndex: 1000,

  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageTimestamp: {
    fontSize: 10,
    color: '#888',
  },
  messageText: {
    fontSize: 16,
  },
});

export default UserChatScreen;
