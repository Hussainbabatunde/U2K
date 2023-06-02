import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import backgroundimg from '../assets/backgroungimg.jpg'
import QRCode from "react-qr-code";
import { Entypo } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { loginAuth } from '../Slice/auth/Loginslice';


const Login = ({navigation}) =>{

    const data= "https/github:com"

    const [phone_number, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister= () =>{
        navigation.navigate('Register')
    }

    const dispatch = useDispatch()

    const handleLogin = async () =>{
        const details= {
            phone_number: phone_number,
            password: password
        }
        // console.log(details)
        // await dispatch(loginAuth(details))
        navigation.navigate('TabNavigation', {screen: 'Home' })
    }

    
    return(
        <View style={{flex: 1}}>
            <ImageBackground source={backgroundimg} resizeMode="cover" style={styles.child}>
                <View style={styles.coverchild}>
             <View style={{width:'100%'}}>
             <Text style={{color:"white"}}>Full Name</Text>
             <TextInput placeholder='Phone number' onChangeText={setPhoneNumber} style={styles.container} />
             </View>


             <View style={{width:'100%', marginTop: 20}}>
             <Text style={{color:"white"}}>Password</Text>
             <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center',
        borderBottomWidth: 1,
        borderColor: '#cfd1d5'}}>
                <TextInput placeholder='Password' onChangeText={setPassword} style={styles.password} />
                <Entypo name="eye" size={24} color="#cfd1d5" />
             </View>
             </View>
             <View style={styles.forgotpassword}>
                <Text style={styles.forgotText}>Forgot password?</Text>
             </View>
             <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
                <Text style={{color:'white', fontSize: 15}}>Login</Text>
             </TouchableOpacity>
             <View style={styles.newsign}>
                <Text style={{color:"#bcbdc0", fontSize: 15}}>New to U2K?</Text>
                <Text style={{color:'#231dc6', textDecorationLine: 'underline',  fontSize: 15}} onPress={handleRegister}>Sign Up</Text>
             </View>
             </View>
                </ImageBackground>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        width:"100%",
        borderBottomWidth: 1,
        borderColor: '#cfd1d5',
        fontSize: 18,
        padding: 5,
        paddingBottom: 10
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
    backgroundColor: 'rgba(0,0,0,0.8)',
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
        backgroundColor:'#2e29f7',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    newsign:{
        marginTop: 20,
        flexDirection: 'row'
    }
})

export default Login;