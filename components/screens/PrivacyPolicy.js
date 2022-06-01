import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card } from "react-native-elements";
import { FetchAPI } from "../helpers/FetchInstance";

const PrivacyPolicy = ({ navigation }) => {
  const [privacyPolicy, setPrivacyPolicy] = useState();
  const fetchPrivacyPolicy = async () => {
    try {
      const getPrivacyPolicy = await FetchAPI({
        query: `
                      query{
                          setting{
                              data{
                                  attributes{
                                      PrivacyPolicy
                                  }
                              }
                          }
                      }
              `,
      });
      setPrivacyPolicy(
        getPrivacyPolicy.data.setting.data.attributes.PrivacyPolicy
      );
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
    }
  };
  useEffect(() => {
    fetchPrivacyPolicy();
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
          text: "Privacy Policy",
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
      <Text>{privacyPolicy && privacyPolicy}</Text>
    </View>
  );
};

export default PrivacyPolicy;
