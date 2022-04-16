import {StyleSheet} from 'react-native';
// @ts-ignore
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainTab from './MainTab';
import ContactDetail from '../screens/ContactDetail/ContactDetail';
import SideDrawer from '../screens/Drawer/Drawer';
import {LoginScreen} from '../screens/LoginScreen';
import AddContactScreen from '../screens/AddContact/AddContactScreen';

export type RootStackParamList = {
  MainTab: undefined;
  ContactDetail: undefined;
  LoginScreen: undefined;
  SideDrawer: undefined;
  AddContactScreen: undefined;
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
          name="AddContactScreen"
          component={AddContactScreen}
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
