import {FlatList} from 'react-native';
// @ts-ignore
import React, {memo, useEffect, useState} from 'react';
import Header from '../../components/Header';
import styled from 'styled-components/native';
import {IC_INFO_OUTLINE, IC_MISSED_CALL, IC_MISSED_VID_CALL} from '../../assets';
import {useIsFocused} from '@react-navigation/native';
import {useContactIds} from '../../store';
import {getObject} from '../Contact/components/Alphabet';
import {RawContact} from '../../store/types';

const Item = ({firstName, lastName, phone, action, time, totalAction,}) => (
    <BtnCard>
        <Card>
            <ViewIconLeft>
                <IconLeft source={ action =='CallAction' ? IC_MISSED_CALL : IC_MISSED_VID_CALL}/>
            </ViewIconLeft>

            <CardContent>
                <ContentName>
                    {totalAction == 1 ? <Name>{firstName}{lastName}</Name> :
                        <Name>{firstName}{lastName} ({totalAction})</Name>}
                    <Phone>{phone}</Phone>
                </ContentName>

                <WrapTimeRight>
                <ContentTime>
                    <Time>{time}</Time>
                </ContentTime>
                <IconRight source={IC_INFO_OUTLINE}/>
                </WrapTimeRight>


            </CardContent>
        </Card>
    </BtnCard>
);


const RecentScreen = () => {
    const isFocused = useIsFocused();
    const [history, setHistory] = useState([]);
    const contact_ids = useContactIds('all');
    const contactData = getObject(contact_ids);

    useEffect(() => {
        const newData: RawContact[] = Object.values(contactData);
        const data = newData.filter(item => {
            return item.historyLog != '';
        });

        const sorted = data.sort((a: RawContact, b: RawContact) => {
            const dateA = `${a.historyLog}`.valueOf();
            const dateB = `${b.historyLog}`.valueOf();

            if (dateA > dateB) {
                return 0;
            }
            return 1;
        });
        setHistory(sorted);
    }, [isFocused]);

    const renderItem = ({item}) => (
        <Item
            firstName={item.firstName}
            lastName={item.lastName}
            phone={item.phone[item.phone.length - 1]}
            action={item.actionLog}
            time={item.historyLog}
            totalAction={item.totalAction}
        />
    );

    return (
        <Container>
            <Header title="Lịch sử"/>
            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item, index) => index + item}
            />
        </Container>
    );
};

export default RecentScreen;


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const BtnCard = styled.TouchableOpacity`
  margin-top: 12px;
`

const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
`

const ViewIconLeft = styled.View`
  align-self: center;
`

const IconLeft = styled.Image`
  margin: 0 16px`


const IconRight = styled.Image`
  margin: 0 16px;
  align-self: center;
`


const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 340px;
  border-bottom-width: 0.5px;
  justify-content: space-between;
  border-bottom-color: rgba(0, 0, 0, 0.1);;
`
const ContentName = styled.View``


const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
  text-align: left;
  letter-spacing: 0.12px;
  color: #333333;`

const WrapTimeRight = styled.View`
flex-direction: row`

const ContentTime = styled.View`
align-self: center`


const Phone = styled.Text`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.12px;
  color: #828282;
  margin-top: 8px;
`

const Time = styled.Text`
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.12px;
  color: #828282;
`