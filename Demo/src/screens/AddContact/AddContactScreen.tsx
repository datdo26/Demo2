import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RawContact} from '../../store/types';
import {updateContactActions} from '../../store';
import ImagePicker from 'react-native-image-crop-picker';
import {nonAccentVietnamese} from '../../store/nonAccentVietnamese';
import DatePicker from 'react-native-date-picker';
import {isValidEmail} from '../../utilies/Validations';

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: #fff;
`;
const Section1 = styled.View`
  margin-top: 16px;
`;

const WrapButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 16px;
`;

const Button = styled.TouchableOpacity`
  height: 44px;
`;

const AvatarBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  align-self: center;
`;

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
const AvatarInput = styled.ImageBackground`
  width: 90px;
  height: 90px;
  align-items: center;
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

const Birthday = styled.Text`
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.41px;
  color: #333333;
  margin-left: 14px;
  margin-top: 10px; ;
`;

const defaultValue = {
  id: ``,
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  email: '',
  address: '',
  birthday: '',
  avatar: '',
  searchField: '',
};

const AddContactScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string>();
  const [params, setParams] = useState<RawContact>(defaultValue);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const SearchText = `${params.firstName}${params.id}${nonAccentVietnamese(
    params.lastName,
  )}${nonAccentVietnamese(params.id)}`;

  const onDone = useCallback(() => {
    updateContactActions(
      params?.id
        ? {...params, avatar: image}
        : {...params, id: `${new Date().getTime()}`, avatar: image},
    );
    setTimeout(() => {
      navigation.goBack();
    }, 200);
    params.searchField = SearchText;
    setParams(defaultValue);
    setImage('');
  }, [params, image]);

  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
    });
  };

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Section1>
        <WrapButton>
          <Button onPress={onCancel}>
            <CancelText>Huỷ</CancelText>
          </Button>
          <Button onPress={onDone}>
            <DoneText>Xong</DoneText>
          </Button>
        </WrapButton>
      </Section1>
      <AvatarBtn
        onPress={chooseFromLibrary}
        style={{backgroundColor: '#F2F2F2 '}}>
        <AvatarInput
          source={require('../../assets/img_avatar.png')}
          resizeMode={'cover'}>
          <Image
            source={{uri: image ? image : null}}
            style={{width: 110, height: 110, borderRadius: 100}}
          />
        </AvatarInput>
      </AvatarBtn>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView>
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
                returnKeyType="done"
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
                returnKeyType="done"
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
                returnKeyType="done"
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
                returnKeyType="done"
                keyboardType="phone-pad"
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
                  setErrorEmail(
                    isValidEmail(value) == true
                      ? ''
                      : 'Email not in correct format',
                  );
                  setParams({
                    ...params,
                    email: value,
                  });
                }}
                returnKeyType="done"
                keyboardType="email-address"
              />
            </WrapInputDetail>
            <View style={{marginHorizontal: 16}}>
              <Text style={{textAlign: 'left', fontSize: 15}}>
                {errorEmail}
              </Text>
            </View>
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
                returnKeyType="done"
              />
            </WrapInputDetail>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <WrapInputDetail>
                <Button onPress={() => setOpen(true)}>
                  <AddButton source={require('../../assets/ic_add.png')} />
                </Button>

                <Birthday> Ngày sinh: {date.toDateString()}</Birthday>

                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode={'date'}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setParams({
                      ...params,
                      birthday: date,
                    });
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

const styles = StyleSheet.create({});
