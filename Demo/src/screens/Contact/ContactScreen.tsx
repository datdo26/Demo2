import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

const ContactScreen = () => {
  return (
    <SafeAreaView>
      <SearchBar />
      <Card />
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({});
