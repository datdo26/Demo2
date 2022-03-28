import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

const Wrapper = styled.View``;

const WrapView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-top: 16px;
  height: 32px;
  margin: 0 16px;
`;

const Button = styled.TouchableOpacity``;

const Title = styled.Text`
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #333333;
`;

const More = styled.Image``;

const Camera = styled.Image``;

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <WrapView>
      <Button onPress={() => navigation.openDrawer()}>
        <More source={require('../assets/contact/more.png')} />
      </Button>
      <Title>{title}</Title>
      <Button>
        <Camera source={require('../assets/ic_camera.png')} />
      </Button>
    </WrapView>
  );
};

export default Header;

const styles = StyleSheet.create({});
