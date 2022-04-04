import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  SectionList,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RawContact} from '../../../store/types';
import {useSelector} from 'react-redux';
import SearchBar from 'react-native-search-bar';
import {AlphabetList} from 'react-native-section-alphabet-list';

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
  font-weight: 500;
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
`;

const WrapText = styled.View``;

const WrapCard = styled.View`
  background-color: white;
  height: 80px;
  align-items: center;
  flex-direction: row;
  border-bottom-color: gray;
  border-bottom-witdh: 0.5px;
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

const Alphabet = ({contact}: {contact: RawContact}) => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const DATA = useSelector((state: any) => state.contactReducer);
  console.log('DATA', DATA);

  const handleNavigation = useCallback(
    ({item}: {item: RawContact}) => {
      navigation.navigate('ContactDetail', {
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
        avatar: item.avatar,
        id: item.id,
      });
    },
    [DATA],
  );

  const renderItem = ({item}: {item: RawContact}) => {
    console.log('item', item);

    return (
      <View>
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
      </View>
    );
  };
  const renderSectionHeader = section => {
    <Text>{section.title}</Text>;
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

      <FlatList
        data={DATA.filter(result =>
          result.firstName.toLowerCase().includes(searchText.toLowerCase()),
        )}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
      />
      {/* <SectionList
        sections={DATA.filter(result =>
          result.firstName.toLowerCase().includes(searchText.toLowerCase()),
        )}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderItem}
        // renderSectionHeader={({section: {title}}) => {
        //   <Text>{title}</Text>;
        // }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Alphabet;
