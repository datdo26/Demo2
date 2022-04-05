import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import statusBarHeight from "../../components/statusBarHeight";
const Wrapper = styled.View`
  margin-top: 16px ;
`;

const WrapView = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const ButtonBack = styled.TouchableOpacity``;

const ButtonDone = styled.TouchableOpacity``;
const Back = styled.Image`
  margin-left: 16px;
`;

const TextButton = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #f2a54a;
  margin-right: 16px;
`;

const Header = () => {
  const {goBack} = useNavigation();
  return (
    <Wrapper>
      <WrapView>
        <ButtonBack onPress={() => goBack()}>
          <Back source={require('../../assets/ic_back.png')} />
        </ButtonBack>
        <ButtonDone onPress={() => goBack()}>
          <TextButton>Xong</TextButton>
        </ButtonDone>
      </WrapView>
    </Wrapper>
  );
};

export default Header;

const styles = StyleSheet.create({});
