import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Alphabet from './components/Alphabet';
import {useContacts} from "../../store";

const ContactScreen = () => {
    const contacts = useContacts();
    console.log('contacts ', contacts)

    return (
        <SafeAreaView>
            <Header title="Liên hệ"/>
            <Alphabet/>
        </SafeAreaView>
    );
};

export default ContactScreen;