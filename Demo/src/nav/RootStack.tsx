import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainTab from './MainTab';
import ContactDetail from '../screens/ContactDetail/ContactDetail';
import SideDrawer from '../screens/Drawer/Drawer';
import {LoginScreen} from '../screens/LoginScreen';

export type RootStackParamList = {
  MainTab: undefined;
  AddContactScreen: undefined;
  ContactDetail: undefined;
  LoginScreen: undefined;
  SideDrawer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContactDetail"
          component={ContactDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SideDrawer"
          component={SideDrawer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
