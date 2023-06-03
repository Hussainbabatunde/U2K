import React, {useEffect, useState} from "react";
import { ActivityIndicator, ImageBackground, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import CountryPicker from 'react-native-country-picker-modal';
import { Entypo } from '@expo/vector-icons'; 
import { Modal } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { RegisterAuth } from "../Slice/auth/Loginslice";
import backgroundimg from '../assets/backgroungimg.jpg'
import { useNavigation } from "@react-navigation/native";



const Register = ({navigation}) =>{
    const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const RegisterData = useSelector((state)=> state?.LoginSlice?.registerdata)
    // console.log('register info ', RegisterData)

    useEffect(()=>{
        if(RegisterData){
            navigation.navigate('OTPscreen', {phone: phone_number})
        }
    },[RegisterData, navigation])

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
        setLoading(true)
        await dispatch(RegisterAuth(details))
        setLoading(false)
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
        <Pressable onPress={Keyboard.dismiss} style={{flex:1, backgroundColor: "#25C166"}}>
            {/* <ImageBackground source={backgroundimg} resizeMode="cover" style={styles.child}> */}
                <View style={styles.coverchild}>
            <View style={{paddingHorizontal: 15, flexDirection:'row', alignItems:'center', marginTop: 20, width: '100%'}} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#cfd1d5" onPress={handleBack}/>
            <Text style={{color: '#cfd1d5', fontSize: 17}} onPress={handleBack}> Sign In</Text>
            </View>
            <View style={{flex: 1, justifyContent:"center",  paddingHorizontal:15, width:'100%'}}>
                    <Text style={{color:"#cfd1d5"}}>Username</Text>
            <TextInput onChangeText={setName} style={styles.container} />
            
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
      <TextInput  onChangeText={setPhoneNumber} style={{flex: 1,
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
                <TextInput  onChangeText={setPassword} style={styles.password} />
                <Entypo name="eye" size={24} color="#cfd1d5" />
             </View>
             <Text style={{color:"#cfd1d5", marginTop: 20}}>Confirm Password</Text>
            <View style={{ flexDirection: 'row', alignItems:'center',
        borderBottomWidth: 1,
        borderColor: '#cfd1d5'}}>
                <TextInput  onChangeText={setConfirmPassword} style={styles.password} />
                <Entypo name="eye" size={24} color="#cfd1d5" />
             </View>
             <TouchableOpacity onPress={handleSubmit} style={styles.loginbutton}>
                {loading? <ActivityIndicator size='small' color='white' /> :<Text style={{color:'white', fontSize: 15}}>Sign Up</Text>}
             </TouchableOpacity>
             <View style={styles.newsign}>
                <Text style={{color:"#bcbdc0", fontSize: 15, marginRight: 10}}>New to U2K?</Text>
                <Text style={{color:'gray', textDecorationLine: 'underline',  fontSize: 15}} onPress={handleRegister}>Sign In</Text>
             </View>
            </View>
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
        color:'#cfd1d5'
    },
    password:{
        fontSize: 18,
        padding: 5,
        paddingBottom: 10,
        flex: 1,
        color: '#cfd1d5'
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
    padding: 15
    },
    loginbutton:{
        width:'100%',
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        padding: 20,
        marginTop: 20,
        borderRadius: 20
    },
    newsign:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent:'center'
    }
})
export default Register;