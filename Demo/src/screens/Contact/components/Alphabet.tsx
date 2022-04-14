import {
    TouchableOpacity,
    SectionList,
    ScrollView, PixelRatio,
} from 'react-native';
// @ts-ignore
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
// @ts-ignore
import _, {first, result} from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {IC_PROFILE, IC_SEARCH} from '../../../assets';
import {store, useContactIds, useContactsName} from "../../../store";
import FastImage from "react-native-fast-image";
import {RawContact} from "../../../store/types";
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
    console.log('_obj', _obj)
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
    const [filterData, setFilterData] = useState([])
    const contacts = useSelector((state: any) => state.contactReducer);
    const contact_ids = useContactIds('all');
    const contactData = getObject(contact_ids);

    const searchFilter = useCallback((text: string) => {
        if(text){
            const newData: RawContact[] = Object.values(contact_ids)
            const Data = newData.filter(item => {
                return item.firstName.includes(text)
            })
            setFilterData(Data)
            setSearchText(text)
        } else {
            setFilterData(Object.values(contact_ids))
            setSearchText(text)
        }
    }, [])

    const handleNavigation = useCallback(
        ({item}) => {
            navigation.navigate('ContactDetail', {
                id: item.id,
            });
        },
        [contacts],
    );

    const renderItem = ({item}) => {
        return (
            <ScrollView>
                <TouchableOpacity onPress={() => handleNavigation({item})}>
                    <WrapCard>
                        <Avatar source={item?.avatar ? {uri: item.avatar} : IC_PROFILE}/>
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
    };

    return (
        <Container>
            <SearchSection>
                <SearchIcon
                    source={IC_SEARCH}
                />
                <SearchInput
                    placeholder={'Tìm kiếm danh bạ'}
                    placeholderTextColor='black'
                    onChangeText={text => {
                        setSearchText(text);
                    }}
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
                sections={groupBy(contactData).filter(result =>
                    result.keyName.toLowerCase().includes(searchText.toLowerCase()),
                ) || []}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}

                renderSectionHeader={({section: {keyName}}) => (
                    <SectionHeader>
                        <SectionHeaderText>{keyName.toUpperCase()} </SectionHeaderText>
                    </SectionHeader>
                )}
            />
            {

            }
            <KeyboardSpacer/>
        </Container>
    );
};


export default Alphabet;

const Container = styled.View`
  flex: 1`

const SideCharView = styled.View`
  position: absolute;
  z-index: 1;
  right: 0;
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
  font-size: 16px;
  line-height: 16px;
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
  text-align: center;
  letter-spacing: 0.12px;
  color: #828282;
  text-align: left;
  margin-top: 8px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const SearchSection = styled.View`
  background-color: #F2F2F2;
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
`

const SearchInput = styled.TextInput`
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
`

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