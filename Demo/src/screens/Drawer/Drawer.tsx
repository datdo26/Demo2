import {Button, StyleSheet, Image, View, Text} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import MainTab from '../../nav/MainTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import styled from 'styled-components/native';

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

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerContent
        style={{
          backgroundColor: '#F2A54A',
          height: 88,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar source={require('../../assets/avt.png')} />
        <View>
          <Name>Nguyến Tiến Nam</Name>
          <Phone>0123456789</Phone>
        </View>
      </DrawerContent>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const SideDrawer = () => {
  const [active, setActive] = useState();
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={MainTab} />
      <Drawer.Screen name="All" component={All} />
      <Drawer.Screen name="Notifications" component={General} />
    </Drawer.Navigator>
  );
};

export default SideDrawer;

const styles = StyleSheet.create({});

const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #ffffff;
`;

const Phone = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #ffffff;
`;

const Avatar = styled.Image`
  margin: 0 16px;
`;

const DrawerContent = styled.View`
  background-color: #f2a54a;
  height: 88px;
  flex-direction: row;
  align-items: center;
`;
