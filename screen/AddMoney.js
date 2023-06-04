import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
// import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetails, GetWalletBalanceApi, TransferAmountApi } from "../Slice/auth/GetDetails";
import { useRef } from "react";
import { AddMoneyApi } from "../Slice/auth/PaymentSlice";
import { WebView } from 'react-native-webview';
import { reset as resetPaymentSlice } from "../Slice/auth/PaymentSlice";

const AddMoney = ({route, navigation}) =>{
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [amt, setAmt] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const gottenInfo = useSelector((state)=> state.GetDetailsSlice?.getUserdata)
    const transferStatus = useSelector((state) => state.GetDetailsSlice?.transferData)
    // console.log(data)
    const payUrl = useSelector((state)=> state.PaymentSlice?.addMoneydata)
    const callback_url = 'https://standard.paystack.co/close';

    onNavigationStateChange = state => {
   
      const { url } = state;
  
      if (!url) return;
  
      if (url === callback_url) {
              // get transaction reference from url and verify transaction, then redirect
        // const redirectTo = 'window.location = "' + callback_url + '"';
        // this.webview.injectJavaScript(redirectTo);        
        dispatch(resetPaymentSlice())
        setIsModalVisible(false)
      }
          
          if(url === 'https://standard.paystack.co/close') {
        // handle webview removal
        // You can either unmount the component, or
        // Use a navigator to pop off the viewdispatch(resetPaymentSlice())
                
        dispatch(resetPaymentSlice())
        setIsModalVisible(false)
      }
    };
    // const paystackWebViewRef = useRef(paystackProps.PayStackRef); 

    const handleChange = (text) => {
          setAmt(text);
      };
      const handleClosePayment = async() =>{
        await dispatch(resetPaymentSlice())
        setIsModalVisible(false)
        setAmt('')
      }
      const handlePayNow = async () =>{
        const details = {}
        details.amount = amt
        console.log('it works')
        setLoading(true)
        await dispatch(AddMoneyApi(details))
        await dispatch(GetWalletBalanceApi())
        setIsModalVisible(true) 
        setLoading(false)  
      }
    return(
        <View style={{backgroundColor:'#CED4CE ', flex: 1}}>

<Modal isVisible={isModalVisible}>
                <WebView 
                    source={{ uri: payUrl?.data?.authorization_url }}
                    style={{ marginTop: 40 }}                    
      onNavigationStateChange={onNavigationStateChange }
                />
                <TouchableOpacity style={styles.loginbutton}
            //  onPress={()=> paystackWebViewRef.current.startTransaction()}
             onPress={handleClosePayment}
             >
                <Text style={{color:'white', fontSize: 15}}>Close</Text>
             </TouchableOpacity>
                </Modal>
{/* <Paystack
        paystackKey="your-public-key-here"
        billingEmail="paystackwebview@something.com"
        amount={'25000.00'}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        ref={paystackWebViewRef}
      /> */}
        <View style={{borderBottomColor:'gray', borderBottomWidth: 1, padding: 10, justifyContent:"center", alignItems:"center", backgroundColor:"white"}}>
            <Text style={{color:"#2CAA38"}}>Details</Text>
        </View>
        <Text style={{marginTop: 20, marginLeft: 15}}>Enter Amount:</Text>
        <View style={{flexDirection:'row', padding: 5, borderWidth: 1, backgroundColor:'white', marginTop: 5, justifyContent:'space-between'}}>
        <MaterialCommunityIcons name="currency-ngn" size={20} color="black" />
        <TextInput 
        style={{flex: 1}}
            keyboardType="numeric"
            value={amt}               
            returnKeyType="done" 
            placeholder="0.00"
            onChangeText={handleChange}
            />
        </View>
            <TouchableOpacity style={styles.loginbutton}
             onPress={handlePayNow}
             >
                {loading? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 15}}>Pay Now</Text>}
             </TouchableOpacity>

             {/* <Modal isVisible={loading}>
                    <ActivityIndicator size='large' color='white' />
             </Modal> */}
        </View>
    )
}


const styles= StyleSheet.create({
    loginbutton:{
        width:'90%',
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
        marginLeft: '5%'
    }
})

export default AddMoney;