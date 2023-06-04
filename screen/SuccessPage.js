import React from 'react'
import { Button, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { GetWalletBalanceApi, reset as resetGetDetails } from "../Slice/auth/GetDetails";

const SuccessPage = ({navigation}) =>{
    const dispatch = useDispatch()
    const handleGoBack = async () => {
        // Perform any necessary logic before navigating
      await dispatch(resetGetDetails())
      await dispatch(GetWalletBalanceApi())
        navigation.navigate('TabNavigation', {screen: 'Home', params:{
            screen:"MainHome"
        }}); // Navigate to the desired screen
      };
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <Button title="Back"  onPress={handleGoBack} />
          ),
          headerTintColor: '#fff'
        });
      }, [navigation]);

    return(
        <View style={{flex: 1, alignItems:'center'}}>
            <AntDesign name="checkcircle" style={{marginTop: 20}} size={94} color="#2CAA38" />
            <Text style={{fontSize: 25, marginTop: 10}}>Transaction Successful</Text>
        </View>
    )
}

export default SuccessPage;