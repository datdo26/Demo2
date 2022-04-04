import {Button, StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import MainTab from '../../nav/MainTab';
import styled from 'styled-components/native';
import statusBarHeight from '../../components/statusBarHeight';

export function All({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar hidden={false} />

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
      <StatusBar hidden={false} />

      <Button onPress={() => navigation.goBack()} title="Go back All" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  return (
    <Container>
      <DrawerSection>
        <DrawerContent>
          <Avatar source={require('../../assets/avatar.png')} />
          <View>
            <Name>Nguyến Tiến Nam</Name>
            <Phone>0123456789</Phone>
          </View>
        </DrawerContent>
      </DrawerSection>
      <AddCollectionSection>
        <AddBtn>
          <AddImgBtn source={require('../../assets/ic_add_collection.png')} />
        </AddBtn>
        <AddTitle>New collection</AddTitle>
      </AddCollectionSection>
      <DrawerItemList {...props} />
    </Container>
  );
};

const SideDrawer = () => {
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

const Container = styled.View`
  display: flex;
  flex: 1;
`;

const Name = styled.Text`
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #ffffff;
`;

const Phone = styled.Text`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #ffffff;
`;

const Avatar = styled.Image`
  margin-right: 9px;
  width: 40px;
  height: 40px;
  border-radius: 100px;
`;

const DrawerSection = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${statusBarHeight}px 20px 12px 20px;
  background-color: #f2a54a;
  align-items: center;
`;

const DrawerContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AddCollectionSection = styled.View`
  display: flex;
  flex-direction: row;
  padding: 12.5px 10px;
  align-items: center;
`;
const AddBtn = styled.TouchableOpacity`
  padding: 10px;
  margin-right: 15px;
`;
const AddImgBtn = styled.Image`
  height: 20px;
  width: 20px;
`;
const AddTitle = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  color: #333333;
`;
