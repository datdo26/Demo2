import {StyleSheet, Image} from 'react-native';
// @ts-ignore

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactScreen from '../screens/Contact/ContactScreen';
import RecentScreen from '../screens/Recent/RecentScreen';
import {IC_CONTACT, IC_RECENT} from "../assets";

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
            <Image source={IC_CONTACT} />
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
            <Image source={IC_RECENT} />
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
