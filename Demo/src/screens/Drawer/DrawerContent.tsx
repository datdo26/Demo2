import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const DrawerContent = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 15}}>
            <Image source={require('../../assets/avt.png')} />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
