import React from "react";
import { Image, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Avatar from '../assets/Avatar.png';
import { StatusBar } from "expo-status-bar";
import QRCode from "react-qr-code";
import * as Print from 'expo-print';
import Base64 from 'Base64';

const Home = () =>{

    const data= "https/github:com";
    const encoded = Base64.btoa('sample string');
    const handlePrint = async () => {
        const htmlContent = `
          <html>
            <body>
              <img src="${encoded}" />
            </body>
          </html>
        `;
        await Print.printAsync({ html: htmlContent });
      }


    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
            <StatusBar style="auto" backgroundColor="#005091" /> 
            <View style={{padding: 15,
    //         elevation: 5,
    // backgroundColor: '#fff',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    }}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>My Wallet</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <AntDesign name="qrcode" size={30} style={{marginRight: 20}} color="#2e29f7" />
                        <Image source={Avatar} style={{height: 40, width: 40, borderRadius:50}}/>
                    </View>
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:20}}>
            
            <QRCode 
            size={170}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={data}
             /> 
             <Text style={{marginTop: 10}}>Scan Barcode for Payment</Text>
            </View>
            <View style={{marginTop: 40, padding: 15}}>
                <Text style={{fontSize: 32, fontWeight: 'bold'}}>Hi, Rafeal!</Text>
                <Text style={{fontSize: 32, fontWeight: 'bold', color:'#2e29f7'}}>You have</Text>
                <Text style={{fontSize: 32, fontWeight: 'bold', color:'#2e29f7'}}>$ 6.305,24</Text>
                <View style={{width:'60%', height:1, backgroundColor:"#c3c8c4", marginTop: 60 }}></View>
                <TouchableOpacity>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}}>Add money</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}}>Withdraw your balance</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}}>Check statement</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePrint}>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}} onPress={handlePrint}>Print payment QR code</Text>
                </TouchableOpacity>
            </View>
            
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;