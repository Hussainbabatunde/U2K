import React, { useState } from 'react'
import { useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TransactionHistoryApi } from '../Slice/auth/PaymentSlice'
import moment from 'moment';


const PaymentStatement = () =>{
    const [loader, setLoader] = useState(false)
    const dispatch= useDispatch()
    const HistoryTransaction = useSelector((state)=> state.PaymentSlice?.transactionHistoryData?.data)
    // console.log(HistoryTransaction?.length)

    const onRefresh = async () => {
        setLoader(true);
        await dispatch(TransactionHistoryApi());
        setLoader(false);
      };
    useEffect(()=>{
        const getHistory = async () =>{
            setLoader(true)
            await dispatch(TransactionHistoryApi())
            setLoader(false)
        }
        getHistory()
    },[])
    return(
        <View style={{flex: 1}}>
            {loader? 
            <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
                <ActivityIndicator size='large' />
            </View> 
            :
            
            <FlatList
            data={HistoryTransaction}
            refreshControl={
              <RefreshControl refreshing={loader} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{borderBottomColor:'#428ED8', borderBottomWidth: 1}}>
                <View style={{padding: 10}}>
                    <View style={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{color:'#428ED8'}}>E-Channel</Text>
                        {item?.type == 'withdrawal'?<Text style={{color:'red'}}>-{item?.amount}</Text>
                        :
                         item?.type =="deposit"? <Text style={{color:'green'}}>+{item?.amount}</Text>
                        :
                        <Text style={{color:'red'}}>-{item?.amount}</Text>
                         }
                    </View>
                    {item?.receiver_id != null ? <Text style={{marginTop: 10}}>Receiver: {item?.receiver?.name}</Text> : <Text style={{marginTop: 10}}>Username: {item?.sender?.name}</Text>}
                    {item?.receiver_id != null ? <Text>Receiver Phone Number: +{item?.receiver?.phone_number}</Text> : <Text>Phone Number: +{item?.sender?.phone_number}</Text>}
                    <Text>Transaction type: {item?.type}</Text>
                    <Text>Date: {moment(item?.created_at).format('YYYY-MM-DD')}</Text>
                    <Text>Time: {moment(item?.created_at).format('h:mm:ss a')}</Text>
                </View>
            </View>
              )}} />}
            {/* <View style={{borderBottomColor:'#428ED8', borderBottomWidth: 1}}>
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
            </View> */}
        </View>
    )
}

export default PaymentStatement;