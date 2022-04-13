import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
// @ts-ignore
import React, {useCallback, useState} from 'react';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import MainTab from '../../nav/MainTab';
import styled from 'styled-components/native';
import statusBarHeight from '../../components/statusBarHeight';
import ItemDropDown from './ItemDropDown';
import {AVATAR, IC_ADD_COLLECTION} from "../../assets";

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const [isActive, setIsActive] = useState(false);
  const BtnCollections = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const OpenItem = () => {
    return (
      <View>
        <ItemDropDown title={'All'} />
        <ItemDropDown title={'General'} />
        <ItemDropDown title={'Investors'} />
        <ItemDropDown title={'Lead'} />
      </View>
    );
  };
  return (
    <Container>
      <DrawerSection>
        <DrawerContent>
          <Avatar source={AVATAR} />
          <View>
            <Name>Nguyến Tiến Nam</Name>
            <Phone>0123456789</Phone>
          </View>
        </DrawerContent>
      </DrawerSection>
      <View>
        <DrawerItemList {...props} />
      </View>

      <AddCollectionSection>
        <AddBtn>
          <TouchableOpacity onPress={BtnCollections}>
            {isActive ? <Text>▼</Text> : <Text>▶︎</Text>}
          </TouchableOpacity>
          <Collections>COLLECTIONS</Collections>
        </AddBtn>
        <TouchableOpacity>
          <Edit>Edit</Edit>
        </TouchableOpacity>
      </AddCollectionSection>
      {isActive ? <OpenItem /> : null}
    </Container>
  );
};

const SideDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="New Collection"
        component={MainTab}
        options={{
          drawerIcon: () => (
            <DrawerIcon
              source={IC_ADD_COLLECTION}
            />
          ),
          drawerLabelStyle: {
            fontSize: 15,
            letterSpacing: 0.12,
            color: '#333333',
          },
          drawerActiveTintColor: '#fff',
        }}
      />
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
  font-weight: 500;
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
  margin-left: 20px;
`;

const DrawerSection = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${statusBarHeight}px 20px 20px 20px;
  background-color: #f2a54a;
  align-items: center;
`;

const DrawerContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DrawerIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const Edit = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #f2a54a;
  margin-right: 16px;
`;

const Collections = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
  text-transform: uppercase;
  color: #333333;
  margin-left: 16px;
`;

const AddBtn = styled.View`
  margin: 0 16px;
  flex-direction: row;
`;

const AddCollectionSection = styled.View`
  background-color: rgba(242, 165, 74, 0.1);
  height: 44px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
