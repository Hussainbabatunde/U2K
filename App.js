import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavStack from './navigation/stack';
import { persistor, store } from './store';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

export default function App() {

  const MyTheme = {
    ...DefaultTheme,
    // Disable swipe gesture for navigating back
    // This will prevent the user from swiping back to the dashboard screens after logging out
    gestureEnabled: false,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>        
      <NavigationContainer  theme={MyTheme}>
          <NavStack />
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
