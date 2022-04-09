import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
// @ts-ignore
import React from 'react';
import styled from 'styled-components/native';
import {IC_ITEM} from "../../assets";

const ItemDropDown = ({title}) => {
  return (
    <TouchableOpacity>
      <WrapView>
        <Icon source={IC_ITEM} />
        <View>
          <Title>{title}</Title>
        </View>
      </WrapView>
    </TouchableOpacity>
  );
};

export default ItemDropDown;

const styles = StyleSheet.create({});

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin: 14px 16px 14px 16px;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #333333;
`;

const WrapView = styled.View`
  flex-direction: row;
  align-items: center;
`;
