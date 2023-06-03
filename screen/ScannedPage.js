import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput } from "react-native";
import { View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetails } from "../Slice/auth/GetDetails";

const ScannedPage = ({route}) =>{
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch()
    const [isModalVisible, setModalVisible] = useState(false);
    const {data} = route.params
    const gottenInfo = useSelector((state)=> state.GetDetailsSlice?.getUserdata)
    // console.log(data)
    useEffect(()=>{
        const dataInfo = async () =>{
            setModalVisible(true)
            await dispatch(GetUserDetails(data))
            setModalVisible(false)
        }
        dataInfo()
    },[])

    const handleChange = (text) => {
          setInputValue(text);
      };

    return(
        <View style={{backgroundColor:'#CED4CE ', flex: 1}}>
        <View style={{borderBottomColor:'gray', borderBottomWidth: 1, padding: 10, justifyContent:"center", alignItems:"center", backgroundColor:"white"}}>
            <Text style={{color:"#2CAA38"}}>Details</Text>
        </View>
        <Text style={{marginTop: 20, marginLeft: 15}}>Enter Amount:</Text>
        <View style={{flexDirection:'row', padding: 5, borderWidth: 1, backgroundColor:'white', marginTop: 5, justifyContent:'space-between'}}>
        <MaterialCommunityIcons name="currency-ngn" size={20} color="black" />
        <TextInput 
        style={{flex: 1}}
            keyboardType="numeric"
            value={inputValue}
            placeholder="0.00"
            onChangeText={handleChange}
            />
        </View>
        <Text style={{marginTop: 20, marginLeft: 15}}>Name:</Text>
        <View style={{flexDirection:'row', padding: 5, borderWidth: 1, backgroundColor:'white', marginTop: 5, justifyContent:'space-between'}}>
        <Text style={{ marginLeft: 5}}>{gottenInfo?.data?.name}</Text>
            </View>
            <Text style={{marginTop: 20, marginLeft: 15}}>Phone Number:</Text>
        <View style={{flexDirection:'row', padding: 5, borderWidth: 1, backgroundColor:'white', marginTop: 5, justifyContent:'space-between'}}>
        <Text style={{ marginLeft: 5}}>+{gottenInfo?.data?.phone_number}</Text>
            </View>
            <TouchableOpacity style={styles.loginbutton}>
                <Text style={{color:'white', fontSize: 15}}>Pay Now</Text>
             </TouchableOpacity>

             <Modal isVisible={isModalVisible}>
                    <ActivityIndicator size='large' color='white' />
             </Modal>
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

export default ScannedPage;