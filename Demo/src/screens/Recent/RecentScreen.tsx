import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import SearchBar from 'react-native-search-bar';

const RecentScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="Lịch sử" />
      <SearchBar />
    </SafeAreaView>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({});
