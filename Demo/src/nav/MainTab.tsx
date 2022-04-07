import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactScreen from '../screens/Contact/ContactScreen';
import RecentScreen from '../screens/Recent/RecentScreen';

export type MainTabParamLists = {
  ContactScreen: undefined;
  RecentScreen: undefined;
};

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: '#F2A54A',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Liên hệ"
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require('../assets/contact/ic_contact.png')} />
          ),
          tabBarInactiveTintColor: '#DADADA',
          tabBarActiveTintColor: '#fff',
        }}
      />

      <Tab.Screen
        name="Gần đây"
        component={RecentScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require('../assets/recent/ic_recent.png')} />
          ),
          tabBarInactiveTintColor: '#DADADA',
          tabBarActiveTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
