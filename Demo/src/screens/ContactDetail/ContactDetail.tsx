import {
  Alert,
  Platform,
  View,
  Linking,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {removeContactActions, useContacts} from '../../store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// @ts-ignore
import Modal from 'react-native-modal';

import {
  IC_BACK,
  IC_CALL,
  IC_EMAIL,
  IC_EMAIL_LIGHT,
  IC_MSG,
  IC_PROFILE,
  IC_VID_CALL,
} from '../../assets';
import statusBarHeight from '../../components/statusBarHeight';
import FastImage from 'react-native-fast-image';
import {updateContactActionCount, updateContactHistory} from '../../store';

const ContactDetail = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  // @ts-ignore
  const contact = useContacts(route.params?.id);
  const [modalVisible, setModalVisible] = useState(false);

  const getTime = useCallback(() => {
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    return `${('0' + hours).slice(-2)}:${('0' + min).slice(-2)}`;
  }, []);

  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onEdit = useCallback(() => {
    navigation.navigate('AddContactScreen', {
      id: contact?.id || '',
    });
  }, [navigation, contact?.id]);

  const onAlert = useCallback(() => {
    Alert.alert('Delete Contact', '', [
      {
        text: 'Delete',
        style: 'cancel',
        onPress: () => {
          // @ts-ignore
          dispatch(removeContactActions(route.params?.id));
          navigation.goBack();
        },
      },
      {
        text: 'Cancel',
        style: 'default',
      },
    ]);
  }, [contact]);

  const onDoneMail = useMemo(() => {
    return {
      backgroundColor: contact?.email.length == 0 ? '#fff' : '#f2a54a',
    };
  }, [contact?.email]);

  const Calling = useCallback(
    ({item}) => {
      // @ts-ignore
      updateContactHistory(route.params?.id, 'CallAction', `${getTime()}`);
      // @ts-ignore
      updateContactActionCount(route.params?.id);
      Linking.openURL(`tel: ${item}`).then();
    },
    // @ts-ignore
    [route.params?.id],
  );

  const PhoneList = useCallback(() => {
    return contact.phone.map(item => {
      return (
        <ButtonPhone key={item} onPress={() => Calling({item})}>
          <PhoneNumber key={item}>{item}</PhoneNumber>
        </ButtonPhone>
      );
    });
  }, [contact?.phone]);

  const colorDone = useMemo(() => {
    return {
      color: contact.email.length == 0 ? '#828282' : '#f2a54a',
    };
  }, [contact.email]);

  const TextMe = useCallback(() => {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${contact?.phone} ${separator}body=${'hello'}`;
    Linking.openURL(url);
  }, [contact.phone]);

  const SendEmail = useCallback(() => {
    Linking.openURL(`mailto:${contact.email}`);
  }, [contact.email]);

  return (
    <Container>
      <View>
        <Background />
        <HeaderSection>
          <WrapViewHeader>
            <ButtonBack onPress={goBack}>
              <Back source={IC_BACK} />
            </ButtonBack>
            <ButtonDone onPress={onEdit}>
              <TextHeader>Sửa</TextHeader>
            </ButtonDone>
          </WrapViewHeader>
          <Avatar
            source={contact.avatar ? {uri: contact?.avatar} : IC_PROFILE}
          />
        </HeaderSection>
        <WrapView>
          <Name>
            {contact?.firstName} {contact?.lastName}
          </Name>
          <Job>UI/UX Design</Job>
        </WrapView>

        <WrapButton>
          <Button onPress={toggleModal}>
            <BgBtn>
              <Image source={IC_CALL} />
            </BgBtn>
            <TextButton>Gọi điện</TextButton>
          </Button>

          <Button onPress={TextMe}>
            <BgBtn>
              <Image source={IC_MSG} />
            </BgBtn>
            <TextButton>Nhắn tin</TextButton>
          </Button>

          <Button onPress={toggleModal}>
            <BgBtn>
              <Image source={IC_VID_CALL} />
            </BgBtn>
            <TextButton>Facetime</TextButton>
          </Button>
          <Button disabled={contact.email.length == 0} onPress={SendEmail}>
            <BgBtnMail style={onDoneMail}>
              <Image
                source={contact.email.length == 0 ? IC_EMAIL : IC_EMAIL_LIGHT}
              />
            </BgBtnMail>
            <TextButtonMail style={colorDone}>Gửi mail</TextButtonMail>
          </Button>
        </WrapButton>

        <Modal
          isVisible={modalVisible}
          animationIn="slideInUp"
          onBackdropPress={() => setModalVisible(false)}>
          <CallModalView>
            <PhoneTitle>Số điện thoại: </PhoneTitle>
            <PhoneList />
          </CallModalView>
        </Modal>
      </View>

      <PhoneSection>
        <PhoneTitle>Điện thoại</PhoneTitle>
        <PhoneList />
      </PhoneSection>

      <NoteSection>
        <NoteTitle>Ghi Chú</NoteTitle>
        <Note multiline={true} />
      </NoteSection>

      <MsgSection>
        <ButtonMsg onPress={TextMe}>
          <MsgTitle>Gửi tin nhắn</MsgTitle>
        </ButtonMsg>
      </MsgSection>

      <DeleteSection>
        <ButtonMsg onPress={onAlert}>
          <DeleteTitle>Xoá người gọi</DeleteTitle>
        </ButtonMsg>
      </DeleteSection>
    </Container>
  );
};

export default ContactDetail;

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

const Background = styled.View`
  background: #f2a54a;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -8px;
  opacity: 0.5;
`;

const HeaderSection = styled.View`
  margin-top: ${statusBarHeight - 6}px;
`;

const WrapViewHeader = styled.View`
  justify-content: space-between;
  flex-direction: row;
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

const Avatar = styled(FastImage)`
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
  font-weight: 400;
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

const BgBtn = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: #f2a54a;
`;

const BgBtnMail = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

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

const ButtonPhone = styled.TouchableOpacity`
  margin-top: 3px;
  align-items: flex-start;
`;

const PhoneNumber = styled.Text`
  font-weight: 400;
  font-size: 17px;
  letter-spacing: -0.41px;
  color: #2f80ed;
  margin-bottom: 4px;
`;

const PhoneSection = styled.View`
  margin: 9px 16px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
`;

const PhoneTitle = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
`;

const NoteTitle = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
  margin-top: 9px;
`;

const NoteSection = styled.View`
  margin: 8px 16px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
`;

const Note = styled.TextInput`
  margin-bottom: 5px;
`;

const ButtonMsg = styled.TouchableOpacity`
  margin-bottom: 10px;
  margin-top: 14px;
`;

const MsgSection = styled.View`
  margin: 0 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
  flex-direction: row;
  align-items: center;
`;

const MsgTitle = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #333333;
`;

const DeleteSection = styled.View`
  margin: 0 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: #0000001a;
  align-items: center;
  flex-direction: row;
`;
const DeleteTitle = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.41px;
  color: #ff4a4a;
`;

const CallModalView = styled.View`
  background-color: #fff;
  margin: 0 86px;
  align-items: center;
  border-radius: 40px;
`;

const Modal1 = styled(Modal)``;
