import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

const WrapView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  height: 42px;
  align-items: center;
  background-color: #fff;
  margin-bottom: 6px;
`;

const Button = styled.TouchableOpacity``;

const Title = styled.Text`
  font-weight: 500;
  font-size: 28px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #333333;
`;

const More = styled.Image`
  margin-left: 16px;
`;

const Camera = styled.Image`
  margin-right: 16px;
`;

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
