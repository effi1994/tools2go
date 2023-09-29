import { View, Text, TextInput, Button } from 'react-native';
import {  Input  } from 'react-native-elements';
import React, { useState, useEffect } from 'react';

function Login() {
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');

       function handleLogin() {
              // Perform login logic here
       }

       return (
              <View>
                     <label>Email</label>
                     
                     <Input 
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                     />
                     Password
                     <Input 
                            secureTextEntry
                            onChangeText={setPassword}
                            value={password}
                     />
                     <Button title="Log In" onPress={handleLogin} />
              </View>
       );
}

export default Login;