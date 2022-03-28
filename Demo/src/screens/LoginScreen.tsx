import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {IMG_BANNER, IMG_LOGIN_CIRCLE, IMG_LOGO} from '../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../nav/RootStack';

const {width} = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Section1 = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Banner = styled.Image`
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${(width * 9) / 16}px;
`;

const LogoApp = styled.Image`
  width: 160px;
  height: 160px;
  align-self: center;
  margin-bottom: 36px;
`;

const Section2 = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 30px;
  color: #f2a54a;
  text-align: center;
`;

const SubTitle = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  padding-top: 12px;
  color: #333333;
`;

const RemainingView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.Image`
  width: 32px;
  height: 32px;
  align-self: center;
`;

const Section3 = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WrapView = styled.View`
  width: 100%;
  padding: 0 20px;
`;

const ButtonLogin = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  margin-top: 12px;
  background-color: #f2a54a;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const TextLogin = styled.Text`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
`;

const ButtonRegister = styled(ButtonLogin)`
  background-color: #fff;
  border-width: 1px;
  border-color: #f2a54a;
`;

const TextRegister = styled(TextLogin)`
  color: #f2a54a;
`;

const TextNotLogin = styled.Text`
  font-size: 18px;
  color: #525252;
  font-style: italic;
  padding: 12px 0;
`;

export const LoginScreen = memo(function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goToMain = useCallback(() => {
    navigation.navigate('SideDrawer');
  }, []);

  return (
    <Container>
      <Section1>
        <Banner source={IMG_BANNER} resizeMode={'contain'} />
        <LogoApp source={IMG_LOGO} />
      </Section1>
      <Section2>
        <Title>Base contact</Title>
        <SubTitle>
          {`Giải pháp quản lý công việc\n& dự án toàn diện cho doanh nghiệp 4.0`}
        </SubTitle>
        <RemainingView>
          <Circle source={IMG_LOGIN_CIRCLE} />
        </RemainingView>
      </Section2>
      <Section3>
        <TextNotLogin>Bạn chưa đăng nhập</TextNotLogin>
        <WrapView>
          <ButtonLogin onPress={goToMain}>
            <TextLogin>ĐĂNG NHẬP BẰNG BASE ACCOUNT</TextLogin>
          </ButtonLogin>
          <ButtonRegister onPress={goToMain}>
            <TextRegister>ĐĂNG NHẬP THỦ CÔNG</TextRegister>
          </ButtonRegister>
        </WrapView>
      </Section3>
    </Container>
  );
});
