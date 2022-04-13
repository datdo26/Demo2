import {
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
// @ts-ignore
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RawContact} from '../../store/types';
import {updateContactActions, useContactIds, useContacts} from '../../store';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import {IC_ADD, IMG_AVTAR} from '../../assets';
import InputInfo from '../../components/InputInfo';
import InputInfoArray from '../../components/InputInfoArray';

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
    const [image, setImage] = useState<string>();
    const [params, setParams] = useState<RawContact>(defaultValue);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const route = useRoute();
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
                        <AvatarInput source={IMG_AVTAR} resizeMode={'cover'}>
                            <Avatar source={{uri: image ? image : null}}/>
                        </AvatarInput>
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
                        {/*<WrapInputDetail>*/}
                        {/*    <Button>*/}
                        {/*        <AddButton source={IC_ADD}/>*/}
                        {/*    </Button>*/}
                        {/*    <PhoneNumber*/}
                        {/*        placeholder="Thêm số điện thoại"*/}
                        {/*        value={params?.phone}*/}
                        {/*        returnKeyType="done"*/}
                        {/*        keyboardType="phone-pad"*/}
                        {/*        placeholderTextColor={'black'}*/}
                        {/*        onChangeText={(value: string) => {*/}
                        {/*            onChangeText('phone', value)*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</WrapInputDetail>*/}

                        <InputInfoArray
                            keyName={'phone'}
                            data={params?.phone}
                            title={'Them so dien thoai'}
                            setParams={setParams}
                        />

                        <InputInfoArray
                            keyName={'email'}
                            data={params?.email}
                            title={'Them email'}
                            setParams={setParams}
                        />

                        <InputInfoArray
                            keyName={'address'}
                            data={params?.address}
                            title={'Them dia chi'}
                            setParams={setParams}
                        />


                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <WrapInputDetail>
                                <Button onPress={() => setOpen(true)}>
                                    <AddButton source={IC_ADD}/>
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
  margin: 0 16px;
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

const Avatar = styled.Image`
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
const AvatarInput = styled.ImageBackground`
  width: 100px;
  height: 100px;
  align-self: center;
  border-radius: 100px;
`;

const Section2 = styled.View`
  margin-top: 20px;
`;

const WrapInputText = styled.View`
  margin-top: 20px;
`;

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
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.41px;
  color: #333333;
  margin-left: 14px;
  margin-top: 10px;;
`;