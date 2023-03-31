import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Keyboard, TouchableOpacity } from 'react-native'
import HiddenTextInput from '../Components/OTPscreen/HiddenTextInput'

const OTPscreen = () => {
    const [code, setCode] = useState('')
    const [pinReady, setPinReady] = useState(false)
    const MAX_CODE_LENGTH = 6;
    const textInputRef = useRef(null);

  
    const [inputFocused, setInputFocused] = useState(false)
    const handleOnBlur= () =>{
        setInputFocused(false)
    }

    const handleOnPress= () =>{
        setInputFocused(true);
        textInputRef?.current?.focus();
    }

    const handleSubmit = () =>{
        console.log('submitted code ', code)
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
            <View style={StyledOTPInput}>
                <Text style={styles.OTPInputText}>{digit}</Text>
            </View>
        )
    }

  return (
    <Pressable onPress={Keyboard.dismiss} style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <StatusBar style='auto' />
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
        style={{backgroundColor:!pinReady ? 'blue': 'yellow', 
        width:'70%', justifyContent:'center', alignItems:'center', padding: 15, borderRadius: 5}}
        onPress={handleSubmit}>
            <Text>Submit</Text>
        </TouchableOpacity>
    </Pressable>
  )
}

const styles= StyleSheet.create({
    text:{
        fontSize: 15
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
        borderColor: 'blue',
        backgroundColor:'red'
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
        color: 'black'
    }
 })
export default OTPscreen