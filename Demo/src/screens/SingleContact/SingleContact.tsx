import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Header from './Header';

import styled from 'styled-components/native';

const Container = styled.SafeAreaView``;

const WrapView = styled.View``;
const ButtonAvatar = styled.TouchableOpacity`
  align-items: center;
  margin-top: 48px;
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

const SingleContact = () => {
  return (
    <Container>
      <Header />
      <WrapView>
        <ButtonAvatar>
          <Avatar source={require('../../assets/avatar.png')} />
        </ButtonAvatar>
      </WrapView>
      <WrapView>
        <Name>Nguyễn Tiến Nam</Name>
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
          <PhoneNumber>0977272160</PhoneNumber>
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

export default SingleContact;

const styles = StyleSheet.create({});
