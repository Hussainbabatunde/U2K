import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Text, View } from 'react-native'
import { useRef } from 'react'

const HiddenTextInput = ({setPinReady, code, setCode, maxLength, handleOnBlur, textInputRef}) => {

  // const textInputRef = useRef(null);

  // const handleOnBlur= () =>{}
  return (
    <View>
        <TextInput style={styles.TextInputOTP}
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType='number-pad'
        returnKeyType='done'
        textContentType='oneTimeCode'
        ref={textInputRef}
        onBlur={handleOnBlur} />
    </View>
  )
}
const styles= StyleSheet.create({
    TextInputOTP:{
        position:'absolute',
        width: 1,
        height: 1,
        opacity: 0
    }
})
export default HiddenTextInput