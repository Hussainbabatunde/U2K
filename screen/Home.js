import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Avatar from '../assets/Avatar.png';
import { StatusBar } from "expo-status-bar";
import QRCode from "react-qr-code";
import * as Print from 'expo-print';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Base64 from 'Base64';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../Slice/auth/Loginslice";
import Modal from "react-native-modal";
import { GetWalletBalanceApi } from "../Slice/auth/GetDetails";

const Home = () =>{
    
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const data= useSelector((state)=> state.LoginSlice?.logindata?.data?.id) ?? '0';
    const walletData= useSelector((state)=> state.GetDetailsSlice?.getWalletData?.data);


    useEffect(()=>{
        const getWallet = async () =>{
            setLoading(true)
            await dispatch(GetWalletBalanceApi())
            setLoading(false)
        }
        getWallet()
    },[])

    const encoded = Base64.btoa('sample string');
    const handleStatement = () =>{
        navigation.navigate('TabNavigation', {screen: 'Transactions'})
    }
    const handlePrint = async () => {
        navigation.navigate('TabNavigation', {screen: "Home", params:{
            screen: 'ShareableQR'
        }})
      }
    

      const handleQRScanner = () =>{
        navigation.navigate('TabNavigation', {screen: "Home", params:{
            screen: 'QRScanner'
        }})
      }

      const handleAddMoney = () =>{
        navigation.navigate('TabNavigation', {screen: "Home", params:{
            screen: 'AddMoney'
        }})
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
                        <AntDesign name="qrcode" size={30} style={{marginRight: 20}} color="#2CAA38" onPress={handleQRScanner} />
                        {/* <Image source={Avatar} style={{height: 40, width: 40, borderRadius:50}}/> */}
                    </View>
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:20}}>
            
            <QRCode 
            size={170}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={JSON.stringify(data)}
             /> 
             <Text style={{marginTop: 10}}>Scan Barcode for Payment</Text>
            </View>
            <View style={{marginTop: 40, padding: 15}}>
                <Text style={{fontSize: 32, fontWeight: 'bold'}}>Hi, Rafeal!</Text>
                <Text style={{fontSize: 32, fontWeight: 'bold', color:'#2CAA38'}}>You have</Text>
                <Text style={{fontSize: 32, fontWeight: 'bold', color:'#2CAA38'}}><MaterialCommunityIcons name="currency-ngn" size={30} color='#2CAA38' /> {walletData?.balance}</Text>
                <View style={{width:'60%', height:1, backgroundColor:"#c3c8c4", marginTop: 60 }}></View>
                <TouchableOpacity onPress={handleAddMoney}>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}}>Add money</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}}>Withdraw your balance</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleStatement}>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}}>Check statement</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePrint}>
                    <Text style={{fontSize: 22, marginTop: 10, color:'#7f8180'}} onPress={handlePrint}>Print payment QR code</Text>
                </TouchableOpacity>
            </View>
            
            <Modal isVisible={loading}>
                    <ActivityIndicator size='large' color='white' />
             </Modal>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;