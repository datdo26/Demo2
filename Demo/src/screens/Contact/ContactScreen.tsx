import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Alphabet from './components/Alphabet';
import {useContacts} from '../../store';

const ContactScreen = () => {
  const contacts = useContacts();
  console.log('contacts ', contacts);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar hidden={false} />
      <Header title="Liên hệ" />
      <Alphabet contact={undefined} />
    </SafeAreaView>
  );
};

export default ContactScreen;
