import {View, SectionList, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import SearchBar from 'react-native-search-bar';
import {RawContact} from '../../../store/types';
import {useContacts} from '../../../store';

const char = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const Alphabet = ({contact}: {contact: RawContact}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const contactList = useContacts();

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ContactDetail')}>
        <WrapCard>
          <Avatar source={{uri: item.avatar}} />
          <WrapText>
            <Name>
              {item.firstName} {item.lastName}
            </Name>
            <PhoneNumber>{item.phone}</PhoneNumber>
          </WrapText>
        </WrapCard>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => {
    return <Title>{section.title}</Title>;
  };

  return (
    <View>
      <View style={{position: 'absolute', zIndex: 1, right: 0}}>
        <SideChar>
          {char.map((char, key) => (
            <SideCharBtn key={key}>
              <SideCharText>{char}</SideCharText>
            </SideCharBtn>
          ))}
        </SideChar>
      </View>
      <SearchBar
        placeholder="Tim kiem danh ba"
        text={searchText}
        onChangeText={text => setSearchText(text)}
      />
      {/* <SectionList
        showsVerticalScrollIndicator={false}
        sections={contactList}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      <FlatList
        data={contactList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default Alphabet;

const SideChar = styled.View`
  right: 10px;
  top: 40px;
`;

const SideCharBtn = styled.TouchableOpacity``;

const SideCharText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #f2a54a;
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #333333;
`;

const Title = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #333333;
  background-color: #e0e0e0;
  opacity: 0.5;
  height: 16px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  margin-horizontal: 16px;
  border-radius: 100px;
`;

const PhoneNumber = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #828282;
`;

const WrapText = styled.View``;

const WrapCard = styled.View`
  background-color: white;
  height: 64px;
  align-items: center;
  flex-direction: row;
`;
