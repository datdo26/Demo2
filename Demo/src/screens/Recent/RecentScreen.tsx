import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
// @ts-ignore
import React, {memo, useEffect, useState} from 'react';
import Header from '../../components/Header';
import styled from 'styled-components/native';
import {IC_INFO_OUTLINE, IC_PHONE} from '../../assets';

const RecentScreen = () => {
  return (
    <Container>
      <Header title="Lịch sử" />
      <View style={{marginTop: 18}}>
        <View>
          <TouchableOpacity>
            <WrapCard>
              <IconLeft source={IC_PHONE} />
              <WrapInfo>
                <Name>Nguyễn Tiến Nam</Name>
                <Phone>0977272123</Phone>
              </WrapInfo>
              <View />
              <WrapDate>
                <Date>Hôm Nay</Date>
              </WrapDate>
              <WrapIconRight>
                <IconRight source={IC_INFO_OUTLINE} />
              </WrapIconRight>
            </WrapCard>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({});

const Container = styled.SafeAreaView`
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
