import { View, Text, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Header, Card, Image } from 'react-native-elements';
import FileBase64 from '../helpers/FileBase64';

const Following = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} barStyle='light-content' backgroundColor={'transparent'} />
            {/* Header Section */}
            <Header statusBarProps={{ backgroundColor: 'transparent' }} containerStyle={{ backgroundColor: '#423b88', paddingVertical: 6, borderBottomWidth: 0 }} centerComponent={{ text: 'Following', style: { color: '#fff', fontSize: RFPercentage(3.5), fontFamily: 'Dongle-Regular', marginTop: RFPercentage(0.5) } }} leftComponent={{ icon: 'arrow-back', color: '#fff', iconStyle: { marginLeft: RFPercentage(1), marginTop: RFPercentage(0.8) }, onPress: () => navigation.goBack() }} />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ paddingBottom: RFPercentage(3) }}>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: FileBase64.profileLogo }} style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'black' }} />
                            </View>
                            <View style={{ justifyContent: 'space-around', marginStart: RFPercentage(1) }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Bold', color: 'black', fontSize: RFPercentage(1.5), maxWidth: RFPercentage(19) }}>Astrologer Name</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Languages</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Experience</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Charges Per Minute</Text>
                            </View>
                            <View>
                                <Card containerStyle={{ borderRadius: RFPercentage(1), borderColor: 'green', borderWidth: 1 }}>
                                    <Text style={{ color: 'green', fontFamily: 'Dongle-Regular', fontSize: RFPercentage(2), textAlign: 'center', alignItems: 'center' }}>
                                        Unfollow
                                    </Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: FileBase64.profileLogo }} style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'black' }} />
                            </View>
                            <View style={{ justifyContent: 'space-around', marginStart: RFPercentage(1) }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Bold', color: 'black', fontSize: RFPercentage(1.5), maxWidth: RFPercentage(19) }}>Astrologer Name</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Languages</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Experience</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Charges Per Minute</Text>
                            </View>
                            <View>
                                <Card containerStyle={{ borderRadius: RFPercentage(1), borderColor: 'green', borderWidth: 1 }}>
                                    <Text style={{ color: 'green', fontFamily: 'Dongle-Regular', fontSize: RFPercentage(2), textAlign: 'center', alignItems: 'center' }}>
                                        Unfollow
                                    </Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: FileBase64.profileLogo }} style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'black' }} />
                            </View>
                            <View style={{ justifyContent: 'space-around', marginStart: RFPercentage(1) }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Bold', color: 'black', fontSize: RFPercentage(1.5), maxWidth: RFPercentage(19) }}>Astrologer Name</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Languages</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Experience</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Charges Per Minute</Text>
                            </View>
                            <View>
                                <Card containerStyle={{ borderRadius: RFPercentage(1), borderColor: 'green', borderWidth: 1 }}>
                                    <Text style={{ color: 'green', fontFamily: 'Dongle-Regular', fontSize: RFPercentage(2), textAlign: 'center', alignItems: 'center' }}>
                                        Unfollow
                                    </Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: FileBase64.profileLogo }} style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'black' }} />
                            </View>
                            <View style={{ justifyContent: 'space-around', marginStart: RFPercentage(1) }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Bold', color: 'black', fontSize: RFPercentage(1.5), maxWidth: RFPercentage(19) }}>Astrologer Name</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Languages</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Experience</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Charges Per Minute</Text>
                            </View>
                            <View>
                                <Card containerStyle={{ borderRadius: RFPercentage(1), borderColor: 'green', borderWidth: 1 }}>
                                    <Text style={{ color: 'green', fontFamily: 'Dongle-Regular', fontSize: RFPercentage(2), textAlign: 'center', alignItems: 'center' }}>
                                        Unfollow
                                    </Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: FileBase64.profileLogo }} style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'black' }} />
                            </View>
                            <View style={{ justifyContent: 'space-around', marginStart: RFPercentage(1) }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Bold', color: 'black', fontSize: RFPercentage(1.5), maxWidth: RFPercentage(19) }}>Astrologer Name</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Languages</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Experience</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Charges Per Minute</Text>
                            </View>
                            <View>
                                <Card containerStyle={{ borderRadius: RFPercentage(1), borderColor: 'green', borderWidth: 1 }}>
                                    <Text style={{ color: 'green', fontFamily: 'Dongle-Regular', fontSize: RFPercentage(2), textAlign: 'center', alignItems: 'center' }}>
                                        Unfollow
                                    </Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: FileBase64.profileLogo }} style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'black' }} />
                            </View>
                            <View style={{ justifyContent: 'space-around', marginStart: RFPercentage(1) }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Bold', color: 'black', fontSize: RFPercentage(1.5), maxWidth: RFPercentage(19) }}>Astrologer Name</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Languages</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Experience</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Charges Per Minute</Text>
                            </View>
                            <View>
                                <Card containerStyle={{ borderRadius: RFPercentage(1), borderColor: 'green', borderWidth: 1 }}>
                                    <Text style={{ color: 'green', fontFamily: 'Dongle-Regular', fontSize: RFPercentage(2), textAlign: 'center', alignItems: 'center' }}>
                                        Unfollow
                                    </Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: FileBase64.profileLogo }} style={{ height: 80, width: 80, borderRadius: 40, borderWidth: 1, borderColor: 'black' }} />
                            </View>
                            <View style={{ justifyContent: 'space-around', marginStart: RFPercentage(1) }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Bold', color: 'black', fontSize: RFPercentage(1.5), maxWidth: RFPercentage(19) }}>Astrologer Name</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Languages</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Experience</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontFamily: 'Ubuntu-Regular', color: 'black', fontSize: RFPercentage(1.2), maxWidth: RFPercentage(19) }}>Astrologer Charges Per Minute</Text>
                            </View>
                            <View>
                                <Card containerStyle={{ borderRadius: RFPercentage(1), borderColor: 'green', borderWidth: 1 }}>
                                    <Text style={{ color: 'green', fontFamily: 'Dongle-Regular', fontSize: RFPercentage(2), textAlign: 'center', alignItems: 'center' }}>
                                        Unfollow
                                    </Text>
                                </Card>
                            </View>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </View>
    )
}

export default Following