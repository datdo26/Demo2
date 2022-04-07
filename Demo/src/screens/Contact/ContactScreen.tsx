import {StatusBar} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Alphabet from './components/Alphabet';
import {useContacts} from '../../store';
import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
const ContactScreen = () => {
  const contacts = useContacts();
  console.log('contacts ', contacts);

  return (
    <SafeAreaView>
      <StatusBar hidden={false} />
      <Header title="Liên hệ" />
      <Alphabet />
    </SafeAreaView>
  );
};

export default ContactScreen;
