import {
  View,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// @ts-ignore
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import SearchBar from 'react-native-search-bar';
import {useContacts} from '../../../store';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const width = Dimensions.get('window').width;
const SideCharView = styled.View`
  position: absolute;
  z-index: 1;
  right: 0px;
`;

const SideChar = styled.View`
  right: 10px;
  top: 50px;
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
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #333333;
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
  margin-top: 5px;
`;

const WrapText = styled.View``;
const WrapCard = styled.View`
  background-color: white;
  height: 80px;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
`;

const SectionHeader = styled.View`
  opacity: 0.5;
  background-color: #e0e0e0;
  height: 36px;
  justify-content: center;
`;

const SectionHeaderText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 16px;
  text-align: left;
  letter-spacing: 0.12px;
  color: black;
  margin: 0 16px;
`;

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
const groupBy = items => {
  const _obj = _.groupBy(items, item => item.firstName[0]);
  return Object.keys(_obj).map(item => {
    return {
      keyName: item,
      data: _obj[item],
    };
  });
};

const Alphabet = () => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const contacts = useSelector((state: any) => state.contactReducer);

  const handleNavigation = useCallback(
    ({item}) => {
      navigation.navigate('ContactDetail', {
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
        avatar: item.avatar,
        id: item.id,
        email: item.email,
        address: item.address,
        birthday: item.birthday,
      });
    },
    [contacts],
  );

  const renderItem = ({item}) => {
    return (
      <ScrollView>
        <TouchableOpacity onPress={() => handleNavigation({item})}>
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
      </ScrollView>
    );
  };
  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Tìm kiếm danh bạ"
        onChangeText={text => {
          setSearchText(text);
        }}
      />

      <SideCharView>
        <SideChar>
          {char.map((char, key) => (
            <SideCharBtn key={key}>
              <SideCharText>{char}</SideCharText>
            </SideCharBtn>
          ))}
        </SideChar>
      </SideCharView>

      <SectionList
        sections={groupBy(contacts).filter(result =>
          result.keyName.toLowerCase().includes(searchText.toLowerCase()),
        )}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({section: {keyName}}) => (
          <SectionHeader>
            <SectionHeaderText>{keyName.toUpperCase()} </SectionHeaderText>
          </SectionHeader>
        )}
      />
      <KeyboardSpacer />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Alphabet;
