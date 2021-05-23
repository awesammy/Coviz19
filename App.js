import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Button } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePostsScreen from './screens/HomePostsScreen';
import PostDetailsScreen from './screens/PostDetailsScreen';
import QuestionInitScreen from './screens/QuestInitScreen';
import SettingsScreen from './screens/SettingsScreen';
import MainSignInScreen from './screens/MainSignInScreen';
import MainSignUpScreen from './screens/MainSignUpScreen';

const Stack = createStackNavigator();
function PostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostHome" component={HomePostsScreen} options={{headerTitle: '', headerShown: false}}/>
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{headerTitle: 'Details', headerShown: true}}/>
      <Stack.Screen name="SignIn" component={MainSignInScreen} options={{headerTitle: 'SignIn to Coviz19', headerShown: true}}/>
    </Stack.Navigator>
  );
}
function QuestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuestHome" component={QuestionInitScreen} options={{headerTitle: '', headerShown: false}}/>
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{headerTitle: 'Details', headerShown: true}}/>
      <Stack.Screen name="SignIn" component={MainSignInScreen} options={{headerTitle: 'SignIn to Coviz19', headerShown: true}}/>
    </Stack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

function TabBarScreen(){
  
  
}




export default function App() {
  return (

    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="UserLogin" component={MainSignInScreen} options={{headerTitle: 'Login', headerShown: false}}/>
    //     <Stack.Screen name="UserSignup" component={MainSignInScreen} options={{headerTitle: 'Login', headerShown: false}}/>
    //     <Stack.Screen name="TabBarScreen" component={TabBarScreen} options={{headerTitle: 'TabBar', headerShown: true}}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="PostHome" component={PostStack} options={{tabBarLabel: 'Posts'}} />
      <Tab.Screen name="Quest" component={QuestStack} options={{tabBarLabel: 'Quests'}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarLabel: 'My Posts'}}/>
  </Tab.Navigator>
  </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
