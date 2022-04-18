import {TouchableOpacity, SectionList, ScrollView} from 'react-native';
// @ts-ignore
import React, {memo, useCallback, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {IC_PROFILE, IC_SEARCH} from '../../../assets';
import {store, useContactIds} from '../../../store';
import FastImage from 'react-native-fast-image';
import {RawContact} from '../../../store/types';

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

const getObject = ids => {
  let contact_array = [];
  ids?.map(item => {
    const contact = store.getState().contactReducer.byId[item];
    contact_array.push(contact);
  });
  return contact_array;
};

export const AlphabetScreen = memo(function Alphabet() {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState([]);
  const contact_ids = useContactIds('all');
  const contactData = getObject(contact_ids);
  const listRef = useRef();

  const searchFilter = useCallback(
    (text: string) => {
      if (text) {
        const newData: RawContact[] = Object.values(contactData);
        const Data = newData.filter(item => {
          return item.firstName.includes(text);
        });
        setFilterData(Data);
        setSearchText(text);
      } else {
        setFilterData(Object.values(contactData));
        setSearchText(text);
      }
    },
    [contactData],
  );

  const getItemLayout = (data, index) => {
    return {length: 64, offset: 64 * index, index};
  };

  const renderItem = useCallback(
    ({item}) => {
      const handleNavigation = useCallback(
        ({item}) => {
          navigation.navigate('ContactDetail', {
            id: item.id,
          });
        },
        [navigation],
      );
      return (
        <ScrollView>
          <TouchableOpacity onPress={() => handleNavigation({item})}>
            <WrapCard>
              <Avatar source={item?.avatar ? {uri: item.avatar} : IC_PROFILE} />
              <WrapText>
                <Name>
                  {item.firstName} {item.lastName}
                </Name>
                <PhoneNumber>{item.phone[item.phone.length - 1]}</PhoneNumber>
              </WrapText>
            </WrapCard>
          </TouchableOpacity>
        </ScrollView>
      );
    },
    [navigation],
  );

  const SideChar = useCallback(() => {
    const onScrollToLocation = useCallback(
      (key: string) => {
        const index = groupBy(contactData)
          .map(item => item.keyName)
          .indexOf(key);
        // @ts-ignore
        listRef.current.scrollToLocation({
          animated: true,
          itemIndex: 0,
          sectionIndex: index,
          viewOffset: 0,
        });
      },
      [contactData],
    );
    return (
      <Char>
        {char.map((char, key) => {
          return (
            <SideCharBtn key={key} onPress={() => onScrollToLocation(char)}>
              <SideCharText>{char}</SideCharText>
            </SideCharBtn>
          );
        })}
      </Char>
    );
  }, [contactData]);

  return (
    <Container>
      <SearchSection>
        <SearchIcon source={IC_SEARCH} />
        <SearchInput
          placeholder={'Tìm kiếm ở đây'}
          placeholderTextColor="black"
          onChangeText={searchFilter}
          value={searchText}
        />
      </SearchSection>

      <SideCharView>
        <SideChar />
      </SideCharView>

      <SectionList
        sections={
          searchText
            ? Object.values(groupBy(filterData))
            : Object.values(groupBy(contactData))
        }
        renderItem={renderItem}
        ref={listRef}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({section: {keyName}}) => (
          <SectionHeader>
            <SectionHeaderText>{keyName.toUpperCase()} </SectionHeaderText>
          </SectionHeader>
        )}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardSpacer />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
`;

const SideCharView = styled.View`
  position: absolute;
  z-index: 1;
  right: 0;
`;

const Char = styled.View`
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
  font-size: 16px;
  letter-spacing: 0.12px;
  color: #333333;
  font-weight: 500;
  margin-top: 12px;
`;

const Avatar = styled(FastImage)`
  width: 40px;
  height: 40px;
  margin: 0 16px;
  border-radius: 100px;
`;

const PhoneNumber = styled.Text`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #828282;
  text-align: left;
  margin-top: 8px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const SearchSection = styled.View`
  background-color: #f2f2f2;
  border-radius: 6px;
  flex-direction: row;
  height: 36px;
  align-items: center;
  margin: 4px 10px 9px;
  opacity: 0.5;
`;

const SearchIcon = styled(FastImage)`
  width: 16px;
  height: 16px;
  margin-left: 9px;
  margin-right: 11px;
`;

const SearchInput = styled.TextInput`
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
  flex: auto;
`;

const WrapText = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  width: 273px;
`;
const WrapCard = styled.View`
  background-color: white;
  height: 64px;
  align-items: center;
  flex-direction: row;
`;

const SectionHeader = styled.View`
  background-color: #f2f2f2;
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
