import React from 'react'
import { Text, View } from 'react-native'


const PaymentStatement = () =>{
    return(
        <View style={{flex: 1}}>
            <View style={{borderBottomColor:'#428ED8', borderBottomWidth: 1}}>
                <View style={{padding: 10}}>
                    <View style={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{color:'#428ED8'}}>E-Channel</Text>
                        <Text style={{color:'red'}}>-300.00</Text>
                    </View>
                    <Text style={{marginTop: 10}}>Acc name: Mayana Tunde</Text>
                    <Text>Bank: UBA</Text>
                    <Text>Date: 23-4-2035</Text>
                    <Text>Time: 23:45pm</Text>
                </View>
            </View>
            <View style={{borderBottomColor:'#428ED8', borderBottomWidth: 1}}>
                <View style={{padding: 10}}>
                    <View style={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{color:'#428ED8'}}>E-Channel</Text>
                        <Text style={{color:'green'}}>+300.00</Text>
                    </View>
                    <Text style={{marginTop: 10}}>Acc name: Mayana Tunde</Text>
                    <Text>Bank: UBA</Text>
                    <Text>Date: 23-4-2035</Text>
                    <Text>Time: 23:45pm</Text>
                </View>
            </View>
        </View>
    )
}

export default PaymentStatement;