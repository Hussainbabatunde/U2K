import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "react-native";

function QRScanner() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [torchon, setTorchOn] = useState(null);
  const [isTorchOn, setIsTorchOn] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log(hasPermission)
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    var theWord = "exp";
    
  console.log(data)

    if (data.indexOf(theWord) !== -1) {
      navigation.navigate("AppNavigator", { screen: "Home" , params:{
        screen: "ListingDeep", 
        params: {data}
      } })
      // Linking.openURL(data);
    } else {
      alert(`Oops! Invalid code. Please find a Popat event code!`);
      alert(`Sorry! Ticket ${type} is not valid.  and data ${data} has been scanned!`);
    alert(
      `Sorry! Ticket ${data} is not valid. Please provide an authentic ticket!`
    );
    }

    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View
        style={{
          position: "absolute",
          zIndex: 500,
          top: 60,
          right: 40,
          padding: 20,
        }}
      >
        <MaterialIcons
          name="cancel"
          size={30}
          color='white'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          marginTop: -40,
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BarCodeScanner
          flashMode={torchon}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {/* <LottieView
          autoPlay
          loop={true}
          source={require("../../assets/animations/scanner.json")}
          style={{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        /> */}

        {scanned && (
          <TouchableOpacity>
            <Button
              title="Tap to Scan Again"
              onPress={() => setScanned(false)}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
