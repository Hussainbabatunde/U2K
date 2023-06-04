import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, TextInput } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons'; 
// import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetails, GetWalletBalanceApi, TransferAmountApi } from "../Slice/auth/GetDetails";
import { useRef } from "react";
import { AddMoneyApi, GetAllBanksApi, VerifyAccNumberApi, WithdrawMoneyApi } from "../Slice/auth/PaymentSlice";
import { WebView } from 'react-native-webview';
import { reset as resetPaymentSlice } from "../Slice/auth/PaymentSlice";

const WithdrawMoney = ({route, navigation}) =>{
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(1)
    const [banksLoad, setBanksLoad] = useState(false)
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [amt, setAmt] = useState('')
    const [loading, setLoading] = useState(false)
    const [loader, setLoader] = useState(false);
    const [bankCode, setBankCode] = useState('')
    const [accNumber, setAccNumber] = useState('')
    const [withdrawLoader, setWithdrawLoader] = useState(false)

    const banks = useSelector((state) => state.PaymentSlice?.banksData?.data)
    const AccUserName = useSelector((state) => state.PaymentSlice?.verifyAcc)
    const WithdrawStatus = useSelector((state)=> state.PaymentSlice?.withdrawalData)
// console.log(banks)
    useEffect(()=>{
        const banksAvailable = async () =>{
          setBanksLoad(true)
          await dispatch(GetAllBanksApi())
          setBanksLoad(false)
        }
        banksAvailable()
    },[])

    const onRefresh = async () => {
      setLoader(true);
      await dispatch(GetAllBanksApi());
      setLoader(false);
    };

    const handleSelectedBank = (code) =>{
      setBankCode(code)
      setPage(2)
    }

 
    const handleChange = (text) => {
          setAmt(text);
      };
      const  handleClosePayment = async() =>{
        const detailsSent = {}
        detailsSent.account_no = accNumber
        detailsSent.bank_code = bankCode
        detailsSent.amount = amt
        if(amt==''){
          Alert.alert('Input your amount')
        }
        else{
          setWithdrawLoader(true)
        await dispatch(WithdrawMoneyApi(detailsSent))
        await dispatch(GetWalletBalanceApi())
        setWithdrawLoader(false)
        setIsModalVisible(false)
        setPage(3)
        setAmt('')
        }
      }

      const  handleRetry = async() =>{
        setIsModalVisible(false)
      }

      const handlePayNow = async () =>{
        const details = {}
        details.account_no = accNumber
        details.bank_code = bankCode
        if (accNumber == ''){
          Alert.alert('Input account number')
        }else{
          setLoading(true)
        await dispatch(VerifyAccNumberApi(details))
        setIsModalVisible(true) 
        setLoading(false)  
        }
      }
    return(<View style={{backgroundColor:'#CED4CE ', flex: 1}}>
{page == 1 && <View style={{backgroundColor:'#CED4CE ', flex: 1}}>
    <View style={{borderBottomColor:'gray', borderBottomWidth: 1, padding: 10, justifyContent:"center", alignItems:"center", backgroundColor:"white"}}>
            <Text style={{color:"#2CAA38"}}>Select Bank</Text>
        </View>
      <FlatList
              data={banks}
              refreshControl={
                <RefreshControl refreshing={loader} onRefresh={onRefresh} />
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={()=> handleSelectedBank(item?.code)} style={{borderBottomWidth: 1, borderBottomColor: 'black', padding: 10}}>
                        <Text style={{fontSize: 17}}>{item?.name}</Text>
                  </TouchableOpacity>
                )}} />
                </View>}
      
        

        {page == 2 && <View style={{backgroundColor:'#CED4CE ', flex: 1}}>

<Modal isVisible={isModalVisible}>
  <View style={{backgroundColor:'white', padding: 10}}>
                {AccUserName?.data?.message == "Could not resolve account name. Check parameters or try again."?
                 <View style={{width:'100%', justifyContent:'center', alignItems:'center'}} >
                 <Text style={{textAlign:'center'}}>{AccUserName?.data?.message}</Text>
               <TouchableOpacity style={styles.loginbutton}
           //  onPress={()=> paystackWebViewRef.current.startTransaction()}
            onPress={handleRetry}
            >
               <Text style={{color:'white', fontSize: 15}}>Close</Text>
            </TouchableOpacity>
            </View>
            : 
            <View style={{width:'100%', justifyContent:'center', alignItems:'center'}} >
                  <Text>Account Name:</Text>
                  <Text style={{fontSize: 18}}>{AccUserName?.data?.account_name}</Text>
                  <Text>Account Number:</Text>
                  <Text style={{fontSize: 18}}>{AccUserName?.data?.account_number}</Text>
                  <Text>Amount: </Text>
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
            //  onPress={()=> paystackWebViewRef.current.startTransaction()}
             onPress={handleClosePayment}
             >
                {withdrawLoader?<ActivityIndicator size='small' /> :<Text style={{color:'white', fontSize: 15}}>Withdraw</Text>}
             </TouchableOpacity>
             </View>}
             </View>
                </Modal>


                
        <View style={{borderBottomColor:'gray', borderBottomWidth: 1, padding: 10, justifyContent:"center", alignItems:"center", backgroundColor:"white"}}>
            <Text style={{color:"#2CAA38"}}>Details</Text>
        </View>
        {/* <Text style={{marginTop: 20, marginLeft: 15}}>Enter Amount:</Text>
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
        </View> */}
        <Text style={{marginTop: 20, marginLeft: 15}}>Acc Number:</Text>
        <View style={{flexDirection:'row', padding: 5, borderWidth: 1, backgroundColor:'white', marginTop: 5, justifyContent:'space-between'}}>
        <TextInput 
        style={{flex: 1}}
            keyboardType="numeric"
            value={accNumber}               
            returnKeyType="done" 
            placeholder="Input your account number"
            onChangeText={setAccNumber}
            />
        </View>
            <TouchableOpacity style={styles.loginbutton}
            //  onPress={()=> paystackWebViewRef.current.startTransaction()}
             onPress={handlePayNow}
             >
                {loading? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 15}}>Continue</Text>}
             </TouchableOpacity>

             {/* <Modal isVisible={loading}>
                    <ActivityIndicator size='large' color='white' />
             </Modal> */}
        </View>}

        {page == 3 && 
            <View style={{flex: 1, alignItems:'center'}}>
            <AntDesign name="checkcircle" style={{marginTop: 20}} size={94} color="#2CAA38" />
            <Text style={{fontSize: 25, marginTop: 10}}>{WithdrawStatus?.message}</Text>

            <TouchableOpacity style={styles.loginbutton}
             onPress={()=> navigation.navigate('TabNavigation', {screen: 'Home', params:{
              screen:"MainHome"
          }})}
             >
                <Text style={{color:'white', fontSize: 15}}>Continue</Text>
             </TouchableOpacity>
        </View>
        }
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

export default WithdrawMoney;