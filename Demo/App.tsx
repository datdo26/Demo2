import {StatusBar, StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import React from 'react';
import RootStack from './src/nav/RootStack';
import {Provider} from 'react-redux';
import {store} from './src/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <StatusBar
      translucent={false}
      backgroundColor={'transparent'}
      barStyle={'dark-content'}
      />
      <RootStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
