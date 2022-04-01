import {StyleSheet, Text, View} from 'react-native';
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
      <RootStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
