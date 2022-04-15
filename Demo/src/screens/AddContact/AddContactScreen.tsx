import {
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  View,
} from 'react-native';
// @ts-ignore
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RawContact} from '../../store/types';
import {updateContactActions, useContacts} from '../../store';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import {IC_ADD, IC_PROFILE} from '../../assets';
import InputInfo from '../../components/InputInfo';
import InputInfoArray from '../../components/InputInfoArray';
import FastImage from 'react-native-fast-image';
export const defaultValue = {
  id: '',
  firstName: '',
  lastName: '',
  company: '',
  phone: [],
  email: [],
  address: [],
  birthday: '',
  avatar: '',
};

const AddContactScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [params, setParams] = useState<RawContact>(defaultValue);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const route = useRoute();
  const [values, setValues] = useState({firstName: ''});
  const [isActive, setIsActive] = useState(false);

  // @ts-ignore
  const newContact = useContacts(route.params?.id);

  const onDone = useCallback(() => {
    updateContactActions(
      params?.id
        ? {...params, avatar: image}
        : {...params, id: `${new Date().getTime()}`, avatar: image},
    );
    setTimeout(() => {
      navigation.goBack();
    }, 200);
    setParams(defaultValue);
    setImage('');
  }, [params, image]);

  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.7,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };
  useEffect(() => {
    if (!route.params) {
      return;
    }
    setParams(newContact);
  }, [route.params]);
  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [newContact]);

  const onChangeText = useCallback(
    (keyName: string, value: string) => {
      setParams({
        ...params,
        [keyName]: value,
      });
    },
    [params],
  );

  return (
    <Container>
      <Section1>
        <HeaderSection>
          <Button onPress={onCancel}>
            <CancelText>Huỷ</CancelText>
          </Button>
          <Button onPress={onDone}>
            <DoneText>Xong</DoneText>
          </Button>
        </HeaderSection>
      </Section1>
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView>
          <AvatarBtn onPress={chooseFromLibrary}>
            <Avatar
              source={
                params.avatar
                  ? {uri: params.avatar}
                  : image
                  ? {uri: image}
                  : IC_PROFILE
              }
            />
          </AvatarBtn>

          <Section2>
            <WrapInputText>
              <InputInfo
                title={'Họ'}
                keyName={'firstName'}
                value={params?.firstName}
                onChangeValue={onChangeText}
              />

              <InputInfo
                title={'Tên'}
                keyName={'lastName'}
                value={params?.lastName}
                onChangeValue={onChangeText}
              />
              <InputInfo
                title={'Công ty'}
                keyName={'company'}
                value={params?.company}
                onChangeValue={onChangeText}
              />
            </WrapInputText>
          </Section2>

          <Section3>
            <InputInfoArray
              keyName={'phone'}
              data={params?.phone}
              title={'Thêm số điện thoại'}
              setParams={setParams}
              typeKeyboard={'number-pad'}
            />

            <InputInfoArray
              keyName={'email'}
              data={params?.email}
              title={'Thêm email'}
              setParams={setParams}
              typeKeyboard={'email-address'}
            />

            <InputInfoArray
              keyName={'address'}
              data={params?.address}
              title={'Thêm địa chỉ'}
              setParams={setParams}
              typeKeyboard={'default'}
            />

            <TouchableOpacity onPress={() => setOpen(true)}>
              <WrapInputDetail>
                <Button onPress={() => setOpen(true)}>
                  <AddButton source={IC_ADD} />
                </Button>
                <Birthday> Ngày sinh: {params?.birthday}</Birthday>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode={'date'}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    onChangeText('birthday', date.toDateString());
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </WrapInputDetail>
            </TouchableOpacity>
          </Section3>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddContactScreen;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;
const Section1 = styled.View``;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
const HeaderSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 16px 0px;
`;

const Button = styled.TouchableOpacity``;

const AvatarBtn = styled.TouchableOpacity`
  width: 90px;
  height: 90px;
  align-self: center;
  background-color: #f2f2f2;
  border-radius: 100px;
  margin-top: 24px;
`;

const Avatar = styled(FastImage)`
  width: 110px;
  height: 110px;
  border-radius: 100px;
  align-self: center;
`;

const CancelText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.41px;
  color: #f2a54a;
`;
const DoneText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.41px;
  color: #f2a54a;
`;
const AvatarInput = styled.Image`
  width: 100px;
  height: 100px;
  align-self: center;
  border-radius: 100px;
  position: absolute;
`;

const Section2 = styled.View`
  margin-top: 20px;
`;

const WrapInputText = styled.View``;

const Section3 = styled.View`
  margin-top: 24px;
`;

const WrapInputDetail = styled.View`
  flex-direction: row;
  margin: 10px 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #0000001a;
  height: 44px;
`;
const AddButton = styled.Image`
  margin-top: 10px;
`;

const Birthday = styled.Text`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.41px;
  color: #333333;
  margin-left: 14px;
  margin-top: 10px; ;
`;
