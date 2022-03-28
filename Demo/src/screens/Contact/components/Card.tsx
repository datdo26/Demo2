import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../nav/RootStack';
import styled from 'styled-components/native';

const TouchableOpacity = styled.TouchableOpacity``;

const Wrapper = styled.View`
  margin-top: 16px;
`;

const WrapCard = styled.View`
  background-color: white;
  height: 64px;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
`;

const Avatar = styled.Image`
background-blend-mode: normal;, 
width: 40px;
height: 40px;
margin-horizontal: 16px
`;

const WrapText = styled.View``;

const Name = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #333333;
`;

const PhoneNumber = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #828282;
`;

const width = Dimensions.get('window').width;

const Card = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigate('SingleContact')}>
        <WrapCard>
          <Avatar source={require('../../../assets/avt.png')} />
          <WrapText>
            <Name>Nguyễn Tiến Nam</Name>
            <PhoneNumber>0123456789</PhoneNumber>
          </WrapText>
        </WrapCard>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default Card;

const styles = StyleSheet.create({});
