// @ts-ignore
import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {TextInputProps} from 'react-native';
interface Props extends TextInputProps {
  title: string;
  keyName: string;
  onChangeValue: (keyName: string, value: string) => void;
}

const InputInfo = (props: Props) => {
  const {title, keyName, onChangeValue, ...restProps} = props;

  const onChangeText = useCallback(
    (value: string) => {
      onChangeValue(keyName, value);
    },
    [onChangeValue],
  );

  return (
    // @ts-ignore
    <InputValue
      {...restProps}
      placeholder={title}
      onChangeText={onChangeText}
    />
  );
};

export default InputInfo;

const InputValue = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #0000001a;
  height: 44px;
  margin: 0 16px;
`;
