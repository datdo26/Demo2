import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import SearchBar from 'react-native-search-bar';
import Header from '../../components/Header';
import Alphabet from './components/Alphabet';

const ContactScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Liên hệ" />
      <SearchBar placeholder="Tìm kiếm danh bạ" />
      <Alphabet />
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({});
