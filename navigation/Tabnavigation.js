import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screen/Home";
import PaymentStatement from "../screen/PaymentStatement";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export function TabNavigation() {

    
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "rgba(72, 130, 101, 0.5)",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarActiveTintColor: "#1472CD",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="car"
                size={30}
                color={focused ? "#1472CD" : "gray"}
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
          tabBarActiveTintColor: "#1472CD",
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1472CD',
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
                color={focused ? "#1472CD" : "gray"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}