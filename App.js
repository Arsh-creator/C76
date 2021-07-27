import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from "./screens/Home";
import IssLocationScreen from "./screens/IssLocation";
import MeteorScreen from "./screens/Meteors";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName= 'Home'
      screenOptions= {{headerShown: false}}>
      <Stack.Screen
       name = 'Home'
       component= {HomeScreen}/>
       <Stack.Screen
       name = 'IssLocation'
       component= {IssLocationScreen}/>
       <Stack.Screen
       name = 'Meteors'
       component= {MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;