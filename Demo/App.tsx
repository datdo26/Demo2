import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootStack from './src/nav/RootStack';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/lib/integration/react';
const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStack />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
