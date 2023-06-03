import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../screen/Login';
import Register from '../screen/Register';
import { TabNavigation } from './Tabnavigation';
import Verification from '../screen/Verification';
import OTPscreen from '../screen/OTPscreen';
import ShareableQR from '../screen/ShareableQR';
import QRScanner from '../screen/BarcodeScanner';
import SetUserPin from '../screen/SetUserPin';
const Stack = createNativeStackNavigator();





export default function NavStack() {
  

  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            />
            <Stack.Screen
              name="SetUserPin"
              component={SetUserPin}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            />
            <Stack.Screen
              name="OTPscreen"
              component={OTPscreen}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "white",
                },
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "white",
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

            <Stack.Screen
              name="ShareableQR"
              component={ShareableQR}
              options={{
                headerShown: false,
              }}
            /> 

            <Stack.Screen
              name="QRScanner"
              component={QRScanner}
              options={{
                headerShown: false,
              }}
            />            
          </Stack.Navigator>
        </NavigationContainer>
  );
}