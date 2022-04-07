import React, {useCallback} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

const WrapView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  height: 42px;
  align-items: center;
  background-color: #fff;
  margin-bottom: 6px;
  margin-top: 16px;
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

const Header = ({title}: any) => {
  const navigation = useNavigation<any>();
  const _openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);

  const _openAddContact = useCallback(() => {
    navigation.navigate('AddContactScreen');
  }, [navigation]);

  return (
    <WrapView>
      <Button onPress={_openDrawer}>
        <More source={require('../assets/contact/more.png')} />
      </Button>
      <Title>{title}</Title>
      <Button onPress={_openAddContact}>
        <Camera source={require('../assets/ic_camera.png')} />
      </Button>
    </WrapView>
  );
};

export default Header;
