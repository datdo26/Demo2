import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';

import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../nav/RootStack';
import SearchBar from 'react-native-search-bar';

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

const Data_section = [
  {
    title: 'A',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'B',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'C',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'D',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'E',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'F',
    data: [
      'Julia Comstock',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },
  {
    title: 'G',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'H',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'J',
    data: [
      'Lillie-Mai Allen',
      'Julia Comstock',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'K',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Julia Comstock',
      'Rosemary Waterlow',
    ],
  },

  {
    title: 'L',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Julia Comstock',
      'Rosemary Waterlow',
    ],
  },

  {title: 'M', data: ['Lillie-Mai Allen']},
  {title: 'N', data: ['Lillie-Mai Allen']},
  {
    title: 'O',
    data: [
      'Lillie-Mai Allen',
      'Emmanuel Goldstein',
      'Emmanuel Goldstein',
      'Rosemary Waterlow',
    ],
  },
  {title: 'P', data: ['Lillie-Mai Allen', 'Emmanuel Goldstein']},
  {title: 'Q', data: ['Lillie-Mai Allen', 'Emmanuel Goldstein']},
];

const Alphabet = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigate('ContactDetail')}>
        <WrapCard>
          <Avatar source={require('../../../assets/avt.png')} />
          <WrapText>
            <Name>{item}</Name>
            <PhoneNumber>0123456789</PhoneNumber>
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
            <SideCharBtn key={key} onPress={() => {}}>
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
      {/*<SectionList*/}
      {/*    showsVerticalScrollIndicator={false}*/}
      {/*    sections={Data_section.filter(Data_section =>*/}
      {/*        Data_section.title.toLowerCase().includes(searchText.toLowerCase()),*/}
      {/*    )}*/}
      {/*    renderItem={renderItem}*/}
      {/*    renderSectionHeader={renderSectionHeader}*/}
      {/*    keyExtractor={(item, index) => index.toString()}*/}

      {/*/>*/}
      <TouchableOpacity onPress={() => navigate('ContactDetail')}>
        <WrapCard>
          <Avatar source={require('../../../assets/avt.png')} />
          <WrapText>
            <Name>a</Name>
            <PhoneNumber>0123456789</PhoneNumber>
          </WrapText>
        </WrapCard>
      </TouchableOpacity>
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
  background-blend-mode: normal;,
  width: 40 px;
  height: 40px;
  margin-horizontal: 16px
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
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
`;
