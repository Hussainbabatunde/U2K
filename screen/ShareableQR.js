import React, { useRef } from 'react';
import { Alert, ImageBackground, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import qrfirstbg from '../assets/qrfirstbg.jpg'
import QRCode from "react-qr-code";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

const ShareableQR = () =>{

        const data= "https/github:com";
        const viewRef = useRef()

        const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Image Download Permission",
          message: "Your permission is required to save images to your device",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        "",
        "Your permission is required to save images to your device",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } catch (err) {
      // handle error as you please
      console.log("err", err);
    }
  };


    const downloadImage = async () =>{
            try{
                const uri = await captureRef(viewRef, {
                    format: "png",
                    quality: 0.8,
                });

                if (Platform.OS === 'android'){
                    const granted = await getPermissionAndroid();
                    if(!granted) {
                        return;
                    }
                }

                const saved = MediaLibrary.saveToLibraryAsync(uri);
                if(saved){
                    Alert.alert(
                        "",
                        "QR Code sasved successfullly. Check your device gallery. ",
                        [{ text: "OK", onPress:() =>{} }],
                        {cancelable: false}
                    )
                }
            } catch(error) {
                console.log("error ", error)
            }
        }

    return(
        <View style={{flex: 1}}>
            <ImageBackground source={qrfirstbg} resizeMode="cover" style={styles.child}>
                <View style={styles.coverchild}>
                    <View style={{ padding: 20}} ref={viewRef}>
                    <View style={styles.QRholder}>
                        <QRCode 
                            size={300}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={data}
             /> 
             <Text style={{marginTop: 10, fontSize: 20}}>Name: Hussain Babatunde</Text>
             <Text style={{ fontSize: 20}}>Payment system: U2K</Text>
                    </View>
                    </View>
             <TouchableOpacity style={styles.DownloadBut} onPress={downloadImage}>
                <Text style={{color:'white', fontSize: 25}}>Download</Text>
             </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles= StyleSheet.create({
    child:{
        flex: 1
    },
    coverchild: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: "100%",
    height: "100%", 
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems:'center', 
    padding: 15
    },
    QRholder:{
        backgroundColor:'white',
        padding: 20,
        width: '90%',
        borderRadius: 10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    DownloadBut:{
        backgroundColor:'#1472CD',
        marginTop: 15,
        padding: 10,
        borderRadius: 5
    }
})



export default ShareableQR