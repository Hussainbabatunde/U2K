import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import backgroundimg from '../assets/backgroungimg.jpg'
import QRCode from "react-qr-code";
import { Entypo } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { SetPinApi, loginAuth } from '../Slice/auth/Loginslice';
import u2kLogo from '../assets/u2k.png'


const SetUserPin = ({navigation}) =>{


    const [pin, setPin] = useState('')
    const [conf_pin, setConfPin] = useState('')
    const [loading, setLoading] = useState(false)
    const SetPinDone = useSelector((state)=> state?.LoginSlice?.setPinData?.message)


    const loginInfo=  useSelector((state)=> state.LoginSlice?.logindata?.data);

    useEffect(()=>{
        if(SetPinDone == "Pin set successsfully") {            
            navigation.navigate('AuthStack', {screen: 'Login'})
        }
    },[SetPinDone, navigation])

    const dispatch = useDispatch()

    const handleLogin = async () =>{
        const details= {
            pin: pin,
            pin_confirmation: conf_pin
        }
        setLoading(true)
        if(pin < 4 || conf_pin < 4){
            Alert.alert('Pin should be 4 digits.')
        }
        else{
            if(pin == conf_pin){
                await dispatch(SetPinApi(details))
            }
            else{
                Alert.alert('Pin and Confirm Pin are not the same')
            }
        }
        // await dispatch(loginAuth(details))
        setLoading(false)
    }

    
    return(
        <Pressable onPress={Keyboard.dismiss}style={{flex: 1, backgroundColor: "#25C166"}}>
            {/* <ImageBackground source={backgroundimg} resizeMode="cover" style={styles.child}> */}
                <View style={styles.coverchild}>
                    <Image source={u2kLogo} style={{marginBottom: 5}}  />
             <View style={{width:'100%'}}>
             <Text style={{color:"white"}}>Transaction Pin</Text>
             <TextInput 
             value={pin}
             onChangeText={setPin}             
                keyboardType="numeric"                
                returnKeyType="done" 
                maxLength={4}
                minLength={4}
             style={styles.container} />
             </View>

             <View style={{width:'100%', marginTop: 15}}>
             <Text style={{color:"white"}}>Confirm Transaction Pin</Text>
             <TextInput 
             onChangeText={setConfPin} 
             value={conf_pin}            
                keyboardType="numeric"                 
                returnKeyType="done"
                maxLength={4}
                minLength={4}
                style={styles.container} 
                />
             </View>


             <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
             {loading? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 15}}>Submit</Text>}
             </TouchableOpacity>
             </View>
                {/* </ImageBackground> */}
        </Pressable>
    )
}

const styles= StyleSheet.create({
    container: {
        width:"100%",
        borderBottomWidth: 1,
        borderColor: '#cfd1d5',
        fontSize: 18,
        padding: 5,
        paddingBottom: 10,
        color:'white'
    },
    password:{
        fontSize: 18,
        padding: 5,
        paddingBottom: 10,
        flex: 1
    },
    child:{
        // width: "100%",
        // height: "55%"
        flex: 1
    },
    coverchild: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: "100%",
    height: "100%", 
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems:'center', 
    padding: 15
    },
    forgotpassword:{
        marginTop: 10,
        width: "100%",
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    forgotText:{
        color:'white'
    },
    loginbutton:{
        width:'100%',
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        padding: 20,
        marginTop: 20,
        borderRadius: 10
    },
    newsign:{
        marginTop: 20,
        flexDirection: 'row'
    }
})

export default SetUserPin;