import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screen/Home";

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
          tabBarActiveTintColor: "#2e29f7",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="car"
                size={30}
                color={focused ? "#2e29f7" : "gray"}
              />
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="RiderTrips"
        component={RiderTrips}
        options={{
          title: "Trips",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="car"
                size={30}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="RiderProfile"
        component={RiderProfile}
        options={{
          title: "Profile",
          tabBarActiveTintColor: "#005091",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="person"
                size={30}
                color={focused ? "#005091" : "gray"}
              />
            );
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}