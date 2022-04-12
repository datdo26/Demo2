import {StatusBar} from 'react-native';
// @ts-ignore
import React from 'react';
import Header from '../../components/Header';
import Alphabet from './components/Alphabet';
import styled from 'styled-components/native';


const ContactScreen = () => {

  return (
    <SafeAreaView>
      <StatusBar hidden={false} />
      <Header title="Liên hệ" />
      <Alphabet />
    </SafeAreaView>
  );
};

export default ContactScreen;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
