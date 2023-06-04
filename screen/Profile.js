import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../Slice/auth/Loginslice";
import u2kLogo from '../assets/u2k.png'
import { reset as resetGetDetails } from "../Slice/auth/GetDetails";
import { reset as resetPaymentSlice } from "../Slice/auth/PaymentSlice";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
      console.log("working");
      await dispatch(reset())
      await dispatch(resetGetDetails())
      await dispatch(resetPaymentSlice())
  };

  const [social, setSocial] = useState(false);
  const [support, setSupport] = useState(false);

  const username = useSelector((state) => state?.GetDetailsSlice?.getUserdata) ?? "";
  const UserInfo= useSelector((state)=> state.LoginSlice?.logindata)
  // console.log(UserInfo)


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          marginTop: Platform.OS == "iOS" ? 40 : 0,
          paddingTop: Platform.OS === "android" ? 45 : 20,
          backgroundColor: "#2CAA38",
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}
      >
        <View style={{ width: "25%" }}>
          <Image
            source={u2kLogo}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        </View>
        <View style={{ width: "100%" }}>
          {/* <Text style={{ color: "#fff", marginTop: 10, fontSize: 25 }}>U2K</Text> */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", marginTop: 15 }}>
              <Text style={{ color: "#fff", marginTop: 4, fontSize: 18 }}>
                Username
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: 4,
                  fontSize: 18,
                }}
              >
                {UserInfo?.data?.name}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ padding: 10 }}>
      <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={handleLogout}
    >
      <View style={{ width: "10%", marginTop: 30 }}>
        <IonIcon name="md-log-out" size={20} color="#000000"></IonIcon>
      </View>
      <View style={{ flexDirection: "row", width: "90%", marginTop: 30 }}>
        <Text style={{ fontSize: 12, width: "90%" }}>Log out</Text>
      </View>
    </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Profile;