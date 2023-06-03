import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Keyboard, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
import HiddenTextInput from '../Components/OTPscreen/HiddenTextInput'
import backgroundimg from '../assets/verifybackgroung.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { VerifyAuth } from '../Slice/auth/Loginslice'
import {reset } from "../Slice/auth/Loginslice"



const OTPscreen = ({route, navigation}) => {
    const {phone} = route.params
    const [code, setCode] = useState('')
    const [pinReady, setPinReady] = useState(false)
    const MAX_CODE_LENGTH = 6;
    const textInputRef = useRef(null);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const VerifyStatus = useSelector((state)=> state?.LoginSlice?.verifyData?.message)

    useEffect(()=>{
        dispatch(reset())
    },[])

    useEffect(()=>{
        if(VerifyStatus == "Phone number verified successfully")
        navigation.navigate("Login")
    },[VerifyStatus, navigation])

  
    const [inputFocused, setInputFocused] = useState(false)
    const handleOnBlur= () =>{
        setInputFocused(false)
    }

    const handleOnPress= () =>{
        setInputFocused(true);
        textInputRef?.current?.focus();
    }

    const handleSubmit = async() =>{
        const data = {}
        data.code = code
        data.phone_number = phone
        setLoading(true)
        await dispatch(VerifyAuth(data))
        setLoading(false)
        // console.log('submitted code ', phone)
    }

    const codeDigitsArray = new Array(MAX_CODE_LENGTH).fill(0)

    useEffect(()=>{
        setPinReady(code.length === MAX_CODE_LENGTH);
        return ()=> setPinReady(false)
    }, [code])


    const toCodeDigitInput = (value, index) =>{
        const exptyInputChar = ' ';
        const digit = code[index] || exptyInputChar

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === MAX_CODE_LENGTH - 1;
        const isCodeFull = code.length === MAX_CODE_LENGTH ;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull)

        const StyledOTPInput = inputFocused && isDigitFocused ? styles.OTPInputFocused : styles.OTPInput

        return (
            <View key={index} style={StyledOTPInput}>
                <Text style={styles.OTPInputText}>{digit}</Text>
            </View>
        )
    }

  return (
    <Pressable onPress={Keyboard.dismiss} style={{flex: 1, backgroundColor: "#25C166"}}>
        <StatusBar style='auto' />
        {/* <ImageBackground source={backgroundimg} resizeMode="cover" style={styles.child}> */}
                <View style={styles.coverchild}>
        <Text style={styles.text}>Enter the received OTP</Text>
        <View style={styles.OTPInputSection}>
        <Pressable style={styles.InputContainer} onPress={handleOnPress} >
            {/* <View style={styles.OTPInput}>
                <Text style={styles.OTPInputText}>try</Text>
            </View> */}
            {codeDigitsArray.map(toCodeDigitInput)}
        </Pressable>
            <HiddenTextInput setPinReady={setPinReady} 
            code={code} 
            setCode={setCode} 
            maxLength={MAX_CODE_LENGTH} 
            textInputRef={textInputRef}
            handleOnBlur={handleOnBlur} />
        </View>
        <TouchableOpacity disabled={!pinReady} 
        style={{backgroundColor:!pinReady ? "black" : "#4FE75E", 
        width:'70%', justifyContent:'center', alignItems:'center', padding: 15, borderRadius: 5}}
        onPress={handleSubmit}>
            {loading? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white'}}>Submit</Text>}
        </TouchableOpacity>
        </View>
        {/* </ImageBackground> */}
    </Pressable>
  )
}

const styles= StyleSheet.create({
    text:{
        fontSize: 15,
        color: 'white'
    },
    OTPInputSection:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 30
    },
    InputContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    OTPInputFocused:{
        borderColor:'gray',
        minWidth: '12%', 
        borderWidth: 2,
        borderRadius: 5,
        padding: 6,
        borderColor: "#4FE75E",
        backgroundColor:'transparent'
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
    OTPInput:{
        borderColor:'gray',
        minWidth: '12%', 
        borderWidth: 2,
        borderRadius: 5,
        padding: 6
    },
    OTPInputText:{
        fontSize: 22,
        fontWeight:'bold',
        textAlign: 'center',
        color: 'white'
    }
 })
export default OTPscreen