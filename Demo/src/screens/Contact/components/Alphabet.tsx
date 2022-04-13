import {
    View,
    TouchableOpacity,
    StyleSheet,
    SectionList,
    ScrollView,
    TextInput,
    Image,
} from 'react-native';
// @ts-ignore
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import SearchBar from 'react-native-search-bar';
// @ts-ignore
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {IC_PROFILE, IC_SEARCH} from '../../../assets';
import {store, useContactIds, useContacts} from "../../../store";

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
    let a = [];
    ids?.map(item => {
        const contact = store.getState().contactReducer.byId[item]
        a.push(contact)
    })
    return a
};

const Alphabet = () => {
    const navigation = useNavigation<any>();
    const [searchText, setSearchText] = useState('');
    const [image, setImage] = useState<any>(Boolean);
    const contacts = useSelector((state: any) => state.contactReducer);
    const ids = useContactIds('all');
    const abc = getObject(ids);

    console.log('ids', Object.values(abc))

    const handleNavigation = useCallback(
        ({item}) => {
            // console.log('item', item)
            navigation.navigate('ContactDetail', {
                id: item.id
            });
        },
        [contacts],
    );

    const renderItem = ({item}) => {
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => handleNavigation({item})}>
                    <WrapCard>
                        <Avatar source={image ? IC_PROFILE : {uri: item.avatar}}/>
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
        <Container>
            <SearchSection>
                <SearchIcon
                    source={IC_SEARCH}
                />
                <SearchInput
                    placeholder={'Tìm kiếm danh bạ'}
                    onChangeText={text => {
                        setSearchText(text);
                    }}
                    placeholderTextColor='black'
                />
            </SearchSection>

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
                sections={groupBy(abc).filter(result =>
                    result.keyName.toLowerCase().includes(searchText.toLowerCase()),
                )||[]}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={({section: {keyName}}) => (
                    <SectionHeader>
                        <SectionHeaderText>{keyName.toUpperCase()} </SectionHeaderText>
                    </SectionHeader>
                )}
            />
            <KeyboardSpacer/>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default Alphabet;

const Container = styled.View`
  flex: 1`

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
  width: 50px;
  height: 50px;
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

const SearchSection = styled.View`
  background-color: #F2F2F2;
  border-radius: 6px;
  flex-direction: row;
  height: 36px;
  align-items: center;
  margin: 0 10px;
  margin-bottom: 9px;
  opacity: 0.5;
`;

const SearchIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-left: 9px;
  margin-right: 11px;
`

const SearchInput = styled.TextInput`
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
`

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
  background-color: #E0E0E0;
  height: 36px;
  justify-content: center;
  opacity: 0.5;
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