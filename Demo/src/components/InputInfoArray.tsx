// @ts-ignore
import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {
    TextInputProps,
    TouchableOpacity,
    View,
    Text,
    TextInput,
} from 'react-native';
import {IC_ADD, IC_MINUS} from '../assets';

interface Props {
    keyName: string;
    index: number;
    data: string[];
    title: string;
    onDelete: (keyName: string, index: number) => void;
    _onInfoChange: (keyName: string, index: number, value: string) => void;
    typeKeyboard: any
}

const Item = (props: Props) => {
    const {keyName, index, data, title, onDelete, _onInfoChange, typeKeyboard} = props;
    const onChangeInfo = useCallback(value => {
        _onInfoChange(keyName, index, value);
    }, []);

    return (
        <WrapItem>
            <TouchableOpacity onPress={() => onDelete(keyName, index)}>
                <Icon source={IC_MINUS}/>
            </TouchableOpacity>
            {/*add item*/}
            <TextInput
                placeholder={title}
                value={data[index]}
                onChangeText={onChangeInfo}
                autoFocus={true}
            keyboardType={typeKeyboard}
            />
        </WrapItem>
    );
};

interface CustomInputProps extends TextInputProps {
    keyName: string;
    data: string[];
    title: string;
    setParams: (prev: any) => void;
    typeKeyboard: any
}

const InputInfoArray = (props: CustomInputProps) => {
    const {title, keyName, data, setParams, typeKeyboard} = props;

    const onChangeValue = useCallback(
        (keyName: string, index: number, value: string) => {
            setParams(prev => {
                let inputData = [...prev[keyName]];
                inputData[index] = value;
                return {...prev, [keyName]: inputData};
            });
        },
        [],
    );

    const onAddValue = useCallback(
        (keyName: string) => {
            setParams(prev => {
                let newData = [...prev[keyName]];
                newData.push('');
                return {...prev, [keyName]: newData};
            });
        },
        [data],
    );

    const onDelte = useCallback(
        (keyName: string, index: number) => {
            setParams(prev => {
                let removeData = [...prev[keyName]];
                removeData.splice(index, 1);
                return {...prev, [keyName]: removeData};
            });
        },
        [data],
    );

    return (
        <WrapView>
            {data?.map((item, index) => {
                return (
                    <View key={index}>
                        <Item
                            keyName={keyName}
                            index={index}
                            data={data}
                            title={title}
                            onDelete={onDelte}
                            _onInfoChange={onChangeValue}
                            typeKeyboard={typeKeyboard}
                        />
                    </View>
                );
            })}
            <AddBtn
                onPress={() => {
                    onAddValue(keyName);
                }}>
                <Icon source={IC_ADD}/>
                <Text>{title}</Text>
            </AddBtn>
        </WrapView>
    );
};

export default InputInfoArray;

const WrapItem = styled.View`
  align-items: center;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #0000001a;
  height: 44px;
`

const WrapView = styled.View`
  margin: 10px 16px 0px;
  border-bottom-width: 1px;
  border-bottom-color: #0000001a;
`

const AddBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 44px`;

const Icon = styled.Image`
  margin-right: 17px;
`
