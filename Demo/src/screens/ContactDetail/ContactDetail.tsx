import {StyleSheet, TextInput} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from './Header';

import styled from 'styled-components/native';
import {removeContactActions, useContacts} from '../../store';
import {RawContact} from '../../store/types';
import moment from 'moment';

const Container = styled.SafeAreaView``;

const WrapView = styled.View``;
const ButtonAvatar = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  align-self: center;
`;
const Avatar = styled.Image``;

const Name = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
  text-align: center;
  margin-top: 16px;
`;

const Job = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #828282;
`;

const WrapButton = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
`;

const IconButton = styled.Image``;

const TextButton = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #f2a54a;
`;

const TextButtonMail = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #bdbdbd;
`;

const ButtonPhone = styled(Button)`
  align-items: flex-start;
`;

const PhoneNumber = styled.Text`
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #2f80ed;
`;

const WrapInput = styled.View`
  margin: 0 16px;
  margin-top: 17px;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
`;

const FieldName = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
`;

const FieldNameMsg = styled(FieldName)`
  font-size: 15px;
`;
const ButtonMsg = styled.TouchableOpacity``;

const FieldNameDelete = styled(FieldNameMsg)`
  color: #ff4a4a;
`;

const ContactDetail = ({contact}: {contact: RawContact}) => {
  const [params, setParams] = useState<RawContact>({
    id: moment().valueOf().toString(),
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    birthday: '',
    avatar: '',
  });
  const contactList = useContacts();

  return (
    <Container>
      <Header />
      <WrapView>
        <ButtonAvatar>
          <Avatar source={require('../../assets/img_avatar.png')} />
        </ButtonAvatar>
      </WrapView>
      <WrapView>
        <Name>a </Name>
        <Job>UI/UX Design</Job>
      </WrapView>
      <WrapButton>
        <Button>
          <IconButton source={require('../../assets/ic_call.png')} />
          <TextButton>Nhấn gọi điện</TextButton>
        </Button>
        <Button>
          <IconButton source={require('../../assets/ic_msg.png')} />
          <TextButton>Nhắn tin</TextButton>
        </Button>
        <Button>
          <IconButton source={require('../../assets/ic_vidcall.png')} />
          <TextButton>Facetime</TextButton>
        </Button>
        <Button>
          <IconButton source={require('../../assets/ic_email.png')} />
          <TextButtonMail>Gửi mail</TextButtonMail>
        </Button>
      </WrapButton>

      <WrapInput>
        <FieldName>Điện thoại</FieldName>
        <ButtonPhone>
          <PhoneNumber>{params?.phone}</PhoneNumber>
        </ButtonPhone>
      </WrapInput>
      <WrapInput>
        <FieldName>Ghi Chú</FieldName>
        <TextInput placeholder="" style={{height: 33}} />
      </WrapInput>
      <WrapInput>
        <ButtonMsg>
          <FieldNameMsg>Gửi tin nhắn</FieldNameMsg>
        </ButtonMsg>
      </WrapInput>
      <WrapInput>
        <ButtonMsg>
          <FieldNameDelete>Xoá người gọi</FieldNameDelete>
        </ButtonMsg>
      </WrapInput>
    </Container>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({});
