import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Header, Card } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OrderHistory = ({ navigation }) => {

    const [callOrderHistory, setCallOrderHistory] = useState(true);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} barStyle='light-content' backgroundColor={'transparent'} />
            {/* Header Section */}
            <Header statusBarProps={{ backgroundColor: 'transparent' }} containerStyle={{ backgroundColor: '#423b88', paddingVertical: 6, borderBottomWidth: 0 }} centerComponent={{ text: 'Order History', style: { color: '#fff', fontSize: RFPercentage(3.5), fontFamily: 'Dongle-Regular', marginTop: RFPercentage(0.5) } }} leftComponent={{ icon: 'arrow-back', color: '#fff', iconStyle: { marginLeft: RFPercentage(1), marginTop: RFPercentage(0.8) }, onPress: () => navigation.goBack() }} />

            {/* Tab Bar */}
            <View style={{ backgroundColor: "white", flexDirection: 'row', justifyContent: 'space-around', paddingVertical: RFPercentage(2) }}>
                <TouchableOpacity onPress={() => setCallOrderHistory(true)}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: RFPercentage(1.8), color: callOrderHistory ? 'black' : '#bfbfbf' }}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCallOrderHistory(false)}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: RFPercentage(1.8), color: !callOrderHistory ? "black" : '#bfbfbf' }}>Chat</Text>
                </TouchableOpacity>
            </View>

            {/* Order History */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {callOrderHistory ?
                    <View style={{ flex: 1, backgroundColor: "#f3f2fc", paddingBottom: RFPercentage(3) }}>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                    </View >
                    :
                    <View style={{ flex: 1, backgroundColor: "#f3f2fc", paddingBottom: RFPercentage(3) }}>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                        <Card containerStyle={{ margin: RFPercentage(2), borderRadius: RFPercentage(1) }}>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), textAlign: 'center' }}>Order Id</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(1) }}>Astrologer Name</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Status : <Text style={{ color: 'green', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8) }}>Completed</Text></Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Date : Monday 20 April 2022</Text>
                            <Text style={{ color: 'black', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Call rate :   <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0/min </Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Duration : 0 minutes</Text>
                            <Text style={{ color: '#818181', fontFamily: 'Ubuntu-Regular', fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Deduction :  <FontAwesome name="inr" color="green" size={15} style={{ marginTop: RFPercentage(0.5) }} /> 0</Text>
                        </Card>
                    </View >
                }
            </ScrollView>
        </View >
    )
}

export default OrderHistory