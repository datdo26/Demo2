import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RawContact} from '../../store/types';
import {updateContactActions} from '../../store';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Section1 = styled.View``;

const WrapButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 16px;
`;

const Button = styled.TouchableOpacity``;
const CancelText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #f2a54a;
`;
const DoneText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #828282;
`;
const Avatar = styled.Image`
  align-self: center;
  margin-top: 24px;
`;

const Section2 = styled.View`
  margin-top: 20px;
`;

const WrapInputText = styled.View`
  margin-top: 20px;
`;

const LastName = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #0000001a;
  height: 44px;
  margin: 0 16px;
`;

const FirstName = styled(LastName)``;

const CompanyName = styled(LastName)``;

const Section3 = styled.View`
  margin-top: 24px;
`;

const WrapInputDetail = styled.View`
  flex-direction: row;
  margin: 0 16px;
  border-bottom-width: 1px;
  border-bottom-color: #0000001a;
  margin-top: 24px;
`;
const AddButton = styled.Image`
  margin-top: 10px;
`;

const PhoneNumber = styled.TextInput`
  height: 44px;
  margin: 0 16px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  text-transform: lowercase;
`;
const Email = styled(PhoneNumber)``;
const Address = styled(PhoneNumber)``;
const Birthday = styled(PhoneNumber)``;

const AddContactScreen = () => {
  const {goBack} = useNavigation();

  const [params, setParams] = useState<RawContact>({
    id: moment.valueOf().toString(),
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    birthday: '',
    avatar: '',
  });

  const onDone = useCallback(() => {
    updateContactActions({...params});
    setTimeout(() => {
      goBack();
    }, 200);
  }, [params]);

  return (
    <Container>
      <Section1>
        <WrapButton>
          <Button onPress={goBack}>
            <CancelText>Huỷ</CancelText>
          </Button>
          <Button onPress={onDone}>
            <DoneText>Xong</DoneText>
          </Button>
        </WrapButton>
        <Button>
          <Avatar source={require('../../assets/img_avatar.png')} />
        </Button>
      </Section1>

      <Section2>
        <WrapInputText>
          <LastName
            placeholder={'Họ'}
            value={params.firstName}
            onChangeText={value => {
              setParams({
                ...params,
                firstName: value,
              });
            }}
          />
          <FirstName
            placeholder={'Tên'}
            value={params.lastName}
            onChangeText={value => {
              setParams({
                ...params,
                lastName: value,
              });
            }}
          />
          <CompanyName
            placeholder={'Công ty'}
            value={params.company}
            onChangeText={value => {
              setParams({
                ...params,
                company: value,
              });
            }}
          />
        </WrapInputText>
      </Section2>

      <Section3>
        <WrapInputDetail>
          <Button>
            <AddButton source={require('../../assets/ic_add.png')} />
          </Button>
          <PhoneNumber
            placeholder={'Thêm số điện thoại'}
            value={params.phone}
            onChangeText={value => {
              setParams({
                ...params,
                phone: value,
              });
            }}
          />
        </WrapInputDetail>
        <WrapInputDetail>
          <Button>
            <AddButton source={require('../../assets/ic_add.png')} />
          </Button>
          <Email
            placeholder={'Thêm email'}
            value={params.email}
            onChangeText={value => {
              setParams({
                ...params,
                email: value,
              });
            }}
          />
        </WrapInputDetail>
        <WrapInputDetail>
          <Button>
            <AddButton source={require('../../assets/ic_add.png')} />
          </Button>
          <Address
            placeholder={'Thêm địa chỉ'}
            value={params.address}
            onChangeText={value => {
              setParams({
                ...params,
                address: value,
              });
            }}
          />
        </WrapInputDetail>
        <WrapInputDetail>
          <Button>
            <AddButton source={require('../../assets/ic_add.png')} />
          </Button>
          <Birthday
            placeholder={'Thêm ngày sinh'}
            value={params.birthday}
            onChangeText={value => {
              setParams({
                ...params,
                birthday: value,
              });
            }}
          />
        </WrapInputDetail>
      </Section3>
    </Container>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({});
