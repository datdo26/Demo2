import {View, TouchableOpacity, FlatList, TextInput} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RawContact} from '../../../store/types';
import {remove, useContacts} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {nonAccentVietnamese} from '../../../store/nonAccentVietnamese';
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
  const [filteredList, setFilteredList] = useState([]);
  const dispatch = useDispatch();
  const contactList = useContacts();
  const [detail, setDetail] = useState<string>();
  const Data = useSelector((state: any) => state.contactReducer);
  console.log('Data', Data);

  const searchFilter = str => {
    const text = nonAccentVietnamese(str);
    if (text) {
      const newData: RawContact[] = Object.values(contactList.id);
      const result = newData.filter(item => {
        return item.searchField.includes(text);
      });
      setFilteredList(result);
      setSearchText(str);
    } else {
      setFilteredList(Object.values(contactList.id));
      setSearchText(str);
    }
  };

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

  const onPressItem = (item: RawContact): void => {
    setDetail(item.id);
    console.log('detail', detail);
  };

  const removeItem = (item: RawContact) => {
    dispatch(remove(item.id));
  };

  const renderItem = ({item}: {item: RawContact}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ContactDetail', {
              firstName: item.firstName,
              lastName: item.lastName,
              phone: item.phone,
              avatar: item.avatar,
              id: item.id,
            })
          }>
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

  const renderSectionHeader = ({section}) => {
    return <Title>{section.title}</Title>;
  };

  return (
    <View>
      {/* <View>
        <TextInput
          placeholder="Tìm kiếm danh bạ"
          value={searchText}
          onChangeText={text => {
            searchFilter(text);
          }}
        />
      </View> */}
      <View style={{position: 'absolute', zIndex: 1, right: 0}}>
        <SideChar>
          {char.map((char, key) => (
            <SideCharBtn key={key}>
              <SideCharText>{char}</SideCharText>
            </SideCharBtn>
          ))}
        </SideChar>
      </View>

      {/* <SectionList
        showsVerticalScrollIndicator={false}
        sections={contactList}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
      />
    </View>
  );
};

export default Alphabet;

const SideChar = styled.View`
  right: 10px;
  top: 20px;
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
  height: 80px;
  align-items: center;
  flex-direction: row;
  border-bottom-color: gray;
  border-bottom-witdh: 0.5;
`;
