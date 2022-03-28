import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddContactScreen from '../screens/AddContact/AddContactScreen';
import ContactScreen from '../screens/Contact/ContactScreen';
import RecentScreen from '../screens/Recent/RecentScreen';

export type MainTabParamLists = {
  ContactScreen: undefined;
  RecentScreen: undefined;
  AddContactScreen: undefined;
};

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: '#F2A54A',
        },
      }}>
      <Tab.Screen
        name="Liên hệ"
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image source={require('../assets/contact/ic_contact.png')} />
          ),
        }}
      />
      <Tab.Screen
        name=" "
        component={AddContactScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image source={require('../assets/ic_add_white.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Gần đây"
        component={RecentScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image source={require('../assets/recent/ic_recent.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
