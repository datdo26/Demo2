import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Alphabet from './components/Alphabet';
import {useContacts} from '../../store';
import styled from 'styled-components/native';
import SearchBar from 'react-native-search-bar';
import List from './List';

const ContactScreen = () => {
  const contacts = useContacts();
  console.log('contacts ', contacts);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar hidden={false} />
      <Header title="Liên hệ" />
      <SearchBar placeholder="Tim kiem danh ba" />
      <Alphabet contact={undefined} />
    </SafeAreaView>
  );
};

export default ContactScreen;
