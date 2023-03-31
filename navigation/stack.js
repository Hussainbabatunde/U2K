import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../screen/Login';
import Register from '../screen/Register';
import { TabNavigation } from './Tabnavigation';
import Verification from '../screen/Verification';
import OTPscreen from '../screen/OTPscreen';
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

            {/* <Stack.Screen
              name="DriverTabNavigation"
              component={DriverTabNavigation}
              options={{
                headerShown: false,
              }}
            />             */}
          </Stack.Navigator>
        </NavigationContainer>
  );
}