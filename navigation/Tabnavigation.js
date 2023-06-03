import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screen/Home";
import PaymentStatement from "../screen/PaymentStatement";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import HomeStack from "./HomeNavigation";
import Profile from "../screen/Profile";

const Tab = createBottomTabNavigator();

export function TabNavigation() {

    
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#2CAA38",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarActiveTintColor: "#2CAA38",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="car"
                size={30}
                color={focused ? "#2CAA38" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={PaymentStatement}
        options={{
          title: "Transactions",
          tabBarActiveTintColor: "#2CAA38",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2CAA38',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="bank-transfer"
                size={40}
                color={focused ? "#2CAA38" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarActiveTintColor: "#2CAA38",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
              name="person"
                size={30}
                color={focused ? "#2CAA38" : "gray"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}