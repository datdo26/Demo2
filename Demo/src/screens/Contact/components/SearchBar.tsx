import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const width = Dimensions.get('window').width;

const Container = styled.View`
  width: ${width - 20}px;
  background-color: #e0e0e0;
  align-content: center;
  border-radius: 4px;
  margin: 0 10px;
`;

const WrapCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 36px;
`;

const IconSearch = styled.Image`
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.TextInput``;

const ButtonCancel = styled.TouchableOpacity``;

const IconCancel = styled.Image``;

const SearchBar = () => {
  return (
    <Container>
      <WrapCard>
        <IconSearch source={require('../../../assets/ic_search.png')} />
        <SearchInput placeholder="Tìm kiếm danh bạ" />
        <ButtonCancel>
          <IconCancel source={require('../../../assets/close.png')} />
        </ButtonCancel>
      </WrapCard>
    </Container>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
