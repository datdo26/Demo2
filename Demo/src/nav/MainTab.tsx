import {StyleSheet, Platform} from 'react-native';
// @ts-ignore
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactScreen from '../screens/Contact/ContactScreen';
import RecentScreen from '../screens/Recent/RecentScreen';
import {IC_CONTACT, IC_RECENT} from "../assets";
import {ifIphoneX} from "react-native-iphone-x-helper";
import {Image} from 'react-native-ui-lib'


const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
                tabBarStyle: styles.tabBarStyle,
                tabBarInactiveTintColor: '#FFDAAE',
                tabBarActiveTintColor: '#fff',
            }}>
            <Tab.Screen
                name="Liên hệ"
                component={ContactScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Image source={IC_CONTACT} tintColor = {color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Gần đây"
                component={RecentScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color}) => (
                        <Image source={IC_RECENT} tintColor = {color}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTab;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#F2A54A',
        ...Platform.select({
            ios: {
                height: 64,
                ...ifIphoneX({
                    height: 70
                })
            },
            android: {
                height: 50
            }
        })
    }
});
