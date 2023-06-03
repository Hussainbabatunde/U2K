
import { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';
import Register from '../screen/Register';
import { TabNavigation } from './Tabnavigation';
import Verification from '../screen/Verification';
import OTPscreen from '../screen/OTPscreen';
import ShareableQR from '../screen/ShareableQR';
import QRScanner from '../screen/BarcodeScanner';
import SetUserPin from '../screen/SetUserPin';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();


export default function NavStack() {
  const loginInfo = useSelector((state) => state.LoginSlice?.logindata);
  const navigation = useNavigation();

  useEffect(() => {
    if (loginInfo == null) {
      navigation.navigate('AuthStack', { screen: 'Login' });
    } else {
      navigation.navigate('TabNavigation', {
        screen: 'Home',
        params: {
          screen: 'MainHome'
        }
      });
    }
  }, [loginInfo, navigation]);

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
  );
}