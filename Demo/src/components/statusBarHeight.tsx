import {StatusBar, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import React from 'react';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';

const statusBarHeight = isIphoneX()
  ? getStatusBarHeight() + 20
  : (StatusBar.currentHeight || 14) + 16;

export default statusBarHeight;

const styles = StyleSheet.create({});
