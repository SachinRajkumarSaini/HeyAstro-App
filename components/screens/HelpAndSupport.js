import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, ListItem, Image } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI } from "../helpers/FetchInstance";

const HelpAndSupport = ({ navigation }) => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [contactData, setContactData] = useState();

  const fetchContactData = async () => {
    try {
      const getContactData = await FetchAPI({
        query: `
            query{
              setting{
                  data{
                      attributes{
                          MediaLinks{
                              Whatsapp
                              Website
                              Email
                          }
                      }
                  }
              }
          }  
        `,
      });
      setContactData(getContactData.data.setting.data.attributes.MediaLinks);
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
        backgroundColor={"transparent"}
      />
      {/* Header Section */}
      <Header
        statusBarProps={{ backgroundColor: "transparent" }}
        containerStyle={{
          backgroundColor: "#423b88",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "Help And Support",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          iconStyle: {
            marginLeft: RFPercentage(1),
            marginTop: RFPercentage(0.8),
          },
          onPress: () => navigation.goBack(),
        }}
      />

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
            <Image
              source={{ uri: FileBase64.helpAndSupport }}
              style={{ height: RFPercentage(30), width: "100%" }}
            />
            <View style={{ marginTop: RFPercentage(1) }}>
              <Text
                style={{
                  fontFamily: "Dongle-Regular",
                  fontSize: RFPercentage(2.5),
                  marginTop: RFPercentage(1),
                  color: "black",
                }}
              >
                Help and Support
              </Text>
              <Text
                style={{
                  fontFamily: "Dongle-Regular",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1),
                  color: "black",
                }}
              >
                If you have any questions, please contact us at:
                heyastroofficial@gmail.com
              </Text>
              <Text
                style={{
                  fontFamily: "Dongle-Regular",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1),
                  color: "black",
                }}
              >
                We will be happy to help you.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: RFPercentage(2),
                }}
              >
                <MaterialCommunityIcons
                  name="gmail"
                  onPress={() => Linking.openURL(`mailto:${contactData.Email}`)}
                  color={"#EA4335"}
                  size={30}
                />
                <FontAwesome
                  onPress={() => Linking.openURL(contactData.Whatsapp)}
                  name="whatsapp"
                  color={"#58aa14"}
                  size={30}
                />
                <Foundation
                  onPress={() => Linking.openURL(contactData.Website)}
                  name="web"
                  color={"#FF8A66"}
                  size={30}
                />
              </View>
            </View>
          </Card>

          {/* FAQ's */}
          <View style={{ margin: RFPercentage(2) }}>
            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title style={{ fontFamily: "Ubuntu-Bold" }}>
                    FAQ's
                  </ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={showFAQ}
              onPress={() => {
                setShowFAQ(!showFAQ);
              }}
            >
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      fontFamily: "Dongle-Regular",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Q1. How to recharge my wallet ?
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                    }}
                  >
                    Ans. Click on the wallet recharge icon and select the mode
                    of payment you like to do. 18% is included as per government
                    guidelines.
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      fontFamily: "Dongle-Regular",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Q1. How to chat or call with astrologer ?
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                    }}
                  >
                    Ans. Find your astrologer as per your requirement. Then
                    click on the call or chat option as per your need. You will
                    be charged as per the mentioned amount per minutes. Review
                    the astrologer and shre your experience with the astrologer.
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </ListItem.Accordion>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HelpAndSupport;
