import React from 'react'
import { Pressable, View } from 'react-native'

const OTPInputContainer = () => {
  return (
    <View>
        <Pressable style={styles.InputContainer} >
            <View style={styles.OTPInput}>
                <Text style={styles.OTPInputText}>try</Text>
            </View>
        </Pressable>
    </View>
  )
}

const styles= StyleSheet.create({
    InputContainer:{
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    OTPInput:{
        borderColor:'gray',
        minWidth: '15%',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5
    },
    OTPInputText:{
        fontSize: 22,
        fontWeight:'bold',
        textAlign: 'center',
        color: 'black'
    }
})

export default OTPInputContainer