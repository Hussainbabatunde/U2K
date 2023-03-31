import React, {useState} from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import CountryPicker from 'react-native-country-picker-modal';
import { Entypo } from '@expo/vector-icons'; 
import { Modal } from 'react-native';
import { useDispatch } from "react-redux";
import { RegisterAuth } from "../Slice/auth/Loginslice";



const Register = ({navigation}) =>{
    const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')

    const dispatch= useDispatch()

    const handleBack = () =>{
        navigation.navigate('Login')
    }
    const handleRegister= () =>{
        navigation.navigate('Login')
    }
    const handleSubmit= async() =>{
        const details = {
            name: name,
            phone_number: phone_number,
            password: password,
            password_confirmation: confirm_password
        }
        // console.log(' details ', details)
        // await dispatch(RegisterAuth(details))
        navigation.navigate('OTPscreen')
    }

//     const [countryCode, setCountryCode] = useState('FR');
// const [phoneNumber, setPhoneNumber] = useState('');
// const [country, setCountry] = useState(null)
// const [withCountryNameButton, setWithCountryNameButton] = useState(
//     false,
//   )
//   const [withFlag, setWithFlag] = useState(true)
//   const [withEmoji, setWithEmoji] = useState(true)
//   const [withFilter, setWithFilter] = useState(true)
//   const [withAlphaFilter, setWithAlphaFilter] = useState(false)
//   const [withCallingCode, setWithCallingCode] = useState(false)
//   const [modalVisible, setModalVisible] = useState(false);
// const onSelect = ( country) => {
//     setCountryCode(country.cca2)
//     setCountry(country)
//   }

    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#2e29f7'}}>
            <View style={{paddingHorizontal: 15, flexDirection:'row', alignItems:'center'}} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#cfd1d5" onPress={handleBack}/>
            <Text style={{color: '#cfd1d5', fontSize: 17}} onPress={handleBack}> Sign In</Text>
            </View>
            <View style={{flex: 1, justifyContent:"center",  paddingHorizontal:15}}>
                    <Text style={{color:"#cfd1d5"}}>Full Name</Text>
            <TextInput placeholder='Full Name' onChangeText={setName} style={styles.container} />
            
            <Text style={{color:"#cfd1d5", marginTop: 20}}>Phone Number</Text>
            <View onPress={() => setModalVisible(true)} style={{flexDirection:'row',borderBottomWidth: 1,
        borderColor: '#cfd1d5'}}>
            
            {/* <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible
      />
{countryCode !== null && (
        <Text style={{color:"#cfd1d5", fontSize: 17, marginTop: 6}}>{country?.cca2} {''}  {country?.callingCode} </Text>
      )} */}
      <TextInput placeholder='Phone number' onChangeText={setPhoneNumber} style={{flex: 1,
        fontSize: 18,
        padding: 5,
        paddingBottom: 10,
        color:'#cfd1d5',
        marginLeft:10}} />
            </View>
            <Text style={{color:"#cfd1d5", marginTop: 20}}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems:'center',
        borderBottomWidth: 1,
        borderColor: '#cfd1d5'}}>
                <TextInput placeholder='Password' onChangeText={setPassword} style={styles.password} />
                <Entypo name="eye" size={24} color="#cfd1d5" />
             </View>
             <Text style={{color:"#cfd1d5", marginTop: 20}}>Confirm Password</Text>
            <View style={{ flexDirection: 'row', alignItems:'center',
        borderBottomWidth: 1,
        borderColor: '#cfd1d5'}}>
                <TextInput placeholder='Password' onChangeText={setConfirmPassword} style={styles.password} />
                <Entypo name="eye" size={24} color="#cfd1d5" />
             </View>
             <TouchableOpacity onPress={handleSubmit} style={styles.loginbutton}>
                <Text style={{color:'#2e29f7', fontSize: 15}}>Sign Up</Text>
             </TouchableOpacity>
             <View style={styles.newsign}>
                <Text style={{color:"#bcbdc0", fontSize: 15}}>New to U2K?</Text>
                <Text style={{color:'gray', textDecorationLine: 'underline',  fontSize: 15}} onPress={handleRegister}>Sign Up</Text>
             </View>
            </View>
        </SafeAreaView>
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
        color:'#cfd1d5'
    },
    password:{
        fontSize: 18,
        padding: 5,
        paddingBottom: 10,
        flex: 1,
        color: '#cfd1d5'
    },
    loginbutton:{
        width:'100%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    newsign:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent:'center'
    }
})
export default Register;