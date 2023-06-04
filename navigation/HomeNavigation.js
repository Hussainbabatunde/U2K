import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../screen/Home';
import ScannedPage from '../screen/ScannedPage';
import ShareableQR from '../screen/ShareableQR';
import QRScanner from '../screen/BarcodeScanner';
import SuccessPage from '../screen/SuccessPage';


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  

    return (
            <Stack.Navigator>
              <Stack.Screen
                name="MainHome"
                component={Home}
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: "white",
                  },
                }}
              />          
              <Stack.Screen
                name="ScannedPage"
                component={ScannedPage}
                options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#2CAA38',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerTitle: 'Payment'
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
              <Stack.Screen
                name="Successful"
                component={SuccessPage}
                options={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: '#2CAA38',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerLeft: null,
                  headerTitle: 'Successful'
                }}
              />
              </Stack.Navigator>
      );
    }