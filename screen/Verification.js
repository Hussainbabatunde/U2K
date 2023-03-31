import { Text, View, TextInput } from 'react-native';
import React, {useState} from 'react';

const Verification = () =>{

    const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');

  const handleOTPSubmit = () => {
    const otp = otp1 + otp2 + otp3 + otp4;
    // code to submit the OTP
  }

    return(
        <View style={{ flexDirection: 'row' }}>
  <TextInput
    value={otp1}
    onChangeText={setOTP1}
    maxLength={1}
    keyboardType="numeric"
    style={{ borderWidth: 1, borderColor: 'gray', width: 50, height: 50, textAlign: 'center' }}
  />
  <TextInput
    value={otp2}
    onChangeText={setOTP2}
    maxLength={1}
    keyboardType="numeric"
    style={{ borderWidth: 1, borderColor: 'gray', width: 50, height: 50, textAlign: 'center', marginLeft: 10 }}
  />
  <TextInput
    value={otp3}
    onChangeText={setOTP3}
    maxLength={1}
    keyboardType="numeric"
    style={{ borderWidth: 1, borderColor: 'gray', width: 50, height: 50, textAlign: 'center', marginLeft: 10 }}
  />
  <TextInput
    value={otp4}
    onChangeText={setOTP4}
    maxLength={1}
    keyboardType="numeric"
    style={{ borderWidth: 1, borderColor: 'gray', width: 50, height: 50, textAlign: 'center', marginLeft: 10 }}
  />
</View>
    )
}

export default Verification;