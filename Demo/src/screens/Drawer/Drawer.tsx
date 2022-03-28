import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTab from '../../nav/MainTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import DrawerContent from './DrawerContent';

export function All({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('All')}
        title="Go to General"
      />
    </View>
  );
}

export function General({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back All" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const Stack = createBottomTabNavigator();

const SideDrawer = () => {
  const [active, setActive] = useState();
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={MainTab} />
      <Drawer.Screen name="All" component={All} />
      <Drawer.Screen name="Notifications" component={General} />
    </Drawer.Navigator>
  );
};

export default SideDrawer;

const styles = StyleSheet.create({});
