import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
// @ts-ignore


import styled from 'styled-components/native';
import {remove} from '../../store';
import {RawContact} from '../../store/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {IC_BACK, IC_CALL, IC_EMAIL, IC_MSG, IC_PROFILE, IC_VID_CALL} from "../../assets";

const ContactDetail = ({contact}: {contact: RawContact}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<any>(true);

  const deleteItem = useCallback(() => {
    navigation.goBack();
    dispatch(remove(route.params?.id));
  }, [remove]);
  const onEdit = useCallback(() => {
    navigation.push('AddContactScreen', {
      firstName: route.params.firstName,
      lastName: route.params.lastName,
      phone: route.params.phone,
      address: route.params.address,
      birthday: route.params.birthday,
      email: route.params.email,
      company: route.params.company,
      avatar: route.params.avatar,
      id: route.params.id,
    });
  }, []);

  return (
    <Container>
      <View>
        <Background />
        <Wrapper>
          <WrapViewHeader>
            <ButtonBack onPress={() => navigation.goBack()}>
              <Back source={IC_BACK} />
            </ButtonBack>
            <ButtonDone onPress={() => onEdit()}>
              <TextHeader>Sửa</TextHeader>
            </ButtonDone>
          </WrapViewHeader>
        </Wrapper>
        <WrapView>
          <Avatar
            source={
              image
                ? {uri: route.params.avatar}
                : IC_PROFILE
            }
          />
        </WrapView>

        <WrapView>
          <Name>
             {route.params.firstName} {route.params.lastName}
          </Name>
          <Job>UI/UX Design</Job>
        </WrapView>

        <WrapButton>
          <Button>
            <IconButton source={IC_CALL} />
            <TextButton>Nhấn gọi điện</TextButton>
          </Button>
          <Button>
            <IconButton source={IC_MSG} />
            <TextButton>Nhắn tin</TextButton>
          </Button>
          <Button>
            <IconButton source={IC_VID_CALL} />
            <TextButton>Facetime</TextButton>
          </Button>
          <View>
            <IconButton source={IC_EMAIL} />
            <TextButtonMail>Gửi mail</TextButtonMail>
          </View>
        </WrapButton>
      </View>

      <WrapInputPhone>
        <FieldName>Điện thoại</FieldName>
        <ButtonPhone>
          <PhoneNumber>{route.params.phone}</PhoneNumber>
        </ButtonPhone>
      </WrapInputPhone>

      <WrapInput>
        <FieldName>Ghi Chú</FieldName>
        <Text>{route.params.id}</Text>
      </WrapInput>

      <WrapInput>
        <ButtonMsg>
          <FieldNameMsg>Gửi tin nhắn</FieldNameMsg>
        </ButtonMsg>
      </WrapInput>

      <WrapInput>
        <ButtonMsg onPress={deleteItem}>
          <FieldNameDelete>Xoá người gọi</FieldNameDelete>
        </ButtonMsg>
      </WrapInput>
    </Container>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({});

const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;
`;

const Background = styled.View`
  background: #f2a54a;
  opacity: 0.05;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Wrapper = styled.View`
  margin-top: 16px;
`;

const WrapViewHeader = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-top: 10px;
`;

const ButtonBack = styled.TouchableOpacity``;

const ButtonDone = styled.TouchableOpacity``;
const Back = styled.Image`
  margin-left: 16px;
`;

const TextHeader = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #f2a54a;
  margin-right: 16px;
`;
const WrapView = styled.View``;

const Avatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  align-self: center;
`;

const Name = styled.Text`
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
  margin-top: 3px;
  align-items: flex-start;
`;

const PhoneNumber = styled.Text`
  font-weight: 400;
  font-size: 19px;
  letter-spacing: -0.41px;
  color: #2f80ed;
`;

const WrapInput = styled.View`
  margin: 0 16px;
  margin-top: 24px;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
`;

const FieldName = styled.Text`
  font-style: normal;
  font-size: 15px;
  letter-spacing: -0.41px;
  color: #333333;
`;

const FieldNameMsg = styled(FieldName)`
  font-size: 17px;
`;
const ButtonMsg = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const FieldNameDelete = styled(FieldNameMsg)`
  color: #ff4a4a;
`;

const WrapInputPhone = styled(WrapInput)``;
