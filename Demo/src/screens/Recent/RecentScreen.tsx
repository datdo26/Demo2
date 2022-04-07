import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const WrapCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const WrapInfo = styled.View``;

const IconLeft = styled.Image`
  left: 16px;
`;

const IconRight = styled.Image`
  right: 16px;
`;

const WrapDate = styled.View`
  justify-content: center;
`;

const WrapIconRight = styled.View`
  justify-content: center;
`;
const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.12px;
  color: #333333;
`;

const Phone = styled.Text`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.12px;
  color: #828282;
`;
const Date = styled.Text`
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.12px;
  color: #828282;
  text-align: right; ;
`;

const RecentScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="Lịch sử" />
      <View style={{marginTop: 18}}>
        <View>
          <TouchableOpacity>
            <WrapCard>
              <IconLeft source={require('../../assets/ic_phone.png')} />
              <WrapInfo>
                <Name>Nguyễn Tiến Nam</Name>
                <Phone>0977272123</Phone>
              </WrapInfo>
              <View />
              <WrapDate>
                <Date>Hôm Nay</Date>
              </WrapDate>
              <WrapIconRight>
                <IconRight
                  source={require('../../assets/ic_info_outline.png')}
                />
              </WrapIconRight>
            </WrapCard>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({});
