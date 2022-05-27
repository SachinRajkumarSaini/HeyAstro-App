import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Header, Card} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FetchAPI} from '../helpers/FetchInstance';

const Notifications = ({navigation}) => {
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const getNotifications = await FetchAPI({
        query: `
                    query{
                        notifications{
                            data{
                                attributes{
                                    Title
                                    Description
                                    createdAt
                                }
                            }
                        }
                    }
                `,
      });
      setNotifications(getNotifications.data.notifications.data);
    } catch (error) {
      ToastAndroid.show(
        'Some error occured, Please try again later',
        ToastAndroid.SHORT,
      );
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
        backgroundColor={'transparent'}
      />
      {/* Header Section */}
      <Header
        statusBarProps={{backgroundColor: 'transparent'}}
        containerStyle={{
          backgroundColor: '#423b88',
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: 'Notifications',
          style: {
            color: '#fff',
            fontSize: RFPercentage(3.5),
            fontFamily: 'Dongle-Regular',
            marginTop: RFPercentage(0.5),
          },
        }}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          iconStyle: {
            marginLeft: RFPercentage(1),
            marginTop: RFPercentage(0.8),
          },
          onPress: () => navigation.goBack(),
        }}
        rightComponent={{
          icon: 'delete',
          color: '#fff',
          size: RFPercentage(2.8),
          iconStyle: {paddingEnd: RFPercentage(1), paddingTop: RFPercentage(1)},
          onPress: () => {
            Alert.alert(
              'Delete',
              'Are you sure you want to delete all notifications?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
            );
          },
        }}
      />

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingBottom: RFPercentage(2)}}>
          {notifications &&
            notifications.map((notification, index) => {
              return (
                <Card
                  key={index}
                  containerStyle={{
                    margin: RFPercentage(2),
                    borderRadius: RFPercentage(1),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: 'black',
                          fontFamily: 'Ubuntu-Bold',
                          fontSize: RFPercentage(1.6),
                          color: 'black',
                          marginStart: RFPercentage(1.5),
                        }}>
                        {notification.Title}
                      </Text>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{
                          color: 'black',
                          fontFamily: 'Ubuntu-Regular',
                          fontSize: RFPercentage(1.6),
                          color: 'black',
                          marginStart: RFPercentage(1.5),
                        }}>
                        {notification.Description}
                      </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <AntDesign name="delete" color={'red'} size={20} />
                    </View>
                  </View>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Ubuntu-Regular',
                      fontSize: RFPercentage(1.4),
                      color: 'black',
                      marginStart: RFPercentage(1.5),
                      textAlign: 'right',
                      marginTop: RFPercentage(1),
                    }}>
                    {notification.createdAt}
                  </Text>
                </Card>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
