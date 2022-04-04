import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const SearchComponent = ({onSearchEnter}) => {
  const [text, setText] = useState('');
  return (
    <View>
      <Image source={require('../../../assets/ic_search.png')} />
      <TextInput
        placeholder="Tim kiem danh ba"
        placeholderTextColor="black"
        value={text}
        onChangeText={newText => {
          setText(newText);
        }}
        onEndEditing={() => {
          onSearchEnter(text);
        }}
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({});
