import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Header, Card, ListItem, Button} from 'react-native-elements';
import {FetchAPI} from '../helpers/FetchInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feedback = ({navigation}) => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testimonial, setTestimonial] = useState('');

  const sendFeedback = async () => {
    try {
      setIsLoading(true);
      const getUser = await AsyncStorage.getItem('userName');
      const giveFeedback = await FetchAPI({
        query: `
              mutation{
                createFeedback(data:{Username:${JSON.stringify(
                  getUser,
                )},Feedback:${JSON.stringify(testimonial)}}){
                  data{
                    attributes{
                      createdAt
                    }
                  }
                }
              }        
            `,
      });

      if (giveFeedback.data) {
        if (giveFeedback.data.createFeedback.data.attributes.createdAt) {
          ToastAndroid.show('Feedback sent successfully!', ToastAndroid.SHORT);
          setIsLoading(false);
          navigation.navigate('Settings');
        }
      }
    } catch (error) {
      ToastAndroid.show(
        'Something went wrong, Please try again later!',
        ToastAndroid.SHORT,
      );
      setIsLoading(false);
    }
  };

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
          text: 'Feedback',
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
      />

      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card containerStyle={{borderRadius: RFPercentage(1)}}>
            <View style={{marginTop: RFPercentage(1)}}>
              <Text style={{fontFamily: 'Ubuntu-Bold', color: 'black'}}>
                Feedback to the CEO Office!
              </Text>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Regular',
                  color: '#818181',
                  marginTop: RFPercentage(0.8),
                }}>
                Please share your honest feedback to help us improve
              </Text>
              <TextInput
                multiline
                editable
                numberOfLines={6}
                value={testimonial}
                onChangeText={text => setTestimonial(text)}
                textAlignVertical="top"
                style={{
                  borderWidth: 1,
                  borderColor: '#818181',
                  borderRadius: RFPercentage(1),
                  padding: RFPercentage(1),
                  marginTop: RFPercentage(2),
                }}
                placeholder="Your feedback"
              />
              <Button
                onPress={sendFeedback}
                title={'Submit'}
                loading={isLoading}
                titleStyle={{fontFamily: 'Ubuntu-Regular'}}
                buttonStyle={{
                  borderRadius: RFPercentage(1),
                  backgroundColor: '#423b88',
                }}
                containerStyle={{
                  width: '100%',
                  paddingTop: RFPercentage(2),
                  paddingHorizontal: RFPercentage(10),
                }}
              />
            </View>
          </Card>

          {/* FAQ's */}
          {/* <View style={{margin: RFPercentage(2)}}>
            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title style={{fontFamily: 'Ubuntu-Bold'}}>
                    FAQ's
                  </ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={showFAQ}
              onPress={() => {
                setShowFAQ(!showFAQ);
              }}>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Q1. What is the</ListItem.Title>
                  <ListItem.Subtitle>Ans. My Name</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>Q1. What is the</ListItem.Title>
                  <ListItem.Subtitle>Ans. My Name</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default Feedback;
