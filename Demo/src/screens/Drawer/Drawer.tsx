import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTab from '../../nav/MainTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
  return (
    <Drawer.Navigator>
      <Stack.Screen name="Home" component={MainTab} />
      <Drawer.Screen name="All" component={All} />
      <Drawer.Screen name="Notifications" component={General} />
    </Drawer.Navigator>
  );
};

export default SideDrawer;

const styles = StyleSheet.create({});
