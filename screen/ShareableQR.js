import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import qrfirstbg from '../assets/qrfirstbg.jpg'

const ShareableQR = () =>{
    return(
        <View style={{flex: 1}}>
            <ImageBackground source={qrfirstbg} resizeMode="cover" style={styles.child}>
                <View style={styles.coverchild}>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles= StyleSheet.create({
    child:{
        flex: 1
    },
    coverchild: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: "100%",
    height: "100%", 
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems:'center', 
    padding: 15
    },
})



export default ShareableQR