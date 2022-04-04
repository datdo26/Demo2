import {ImageBackground, StyleSheet, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RawContact} from '../../store/types';
import {updateContactActions} from '../../store';
import ImagePicker from 'react-native-image-crop-picker';
import {nonAccentVietnamese} from '../../store/nonAccentVietnamese';

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

const AvatarBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  align-self: center;
  border-radius: 100px;
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
  borderradius: 100px;
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
  const [image, setImage] = useState<any>();
  const [params, setParams] = useState<RawContact>(defaultValue);

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
        <AvatarBtn onPress={chooseFromLibrary}>
          <AvatarInput
            source={require('../../assets/img_avatar.png')}
            resizeMode={'cover'}>
            <Image
              source={{uri: image}}
              style={{width: 100, height: 100, borderRadius: 100}}
            />
          </AvatarInput>
        </AvatarBtn>
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
